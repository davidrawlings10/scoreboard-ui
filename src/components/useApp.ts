import { useState, useCallback } from "react";
import Season from "../types/Season";
import Standing from "../types/Standing";
import { sfetchList, sfetch } from "../sfetch";
import { calculatedPointPercentage } from "./shared/StandingsHelper";
import Game from "../types/Game";

export default function useApp() {
  const [seasons, setSeasons] = useState<Season[] | null>(null);
  const loadSeasons = useCallback(
    (league?: string | null, sport?: string | null) =>
      sfetchList(`/season/getSeasons?league=${league}&sport=${sport}`).then(
        (seasons) => {
          setSeasons(seasons);
        }
      ),
    []
  );

  const [standings, setStandings] = useState<Standing[]>([]);
  const loadStandings = useCallback(
    (seasonId: number) =>
      sfetchList(`/standing/get?seasonId=${seasonId}`).then((standingsList) => {
        setStandings(
          standingsList.map((standing: Standing) => ({
            ...standing,
            goalDiff: standing.gf - standing.ga,
            pointPercentage: calculatedPointPercentage(
              standing.point,
              standing.gp
            ),
          }))
        );
      }),
    []
  );

  const [currentGames, setCurrentGames] = useState<Game[]>([]);
  const [finishedGames, setFinishedGames] = useState<Game[]>([]);
  const [running, setRunning] = useState<boolean>(false);
  const [millisecondsPerTick, setMillisecondsPerTick] = useState<number>(0);
  const [gamesToPlay, setGamesToPlay] = useState<number>(0);
  const [gamesPlayingConcurrently, setGamesPlayingConcurrently] =
    useState<number>(0);

  const getScoreboardState = useCallback(() => {
    sfetch("/game/getScoreboardState").then((json) => {
      setCurrentGames(json.games);
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

  return {
    seasons,
    loadSeasons,
    standings,
    loadStandings,
    currentGames,
    finishedGames,
    running,
    millisecondsPerTick,
    gamesToPlay,
    gamesPlayingConcurrently,
    getScoreboardState,
  };
}
