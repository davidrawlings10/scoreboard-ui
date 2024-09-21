import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  Button,
  Box,
} from "@mui/material";
import Game from "../../types/Game";
import TeamDisplay from "../shared/TeamDisplay/TeamDisplay";

interface ConfirmationDialogProps {
  open: boolean;
  onClose: (confirm: boolean) => void;
  game: Game;
}

export default function ConfirmationDialog(props: ConfirmationDialogProps) {
  const { onClose, open } = props;

  const handleCancel = () => {
    onClose(false);
  };

  const handleOk = () => {
    onClose(true);
  };

  return (
    <Dialog maxWidth="xs" open={open}>
      <DialogTitle>Are you sure you want to stop this game?</DialogTitle>
      <DialogContent dividers>
        <Box>
          <TeamDisplay id={props.game.homeTeamId} />
        </Box>
        <Box>
          <TeamDisplay id={props.game.awayTeamId} />
        </Box>
        <Box>
          {props.game.seasonId
            ? "The game's progress will be discarded and it will be set back to SCHEDULED"
            : ""}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={handleCancel}
          color="primary"
          variant="contained"
        >
          Cancel
        </Button>
        <Button onClick={handleOk} variant="contained" color="secondary">
          Stop
        </Button>
      </DialogActions>
    </Dialog>
  );
}
