import { useState, useEffect } from "react";
import { Box, Button, IconButton } from "@mui/material";
import {
  SwapHoriz,
  ArrowUpward,
  ArrowDownward,
  Delete as DeleteIcon,
} from "@mui/icons-material";

import TeamSelect from "../shared/TeamSelect";
import { sfetchList } from "../../sfetch";
import Standing from "../../types/Standing";
import NewSeasonGame from "../../types/NewSeasonGame";
import config from "../../config";

interface ScheduleSeasonGameProps {
  seasonId: number;
  loadGames: (updatePagination: boolean) => void;
}

type SeasonGameSchedulerProps = {
  homeTeamId: string;
  awayTeamId: string;
  updateTeamId: (id: string, index: number, homeTeam: boolean) => void;
  swapTeamIds: (index: number) => void;
  remove: (index: number) => void;
  move: (index: number, up: boolean) => void;
  disableUp: boolean;
  disableDown: boolean;
  teamIds: string[];
  index: number;
};

const SeasonGameScheduler = ({
  homeTeamId,
  awayTeamId,
  updateTeamId,
  swapTeamIds,
  remove,
  move,
  disableUp,
  disableDown,
  teamIds,
  index,
}: SeasonGameSchedulerProps) => {
  return (
    <Box display="flex" width="100%">
      <Box width={400}>
        <TeamSelect
          value={homeTeamId}
          teamIds={teamIds}
          onChange={(id) => updateTeamId(id, index, true)}
          label="Home Team"
        />
      </Box>
      <Box display="flex" alignItems="center">
        <IconButton
          onClick={() => {
            swapTeamIds(index);
          }}
        >
          <SwapHoriz />
        </IconButton>
      </Box>
      <Box width={400}>
        <TeamSelect
          value={awayTeamId}
          teamIds={teamIds}
          onChange={(id) => updateTeamId(id, index, false)}
          label="Away Team"
        />
      </Box>
      <Box display="flex" alignItems="center">
        <IconButton onClick={() => move(index, true)} disabled={disableUp}>
          <ArrowUpward />
        </IconButton>
      </Box>
      <Box display="flex" alignItems="center">
        <IconButton onClick={() => move(index, false)} disabled={disableDown}>
          <ArrowDownward />
        </IconButton>
      </Box>
      <Box display="flex" alignItems="center">
        <IconButton onClick={() => remove(index)}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default function ScheduleSeasonGames(props: ScheduleSeasonGameProps) {
  const [teamIds, setTeamIds] = useState<string[]>([]);
  const [newSeasonGames, setNewSeasonGames] = useState<NewSeasonGame[]>([]);

  useEffect(() => {
    sfetchList(`/standing/get?seasonId=${props.seasonId}`).then(
      (standingsResult) => {
        const teamIds_: string[] = standingsResult.map(
          (standing: Standing) => standing.teamId
        );
        setTeamIds(teamIds_);
      }
    );
  }, [props.seasonId]);

  function scheduleSeasonGame(index: number) {
    if (newSeasonGames[index]) {
      fetch(
        `${config.baseUrl}/game/scheduleSeasonGame?seasonId=${props.seasonId}&homeTeamId=${newSeasonGames[index].homeTeamId}&awayTeamId=${newSeasonGames[index].awayTeamId}`
      ).then(() => {
        scheduleSeasonGame(index + 1);
      });
    } else {
      props.loadGames(false);
    }
  }

  function updateTeamId(id: string, index: number, homeTeam: boolean) {
    const newSeasonGamesCopy = [...newSeasonGames];
    if (homeTeam) {
      newSeasonGamesCopy[index].homeTeamId = id;
    } else {
      newSeasonGamesCopy[index].awayTeamId = id;
    }
    setNewSeasonGames(newSeasonGamesCopy);
  }

  function move(index: number, up: boolean) {
    const gamesCopy = [...newSeasonGames];
    if (up) {
      gamesCopy.splice(index - 1, 2, gamesCopy[index], gamesCopy[index - 1]);
    } else {
      gamesCopy.splice(index, 2, gamesCopy[index + 1], gamesCopy[index]);
    }
    setNewSeasonGames(gamesCopy);
  }

  function remove(index: number) {
    const newSeasonGamesCopy = [...newSeasonGames];
    newSeasonGamesCopy.splice(index, 1);
    setNewSeasonGames(newSeasonGamesCopy);
  }

  function swapTeamIds(index: number) {
    const newSeasonGamesCopy = [...newSeasonGames];
    const homeTeamId = newSeasonGamesCopy[index].homeTeamId;
    newSeasonGamesCopy[index].homeTeamId = newSeasonGamesCopy[index].awayTeamId;
    newSeasonGamesCopy[index].awayTeamId = homeTeamId;
    setNewSeasonGames(newSeasonGamesCopy);
  }

  function addSeasonGame() {
    const newSeasonGamesCopy = [...newSeasonGames];
    const seasonGame: NewSeasonGame = {
      homeTeamId: teamIds[0],
      awayTeamId: teamIds[1],
    };
    newSeasonGamesCopy.push(seasonGame);
    setNewSeasonGames(newSeasonGamesCopy);
  }

  return (
    <Box width="100%">
      {newSeasonGames.map((game: NewSeasonGame, index: number) => (
        <SeasonGameScheduler
          homeTeamId={game.homeTeamId}
          awayTeamId={game.awayTeamId}
          updateTeamId={updateTeamId}
          swapTeamIds={swapTeamIds}
          remove={remove}
          move={move}
          disableUp={index === 0}
          disableDown={index === newSeasonGames.length - 1}
          teamIds={teamIds}
          index={index}
        />
      ))}
      <Box display="flex" gap={1} mt={1}>
        <Button variant="contained" color="primary" onClick={addSeasonGame}>
          Add Game
        </Button>
        {newSeasonGames.length > 0 && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => scheduleSeasonGame(0)}
          >
            Schedule
          </Button>
        )}
      </Box>
    </Box>
  );
}
