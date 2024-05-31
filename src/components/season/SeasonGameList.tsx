import { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { Refresh as RefreshIcon } from "@mui/icons-material";

import config from "../../config";
import "../Shared/Table.css";
import TeamDisplay from "../shared/TeamDisplay/TeamDisplay";
import Game from "../../types/Game";
import Standing from "../../types/Standing";
import { getFinalText } from "../shared/GameClockDisplay";
import TeamSelect from "../shared/TeamSelect";
import ScheduleSeasonGames from "./ScheduleSeasonGames";

export type SeasonGameListProps = {
  seasonId: number;
  numGames: { current: number; finished: number } | null;
};

const PAGE_SIZE = 20;

export default function SeasonGameList(props: SeasonGameListProps) {
  const [games, setGames] = useState<Array<Game>>([]);
  const [page, setPage] = useState<number>(1);
  const [teamIds, setTeamIds] = useState<Array<string>>([]);
  const [teamIdFilter, setTeamIdFilter] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTeamIdFilter(null);
  }, [props.seasonId]);

  function loadGames(updatePagination: boolean) {
    fetch(
      `${config.baseUrl}/game/getGamesBySeasonId?seasonId=${props.seasonId}&teamId=${teamIdFilter}`
    )
      .then((res) => res.json())
      .then((gamesResult) => {
        setGames(gamesResult.list);
        if (updatePagination) setPageToNextScheduledGame(gamesResult.list);
      })
      .catch((error) => {
        console.error("error - ", error);
        setError("error - backend might not be running");
      });
  }

  useEffect(
    () => loadGames(true),
    [
      props.seasonId,
      props.numGames?.current,
      props.numGames?.finished,
      teamIdFilter,
    ]
  );

  function setPageToNextScheduledGame(games: Array<Game>) {
    setPage(
      !!games &&
        Math.max(
          Math.floor(
            (games.filter((game) => game.status === "FINAL").length - 1) /
              PAGE_SIZE +
              1
          ),
          1
        )
    );
  }

  useEffect(() => {
    fetch(`${config.baseUrl}/standing/get?seasonId=${props.seasonId}`)
      .then((res) => res.json())
      .then((standingsResult) =>
        setTeamIds(
          standingsResult.list.map((standing: Standing) => standing.teamId)
        )
      );
  }, [props.seasonId]);

  function handleTeamIdFilterChange(value: string) {
    if (value === "All") {
      setTeamIdFilter(null);
    } else {
      setTeamIdFilter(parseInt(value));
    }
  }

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  if (error) {
    return <Box bgcolor="red">{error}</Box>;
  }

  return (
    <Box display="flex">
      <Box
        display="flex"
        flexDirection="column"
        width={1000}
        gap={1}
        margin="auto"
      >
        <Box width={400}>
          <TeamSelect
            teamIds={teamIds}
            value={teamIdFilter ? teamIdFilter.toString() : ""}
            displayEmpty
            onChange={handleTeamIdFilterChange}
          />
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          width="100%"
        >
          <Box ml={1}>
            {!!games && games.filter((game) => game.status === "FINAL").length}{" "}
            of {!!games && games.length} games played
          </Box>
          <Box display="flex">
            <IconButton
              onClick={() => {
                loadGames(false);
              }}
            >
              <RefreshIcon />
            </IconButton>
            <Pagination
              onChange={handlePageChange}
              page={page}
              count={!!games && Math.floor((games.length - 1) / PAGE_SIZE + 1)}
            />
          </Box>
        </Box>

        <table>
          <thead>
            <tr>
              <th></th>
              <th>Home</th>
              <th></th>
              <th>Away</th>
              <th></th>
              <th></th>
              <th>Finished</th>
            </tr>
          </thead>
          <tbody>
            {!!games &&
              games
                .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
                .map((game) => {
                  return (
                    <tr key={game.id}>
                      <td>
                        {game.status === "FINAL" && !!teamIdFilter && (
                          <WinLossDisplay teamId={teamIdFilter} game={game} />
                        )}
                      </td>
                      <td
                        className={
                          game.status === "FINAL" &&
                          game.homeScore > game.awayScore
                            ? "winning-team-color"
                            : ""
                        }
                      >
                        <TeamDisplay id={game.homeTeamId} />
                      </td>
                      <td
                        className={
                          game.status === "FINAL" &&
                          game.homeScore > game.awayScore
                            ? "winning-team-color"
                            : ""
                        }
                      >
                        {game.homeScore}
                      </td>
                      <td
                        className={
                          game.status === "FINAL" &&
                          game.homeScore < game.awayScore
                            ? "winning-team-color"
                            : ""
                        }
                      >
                        <TeamDisplay id={game.awayTeamId} />
                      </td>
                      <td
                        className={
                          game.status === "FINAL" &&
                          game.homeScore < game.awayScore
                            ? "winning-team-color"
                            : ""
                        }
                      >
                        {game.awayScore}
                      </td>
                      <td
                        className={
                          game.status === "PLAYING" ? "winning-team-color" : ""
                        }
                      >
                        {game.status === "FINAL" &&
                          getFinalText(
                            game.endingPeriod,
                            game.sportInfo.ending_PERIOD
                          )}
                        {game.status === "PLAYING" && "In Progress"}
                      </td>
                      <td>
                        {game.status === "FINAL" &&
                          new Date(game.updated).toLocaleString("en-US", {
                            timeZone: config.timeZone,
                          })}
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
        <ScheduleSeasonGames seasonId={props.seasonId} loadGames={loadGames} />
      </Box>
    </Box>
  );
}

interface WinLossDisplayProps {
  teamId: number | null;
  game: Game;
}

function WinLossDisplay(props: WinLossDisplayProps) {
  let value: string;
  if (props.teamId === props.game.homeTeamId) {
    value = props.game.homeScore > props.game.awayScore ? "W" : "L";
  } else {
    value = props.game.homeScore < props.game.awayScore ? "W" : "L";
  }
  return <Box>{value}</Box>;
}
