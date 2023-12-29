import { makeStyles } from "@mui/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";

import theme from "../theme";
import GameEvent from "../Entity/GameEvent";
import Game, { Clock } from "../Entity/Game";
import TeamDisplay from "../Shared/TeamDisplay/TeamDisplay";
import { ClockDisplay } from "../Shared/GameClockDisplay";

const useStyles = makeStyles({
  highlight: {
    color: theme.palette.secondary.main,
  },
});

interface GameEventListProps {
  gameEvents: Array<GameEvent>;
  game: Game;
}

export default function GameEventList(props: GameEventListProps) {
  const { gameEvents, game } = props;

  const classes = useStyles();

  if (!game) {
    return <div></div>;
  }

  return (
    <Box display="flex" justifyContent="center" mb={10}>
      <Box width={1200}>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "22%" }}>Home</TableCell>
                <TableCell style={{ width: "18%" }}></TableCell>
                <TableCell style={{ width: "22%" }}>Away</TableCell>
                <TableCell style={{ width: "18%" }}></TableCell>
                <TableCell style={{ width: "20%" }}>Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {gameEvents.map((gameEvent) => {
                const clock: Clock = {
                  period: gameEvent.period,
                  minutes: gameEvent.minutes,
                  seconds: gameEvent.seconds,
                  intermission: false,
                  final: false,
                };

                const homeTeamTextStyle =
                  gameEvent.teamId === game.homeTeamId ? classes.highlight : "";
                const awayTeamTextStyle =
                  gameEvent.teamId === game.awayTeamId ? classes.highlight : "";
                return (
                  <TableRow key={gameEvent.id}>
                    <TableCell>
                      <Box className={homeTeamTextStyle}>
                        <TeamDisplay
                          id={game.homeTeamId}
                          hideName={window.innerWidth < 1200}
                        />
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box className={homeTeamTextStyle}>
                        {gameEvent.homeScore}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box className={awayTeamTextStyle}>
                        <TeamDisplay
                          id={game.awayTeamId}
                          hideName={window.innerWidth < 1200}
                        />
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box className={awayTeamTextStyle}>
                        {gameEvent.awayScore}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <ClockDisplay clock={clock} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
