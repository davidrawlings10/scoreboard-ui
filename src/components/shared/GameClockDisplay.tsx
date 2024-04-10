import Game, { Clock } from "../../types/Game";

export function getFinalText(
  gameEndingPeriod: number,
  sportEndingPeriod: number
) {
  let displayText: string = "Final ";

  if (gameEndingPeriod >= sportEndingPeriod + 2) {
    displayText += gameEndingPeriod - sportEndingPeriod;
  }

  if (gameEndingPeriod >= sportEndingPeriod + 1) {
    displayText += "OT";
  }

  return displayText;
}

function TimeDisplay(props: Clock) {
  return props.minutes + ":" + ("0" + props.seconds).slice(-2);
}

function PeriodDisplay(period: number, sportEndingPeriod: number) {
  if (period >= sportEndingPeriod + 1) {
    const otNumber = period - sportEndingPeriod;
    return otNumber >= 2 ? otNumber + "OT" : "OT";
  }

  if (period >= 11 && period < 20) {
    return period + "th";
  } else if (period % 10 === 1) {
    return period + "st";
  } else if (period % 10 === 2) {
    return period + "nd";
  } else if (period % 10 === 3) {
    return period + "rd";
  } else {
    return period + "th";
  }
}

export type GameClockDisplayProps = {
  game: Game;
};

export default function GameClockDisplay(props: GameClockDisplayProps) {
  const { game } = props;

  if (game.status === "FINAL") {
    return (
      <span>
        {getFinalText(game.endingPeriod, game.sportInfo.ending_PERIOD)}
      </span>
    );
  }

  return (
    <ClockDisplay
      clock={game.clock}
      sportEndingPeriod={game.sportInfo.ending_PERIOD}
    />
  );
}

export type ClockDisplayProps = {
  clock: Clock;
  sportEndingPeriod: number;
};

export function ClockDisplay(props: ClockDisplayProps) {
  const { clock, sportEndingPeriod } = props;
  return clock.intermission ? (
    <>
      {PeriodDisplay(clock.period, sportEndingPeriod)} starts in{" "}
      {TimeDisplay(clock)}
    </>
  ) : (
    <>
      {TimeDisplay(clock)} {PeriodDisplay(clock.period, sportEndingPeriod)}
    </>
  );
}
