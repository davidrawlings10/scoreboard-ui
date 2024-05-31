import { Box, InputLabel, Select, MenuItem } from "@mui/material";

import TeamDisplay from "./TeamDisplay/TeamDisplay";

interface TeamSelectProps {
  value: string;
  teamIds: string[];
  onChange: (value: string) => void;
  label?: string;
  displayEmpty?: boolean;
  small?: boolean;
}

export default function TeamSelect(props: TeamSelectProps) {
  function teamIdChange(event: React.ChangeEvent<any>) {
    props.onChange(event.target.value);
  }

  return (
    <Box>
      <InputLabel id="labelHome">
        {props.label ? props.label : "Team"}
      </InputLabel>
      <Select
        value={props.value}
        onChange={teamIdChange}
        variant="outlined"
        fullWidth
        small={props.small}
      >
        {props.displayEmpty && <MenuItem value="All">All</MenuItem>}
        {props.teamIds.map((id) => (
          <MenuItem key={id} value={id}>
            <TeamDisplay id={parseInt(id)} />
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
