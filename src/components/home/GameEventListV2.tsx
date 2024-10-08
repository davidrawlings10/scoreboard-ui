import { makeStyles } from "@mui/styles";
import { Box, capitalize, FormControlLabel, Switch } from "@mui/material";

import theme from "../../theme";
import GameEvent from "../../types/GameEvent";
import Game, { Clock } from "../../types/Game";
import TeamDisplay from "../shared/TeamDisplay/TeamDisplay";
import { ClockDisplay } from "../shared/GameClockDisplay";

const useStyles = makeStyles({
  highlight: {
    color: theme.palette.secondary.main,
  },
});

interface GameEventListProps {
  gameEvents: Array<GameEvent>;
  game: Game;
  excludePossessionEnded: boolean;
  handleExcludePossessionEndedChanged: (value: boolean) => void;
}

export default function GameEventList(props: GameEventListProps) {
  const {
    gameEvents,
    game,
    excludePossessionEnded,
    handleExcludePossessionEndedChanged,
  } = props;

  const classes = useStyles();

  if (!game) {
    return <div></div>;
  }

  return (
    <Box display="flex" justifyContent="center" mb={10}>
      <Box
        width={900}
        display="flex"
        alignItems="center"
        flexDirection="column"
      >
        <Box
          bgcolor="primary.main"
          border="1px solid black"
          overflow="auto"
          maxHeight={400}
          width="100%"
        >
          {gameEvents.length === 0 && "No events"}
          {gameEvents
            .sort(function (a, b) {
              return b.id - a.id;
            })
            .map((gameEvent) => {
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
                <Box
                  key={gameEvent.id}
                  display="flex"
                  flexDirection="row"
                  width="100%"
                >
                  <Box
                    border="1px solid black"
                    p={1}
                    width={window.innerWidth < 600 ? "10%" : "30%"}
                  >
                    <Box className={homeTeamTextStyle}>
                      <TeamDisplay
                        id={game.homeTeamId}
                        hideName={window.innerWidth < 600}
                        hideLocation
                      />
                    </Box>
                  </Box>
                  <Box
                    border="1px solid black"
                    p={1}
                    width="5%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Box className={homeTeamTextStyle}>
                      {gameEvent.homeScore}
                    </Box>
                  </Box>
                  <Box
                    border="1px solid black"
                    p={1}
                    width={window.innerWidth < 600 ? "10%" : "30%"}
                  >
                    <Box className={awayTeamTextStyle}>
                      <TeamDisplay
                        id={game.awayTeamId}
                        hideName={window.innerWidth < 600}
                        hideLocation
                      />
                    </Box>
                  </Box>
                  <Box
                    border="1px solid black"
                    p={1}
                    width="5%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Box className={awayTeamTextStyle}>
                      {gameEvent.awayScore}
                    </Box>
                  </Box>
                  <Box
                    border="1px solid black"
                    p={1}
                    display="flex"
                    justifyContent="center"
                    width="20%"
                  >
                    <ClockDisplay
                      clock={clock}
                      sportEndingPeriod={game.sportInfo.ending_PERIOD}
                    />
                  </Box>
                  <Box
                    border="1px solid black"
                    p={1}
                    display="flex"
                    justifyContent="center"
                    width="20%"
                  >
                    {capitalize(
                      gameEvent.eventType
                        .replace("HOCKEY", "")
                        .replace("BASKETBALL", "")
                        .replace("FOOTBALL", "")
                        .replaceAll("_", " ")
                        .trim()
                        .toLowerCase()
                    )}
                  </Box>
                </Box>
              );
            })}
        </Box>
        <Box width="100%" display="flex" justifyContent="end">
          <FormControlLabel
            control={
              <Switch
                checked={excludePossessionEnded}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleExcludePossessionEndedChanged(event.target.checked)
                }
              />
            }
            label="Filter Possession Changes"
            labelPlacement="start"
          />
        </Box>
      </Box>
    </Box>
  );
}
