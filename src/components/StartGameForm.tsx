// keeping this as an example of a class component in tsx

import React from "react";
import { Button, Box, Snackbar } from "@mui/material";
import { Alert } from "@mui/material";

import SimpleSelect from "./shared/SimpleSelect";
import TeamSelect from "./shared/TeamSelect";
import { sfetchList } from "../sfetch";
import Team from "../types/Team";
import config from "../config";

interface StartGameFormClassProps {}

interface StartGameFormClassState {
  sport: string;
  homeLeague: string;
  awayLeague: string;
  homeTeamId: string;
  awayTeamId: string;
  homeLeagueTeamsList: Array<Team>;
  awayLeagueTeamsList: Array<Team>;
  snackbarOpen: boolean;
}

export default class StartGameFormClass extends React.Component<
  StartGameFormClassProps,
  StartGameFormClassState
> {
  constructor(props: StartGameFormClassProps) {
    super(props);
    document.title = "Scoreboard - Start Game";

    this.sportChange = this.sportChange.bind(this);
    this.homeLeagueChange = this.homeLeagueChange.bind(this);
    this.awayLeagueChange = this.awayLeagueChange.bind(this);
    this.homeTeamIdChange = this.homeTeamIdChange.bind(this);
    this.awayTeamIdChange = this.awayTeamIdChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    const state: StartGameFormClassState = {
      sport: "HOCKEY",
      homeLeague: "AVES",
      awayLeague: "AVES",
      homeTeamId: "1",
      awayTeamId: "2",
      homeLeagueTeamsList: [],
      awayLeagueTeamsList: [],
      snackbarOpen: false,
    };

    this.state = state;
  }

  componentDidMount() {
    this.updateTeamsList(this.state.homeLeague, true);
    this.updateTeamsList(this.state.awayLeague, false);
  }

  sportChange(sport: string) {
    this.setState({ sport: sport });
  }

  homeLeagueChange(league: string) {
    this.setState({ homeLeague: league });
    this.updateTeamsList(league, true);
  }

  awayLeagueChange(league: string) {
    this.setState({ awayLeague: league });
    this.updateTeamsList(league, false);
  }

  homeTeamIdChange(teamId: string) {
    this.setState({ homeTeamId: teamId });
  }

  awayTeamIdChange(teamId: string) {
    this.setState({ awayTeamId: teamId });
  }

  updateTeamsList(league: string, isHome: boolean) {
    sfetchList("/team/getTeams?league=" + league).then((list) => {
      if (isHome) {
        this.setState({ homeLeagueTeamsList: list, homeTeamId: list[0].id });
      } else {
        this.setState({ awayLeagueTeamsList: list, awayTeamId: list[0].id });
      }
    });
  }

  // @ts-ignore
  handleCloseSnackbar(event?: React.SyntheticEvent, reason?: string) {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ snackbarOpen: false });
  }

  handleSubmit(event: React.ChangeEvent<unknown>) {
    fetch(
      `${config.baseUrl}/game/startSingleGame?sport=${this.state.sport}&homeTeamId=${this.state.homeTeamId}&awayTeamId=${this.state.awayTeamId}`
    );
    this.setState({ snackbarOpen: true });
    event.preventDefault();
  }

  render() {
    return (
      <Box display="flex" justifyContent="center" width="100%" margin={2}>
        <Box width={500}>
          <form onSubmit={this.handleSubmit}>
            <Box margin={2}>
              <SimpleSelect
                entity="sport"
                value={this.state.sport}
                onChange={this.sportChange}
              />
            </Box>
            <Box margin={2}>
              <SimpleSelect
                entity="league"
                value={this.state.homeLeague}
                onChange={this.homeLeagueChange}
              />
            </Box>
            <Box margin={2}>
              <TeamSelect
                value={this.state.homeTeamId.toString()}
                teamIds={this.state.homeLeagueTeamsList.map((team) =>
                  team.id.toString()
                )}
                onChange={this.homeTeamIdChange}
                label="Home Team"
              />
            </Box>
            <Box margin={2}>
              <SimpleSelect
                entity="league"
                value={this.state.awayLeague}
                onChange={this.awayLeagueChange}
              />
            </Box>
            <Box margin={2}>
              <TeamSelect
                value={this.state.awayTeamId.toString()}
                teamIds={this.state.awayLeagueTeamsList.map((team) =>
                  team.id.toString()
                )}
                onChange={this.awayTeamIdChange}
                label="Away Team"
              />
            </Box>
            <Box display="flex" justifyContent="end" margin={2}>
              <Button
                type="submit"
                value="Submit"
                variant="contained"
                color="primary"
              >
                Start Game
              </Button>
            </Box>
          </form>
        </Box>
        <Snackbar open={this.state.snackbarOpen} autoHideDuration={6000}>
          <Alert onClose={this.handleCloseSnackbar} severity="success">
            Game Started
          </Alert>
        </Snackbar>
      </Box>
    );
  }
}
