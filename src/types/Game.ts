export default interface Game {
  id: number;
  created: any;
  updated: any;
  seasonId: number;
  homeTeamId: number;
  awayTeamId: number;
  homeScore: number;
  awayScore: number;
  endingPeriod: number;
  sport: Sport;
  sportInfo: SportInfo;
  status: "SCHEDULED" | "PLAYING" | "FINAL";
  clock: Clock;
  teamAlreadyPlaying: "NONE" | "HOME" | "AWAY" | "BOTH";
  homeHasPossession: boolean;
}

export interface Clock {
  minutes: number;
  seconds: number;
  period: number;
  intermission: boolean;
  final: boolean;
}

export type SportInfo = {
  ending_PERIOD: number;
};

export type Sport = "HOCKEY" | "SOCCER";
