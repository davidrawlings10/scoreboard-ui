import { Box, LinearProgress } from "@mui/material";
import { AppContext } from "./App";
import { useContext, useMemo, useState, useEffect } from "react";
import TeamDisplay from "./shared/TeamDisplay/TeamDisplay";
import config from "../config";
// import { getFinalText } from "./shared/GameClockDisplay";
// import Standing from "../types/Standing";
// import Season from "../types/Season";
import "./shared/Table.css";
import GameClockDisplay from "./shared/GameClockDisplay";

type Category = "GAMES" | "STANDINGS" | "SEASONS";
// type Update = Standing | Season; // ) & { category: UpdateCategory };

export default function UpdatesBar() {
  const { standings, seasons, currentGames, finishedGames } =
    useContext(AppContext);
  // const [updates, setUpdates] = useState<string[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [category, setCategory] = useState<Category>("GAMES");
  // const [categoryIndex, setCategoryIndex] = useState<number>(0);
  // const [count, setCount] = useState<number>(7);
  // const games: Game[] = useSelector((state: RootState) => state.games.list);

  // const u: Update | null = standings && {
  //   ...standings[0],
  //   category: "STANDING",
  // };

  // u.ranking;

  // if (games.length === 0) {
  //   return <></>;
  // }

  // const game = games[0];

  // console.log("games[0]", games[0], "game", game);

  const games = useMemo(
    () => [...currentGames, ...finishedGames],
    [currentGames, finishedGames]
  );

  const randomSeasonId = useMemo(
    () =>
      category === "SEASONS" &&
      seasons &&
      Math.floor(Math.random() * seasons?.length),
    [seasons, category]
  );

  // const addUpdate = useCallback(() => {
  //   const standing: Standing | null = standings && standings[categoryIndex];

  //   if (standing) {
  //     setCategoryIndex((prev) => prev + 1);
  //     setUpdates((prev) => [
  //       ...prev,
  //       { ...standing /*, category: "STANDING"*/ },
  //     ]);
  //   } else {
  //     setCategoryIndex(0);
  //   }
  //   // setUpdates((prev) => [...prev, Math.random().toString()]);

  //   // setDisplayIndex(prev => prev + 1);
  // }, [categoryIndex, standings]);

  // const scrollUpdate = useCallback(() => {}, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (
        (category === "GAMES" && games && games?.length > index + 1) ||
        (category === "STANDINGS" && standings && standings?.length > index + 1)
      ) {
        setIndex(index + 1);
      } else {
        setIndex(0);
        if (category === "GAMES") setCategory("STANDINGS");
        if (category === "STANDINGS") setCategory("SEASONS");
        if (category === "SEASONS") setCategory("GAMES");
      }
    }, 5000);

    return function cleanup() {
      clearInterval(intervalId);
    };
  }, [index]);

  // useEffect(() => {
  //   setDisplayIndex(updates.length - 1);
  // }, [updates]);

  // const update: Standing & { category: UpdateCategory } = updates[
  //   displayIndex
  // ] as Standing & { category: UpdateCategory };

  // const update: Standing = useMemo(
  //   () => updates[displayIndex] as Standing,
  //   [updates, displayIndex]
  // );

  return (
    <Box
      width="100%"
      height="60px"
      borderColor="divider"
      borderTop={1}
      display="flex"
      alignItems="center"
      overflow="visible"
    >
      {!true && (
        <Box width="100%">
          <LinearProgress />
        </Box>
      )}
      {category === "GAMES" && games && games[index] && (
        <>
          <Box
            className={
              games[index].status === "FINAL" &&
              games[index].homeScore > games[index].awayScore
                ? "winning-team-color"
                : ""
            }
            p={2}
          >
            <TeamDisplay id={games[index].homeTeamId} showStanding />
          </Box>
          <Box
            className={
              games[index].status === "FINAL" &&
              games[index].homeScore > games[index].awayScore
                ? "winning-team-color"
                : ""
            }
            p={2}
          >
            {games[index].homeScore}
          </Box>
          <Box
            className={
              games[index].status === "FINAL" &&
              games[index].homeScore < games[index].awayScore
                ? "winning-team-color"
                : ""
            }
            p={2}
          >
            <TeamDisplay id={games[index].awayTeamId} showStanding />
          </Box>
          <Box
            className={
              games[index].status === "FINAL" &&
              games[index].homeScore < games[index].awayScore
                ? "winning-team-color"
                : ""
            }
            p={2}
          >
            {games[index].awayScore}
          </Box>
          <Box
            // border="1px solid black"
            p={2}
            // display="flex"
            // justifyContent="center"
          >
            <GameClockDisplay game={games[index]} />
          </Box>
          {/* <Box
            className={
              games[index].status === "PLAYING" ? "winning-team-color" : ""
            }
          >
            {games[index].status === "FINAL" &&
              getFinalText(
                games[index].endingPeriod,
                games[index].sportInfo.ending_PERIOD
              )}
            {games[index].status === "PLAYING" && "In Progress"}
          </Box> */}
          <Box p={2}>
            {games[index].status === "FINAL" &&
              new Date(games[index].updated).toLocaleString("en-US", {
                timeZone: config.timeZone,
              })}
          </Box>
        </>
      )}
      {category === "STANDINGS" && standings && standings[index] && (
        <Box paddingLeft={2}>
          {standings[index] && (
            <Box display="flex" gap={1} alignItems="center">
              {standings[index].ranking && `#${standings[index].ranking}`}
              <TeamDisplay id={standings[index].teamId} />
              <div>
                {standings[index].win}-{standings[index].loss}
              </div>
            </Box>
          )}
        </Box>
      )}
      {category === "SEASONS" && randomSeasonId && seasons && (
        <Box display="flex" p={1} gap={2}>
          <Box display="flex" gap={2}>
            Congrats to the season winner of season {randomSeasonId + 1}
            <TeamDisplay id={seasons[randomSeasonId]?.winnerTeamId} />
          </Box>
          <Box>
            scheduled at{" "}
            {new Date(seasons[randomSeasonId]?.created).toLocaleString(
              "en-US",
              {
                timeZone: config.timeZone,
              }
            )}
          </Box>
          <Box>featuring {seasons[randomSeasonId].numTeams} teams</Box>
        </Box>
      )}
      {/* GAME UPDATE ROUGH DRAFT <Box
        className={
          game.status === "FINAL" && game.homeScore > game.awayScore
            ? "winning-team-color"
            : ""
        }
      >
        <TeamDisplay id={game.homeTeamId} />
      </Box>
      <Box
        className={
          game.status === "FINAL" && game.homeScore > game.awayScore
            ? "winning-team-color"
            : ""
        }
      >
        {game.homeScore}
      </Box>
      <Box
        className={
          game.status === "FINAL" && game.homeScore < game.awayScore
            ? "winning-team-color"
            : ""
        }
      >
        <TeamDisplay id={game.awayTeamId} />
      </Box>
      <Box
        className={
          game.status === "FINAL" && game.homeScore < game.awayScore
            ? "winning-team-color"
            : ""
        }
      >
        {game.awayScore}
      </Box>
      <Box className={game.status === "PLAYING" ? "winning-team-color" : ""}>
        {game.status === "FINAL" &&
          getFinalText(game.endingPeriod, game.sportInfo.ending_PERIOD)}
        {game.status === "PLAYING" && "In Progress"}
      </Box>
      <Box>
        {game.status === "FINAL" &&
          new Date(game.updated).toLocaleString("en-US", {
            timeZone: config.timeZone,
          })}
      </Box> */}
    </Box>
  );
}
