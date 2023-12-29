import { useState, useEffect } from "react";
import { Box } from "@mui/material";

import config from "../config";
import "../Shared/Table.css";
import Standing from "../Entity/Standing";
import { calculatedPointPercentage } from "../Shared/StandingsHelper";

interface SeasonStandingListProps {
  teamId: number;
}

export default function SeasonStandingList(props: SeasonStandingListProps) {
  const [standings, setStandings] = useState<Array<Standing>>([]);

  useEffect(() => {
    fetch(
      config.baseUrl + "/standing/getStandingByTeamId?teamId=" + props.teamId
    )
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
  }, [props.teamId]);

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
      justifyContent="center"
      flexDirection="column"
    >
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th title="Points">PTS</th>
            <th title="Games Played">GP</th>
            <th title="Win">W</th>
            <th title="Loss">L</th>
            <th title="Overtime Loss">OTL</th>
            <th title="Goals For">GF</th>
            <th title="Goals Against">GA</th>
            <th title="Goal Diff">GD</th>
            <th title="Home Points">HPTS</th>
            <th title="Home Games Played">HGP</th>
            <th title="Home Record">Home</th>
            <th title="Away Points">APTS</th>
            <th title="Away Games Played">AGP</th>
            <th title="Away Points">Away</th>
            <th title="Point Percentage">PP</th>
            <th>r</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((standing: Standing, index: number) => (
            <tr key={standing.id}>
              <th>{standing.seasonId}</th>
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
    </Box>
  );
}
