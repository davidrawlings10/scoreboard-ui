import { Box } from "@mui/material";
import { AppContext } from "./App";
import { useContext, useMemo, useState, useEffect } from "react";
import TeamDisplay from "./shared/TeamDisplay/TeamDisplay";
// import config from "../config";
// import { getFinalText } from "./shared/GameClockDisplay";
import "./shared/Table.css";

export default function UpdatesBar() {
  const { standings, seasons } = useContext(AppContext);
  const [updates, setUpdates] = useState<string[]>(["0.34"]);
  const [index, setIndex] = useState<number>(0);
  const [count, setCount] = useState<number>(7);
  // const games: Game[] = useSelector((state: RootState) => state.games.list);

  // if (games.length === 0) {
  //   return <></>;
  // }

  // const game = games[0];

  // console.log("games[0]", games[0], "game", game);

  const randomSeasonId = useMemo(
    () => seasons && Math.floor(Math.random() * seasons?.length),
    [seasons]
  );

  function doSomething() {
    setUpdates((prev) => [...prev, Math.random().toString()]);
  }

  useEffect(() => {
    const intervalId = setInterval(() => doSomething(), 1000);

    return function cleanup() {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    setIndex(updates.length - 1);
  }, [updates]);

  console.log("log: updates", updates);

  return (
    <Box
      width="100%"
      height="40px"
      display="flex"
      borderColor="divider"
      borderTop={1}
    >
      {updates[index]}
      <button onClick={() => setCount(count + 1)}>{count}</button>
      {randomSeasonId && seasons && (
        <Box display="flex" p={1}>
          {/* <>
            Congrats to the season winner of season {randomSeasonId + 1}
            <TeamDisplay id={seasons[randomSeasonId]?.winnerTeamId} /> scheduled
            at {seasons[randomSeasonId]?.created} and featuring{" "}
            {seasons[randomSeasonId].numTeams} teams
          </> */}
        </Box>
      )}
      {/* <Box
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
