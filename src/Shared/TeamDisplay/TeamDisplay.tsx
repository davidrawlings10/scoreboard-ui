import { Box } from "@mui/material";

import TeamLogo from "./TeamLogo";
import TeamName from "./TeamName";

export interface TeamDisplayProps {
  id: number;
  hideName?: boolean;
  hideLogo?: boolean;
  hideLocation?: boolean;
  flipDisplay?: boolean;
}

export default function TeamDisplay(props: TeamDisplayProps) {
  return (
    <Box display="flex" flexDirection="row">
      {!props.hideName && props.flipDisplay && (
        <Box marginRight={1}>
          <TeamName id={props.id} hideLocation={props.hideLocation} />
        </Box>
      )}
      {!props.hideLogo && (
        <Box
          width={28}
          marginRight={1}
          marginLeft={1}
          display="flex"
          alignContent="center"
          justifyContent="center"
        >
          <TeamLogo id={props.id} />
        </Box>
      )}
      {!props.hideName && !props.flipDisplay && (
        <Box marginLeft={1}>
          <TeamName id={props.id} hideLocation={props.hideLocation} />
        </Box>
      )}
    </Box>
  );
}
