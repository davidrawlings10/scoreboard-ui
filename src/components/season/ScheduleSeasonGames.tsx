import { useState, useEffect, useReducer } from "react";
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
import config from "../../config";

interface ScheduleSeasonGameProps {
  seasonId: number;
  loadGames: (updatePagination: boolean) => void;
}

type NewSeasonGame = {
  homeTeamId: string;
  awayTeamId: string;
};

type SeasonGameProps = {
  dispatch: (action: Action) => void;
  homeTeamId: string;
  awayTeamId: string;
  disableUp: boolean;
  disableDown: boolean;
  teamIds: string[];
  index: number;
};

const SeasonGame = ({
  dispatch,
  homeTeamId,
  awayTeamId,
  disableUp,
  disableDown,
  teamIds,
  index,
}: SeasonGameProps) => {
  return (
    <Box display="flex" width="100%">
      <Box width={400}>
        <TeamSelect
          value={homeTeamId}
          teamIds={teamIds}
          onChange={(id: string) =>
            dispatch({ type: "updateHomeTeam", payload: { id, index } })
          }
          label="Home Team"
          // small
        />
      </Box>
      <Box display="flex" alignItems="center">
        <IconButton
          onClick={() => dispatch({ type: "swapTeams", payload: { index } })}
        >
          <SwapHoriz />
        </IconButton>
      </Box>
      <Box width={400}>
        <TeamSelect
          value={awayTeamId}
          teamIds={teamIds}
          onChange={(id: string) =>
            dispatch({ type: "updateAwayTeam", payload: { id, index } })
          }
          label="Away Team"
          // small
        />
      </Box>
      <Box display="flex" alignItems="center">
        <IconButton
          onClick={() =>
            dispatch({ type: "swapGames", payload: { index: index - 1 } })
          }
          disabled={disableUp}
        >
          <ArrowUpward />
        </IconButton>
      </Box>
      <Box display="flex" alignItems="center">
        <IconButton
          onClick={() =>
            dispatch({ type: "swapGames", payload: { index: index } })
          }
          disabled={disableDown}
        >
          <ArrowDownward />
        </IconButton>
      </Box>
      <Box display="flex" alignItems="center">
        <IconButton
          onClick={() =>
            dispatch({ type: "remove", payload: { index: index } })
          }
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

type Action =
  | { type: "add"; payload: { homeTeamId: string; awayTeamId: string } }
  | { type: "remove"; payload: { index: number } }
  | { type: "updateHomeTeam"; payload: { id: string; index: number } }
  | { type: "updateAwayTeam"; payload: { id: string; index: number } }
  | { type: "swapTeams"; payload: { index: number } }
  | { type: "swapGames"; payload: { index: number } }; // the way I wrote this it handle moving up and down

function reducer(newSeasonGames: NewSeasonGame[], action: Action) {
  switch (action.type) {
    case "remove":
      return newSeasonGames.filter(
        (game, index) => index !== action.payload.index
      );
    case "add":
      return [
        ...newSeasonGames,
        {
          homeTeamId: action.payload.homeTeamId,
          awayTeamId: action.payload.awayTeamId,
        },
      ];
    case "updateHomeTeam":
      return newSeasonGames.map((game, index) =>
        index === action.payload.index
          ? { ...game, homeTeamId: action.payload.id }
          : game
      );
    case "updateAwayTeam":
      return newSeasonGames.map((game, index) =>
        index === action.payload.index
          ? { ...game, awayTeamId: action.payload.id }
          : game
      );
    case "swapTeams":
      return newSeasonGames.map((game, index) =>
        index === action.payload.index
          ? { homeTeamId: game.awayTeamId, awayTeamId: game.homeTeamId }
          : game
      );
    case "swapGames":
      return newSeasonGames.map((game, index) => {
        if (index === action.payload.index) {
          return newSeasonGames[action.payload.index + 1];
        } else if (index === action.payload.index + 1) {
          return newSeasonGames[action.payload.index];
        } else {
          return game;
        }
      });
    default:
      return newSeasonGames;
  }
}

export default function ScheduleSeasonGames(props: ScheduleSeasonGameProps) {
  const [teamIds, setTeamIds] = useState<string[]>([]);
  const [newSeasonGames, dispatch] = useReducer(reducer, []);

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

  return (
    <Box width="100%">
      {newSeasonGames.map((game: NewSeasonGame, index: number) => (
        <SeasonGame
          dispatch={dispatch}
          homeTeamId={game.homeTeamId}
          awayTeamId={game.awayTeamId}
          disableUp={index === 0}
          disableDown={index === newSeasonGames.length - 1}
          teamIds={teamIds}
          index={index}
        />
      ))}
      <Box display="flex" gap={1} mt={1}>
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            dispatch({
              type: "add",
              payload: { homeTeamId: teamIds[0], awayTeamId: teamIds[1] },
            })
          }
        >
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
