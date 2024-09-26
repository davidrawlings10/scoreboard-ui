import { useState, useEffect, useContext } from "react";
import { Box, TextField, Button } from "@mui/material";

import config from "../../config";
import "../Shared/Table.css";
import TeamDisplay from "../shared/TeamDisplay/TeamDisplay";
import Standing from "../../types/Standing";
import sortableTable from "../shared/SortableTable";
import { AppContext } from "../App";
import Season from "../../types/Season";
import { sfetch } from "../../sfetch";

interface SeasonStandingListProps {
  seasonId: number;
  numGames: { current: number; finished: number } | null;
}

export default function SeasonStandingList(props: SeasonStandingListProps) {
  const { standings, loadStandings } = useContext(AppContext);
  // const [standings, setStandings] = useState<Array<Standing>>([]);
  const [editRankingTeamId, setEditRankingTeamId] = useState<
    number | undefined
  >(undefined);
  const [rankingValue, setRankingValue] = useState<number | undefined>(
    undefined
  );
  const [sportIsHockey, setSportIsHockey] = useState<boolean>();
  const { Th, sortTable } = sortableTable();

  function handleRankingUpdate(standing: Standing) {
    sfetch(
      `/standing/updateRanking?standingId=${standing.id}&ranking=${rankingValue}`
    ).then((res) => console.log(res));
    setEditRankingTeamId(undefined);
  }

  useEffect(() => {
    loadStandings(props.seasonId);
    // fetch(config.baseUrl + "/standing/get?seasonId=" + props.seasonId)
    //   .then((res) => res.json())
    //   .then((standingsResult) => {
    //     const standingsList: Standing[] = standingsResult.list;
    //     standingsList.forEach((standing: Standing) => {
    //       standing.goalDiff = standing.gf - standing.ga;
    //       standing.pointPercentage = calculatedPointPercentage(
    //         standing.point,
    //         standing.gp
    //       );
    //     });

    //     setStandings(standingsResult.list);
    //   });
    setEditRankingTeamId(undefined);
  }, [props.seasonId, props.numGames?.current, props.numGames?.finished]);

  useEffect(() => {
    fetch(`${config.baseUrl}/season/findById?seasonId=${props.seasonId}`)
      .then((res) => res.json())
      .then((json: Season) => {
        setSportIsHockey(json.sport === "HOCKEY");
      });
  }, [props.seasonId]);

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
      flexWrap="wrap"
      flexDirection="column"
      overflow="auto"
    >
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Team</th>
            {sportIsHockey && (
              <Th attribute="point" title="Points">
                PTS
              </Th>
            )}
            <Th attribute="gp" title="Games Played">
              GP
            </Th>
            <Th attribute="win" title="Win">
              W
            </Th>
            <Th attribute="loss" title="Loss">
              L
            </Th>
            {sportIsHockey && (
              <Th attribute="otloss" title="Overtime Loss">
                OTL
              </Th>
            )}
            <Th
              attribute="gf"
              title={sportIsHockey ? "Goals For" : "Points For"}
            >
              {sportIsHockey ? "GF" : "PF"}
            </Th>
            <Th
              attribute="ga"
              title={sportIsHockey ? "Goals Against" : "Points Against"}
            >
              {sportIsHockey ? "GA" : "PA"}
            </Th>
            <Th
              attribute="goalDiff"
              title={sportIsHockey ? "Goal Diff" : "Point Diff"}
            >
              {sportIsHockey ? "GD" : "PD"}
            </Th>
            {sportIsHockey && (
              <Th attribute="homePoint" title="Home Points">
                HPTS
              </Th>
            )}
            <Th attribute="homeGp" title="Home Games Played">
              HGP
            </Th>
            <th title="Home Record">Home</th>
            {sportIsHockey && (
              <Th attribute="awayPoint" title="Away Points">
                APTS
              </Th>
            )}
            <Th attribute="awayGp" title="Away Games Played">
              AGP
            </Th>
            <th title="Away Points">Away</th>
            <Th
              attribute="pointPercentage"
              title={sportIsHockey ? "Point Percentage" : "Win Percentage"}
            >
              {sportIsHockey ? "P%" : "W%"}
            </Th>
            <th title="Official Rank">R</th>
          </tr>
        </thead>
        <tbody>
          {sortTable(standings).map((standing: Standing, index: number) => (
            <tr key={standing.id}>
              <td>{index + 1}</td>
              <td>
                <TeamDisplay id={standing.teamId} />
              </td>
              {sportIsHockey && <td>{standing.point}</td>}
              <td>{standing.gp}</td>
              <td>{standing.win}</td>
              <td>{standing.loss}</td>
              {sportIsHockey && <td>{standing.otloss}</td>}
              <td>{standing.gf}</td>
              <td>{standing.ga}</td>
              <td>{standing.goalDiff}</td>
              {sportIsHockey && <td>{standing.homePoint}</td>}
              <td>{standing.homeGp}</td>
              <td>
                {standing.homeWin}-{standing.homeLoss}
                {sportIsHockey && `-${standing.homeOtloss}`}
              </td>
              {sportIsHockey && <td>{standing.awayPoint}</td>}
              <td>{standing.awayGp}</td>
              <td>
                {standing.awayWin}-{standing.awayLoss}
                {sportIsHockey && `-${standing.awayOtloss}`}
              </td>
              <td>{standing.pointPercentage}%</td>
              <td
                onClick={() => {
                  setEditRankingTeamId(standing.teamId);
                  setRankingValue(standing.ranking);
                }}
                style={{ cursor: "pointer" }}
                title="click to modify offical ranking"
              >
                {editRankingTeamId === standing.teamId ? (
                  <Box display="flex" flexDirection="row" gap={1}>
                    <TextField
                      size="small"
                      sx={{ width: 50 }}
                      value={rankingValue}
                      onChange={(event) =>
                        setRankingValue(parseInt(event?.target.value))
                      }
                    />
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleRankingUpdate(standing)}
                      disabled={standing.ranking === rankingValue}
                    >
                      Save
                    </Button>
                  </Box>
                ) : (
                  standing.ranking
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Box>
        Tiebreaker decided by Points, Wins, Goal Diff, Goals For, Head to head
        outcome, Two game playoff
      </Box>
    </Box>
  );
}
