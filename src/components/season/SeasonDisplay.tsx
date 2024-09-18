import React, { memo } from "react";
import { Snackbar, Box } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import SeasonStandingList from "./SeasonStandingList";
import SeasonGameList from "./SeasonGameList";
import NextSeasonGame from "./NextSeasonGame";

export type SeasonDisplayProps = {
  seasonId?: number;
  numGames: { current: number; finished: number } | null; // this is so that when a game is finished, this component (which is wrapped in memo) will refresh
};

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SeasonDisplay(props: SeasonDisplayProps) {
  const [gameStartedAlertOpen, setGameStartedAlertOpen] = React.useState(false);

  const handleGameStartedAlertClose = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setGameStartedAlertOpen(false);
  };

  if (!props.seasonId) {
    return <div></div>;
  }

  console.log("log: props.seasonId", props.seasonId);

  return (
    <Box overflow="auto">
      <Snackbar
        open={gameStartedAlertOpen}
        autoHideDuration={1000}
        onClose={handleGameStartedAlertClose}
      >
        <Alert onClose={handleGameStartedAlertClose} severity="success">
          Game started
        </Alert>
      </Snackbar>
      <NextSeasonGame seasonId={props.seasonId} numGames={props.numGames} />
      <SeasonStandingList seasonId={props.seasonId} numGames={props.numGames} />
      <SeasonGameList seasonId={props.seasonId} numGames={props.numGames} />
    </Box>
  );
}

export default SeasonDisplay;
