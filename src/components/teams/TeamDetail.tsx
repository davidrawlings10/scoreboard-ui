import { useParams } from "react-router-dom";

import TeamDisplay from "../shared/TeamDisplay/TeamDisplay";
import { Box, Typography, Tooltip } from "@mui/material";
import TeamSeasonList from "./TeamSeasonList";
import TeamLogo from "../shared/TeamDisplay/TeamLogo";
import type { RootState } from "../../other/redux/store";
import { useSelector } from "react-redux";

export default function TeamDetail() {
  const { id } = useParams();
  const teamId: number = parseInt(id);

  const count = useSelector((state: RootState) => state.counter.value);

  return (
    <Box margin={2}>
      <Box marginTop={1}>
        <Box
          marginLeft={3}
          display="flex"
          flexDirection="column"
          margin={3}
          alignItems="center"
        >
          <Box width={200}>
            <TeamLogo id={teamId} />
          </Box>
          <Box>
            <h2>
              <TeamDisplay id={teamId} hideLogo={true} />
            </h2>
          </Box>
        </Box>
      </Box>
      <TeamSeasonList teamId={teamId} />
      <Tooltip title="redux example">
        <Typography
          color="text.hint"
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          {count}
        </Typography>
      </Tooltip>
    </Box>
  );
}
