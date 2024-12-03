import React, { memo } from "react";
import { Box, IconButton } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

import config from "../../config";
import TeamDisplay from "../shared/TeamDisplay/TeamDisplay";
import GameClockDisplay from "../shared/GameClockDisplay";
import Game from "../../types/Game";
import ConfirmationDialog from "./ConfirmationDialog";
import SportLogo from "../shared/SportDisplay/SportLogo";

interface ScoreboardRowProps {
  teamId: number;
  score: number;
  small?: boolean;
  possession?: boolean;
  sport: string;
}

// export const SMALL_SCOREBOARD_WIDTH: number = 260;

function ScoreboardRow({
  teamId,
  score,
  small,
  possession,
  sport,
}: ScoreboardRowProps) {
  return (
    <Box display="flex" flexDirection="row">
      <Box
        border="1px solid black"
        p={1}
        width="85%"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box display="flex" flexDirection="row" gap={1} paddingLeft={1}>
          <TeamDisplay id={teamId} hideLocation={small} showStanding />
        </Box>
        <Box>{possession && <SportLogo value={sport} />}</Box>
      </Box>
      <Box
        border="1px solid black"
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={1}
        width="15%"
      >
        {score}
      </Box>
    </Box>
  );
}

const ScoreboardRowMemo = memo(ScoreboardRow);

export type ScoreboardProps = {
  game: Game | null;
  small?: boolean;
};

export default function Scoreboard(props: ScoreboardProps) {
  const [confirmationDailogOpen, setConfirmationDailogOpen] =
    React.useState<boolean>(false);

  function terminateHandleClick() {
    setConfirmationDailogOpen(true);
  }

  const confirmationDialogHandleClose = (confirm: Boolean) => {
    setConfirmationDailogOpen(false);

    if (confirm) {
      if (!!props.game) {
        fetch(
          config.baseUrl + "/game/terminateCurrentGame?gameId=" + props.game.id
        );
      }
    }
  };

  if (!props.game) {
    return <div></div>;
  }

  return (
    <>
      <Box display="flex">
        <Box flexDirection="column">
          <Box
            bgcolor="primary.main"
            border="1px solid black"
            // className={props.small ? classes.root : ""}
            width={props.small ? 261 : 380}
            sx={
              props.small
                ? {
                    "&:hover": {
                      bgcolor: "primary.dark",
                      cursor: "pointer",
                    },
                  }
                : {}
            }
          >
            <ScoreboardRowMemo
              teamId={props.game.homeTeamId}
              score={props.game.homeScore}
              small={props.small}
              possession={props.game.homeHasPossession}
              sport={props.game.sport}
            />
            <ScoreboardRowMemo
              teamId={props.game.awayTeamId}
              score={props.game.awayScore}
              small={props.small}
              possession={!props.game.homeHasPossession}
              sport={props.game.sport}
            />
            <Box border="1px solid black" p={1}>
              <Box display="flex" flexDirection="row">
                <GameClockDisplay game={props.game} />
              </Box>
            </Box>
          </Box>
          <Box display={props.small ? "none" : "flex"}>
            <Box margin={0.5}>
              <IconButton size="small" onClick={terminateHandleClick}>
                <DeleteIcon />
              </IconButton>
            </Box>
            {/*<Box margin={0.5}>
              <IconButton size="small" onClick={adjustHandleClick}>
                <EditIcon />
              </IconButton>
            </Box>*/}
          </Box>
        </Box>
      </Box>
      <ConfirmationDialog
        open={confirmationDailogOpen}
        onClose={confirmationDialogHandleClose}
        game={props.game}
      />
    </>
  );
}
