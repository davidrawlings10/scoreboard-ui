export default interface Standing {
  id: number;
  seasonId: number;
  teamId: number;
  win: number;
  loss: number;
  tie: number;
  otloss: number;
  point: number;
  gf: number;
  ga: number;
  gp: number;
  homeWin: number;
  homeLoss: number;
  homeTie: number;
  homeOtloss: number;
  homePoint: number;
  homeGp: number;
  awayWin: number;
  awayLoss: number;
  awayTie: number;
  awayOtloss: number;
  awayPoint: number;
  awayGp: number;
  ranking: number;

  // non-database attributes that are calculated for display
  goalDiff: number;
  pointPercentage: any;
}
