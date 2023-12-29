// keeping this as an example of js

let teams = {};

export function searchCacheForTeam(id) {
  return teams[id];
}

export function cacheTeam(id, team) {
  teams[id] = team;
}
