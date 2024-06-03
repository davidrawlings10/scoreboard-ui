import React from "react";
import { useParams } from "react-router-dom";

import TeamDisplay from "../shared/TeamDisplay/TeamDisplay";
import { Box } from "@mui/material";
import TeamSeasonList from "./TeamSeasonList";
import TeamLogo from "../shared/TeamDisplay/TeamLogo";
import type { RootState } from "../../store";
import { useSelector } from "react-redux";

export default function TeamDetail() {
  const { id }: { id: string } = useParams();
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
              {count}
            </h2>
          </Box>
        </Box>
      </Box>
      <TeamSeasonList teamId={teamId} />
    </Box>
  );
}
