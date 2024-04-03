import { Sport } from "./Game";

export default interface Season {
  id: number;
  created: any;
  updated: any;
  title: string;
  summary: string;
  winnerTeamId: number;
  league: string;
  sport: Sport;
  numTeams: number;
  scheduleType: string;
}
