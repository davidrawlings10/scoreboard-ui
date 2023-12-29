import React, { useState, useEffect } from "react";

import config from "../config";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Box,
} from "@mui/material";
import Standing from "../Entity/Standing";
import TeamDisplay from "../Shared/TeamDisplay/TeamDisplay";

interface SeasonControlsDialogProps {
  open: boolean;
  onClose: () => void;
  seasonId: number;
}

export default function SeasonUpdateDialog(props: SeasonControlsDialogProps) {
  const [summary, setSummary] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [winnerTeamId, setWinnerTeamId] = useState<number>();
  const [teamIds, setTeamIds] = useState<Array<number>>([]);

  useEffect(() => {
    fetch(config.baseUrl + "/season/findById?seasonId=" + props.seasonId)
      .then((res) => res.json())
      .then((season) => {
        setSummary(season.summary);
        setTitle(season.title);
        setWinnerTeamId(season.winnerTeamId);
      });
  }, [props.seasonId]);

  useEffect(() => {
    fetch(`${config.baseUrl}/standing/get?seasonId=${props.seasonId}`)
      .then((res) => res.json())
      .then((standingsResult) =>
        setTeamIds(
          standingsResult.list.map((standing: Standing) => standing.teamId)
        )
      );
  }, [props.seasonId]);

  const handleCancel = () => {
    props.onClose();
  };

  const handleSubmit = () => {
    fetch(
      config.baseUrl +
        "/season/update?seasonId=" +
        props.seasonId +
        "&title=" +
        title +
        "&winnerTeamId=" +
        winnerTeamId +
        "&summary=" +
        summary
    );

    props.onClose();
  };

  const titleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const winnerTeamIdOnChange = (event: any) => {
    setWinnerTeamId(parseInt(event.target.value));
  };

  const summaryOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSummary(event.target.value);
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleCancel}
      aria-labelledby="form-dialog-title"
      maxWidth="md"
      fullWidth
    >
      <DialogTitle id="form-dialog-title">Edit Season</DialogTitle>
      <DialogContent>
        <TextField
          id="title"
          label="Title"
          type="text"
          variant="outlined"
          value={title}
          fullWidth
          onChange={titleOnChange}
        />
      </DialogContent>
      <DialogContent>
        <TextField
          id="winnerTeamId"
          label="Winner"
          select
          name="winnerTeamId"
          value={winnerTeamId}
          onChange={winnerTeamIdOnChange}
          variant="outlined"
          fullWidth
        >
          {teamIds?.map((teamId) => (
            <MenuItem key={teamId} value={teamId}>
              <TeamDisplay id={teamId} />
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogContent>
        <TextField
          id="summary"
          label="Summary"
          type="text"
          variant="outlined"
          multiline
          value={summary}
          fullWidth
          onChange={summaryOnChange}
        />
      </DialogContent>
      <DialogActions>
        <Box
          marginBottom={2}
          marginRight={2}
          marginTop={1}
          display="flex"
          flexDirection="row"
        >
          <Box marginRight={2}>
            <Button onClick={handleCancel} color="primary">
              Cancel
            </Button>
          </Box>
          <Box>
            <Button onClick={handleSubmit} color="primary" variant="contained">
              Submit
            </Button>
          </Box>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
