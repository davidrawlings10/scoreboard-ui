import { Box } from "@mui/material";
import TeamDisplay from "../Shared/TeamDisplay/TeamDisplay";

interface ScoreboardRowProps {
  teamId: number;
  score: number;
  small?: boolean;
}

export default function ScoreboardRow({
  teamId,
  score,
  small,
}: ScoreboardRowProps) {
  return (
    <Box display="flex" flexDirection="row">
      <Box border="1px solid black" p={1} width="80%">
        <TeamDisplay id={teamId} hideLocation={small} />
      </Box>
      <Box
        border="1px solid black"
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={1}
        width="20%"
      >
        {score}
      </Box>
    </Box>
  );
}
