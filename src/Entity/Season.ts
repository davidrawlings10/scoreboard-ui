export default interface Season {
  id: number;
  created: any;
  updated: any;
  title: string;
  summary: string;
  winnerTeamId: number;
  league: string;
  numTeams: number;
  scheduleType: string;
}
