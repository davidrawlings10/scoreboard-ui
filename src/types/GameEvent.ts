export default interface Game {
  id: number;
  gameId: number;
  teamId: number;
  homeScore: number;
  awayScore: number;
  period: number;
  minutes: number;
  seconds: number;
  eventType: "SCORE";
}
