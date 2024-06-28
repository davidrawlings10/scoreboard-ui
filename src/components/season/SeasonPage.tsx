import { useState } from "react";
import { Box, Button, Typography, Tooltip } from "@mui/material";
import { AddToQueue } from "@mui/icons-material";

import SeasonList from "./SeasonList";
import SeasonDisplay from "./SeasonDisplay";
import SeasonHeader from "./SeasonHeader";
import SeasonUpdateDialog from "./SeasonUpdateDialog";
import SeasonButtons from "./SeasonButtons";

import type { RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../../counterSlice";

export default function SeasonPage() {
  const [seasonId, setSeasonId] = useState(1);
  const [seasonUpdateDialogOpen, setSeasonUpdateDialogOpen] = useState(false);

  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  function handleOpenDialog() {
    setSeasonUpdateDialogOpen(true);
  }

  const handleCloseDialog = () => {
    setSeasonUpdateDialogOpen(false);
  };

  function viewSeason(seasonId: number) {
    setSeasonId(seasonId);
  }

  return (
    <>
      <Box padding={3} height="100%">
        <SeasonList viewSeason={viewSeason} />
        <Box marginBottom={5}></Box>
        <Box marginBottom={4}>
          <SeasonHeader seasonId={seasonId} />
          <SeasonButtons
            seasonId={seasonId}
            handleOpenDialog={handleOpenDialog}
          />
        </Box>
        <SeasonDisplay seasonId={seasonId} numGames={null} />
        <Tooltip title="redux example">
          <Box display="flex" justifyContent="flex-end">
            <Typography color="text.hint">{count}</Typography>
            <Button onClick={() => dispatch(increment())}>Inc</Button>
            <Button onClick={() => dispatch(decrement())}>Dec</Button>
          </Box>
        </Tooltip>
      </Box>
      <SeasonUpdateDialog
        open={seasonUpdateDialogOpen}
        onClose={handleCloseDialog}
        seasonId={seasonId}
      />
    </>
  );
}
