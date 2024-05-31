import "./App.css";
import { Box, ThemeProvider, Button } from "@mui/material";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import theme from "./theme";
import NavBar from "./components/NavBar";
import HomePage from "./components/home/HomePage";
import SeasonPage from "./components/season/SeasonPage";
import StartGameForm from "./components/StartGameForm";
import ScheduleSeasonForm from "./components/ScheduleSeasonForm";
import TeamsPage from "./components/teams/TeamsPage";
import TeamDetail from "./components/teams/TeamDetail";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
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
          <Box width="100%" height="40px">
            Updates
          </Box>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
};

export default App;
