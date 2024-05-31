import "./App.css";
import { Box, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import theme from "./theme";
import NavBar from "./components/NavBar";
import HomePage from "./components/home/HomePage";
import SeasonPage from "./components/season/SeasonPage";
import StartGameForm from "./components/StartGameForm";
import ScheduleSeasonForm from "./components/ScheduleSeasonForm";
import TeamsPage from "./components/teams/TeamsPage";
import TeamDetail from "./components/teams/TeamDetail";

// export type MedicationState = {
//   ndc: string;
//   quantity: number;

//   resetState: {
//     ndc?: string;
//     quantity?: number;
//   };
// }

// const initialState: MedicationState = {
//   ndc: null,
//   quantity: null,
//   resetState: {}
// }

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const store = configureStore({
  reducer: {},
});

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
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
            <Box width="100%" height="40px">
              Updates
            </Box>
          </BrowserRouter>
        </Box>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
