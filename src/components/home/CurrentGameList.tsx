import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import Game from "../../types/Game";
import Scoreboard from "./Scoreboard";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";

interface CurrentGameListProps {
  games: Array<Game>;
  displayGame: Game | null;
  handleUpdateDisplayGameId: (id: number) => void;
}

export default function CurrentGameList(props: CurrentGameListProps) {
  const [pageSize, setPageSize] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [numberOfPages, setNumberOfPages] = useState<number>(1);
  const [currentGameListLength, setCurrentGameListLength] = useState<number>(0);

  useEffect(() => {
    setCurrentGameListLength(
      props.games.length - (!!props.displayGame ? 1 : 0)
    );
  }, [props.games, props.displayGame]);

  useEffect(() => {
    setNumberOfPages(Math.ceil(currentGameListLength / pageSize));
  }, [props.games, props.displayGame, currentGameListLength, pageSize]);

  useEffect(() => {
    setPageSize(Math.ceil((window.innerWidth - 400) / 261));
  }, [window.innerWidth]);

  const handlePrevClick = () => {
    if (page === 1) {
      return;
    }

    setPage(page - 1);
  };

  const handleNextClick = () => {
    if (page === numberOfPages) {
      return;
    }

    setPage(page + 1);
  };

  const handleUpdateDisplayGameId = (id: number) => {
    props.handleUpdateDisplayGameId(id);
  };

  if (!props.games) {
    return <div />;
  }

  const BUTTON_STYLE = {
    maxWidth: "50px",
    maxHeight: "120px",
    minWidth: "50px",
    minHeight: "120px",
  };

  return (
    <Box display="flex" flexDirection="column" marginTop={4}>
      <Box display="flex" flexDirection="row" mb={1}>
        <Box display="flex" alignContent="center">
          {currentGameListLength > pageSize && (
            <Button
              variant="contained"
              color="primary"
              onClick={handlePrevClick}
              style={BUTTON_STYLE}
              disabled={page <= 1}
            >
              <NavigateBefore />
            </Button>
          )}
        </Box>
        <Box display="flex" flexDirection="column" ml={2} mr={2}>
          <Box display="flex" flexDirection="row" mb={1}>
            {props.games
              .filter((game) => game.id !== props.displayGame?.id)
              .slice((page - 1) * pageSize, page * pageSize)
              .map((game) => (
                <div onClick={() => handleUpdateDisplayGameId(game.id)}>
                  <Scoreboard key={game.id} game={game} small />
                </div>
              ))}
          </Box>
          {currentGameListLength > pageSize && (
            <Box>{`Page ${page}/${numberOfPages}`}</Box>
          )}
        </Box>
        {currentGameListLength > pageSize && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextClick}
            style={BUTTON_STYLE}
            disabled={page >= numberOfPages}
          >
            <NavigateNext />
          </Button>
        )}
      </Box>
    </Box>
  );
}
