import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { AddToQueue } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

import config from "../../config";
import "../Shared/Table.css";
import Season from "../../types/Season";
import TeamDisplay from "../shared/TeamDisplay/TeamDisplay";
import LeagueDisplay from "../shared/LeagueDisplay/LeagueDisplay";
import SportDisplay from "../shared/SportDisplay/SportDisplay";
import SimpleSelect from "../shared/SimpleSelect";

export type SeasonListProps = { viewSeason: (seasonId: number) => void };

const useStyles = makeStyles((theme) => ({
  root: {
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

export default function SeasonList(props: SeasonListProps) {
  const classes = useStyles();

  const [seasons, setSeasons] = useState<Array<Season>>([]);

  const [sport, setSport] = useState<string | undefined>("");
  const [league, setLeague] = useState<string | undefined>("");

  useEffect(() => {
    fetch(config.baseUrl + "/season/getSeasons?league=AVES&sport=HOCKEY")
      .then((res) => res.json())
      .then((seasonsResult) => {
        setSeasons(seasonsResult.list);
      });
  }, []);

  function viewSeason(seasonId: number) {
    props.viewSeason(seasonId);
  }

  function sportChange(sport: string) {
    setSport(sport);
  }

  function leagueChange(league: string) {
    setLeague(league);
  }

  return (
    <Box display="flex" flexDirection="column" justifyContent="center">
      <Box
        width={1400}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        margin="auto"
      >
        <Box width={300} display="flex" flexDirection="column" margin="auto">
          <Box marginBottom={2} width="100%">
            <SimpleSelect
              entity="sport"
              value={sport}
              onChange={sportChange}
              displayEmpty
            />
          </Box>
          <Box marginBottom={2} width="100%">
            <SimpleSelect
              entity="league"
              value={league}
              onChange={leagueChange}
              displayEmpty
            />
          </Box>
        </Box>
        <Box marginBottom={2}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>League</th>
                <th>Sport</th>
                <th>Winner</th>
                <th>Teams</th>
                <th>Schedule</th>
                <th>Scheduled</th>
              </tr>
            </thead>
            <tbody>
              {seasons.map((season) => (
                <tr
                  key={season.id}
                  onClick={() => viewSeason(season.id)}
                  className={classes.root}
                >
                  <td>{season.title}</td>
                  <td>
                    <LeagueDisplay value={season.league} />
                  </td>
                  <td>
                    <SportDisplay value={season.sport} />
                  </td>
                  <td>
                    <TeamDisplay id={season.winnerTeamId} />
                  </td>
                  <td>{season.numTeams}</td>
                  <td>{season.scheduleType}</td>
                  <td>
                    {new Date(season.created).toLocaleString("en-US", {
                      timeZone: config.timeZone,
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
        <Box>
          <Button
            href={`${config.baseUrl}/season/getFullSQL`}
            color="primary"
            variant="contained"
            startIcon={<AddToQueue />}
          >
            Get Full Insert SQL
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
