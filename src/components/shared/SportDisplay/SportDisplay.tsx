import { Box } from "@mui/material";
import SportLogo from "./SportLogo";

export interface SportDisplayProps {
  value: string;
}

export default function SportDisplay({ value }: SportDisplayProps) {
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
        <SportLogo value={value} />
      </Box>
      <Box marginLeft={1}>{value}</Box>
    </Box>
  );
}
