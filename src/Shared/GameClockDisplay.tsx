import Game, { Clock } from "../Entity/Game";

// need to feed game.clock.ENDING_PEROID to this
const hockeyEndingPeriodHARDCODED: number = 3;

export function getFinalText(endingPeriod: number) {
  let displayText = "Final ";

  if (endingPeriod >= hockeyEndingPeriodHARDCODED + 2) {
    displayText += endingPeriod - hockeyEndingPeriodHARDCODED;
  }

  if (endingPeriod >= hockeyEndingPeriodHARDCODED + 1) {
    displayText += "OT";
  }

  return displayText;
}

function TimeDisplay(props: Clock) {
  return props.minutes + ":" + ("0" + props.seconds).slice(-2);
}

function PeriodDisplay(period: number) {
  if (period >= hockeyEndingPeriodHARDCODED + 1) {
    const otNumber = period - hockeyEndingPeriodHARDCODED;
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
    return <span>{getFinalText(game.endingPeriod)}</span>;
  }

  return <ClockDisplay clock={game.clock} />;
}

export type ClockDisplayProps = {
  clock: Clock;
};

export function ClockDisplay(props: ClockDisplayProps) {
  const { clock } = props;
  return clock.intermission ? (
    <>
      {PeriodDisplay(clock.period)} starts in {TimeDisplay(clock)}
    </>
  ) : (
    <>
      {TimeDisplay(clock)} {PeriodDisplay(clock.period)}
    </>
  );
}
