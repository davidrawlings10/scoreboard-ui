import { useState } from "react";

import { Box, InputLabel, Select, MenuItem } from "@mui/material";

import TeamDisplay from "./TeamDisplay/TeamDisplay";
import Team from "../../types/Team";

interface TeamSelectProps {
  value: string;
  list: Array<Team>;
  onChange: (value: any) => void;
  displayEmpty?: boolean;
}

export default function TeamSelect(props: TeamSelectProps) {
  const [teamId, setTeamId] = useState<string>(props.value);

  function teamIdChange(event: React.ChangeEvent<any>) {
    setTeamId(event.target.value);
    props.onChange(event.target.value);
  }

  return (
    <Box>
      <InputLabel id="labelHome">Team</InputLabel>
      <Select
        value={teamId}
        onChange={teamIdChange}
        variant="outlined"
        fullWidth
      >
        {props.displayEmpty && (
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
        )}
        {props.list.map((team) => (
          <MenuItem key={team.id} value={team.id}>
            <TeamDisplay id={team.id} />
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
