import { useState, useEffect, useCallback, useContext } from "react";
import { Box } from "@mui/material";

import config from "../../config";
import Scoreboard from "./Scoreboard";
import ScoreboardControlsDialog from "./ScoreboardControlsDialog";
import SeasonDisplay from "../season/SeasonDisplay";
import Game from "../../types/Game";
import GameEvent from "../../types/GameEvent";
import GameEventList from "./GameEventListV2";
import ScoreboardControls from "./ScoreboardControls";
import CurrentGameList from "./CurrentGameList";
import { AppContext } from "../App";
import { sfetchList } from "../../sfetch";

export default function HomePage() {
  document.title = "Scoreboard - Home";
  // const [currentGames, setCurrentGames] = useState(Array<Game>());
  // const [finishedGames, setFinishedGames] = useState(Array<Game>());
  const [displayGameId, setDisplayGameId] = useState<number | null>(null);
  const [displayGame, setDisplayGame] = useState<Game | null>(null);
  const [gameEvents, setGameEvents] = useState<GameEvent[]>([]);
  const [excludePossessionEnded, setExcludePossessionEnded] =
    useState<boolean>(false);

  // const [running, setRunning] = useState(false);
  // const [millisecondsPerTick, setMillisecondsPerTick] = useState<number>(0);
  // const [gamesToPlay, setGamesToPlay] = useState<number>(0);
  // const [gamesPlayingConcurrently, setGamesPlayingConcurrently] =
  //   useState<number>(0);

  const {
    seasons,
    loadSeasons,
    currentGames,
    finishedGames,
    running,
    millisecondsPerTick,
    gamesToPlay,
    gamesPlayingConcurrently,
    getScoreboardState,
  } = useContext(AppContext);

  // const getScoreboardState = useCallback(() => {
  //   fetch(config.baseUrl + "/game/getScoreboardState")
  //     .then((res) => res.json())
  //     .then((json) => {
  //       setCurrentGames(json.games);
  //       if (finishedGames.length !== json.finishedGames.length) {
  //         setFinishedGames(json.finishedGames);
  //       }
  //       if (running !== json.running) {
  //         setRunning(json.running);
  //       }
  //       if (millisecondsPerTick !== json.tickMilliseconds) {
  //         setMillisecondsPerTick(json.tickMilliseconds);
  //       }
  //       if (gamesToPlay !== json.gamesToPlay) {
  //         setGamesToPlay(json.gamesToPlay);
  //       }
  //       if (gamesPlayingConcurrently !== json.gamesPlayingConcurrently) {
  //         setGamesPlayingConcurrently(json.gamesPlayingConcurrently);
  //       }
  //     });
  // }, [
  //   finishedGames.length,
  //   gamesPlayingConcurrently,
  //   gamesToPlay,
  //   millisecondsPerTick,
  //   running,
  // ]);

  const getGameEvents = useCallback((): void => {
    if (displayGameId) {
      sfetchList(
        `/gameEvent/getByGameId?gameId=${displayGameId}&excludePossessionEnded=${excludePossessionEnded}`
      )
        // .then((res) => res.json())
        .then((response) => {
          // console.log(
          //   "response.length",
          //   response.length,
          //   "gameEvents.length",
          //   gameEvents.length
          // );
          if (response.length !== gameEvents.length) {
            console.log("setting now!");
            setGameEvents(response);
          }
        });
    }
  }, [displayGameId, excludePossessionEnded, gameEvents]);

  const updateDisplayGameId = useCallback((): void => {
    if (currentGames.concat(finishedGames).length > 0) {
      setDisplayGameId(currentGames.concat(finishedGames)[0].id);
    }
  }, []);

  useEffect(() => {
    if (!seasons) {
      loadSeasons("AVES", "HOCKEY");
    }
  }, [seasons, loadSeasons]);

  useEffect(() => {
    if (displayGameId) {
      const displayGame: Game | undefined = [
        ...currentGames,
        ...finishedGames,
      ].find((game: Game) => game.id === displayGameId);
      if (displayGame) {
        setDisplayGame(displayGame);
      }
    } else {
      // updateDisplayGameId();
      setDisplayGameId(currentGames.concat(finishedGames)[0]?.id);
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

  const handleRunningChange = () => {
    if (running) {
      fetch(config.baseUrl + "/game/pauseGames");
    } else {
      fetch(config.baseUrl + "/game/playGames");
    }
    // setRunning(value);
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
          {currentGames.concat(finishedGames).length > 0 && !!displayGame && (
            <Box alignItems="center" flexDirection="column">
              <GameEventList
                gameEvents={gameEvents}
                homeTeamId={displayGame?.homeTeamId}
                awayTeamId={displayGame?.awayTeamId}
                endingPeriod={displayGame?.sportInfo.ending_PERIOD}
                excludePossessionEnded={excludePossessionEnded}
                handleExcludePossessionEndedChanged={setExcludePossessionEnded}
              />
            </Box>
          )}
        </Box>
        <Box marginTop={4}>
          <SeasonDisplay
            seasonId={displayGame?.seasonId || seasons?.length}
            // numCurrentGames={currentGames.length}
            // numFinishedGames={finishedGames.length}
            numGames={{
              current: currentGames.length,
              finished: finishedGames.length,
            }}
          />
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
