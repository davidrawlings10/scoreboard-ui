import { searchCacheForTeam, cacheTeam } from "./TeamNameCache";

test("cache and then search for team", () => {
  const teamLions = { id: 1, name: "Lions" };
  const teamBears = { id: 2, name: "Bears" };
  const teamTigers = { id: 3, name: "Tigers" };
  cacheTeam(teamLions.id, teamLions);
  cacheTeam(teamBears.id, teamBears);
  expect(searchCacheForTeam(1).name).toBe("Lions");
  cacheTeam(teamTigers.id, teamTigers);
  expect(searchCacheForTeam(3).name).toBe("Tigers");
  expect(searchCacheForTeam(2).name).toBe("Bears");
});
