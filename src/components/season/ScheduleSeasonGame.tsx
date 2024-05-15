import { useState, useEffect } from "react";
import { Box, Button, IconButton } from "@mui/material";
import { SwapHoriz, ArrowUpward, ArrowDownward } from "@mui/icons-material";

import TeamSelect from "../shared/TeamSelect";
import { sfetch, sfetchList } from "../../sfetch";
import Standing from "../../types/Standing";

interface ScheduleSeasonGameProps {
  seasonId: number;
}

export default function ScheduleSeasonGame(props: ScheduleSeasonGameProps) {
  const [homeTeamId, setHomeTeamId] = useState<string>("");
  const [awayTeamId, setAwayTeamId] = useState<string>("");
  const [teamIds, setTeamIds] = useState<string[]>([]);

  useEffect(() => {
    sfetchList(`/standing/get?seasonId=${props.seasonId}`).then(
      (standingsResult) => {
        console.log("standingsResult", standingsResult);
        const teamIds_: string[] = standingsResult.map(
          (standing: Standing) => standing.teamId
        );
        console.log("teamIds_", teamIds_);
        setTeamIds(teamIds_);
      }
    );
  }, [props.seasonId]);

  useEffect(() => {
    console.log(
      "teamIds",
      teamIds,
      "teamIds[0]",
      teamIds[0],
      "teamIds[1]",
      teamIds[1]
    );
    setHomeTeamId(teamIds[0]);
    setAwayTeamId(teamIds[1]);
  }, [teamIds]);

  function scheduleSeasonGame() {
    sfetch(
      `/game/scheduleSeasonGame?seasonId=${props.seasonId}&homeTeamId=${homeTeamId}&awayTeamId=${awayTeamId}`
    );
  }

  const com = (
    <Box display="flex" width="100%">
      <TeamSelect
        value={homeTeamId}
        teamIds={teamIds}
        onChange={(id) => setHomeTeamId(id)}
        label="Home Team"
      />
      <IconButton
        onClick={() => {
          setHomeTeamId(awayTeamId);
          setAwayTeamId(homeTeamId);
        }}
      >
        <SwapHoriz />
      </IconButton>
      <TeamSelect
        value={awayTeamId}
        teamIds={teamIds}
        onChange={(id) => setAwayTeamId(id)}
        label="Away Team"
      />
    </Box>
  );

  return (
    <Box>
      {com}
      <IconButton onClick={() => {}}>
        <ArrowUpward />
      </IconButton>
      <IconButton onClick={() => {}}>
        <ArrowDownward />
      </IconButton>
      <Button variant="contained" color="primary" onClick={scheduleSeasonGame}>
        Schedule
      </Button>
    </Box>
  );
}
