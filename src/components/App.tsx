import "./App.css";
import { Box, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { createContext } from "react";

import { store } from "../store";
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

type AppContextType = {
  seasons: Season[] | null;
  loadSeasons: (league?: string | null, sport?: string | null) => void;
};

export const AppContext = createContext<AppContextType>({
  seasons: null,
  loadSeasons: () => {},
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
              <Box display="flex" height="calc(100vh - 80px)" width="100%">
                <Box overflow="auto" width="100%">
                  <Switch>
                    <Route exact path="/">
                      <HomePage />
                    </Route>
                    <Route path="/season">
                      <SeasonPage />
                    </Route>
                    <Route path="/scheduleSeason">
                      <ScheduleSeasonForm />
                    </Route>
                    <Route path="/startGame">
                      <StartGameForm />
                    </Route>
                    <Route path="/teams" exact>
                      <TeamsPage />
                    </Route>
                    <Route path="/teams/:id">
                      <TeamDetail />
                    </Route>
                  </Switch>
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
