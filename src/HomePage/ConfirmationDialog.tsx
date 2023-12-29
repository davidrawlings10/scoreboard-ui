import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  Button,
  Box,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Game from "../Entity/Game";
import TeamDisplay from "../Shared/TeamDisplay/TeamDisplay";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.error.main,
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
}));

interface ConfirmationDialogProps {
  open: boolean;
  onClose: (confirm: boolean) => void;
  game: Game;
}

export default function ConfirmationDialog(props: ConfirmationDialogProps) {
  const { onClose, open } = props;

  const classes = useStyles();

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
        <Button
          onClick={handleOk}
          variant="contained"
          color="secondary"
          classes={classes}
        >
          Stop
        </Button>
      </DialogActions>
    </Dialog>
  );
}
