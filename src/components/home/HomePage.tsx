import { useState, useEffect, useCallback } from "react";
import { Box, Button } from "@mui/material";

import config from "../../config";
import Scoreboard from "./Scoreboard";
import ScoreboardControlsDialog from "./ScoreboardControlsDialog";
import SeasonDisplay from "../season/SeasonDisplay";
import Game from "../../types/Game";
import GameEvent from "../../types/GameEvent";
import GameEventList from "./GameEventListV2";
import ScoreboardControls from "./ScoreboardControls";
import CurrentGameList from "./CurrentGameList";

import type { RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../../counterSlice";
import { set } from "../../gamesSlice";

export default function HomePage() {
  const [currentGames, setCurrentGames] = useState(Array<Game>());
  const [finishedGames, setFinishedGames] = useState(Array<Game>());
  const [displayGameId, setDisplayGameId] = useState<number | null>(null);
  const [displayGame, setDisplayGame] = useState<Game | null>(null);
  const [gameEvents, setGameEvents] = useState(Array<GameEvent>());
  const [excludePossessionEnded, setExcludePossessionEnded] =
    useState<boolean>(true);

  const [running, setRunning] = useState(false);
  const [millisecondsPerTick, setMillisecondsPerTick] = useState<number>(0);
  const [gamesToPlay, setGamesToPlay] = useState<number>(0);
  const [gamesPlayingConcurrently, setGamesPlayingConcurrently] =
    useState<number>(0);

  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  const getScoreboardState = useCallback(() => {
    fetch(config.baseUrl + "/game/getScoreboardState")
      .then((res) => res.json())
      .then((json) => {
        setCurrentGames(json.games);
        dispatch(set(json.games));
        if (finishedGames.length !== json.finishedGames.length) {
          setFinishedGames(json.finishedGames);
        }
        if (running !== json.running) {
          setRunning(json.running);
        }
        if (millisecondsPerTick !== json.tickMilliseconds) {
          setMillisecondsPerTick(json.tickMilliseconds);
        }
        if (gamesToPlay !== json.gamesToPlay) {
          setGamesToPlay(json.gamesToPlay);
        }
        if (gamesPlayingConcurrently !== json.gamesPlayingConcurrently) {
          setGamesPlayingConcurrently(json.gamesPlayingConcurrently);
        }
      });
  }, [
    finishedGames.length,
    gamesPlayingConcurrently,
    gamesToPlay,
    millisecondsPerTick,
    running,
  ]);

  const getGameEvents = useCallback((): void => {
    if (displayGameId) {
      fetch(
        `${config.baseUrl}/gameEvent/getByGameId?gameId=${displayGameId}&excludePossessionEnded=${excludePossessionEnded}`
      )
        .then((res) => res.json())
        .then((json) => {
          setGameEvents(json.list);
        });
    }
  }, [displayGameId, excludePossessionEnded]);

  const updateDisplayGameId = useCallback((): void => {
    if (currentGames.concat(finishedGames).length > 0) {
      setDisplayGameId(currentGames.concat(finishedGames)[0].id);
    }
  }, []);

  const handleExcludePossessionEndedChanged = (value: boolean) => {
    setExcludePossessionEnded(value);
  };

  useEffect(() => {
    if (displayGameId) {
      currentGames.concat(finishedGames).forEach((game: Game) => {
        if (game.id === displayGameId) {
          setDisplayGame(game);
        }
      });
    } else {
      updateDisplayGameId();
    }
  }, [displayGameId, currentGames, finishedGames, updateDisplayGameId]);

  // if the number of current games changes we should reset the display game to the first game in the list
  useEffect(() => {
    updateDisplayGameId();
  }, [currentGames.length]);

  useEffect(() => {
    const intervalId = setInterval(
      () => getScoreboardState(),
      // 100ms is how frequent we will get new scoreboard state even if the game tick is running faster than this
      Math.max(millisecondsPerTick, 100)
    );

    return function cleanup() {
      clearInterval(intervalId);
    };
  }, [millisecondsPerTick, getScoreboardState]);

  // request game events for the displayed game (on every new state for now until caching can be implemented)
  useEffect(() => {
    // if (
    //   (currentGames.length === 0 && finishedGames.length === 0) ||
    //   !displayGame
    // ) {
    //   return;
    // }

    const intervalId = setInterval(() => getGameEvents(), 1000);

    return function cleanup() {
      clearInterval(intervalId);
    };
  }, [getGameEvents]);

  const handleRunningChange = (value: boolean) => {
    if (running) {
      fetch(config.baseUrl + "/game/pauseGames");
    } else {
      fetch(config.baseUrl + "/game/playGames");
    }
    setRunning(value);
  };

  const [scoreboardControlsDialogOpen, setScoreboardControlsDialogOpen] =
    useState(false);

  const handleScoreboardControlsDialogOpen = () => {
    setScoreboardControlsDialogOpen(true);
  };

  const handleScoreboardControlsDialogClose = () => {
    setScoreboardControlsDialogOpen(false);
  };

  const handleUpdateDisplayGameId = (id: number) => {
    setDisplayGameId(id);
  };

  return (
    <>
      <Box padding={3}>
        <ScoreboardControls
          running={running}
          millisecondsPerTick={millisecondsPerTick}
          gamesToPlay={gamesToPlay}
          gamesPlayingConcurrently={gamesPlayingConcurrently}
          handleRunningChange={handleRunningChange}
          handleScoreboardControlsDialogOpen={
            handleScoreboardControlsDialogOpen
          }
        />
        <Box display="flex" justifyContent="center">
          <CurrentGameList
            games={currentGames.concat(finishedGames)}
            displayGame={displayGame}
            handleUpdateDisplayGameId={handleUpdateDisplayGameId}
          />
        </Box>
        {/* show display game */}
        <Box marginTop={4} display="flex" justifyContent="center">
          {currentGames.concat(finishedGames).length > 0 && (
            <Scoreboard game={displayGame} />
          )}
        </Box>
        {/* show game events for display game  */}

        <Box marginTop={4}>
          {currentGames.concat(finishedGames).length > 0 &&
            gameEvents.length > 0 &&
            !!displayGame && (
              <Box alignItems="center" flexDirection="column">
                <GameEventList
                  gameEvents={gameEvents}
                  game={displayGame}
                  excludePossessionEnded={excludePossessionEnded}
                  handleExcludePossessionEndedChanged={
                    handleExcludePossessionEndedChanged
                  }
                />
              </Box>
            )}
        </Box>
        <Box marginTop={4}>
          {!!displayGame && (
            <SeasonDisplay
              seasonId={displayGame?.seasonId}
              numGames={{
                current: currentGames.length,
                finished: finishedGames.length,
              }}
            />
          )}
        </Box>
      </Box>

      <ScoreboardControlsDialog
        open={scoreboardControlsDialogOpen}
        onClose={handleScoreboardControlsDialogClose}
        gamesToPlay={gamesToPlay}
        gamesPlayingConcurrently={gamesPlayingConcurrently}
        millisecondsPerTick={millisecondsPerTick}
      />
    </>
  );
}
