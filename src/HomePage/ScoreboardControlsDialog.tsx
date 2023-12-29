import React, { useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import config from "../config";

interface ScoreboardControlsDialogProps {
  open: boolean;
  onClose: () => void;
  millisecondsPerTick: number;
  gamesToPlay: number;
  gamesPlayingConcurrently: number;
}

export default function ScoreboardControlsDialog(
  props: ScoreboardControlsDialogProps
) {
  const [millisecondsPerTick, setMillisecondsPerTick] = React.useState<number>(
    props.millisecondsPerTick
  );
  const [gamesToPlay, setGamesToPlay] = React.useState<number>(
    props.gamesToPlay
  );
  const [gamesPlayingConcurrently, setGamesPlayingConcurrently] =
    React.useState<number>(props.gamesPlayingConcurrently);

  useEffect(() => {
    setMillisecondsPerTick(props.millisecondsPerTick);
  }, [props.millisecondsPerTick]);

  useEffect(() => {
    setGamesPlayingConcurrently(props.gamesPlayingConcurrently);
  }, [props.gamesPlayingConcurrently]);

  const millisecondsPerTickOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMillisecondsPerTick(parseInt(event.target.value));
  };

  const gamesToPlayInputOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setGamesToPlay(parseInt(event.target.value));
  };

  const gamesPlayingConcurrentlyInputOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setGamesPlayingConcurrently(parseInt(event.target.value));
  };

  const handleCancel = () => {
    props.onClose();
  };

  const handleSubmit = () => {
    if (millisecondsPerTick !== props.millisecondsPerTick) {
      setMillisecondsPerTick(millisecondsPerTick);
      fetch(
        config.baseUrl +
          "/game/setTickMilliseconds?value=" +
          millisecondsPerTick
      );
    }

    if (gamesToPlay !== props.gamesToPlay) {
      setGamesToPlay(gamesToPlay);
      fetch(config.baseUrl + "/game/setGamesToPlay?numGames=" + gamesToPlay);
    }

    if (gamesPlayingConcurrently !== props.gamesPlayingConcurrently) {
      setGamesToPlay(gamesToPlay);
      fetch(
        config.baseUrl +
          "/game/setGamesPlayingConcurrently?numGames=" +
          gamesPlayingConcurrently
      );
    }

    props.onClose();
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleCancel}
      aria-labelledby="form-dialog-title"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="form-dialog-title">Configure Scoreboard</DialogTitle>
      <DialogContent>
        <Box marginTop={3}>
          <TextField
            autoFocus
            id="tickMilliseconds"
            label="Milliseconds Per Tick"
            type="number"
            variant="outlined"
            value={millisecondsPerTick}
            fullWidth
            onChange={millisecondsPerTickOnChange}
          />
        </Box>
        <Box marginTop={3}>
          <TextField
            autoFocus
            id="gamesToPlay"
            label="Number of Games to Play"
            type="number"
            variant="outlined"
            value={gamesToPlay}
            fullWidth
            onChange={gamesToPlayInputOnChange}
          />
        </Box>
        <Box marginTop={3}>
          <TextField
            autoFocus
            id="gamesPlayingConcurrently"
            label="Games Playing Concurrently"
            type="number"
            variant="outlined"
            value={gamesPlayingConcurrently}
            fullWidth
            onChange={gamesPlayingConcurrentlyInputOnChange}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
