import { makeStyles } from "@mui/styles";
import { Box, capitalize, FormControlLabel, Switch } from "@mui/material";

import theme from "../../theme";
import GameEvent from "../../types/GameEvent";
import { Clock } from "../../types/Game";
import TeamDisplay from "../shared/TeamDisplay/TeamDisplay";
import { ClockDisplay } from "../shared/GameClockDisplay";
import { memo } from "react";

const useStyles = makeStyles({
  highlight: {
    color: theme.palette.secondary.main,
  },
});

interface GameEventListProps {
  gameEvents: GameEvent[];
  homeTeamId: number | undefined;
  awayTeamId: number | undefined;
  endingPeriod: number | undefined;
  excludePossessionEnded: boolean;
  handleExcludePossessionEndedChanged: (value: boolean) => void;
}

function GameEventList(props: GameEventListProps) {
  const {
    gameEvents,
    homeTeamId,
    awayTeamId,
    endingPeriod,
    excludePossessionEnded,
    handleExcludePossessionEndedChanged,
  } = props;

  // const excludePossessionEnded: boolean = true;
  // const handleExcludePossessionEndedChanged = (a: boolean) => {};
  // const gameEvents: GameEvent[] = [];

  const classes = useStyles();

  if (!homeTeamId || !awayTeamId || !endingPeriod) {
    return <></>;
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
          maxHeight={500}
          width="100%"
        >
          {gameEvents.length === 0 && (
            <Box display="flex" justifyContent="center" p={2}>
              No events
            </Box>
          )}
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
                gameEvent.teamId === homeTeamId ? classes.highlight : "";
              const awayTeamTextStyle =
                gameEvent.teamId === awayTeamId ? classes.highlight : "";
              return (
                <Box
                  key={gameEvent.id}
                  display="flex"
                  flexDirection="row"
                  width="100%"
                >
                  <Box
                    border="1px solid black"
                    paddingY={1}
                    paddingX={2}
                    width={window.innerWidth < 600 ? "10%" : "30%"}
                  >
                    <Box className={homeTeamTextStyle}>
                      <TeamDisplay
                        id={homeTeamId}
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
                    paddingY={1}
                    paddingX={2}
                    width={window.innerWidth < 600 ? "10%" : "30%"}
                  >
                    <Box className={awayTeamTextStyle}>
                      <TeamDisplay
                        id={awayTeamId}
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
                      sportEndingPeriod={endingPeriod}
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

export default memo(GameEventList);
