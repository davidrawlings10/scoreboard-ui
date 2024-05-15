import { Box, InputLabel, Select, MenuItem } from "@mui/material";

import TeamDisplay from "./TeamDisplay/TeamDisplay";

interface TeamSelectProps {
  value: string;
  teamIds: string[];
  onChange: (value: any) => void;
  label?: string;
  displayEmpty?: boolean;
}

export default function TeamSelect(props: TeamSelectProps) {
  // const [teamId, setTeamId] = useState<string>(
  //   props.displayEmpty ? "All" : props.value
  // );

  // console.log("log: props.value yo --->", props.value);
  // console.log("log: teamId yo --->", teamId);

  // useEffect(() => {
  //   setTeamId(props.value);
  // }, [props.value]);

  function teamIdChange(event: React.ChangeEvent<any>) {
    // setTeamId(event.target.value);
    props.onChange(event.target.value);
    // console.log("log: here yo indeed");
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
