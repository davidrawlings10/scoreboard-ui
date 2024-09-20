import { Box } from "@mui/material";
// import TeamDisplay from "./shared/TeamDisplay/TeamDisplay";
// import config from "../config";
// import { getFinalText } from "./shared/GameClockDisplay";
import "./shared/Table.css";

export default function UpdatesBar() {
  // const games: Game[] = useSelector((state: RootState) => state.games.list);

  // if (games.length === 0) {
  //   return <></>;
  // }

  // const game = games[0];

  // console.log("games[0]", games[0], "game", game);

  return (
    <Box
      width="100%"
      height="40px"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
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
