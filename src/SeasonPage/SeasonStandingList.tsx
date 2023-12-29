import { useState, useEffect } from "react";
import { Box } from "@mui/material";

import config from "../config";
import "../Shared/Table.css";
import TeamDisplay from "../Shared/TeamDisplay/TeamDisplay";
import Standing from "../Entity/Standing";
import sortableTable from "../Shared/SortableTable";
import { calculatedPointPercentage } from "../Shared/StandingsHelper";

interface SeasonStandingListProps {
  seasonId: number;
  numGames: { current: number; finished: number } | null;
}

export default function SeasonStandingList(props: SeasonStandingListProps) {
  const [standings, setStandings] = useState<Array<Standing>>([]);
  let { Th, sortTable } = sortableTable();

  useEffect(() => {
    fetch(config.baseUrl + "/standing/get?seasonId=" + props.seasonId)
      .then((res) => res.json())
      .then((standingsResult) => {
        let standingsList: Standing[] = standingsResult.list;
        standingsList.forEach((standing: Standing) => {
          standing.goalDiff = standing.gf - standing.ga;
          standing.pointPercentage = calculatedPointPercentage(
            standing.point,
            standing.gp
          );
        });

        setStandings(standingsResult.list);
      });
  }, [props.seasonId, props.numGames?.current, props.numGames?.finished]);

  /*function calculatedPointPercentage(point: number, gp: number) { `1
    if (point === 0 || gp === 0) {
      return 0;
    }

    return ((point / (gp * 2)) * 100).toPrecision(3);
  }*/

  return (
    <Box
      marginTop={5}
      marginBottom={5}
      display="flex"
      alignContent="center"
      flexWrap="wrap"
      flexDirection="column"
      overflow="auto"
    >
      <Box>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Team</th>
              <Th attribute="point" title="Points">
                PTS
              </Th>
              <Th attribute="gp" title="Games Played">
                GP
              </Th>
              <Th attribute="win" title="Win">
                W
              </Th>
              <Th attribute="loss" title="Loss">
                L
              </Th>
              <Th attribute="otloss" title="Overtime Loss">
                OTL
              </Th>
              <Th attribute="gf" title="Goals For">
                GF
              </Th>
              <Th attribute="ga" title="Goals Against">
                GA
              </Th>
              <Th attribute="goalDiff" title="Goal Diff">
                GD
              </Th>
              <Th attribute="homePoint" title="Home Points">
                HPTS
              </Th>
              <Th attribute="homeGp" title="Home Games Played">
                HGP
              </Th>
              <th title="Home Record">Home</th>
              <Th attribute="awayPoint" title="Away Points">
                APTS
              </Th>
              <Th attribute="awayGp" title="Away Games Played">
                AGP
              </Th>
              <th title="Away Points">Away</th>
              <Th attribute="pointPercentage" title="Point Percentage">
                PP
              </Th>
              <th>r</th>
            </tr>
          </thead>
          <tbody>
            {sortTable(standings).map((standing: Standing, index: number) => (
              <tr key={standing.id}>
                <td>{index + 1}</td>
                <td>
                  <TeamDisplay id={standing.teamId} />
                </td>
                <td>{standing.point}</td>
                <td>{standing.gp}</td>
                <td>{standing.win}</td>
                <td>{standing.loss}</td>
                <td>{standing.otloss}</td>
                <td>{standing.gf}</td>
                <td>{standing.ga}</td>
                <td>{standing.goalDiff}</td>
                <td>{standing.homePoint}</td>
                <td>{standing.homeGp}</td>
                <td>
                  {standing.homeWin}-{standing.homeLoss}-{standing.homeOtloss}
                </td>
                <td>{standing.awayPoint}</td>
                <td>{standing.awayGp}</td>
                <td>
                  {standing.awayWin}-{standing.awayLoss}-{standing.awayOtloss}
                </td>
                <td>{standing.pointPercentage}%</td>
                <td>{standing.ranking}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Box>
          Tiebreaker decided by Points, Wins, Goal Diff, Goals For, Head to head
          outcome, Two game playoff
        </Box>
      </Box>
    </Box>
  );
}
