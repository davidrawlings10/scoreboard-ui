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
  sport: "HOCKEY" | "SOCCER";
  status: "SCHEDULED" | "PLAYING" | "FINAL";
  clock: Clock;
  teamAlreadyPlaying: "NONE" | "HOME" | "AWAY" | "BOTH";
}

export interface Clock {
  minutes: number;
  seconds: number;
  period: number;
  intermission: boolean;
  final: boolean;
}
