import "./App.css";
import { Box, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { createContext } from "react";
import Game from "../types/Game";

import { store } from "../other/redux/store";
import theme from "../theme";
import NavBar from "./NavBar";
import UpdatesBar from "./UpdatesBar";
import HomePage from "./home/HomePage";
import SeasonPage from "./season/SeasonPage";
import StartGameForm from "./StartGameForm";
import ScheduleSeasonForm from "./ScheduleSeasonForm";
import TeamsPage from "./teams/TeamsPage";
import TeamDetail from "./teams/TeamDetail";
import useApp from "./useApp";
import Season from "../types/Season";
import Standing from "../types/Standing";

type AppContextType = {
  seasons: Season[] | null;
  loadSeasons: (league?: string | null, sport?: string | null) => void;
  standings: Standing[] | null;
  loadStandings: (seasonId: number) => void;
  currentGames: Game[];
  finishedGames: Game[];
  running: boolean;
  millisecondsPerTick: number;
  gamesToPlay: number;
  gamesPlayingConcurrently: number;
  getScoreboardState: () => void;
};

export const AppContext = createContext<AppContextType>({
  seasons: null,
  loadSeasons: () => {},
  standings: null,
  loadStandings: () => {},
  currentGames: [],
  finishedGames: [],
  running: false,
  millisecondsPerTick: 1000,
  gamesToPlay: 0,
  gamesPlayingConcurrently: 0,
  getScoreboardState: () => {},
});

const App = () => {
  const appContext = useApp();

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={appContext}>
        <Provider store={store}>
          <Box bgcolor="background.default" color="text.primary">
            <BrowserRouter>
              <NavBar />
              <Box display="flex" height="calc(100vh - 101px)" width="100%">
                <Box overflow="auto" width="100%">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/seasons" element={<SeasonPage />} />
                    <Route
                      path="/scheduleSeason"
                      element={<ScheduleSeasonForm />}
                    />
                    <Route path="/startGame" element={<StartGameForm />} />
                    <Route path="/teams" element={<TeamsPage />} />
                    <Route path="/teams/:id" element={<TeamDetail />} />
                  </Routes>
                </Box>
              </Box>
              <UpdatesBar />
            </BrowserRouter>
          </Box>
        </Provider>
      </AppContext.Provider>
    </ThemeProvider>
  );
};

export default App;
