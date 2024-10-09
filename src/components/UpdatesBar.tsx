import { Box, LinearProgress } from "@mui/material";
import { AppContext } from "./App";
import { useContext, useMemo, useState, useEffect, useCallback } from "react";
import TeamDisplay from "./shared/TeamDisplay/TeamDisplay";
// import config from "../config";
// import { getFinalText } from "./shared/GameClockDisplay";
import Standing from "../types/Standing";
import "./shared/Table.css";

type UpdateCategory = "STANDING" | "SEASON";

export default function UpdatesBar() {
  const { standings, seasons } = useContext(AppContext);
  const [updates, setUpdates] = useState<Standing[]>([]);
  const [displayIndex, setDisplayIndex] = useState<number>(0);
  const [updateCategory, setUpdateCategory] =
    useState<UpdateCategory>("STANDING");
  const [categoryIndex, setCategoryIndex] = useState<number>(0);
  // const [count, setCount] = useState<number>(7);
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

  const addUpdate = useCallback(() => {
    const standing: Standing | null = standings && standings[categoryIndex + 1];

    if (standing) {
      setCategoryIndex((prev) => prev + 1);
      setUpdates((prev) => [...prev, standing]);
    } else {
      setCategoryIndex(0);
    }
    // setUpdates((prev) => [...prev, Math.random().toString()]);

    // setDisplayIndex(prev => prev + 1);
  }, [categoryIndex, standings]);

  useEffect(() => {
    const intervalId = setInterval(() => addUpdate(), 5000);

    return function cleanup() {
      clearInterval(intervalId);
    };
  }, [addUpdate]);

  useEffect(() => {
    setDisplayIndex(updates.length - 1);
  }, [updates]);

  const update: Standing = updates[displayIndex];

  return (
    <Box
      width="100%"
      height="60px"
      borderColor="divider"
      borderTop={1}
      display="flex"
      alignItems="center"
    >
      {!update && (
        <Box width="100%">
          <LinearProgress />
        </Box>
      )}
      <Box paddingLeft={2}>
        {update && (
          <Box display="flex" gap={1} alignItems="center">
            {update.ranking && `#${update.ranking}`}
            <TeamDisplay id={update.teamId} />
            <div>
              {update.win}-{update.loss}
            </div>
          </Box>
        )}
      </Box>
      {/* SEASON UPDATE ROUGH DRAFT {randomSeasonId && seasons && (
        <Box display="flex" p={1}>
          <>
            Congrats to the season winner of season {randomSeasonId + 1}
            <TeamDisplay id={seasons[randomSeasonId]?.winnerTeamId} /> scheduled
            at {seasons[randomSeasonId]?.created} and featuring{" "}
            {seasons[randomSeasonId].numTeams} teams
          </>
        </Box>
      )} */}
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
