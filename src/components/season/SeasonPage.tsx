import { useState, useCallback, useContext } from "react";
import { Box, Button, Typography, Tooltip } from "@mui/material";

import { AppContext } from "../App";
import SeasonList from "./SeasonList";
import SeasonDisplay from "./SeasonDisplay";
import SeasonHeader from "./SeasonHeader";
import SeasonUpdateDialog from "./SeasonUpdateDialog";
import SeasonButtons from "./SeasonButtons";

import type { RootState } from "../../other/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../../other/redux/counterSlice";

export default function SeasonPage() {
  document.title = "Scoreboard - Seasons";
  const [seasonId, setSeasonId] = useState<number | null>(null);
  const [seasonUpdateDialogOpen, setSeasonUpdateDialogOpen] =
    useState<boolean>(false);

  const { seasons, loadSeasons } = useContext(AppContext);

  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  function handleOpenDialog() {
    setSeasonUpdateDialogOpen(true);
  }

  const handleCloseDialog = () => {
    setSeasonUpdateDialogOpen(false);
  };

  const viewSeason = useCallback(
    (seasonId: number) => setSeasonId(seasonId),
    []
  );

  return (
    <>
      <Box padding={3} height="100%">
        <SeasonList
          seasons={seasons}
          loadSeasons={loadSeasons}
          viewSeason={viewSeason}
        />
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
