import { useState, useEffect } from "react";
import { Box, Button, IconButton } from "@mui/material";
import { SwapHoriz, ArrowUpward, ArrowDownward } from "@mui/icons-material";

import TeamSelect from "../shared/TeamSelect";
import { sfetchList } from "../../sfetch";
import Standing from "../../types/Standing";
import NewSeasonGame from "../../types/NewSeasonGame";
import config from "../../config";

interface ScheduleSeasonGameProps {
  seasonId: number;
}

type SeasonGameSchedulerProps = {
  homeTeamId: string;
  awayTeamId: string;
  updateTeamId: (id: string, index: number, homeTeam: boolean) => void;
  teamIds: string[];
  index: number;
};

const SeasonGameScheduler = ({
  homeTeamId,
  awayTeamId,
  updateTeamId,
  teamIds,
  index,
}: SeasonGameSchedulerProps) => {
  return (
    <Box display="flex" width="100%">
      <TeamSelect
        value={homeTeamId}
        teamIds={teamIds}
        onChange={(id) => updateTeamId(id, index, true)}
        label="Home Team"
      />
      <IconButton
        onClick={() => {
          // setHomeTeamId(awayTeamId);
          // setAwayTeamId(homeTeamId);
        }}
      >
        <SwapHoriz />
      </IconButton>
      <TeamSelect
        value={awayTeamId}
        teamIds={teamIds}
        onChange={(id) => updateTeamId(id, index, false)}
        label="Away Team"
      />
      <IconButton onClick={() => {}}>
        <ArrowUpward />
      </IconButton>
      <IconButton onClick={() => {}}>
        <ArrowDownward />
      </IconButton>
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
    <Box>
      {newSeasonGames.map((game: NewSeasonGame, index: number) => (
        <SeasonGameScheduler
          homeTeamId={game.homeTeamId}
          awayTeamId={game.awayTeamId}
          updateTeamId={updateTeamId}
          teamIds={teamIds}
          index={index}
        />
      ))}
      <Button
        variant="contained"
        color="primary"
        onClick={() => scheduleSeasonGame(0)}
      >
        Schedule
      </Button>
      <Button variant="contained" color="primary" onClick={addSeasonGame}>
        Add
      </Button>
    </Box>
  );
}
