import { Box } from "@mui/material";

import LeagueLogo from "./LeagueLogo";

export interface LeagueDisplayProps {
  value: string;
}

export default function LeagueDisplay({ value }: LeagueDisplayProps) {
  return (
    <Box display="flex" flexDirection="row">
      <Box
        width={28}
        marginRight={1}
        marginLeft={1}
        display="flex"
        alignContent="center"
        justifyContent="center"
      >
        <LeagueLogo value={value} />
      </Box>
      <Box marginLeft={1}>{value}</Box>
    </Box>
  );
}
