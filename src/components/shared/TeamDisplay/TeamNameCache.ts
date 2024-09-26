import Team from "../../../types/Team";

let teams: Team[] = [];

export function searchCacheForTeam(id: number) {
  return teams[id];
}

export function cacheTeam(id: number, team: Team) {
  teams[id] = team;
}
