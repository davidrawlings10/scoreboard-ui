import React from "react";
import { Box, Drawer } from "@mui/material";

import config from "../config";
import Scoreboard from "./Scoreboard";
import ScoreboardControlsDialog from "./ScoreboardControlsDialog";
import SeasonDisplay from "../SeasonPage/SeasonDisplay";
import Game from "../Entity/Game";
import GameEvent from "../Entity/GameEvent";
import GameEventList from "./GameEventListV2";
import ScoreboardControls from "./ScoreboardControls";
import CurrentGameList from "./CurrentGameList";

export default function HomePage() {
  const [currentGames, setCurrentGames] = React.useState(Array<Game>());
  const [finishedGames, setFinishedGames] = React.useState(Array<Game>());
  const [displayGameId, setDisplayGameId] = React.useState<number | null>(null);
  const [displayGame, setDisplayGame] = React.useState<Game | null>(null);
  const [gameEvents, setGameEvents] = React.useState(Array<GameEvent>());
  const [drawerMenuOpen, setDrawerMenuOpen] = React.useState<boolean>(false);

  const [running, setRunning] = React.useState(false);
  const [millisecondsPerTick, setMillisecondsPerTick] =
    React.useState<number>(0);
  const [gamesToPlay, setGamesToPlay] = React.useState<number>(0);
  const [gamesPlayingConcurrently, setGamesPlayingConcurrently] =
    React.useState<number>(0);

  const [timerId, setTimerId] = React.useState<any>(null);

  function getScoreboardState() {
    fetch(config.baseUrl + "/game/getScoreboardState")
      .then((res) => res.json())
      .then((json) => {
        setCurrentGames(json.games);
        setFinishedGames(json.finishedGames);
        setRunning(json.running);
        setMillisecondsPerTick(json.tickMilliseconds);
        setGamesToPlay(json.gamesToPlay);
        setGamesPlayingConcurrently(json.gamesPlayingConcurrently);
      });
  }

  const updateDisplayGameId = React.useCallback((): void => {
    if (currentGames.concat(finishedGames).length > 0) {
      setDisplayGameId(currentGames.concat(finishedGames)[0].id);
    }
  }, []);

  React.useEffect(() => {
    if (!!displayGameId) {
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
  React.useEffect(() => {
    updateDisplayGameId();
  }, [currentGames.length]);

  React.useEffect(() => {
    setTimerId(
      setInterval(
        () => getScoreboardState(),
        // every 1000ms is the most frequent we should get new scoreboard state even if the game tick is running faster than this
        Math.max(millisecondsPerTick, 1000)
      )
    );

    return function cleanup() {
      if (!!timerId) {
        clearInterval(timerId);
        setTimerId(null);
      }
    };
  }, [millisecondsPerTick]);

  // request game events for the displayed game (on every new state for now until caching can be implemented)
  React.useEffect(() => {
    if (
      (currentGames.length === 0 && finishedGames.length === 0) ||
      !displayGame
    ) {
      return;
    }

    fetch(config.baseUrl + "/gameEvent/getByGameId?gameId=" + displayGame.id)
      .then((res) => res.json())
      .then((json) => {
        setGameEvents(json.list);
      });
  }, [displayGame, currentGames, finishedGames]);

  const handleRunningChange = (value: boolean) => {
    if (running) {
      fetch(config.baseUrl + "/game/pauseGames");
    } else {
      fetch(config.baseUrl + "/game/playGames");
    }
    setRunning(value);
  };

  const [scoreboardControlsDialogOpen, setScoreboardControlsDialogOpen] =
    React.useState(false);

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
              <GameEventList gameEvents={gameEvents} game={displayGame} />
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

      <Drawer open={drawerMenuOpen}>yoyo</Drawer>
    </>
  );
}
