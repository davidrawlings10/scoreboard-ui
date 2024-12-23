import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Box, Chip } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import theme from "../../theme";
import { sfetchList } from "../../sfetch";
import TeamDisplay from "../shared/TeamDisplay/TeamDisplay";
import sortableTable from "../shared/SortableTable";
import SimpleSelect from "../shared/SimpleSelect";

const useStyles = makeStyles({
  linkText: {
    color: theme.palette.text.primary,
    textDecoration: "none",
  },
});

interface TeamSeasonTotal {
  teamId: number;
  division: string;
  seasonsWon: number;
  seasonsPlayed: number;
  seasonsWonPercent: number;
  winPoints: number;
  winPointsPercent: number;
  performancePoints: number;
  performancePointsPercent: number;
  pointsPossible: number;
  trophies: Array<number>;
}

export default function TeamsPage() {
  document.title = "Scoreboard - Teams";
  const [searchParams, setSearchParams] = useSearchParams({ league: "" });
  const league: string | null = searchParams.get("league");
  const [sport, setSport] = useState<string | undefined>("");
  const [teamSeasonTotals, setTeamSeasonTotals] = useState<
    Array<TeamSeasonTotal>
  >([]);
  const { Th, sortTable } = sortableTable();

  const classes = useStyles();

  // load team season totals
  useEffect(() => {
    if (league) {
      sfetchList("/team/getTeamSeasonTotals?league=" + league).then((list) => {
        const teamSeasonTotals = list;

        teamSeasonTotals.forEach((teamSeasonTotal: TeamSeasonTotal) => {
          teamSeasonTotal.seasonsWonPercent =
            (teamSeasonTotal.seasonsWon / teamSeasonTotal.seasonsPlayed) * 100;
        });
        teamSeasonTotals.forEach((teamSeasonTotal: TeamSeasonTotal) => {
          teamSeasonTotal.winPointsPercent =
            (teamSeasonTotal.winPoints / teamSeasonTotal.pointsPossible) * 100;
        });
        teamSeasonTotals.forEach((teamSeasonTotal: TeamSeasonTotal) => {
          teamSeasonTotal.performancePointsPercent =
            (teamSeasonTotal.performancePoints /
              teamSeasonTotal.pointsPossible) *
            100;
        });
        setTeamSeasonTotals(list);
      });
    }
  }, [league]);

  function leagueChange(league: string) {
    setSearchParams((prev) => ({ ...prev, league }));
  }

  function sportChange(sport: string) {
    setSport(sport);
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      margin={2}
    >
      <Box width={600} display="flex" flexDirection="row" gap={4}>
        <Box marginBottom={2} width="100%">
          <SimpleSelect
            entity="league"
            value={league}
            onChange={leagueChange}
          />
        </Box>
        <Box marginBottom={2} width="100%">
          <SimpleSelect
            entity="sport"
            value={sport}
            onChange={sportChange}
            displayEmpty
          />
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" flexDirection="column">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Team</th>
              <th>Division</th>
              <Th attribute="seasonsWon">Seasons Won</Th>
              <th>Trophies</th>
              <Th attribute="seasonsPlayed">Seasons Played</Th>
              <Th attribute="seasonsWonPercent">Seasons Won %</Th>
              <Th attribute="winPoints">Win Points</Th>
              <Th attribute="winPointsPercent">Win Points %</Th>
              <Th attribute="performancePoints">Perf Points</Th>
              <Th attribute="performancePointsPercent">Perf Points %</Th>
              <Th attribute="pointsPossible">Possible Points</Th>
            </tr>
          </thead>
          <tbody>
            {sortTable(teamSeasonTotals).map(
              (teamSeasonTotal: TeamSeasonTotal, index: number) => (
                <tr key={teamSeasonTotal.teamId}>
                  <td>{index + 1}</td>
                  <td>
                    <Link
                      to={`/teams/${teamSeasonTotal.teamId}`}
                      className={classes.linkText}
                    >
                      <TeamDisplay id={teamSeasonTotal.teamId} />
                    </Link>
                  </td>
                  <td>{teamSeasonTotal.division}</td>
                  <td>{teamSeasonTotal.seasonsWon}</td>
                  <td>
                    {teamSeasonTotal.trophies.map((trophy: number) => (
                      <Chip label={trophy} variant="outlined" />
                    ))}
                  </td>
                  <td>{teamSeasonTotal.seasonsPlayed}</td>
                  <td>{`${teamSeasonTotal.seasonsWonPercent.toPrecision(
                    3
                  )}%`}</td>
                  <td>{teamSeasonTotal.winPoints}</td>
                  <td>{`${teamSeasonTotal.winPointsPercent.toPrecision(
                    3
                  )}%`}</td>
                  <td>{teamSeasonTotal.performancePoints}</td>
                  <td>{`${teamSeasonTotal.performancePointsPercent.toPrecision(
                    3
                  )}%`}</td>
                  <td>{teamSeasonTotal.pointsPossible}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </Box>
    </Box>
  );
}
