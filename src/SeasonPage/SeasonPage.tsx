import { useState } from "react";
import { Box, Button } from "@mui/material";
import { AddToQueue } from "@mui/icons-material";

import SeasonList from "./SeasonList";
import SeasonDisplay from "./SeasonDisplay";
import SeasonHeader from "./SeasonHeader";
import SeasonUpdateDialog from "./SeasonUpdateDialog";
import SeasonButtons from "./SeasonButtons";

export default function SeasonPage() {
  const [seasonId, setSeasonId] = useState(1);
  const [seasonUpdateDialogOpen, setSeasonUpdateDialogOpen] = useState(false);

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
      </Box>
      <SeasonUpdateDialog
        open={seasonUpdateDialogOpen}
        onClose={handleCloseDialog}
        seasonId={seasonId}
      />
    </>
  );
}
