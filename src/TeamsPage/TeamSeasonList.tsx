import { useState, useEffect } from "react";
import { Box } from "@mui/material";

import "../Shared/Table.css";
import Standing from "../Entity/Standing";
import Season from "../Entity/Season";
import { calculatedPointPercentage } from "../Shared/StandingsHelper";
import TeamDisplay from "../Shared/TeamDisplay/TeamDisplay";
import { sfetchList } from "../sfetch";

interface SeasonStandingListProps {
  teamId: number;
}

export default function SeasonStandingList(props: SeasonStandingListProps) {
  const [standings, setStandings] = useState<Array<Standing>>([]);

  useEffect(() => {
    Promise.all([
      sfetchList(`/standing/getStandingByTeamId?teamId=${props.teamId}`),
      sfetchList("/season/getSeasons?league=AVES&sport=HOCKEY"),
    ]).then((result) => {
      const standingsList: Standing[] = result[0];
      const seasonList: Season[] = result[1];
      standingsList.forEach((standing: Standing) => {
        standing.goalDiff = standing.gf - standing.ga;
        standing.pointPercentage = calculatedPointPercentage(
          standing.point,
          standing.gp
        );
        const season: Season | undefined = seasonList.find(
          (season) => season.id === standing.seasonId
        );
        standing.seasonTitle = season ? season.title : "season not found";
        standing.seasonNumTeams = season ? season.numTeams : -1;
        standing.winnerTeamId = season ? season.winnerTeamId : -1;
      });
      setStandings(standingsList);
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
            <th title="Season Title">Season</th>
            <th title="Rank in season">R</th>
            <th title="Number of teams in the season">#T</th>
            <th title="Season Winner">Winner</th>
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
          </tr>
        </thead>
        <tbody>
          {standings.map((standing: Standing) => (
            <tr
              key={standing.id}
              style={{
                background:
                  standing.winnerTeamId === props.teamId ? "darkorange" : "",
              }}
            >
              <td>{standing.seasonTitle}</td>
              <td>{standing.ranking}</td>
              <td>{standing.seasonNumTeams}</td>
              <td>
                <TeamDisplay id={standing.winnerTeamId} />
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
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
}
