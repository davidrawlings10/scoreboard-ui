import { Box } from "@mui/material";

import config from "../config";
import Season from "../Entity/Season";
import TeamDisplay from "../Shared/TeamDisplay/TeamDisplay";
import LeagueDisplay from "../Shared/LeagueDisplay/LeagueDisplay";
import SportDisplay from "../Shared/SportDisplay/SportDisplay";
import { useState, useEffect } from "react";

export type SeasonHeaderProps = {
  seasonId: number;
};

export default function SeasonHeader(props: SeasonHeaderProps) {
  const { seasonId } = props;

  const [season, setSeason] = useState<Season>();

  useEffect(() => {
    fetch(config.baseUrl + "/season/findById?seasonId=" + seasonId)
      .then((res) => res.json())
      .then((json) => {
        setSeason(json);
      });
  }, [seasonId]);

  if (!season) {
    return <Box></Box>;
  }

  return (
    <Box>
      <Box marginTop={1} border="1px solid #474f97" bgcolor="primary.main">
        <Box display="flex" paddingLeft={4}>
          <Box marginRight={6}>
            <h1>{season.title}</h1>
          </Box>
          <Box display="flex" flexDirection="row">
            <Box
              marginRight={6}
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Box>Number of Teams</Box>
              <Box>{season.numTeams}</Box>
            </Box>
            <Box
              marginRight={6}
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Box>Schedule</Box>
              {season.scheduleType}
            </Box>
            <Box
              marginRight={6}
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Box>League</Box>
              <Box>
                <LeagueDisplay value={season.league} />
              </Box>
            </Box>
            <Box
              marginRight={6}
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Box>Sport</Box>
              <Box>
                <SportDisplay value={season.sport} />
              </Box>
            </Box>
            <Box
              marginRight={6}
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Box>Scheduled</Box>
              <Box>
                {new Date(season.created).toLocaleString("en-US", {
                  timeZone: config.timeZone,
                })}
              </Box>
            </Box>
            <Box
              marginRight={6}
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Box>Winner</Box>
              <Box>
                <TeamDisplay id={season.winnerTeamId} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      {!!season.summary && (
        <Box
          paddingLeft={4}
          paddingRight={4}
          paddingTop={1}
          paddingBottom={1}
          bgcolor="primary.dark"
          border="1px solid #474f97"
        >
          {season.summary}
        </Box>
      )}
    </Box>
  );
}
