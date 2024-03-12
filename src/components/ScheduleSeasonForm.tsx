import React, { useState, useEffect } from "react";
import {
  Box,
  Select,
  InputLabel,
  MenuItem,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Snackbar,
} from "@mui/material";
import { Alert } from "@mui/material";

import config from "../config";
import Team from "../types/Team";
import SimpleSelect from "./shared/SimpleSelect";
import TeamDisplay from "./shared/TeamDisplay/TeamDisplay";

export type ScheduleSeasonFormProps = {};

export default function ScheduleSeasonForm(props: ScheduleSeasonFormProps) {
  const [title, setTitle] = useState<string>("<Unnamed Season>");
  const [scheduleType, setScheduleType] = useState<string>(
    "HOME_ROTATION_RANDOM"
  );
  const [league, setLeague] = useState<string>("AVES");
  const [sport, setSport] = useState<string>("HOCKEY");
  const [numGames, setNumGames] = useState<number>(4);
  const [showNumGamesInput, setShowNumGamesInput] = useState<boolean>(true);
  const [possibleTeams, setPossibleTeams] = useState<Array<Team>>([]);
  const [selectedTeamIds, setSelectedTeamIds] = useState<Array<number>>([]);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!!league) {
      fetch(config.baseUrl + "/team/getTeams?league=" + league)
        .then((res) => res.json())
        .then((json) => {
          setPossibleTeams(json.list);
        });
    }
  }, [league]);

  // hide number of games input unless schedule type is Rounds
  useEffect(() => {
    if (scheduleType === "ROUNDS") {
      setShowNumGamesInput(true);
    } else {
      setShowNumGamesInput(false);
    }
  }, [scheduleType]);

  function titleChange(event: React.ChangeEvent<any>) {
    setTitle(event.target.value);
  }

  function scheduleTypeChange(event: React.ChangeEvent<any>) {
    setScheduleType(event.target.value);
  }

  function leagueChange(league: string) {
    setLeague(league);
  }

  function sportChange(sport: string) {
    setSport(sport);
  }

  function numGamesChange(event: React.ChangeEvent<any>) {
    setNumGames(event.target.value);
  }

  function selectedTeamIdsChange(event: React.ChangeEvent<HTMLInputElement>) {
    // must perform push and splice on deep copy because it can't be performed on state array directly
    // let selectedTeamIdsCopy: Array<number> = selectedTeamIds.map((id) => id);
    if (event.target.checked) {
      setSelectedTeamIds(selectedTeamIds.concat(parseInt(event.target.value)));
    } else {
      setSelectedTeamIds(
        selectedTeamIds.filter((id) => id !== parseInt(event.target.value))
      );
    }
  }

  function handleSubmit(event: React.ChangeEvent<any>) {
    if (!league) {
      return;
    }
    fetch(
      config.baseUrl +
        "/season/schedule?scheduleType=" +
        scheduleType +
        "&sport=" +
        sport +
        "&league=" +
        league +
        "&teamIds=" +
        selectedTeamIds +
        "&numGames=" +
        numGames +
        "&title=" +
        title
    );
    setSnackbarOpen(true);
    event.preventDefault();
  }

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <Box display="flex" justifyContent="center" width="100%" margin={2}>
      <Box width="85%">
        <form onSubmit={handleSubmit}>
          <Box display="flex" justifyContent="center">
            <Box width={500}>
              <Box margin={2}>
                <InputLabel>Season Title</InputLabel>
                <TextField
                  value={title}
                  onChange={titleChange}
                  variant="outlined"
                  fullWidth
                />
              </Box>
              <Box margin={2}>
                <SimpleSelect
                  value={league}
                  entity="league"
                  onChange={leagueChange}
                />
              </Box>
              <Box margin={2}>
                <SimpleSelect
                  value={sport}
                  entity="sport"
                  onChange={sportChange}
                />
              </Box>
              <Box margin={2}>
                <InputLabel>Schedule Type</InputLabel>
                <Select
                  value={scheduleType}
                  onChange={scheduleTypeChange}
                  variant="outlined"
                  fullWidth
                >
                  <MenuItem id="HOME_ROTATION" value="HOME_ROTATION">
                    Home Rotation
                  </MenuItem>
                  <MenuItem
                    id="HOME_ROTATION_RANDOM"
                    value="HOME_ROTATION_RANDOM"
                  >
                    Home Rotation Random
                  </MenuItem>
                  <MenuItem id="ROUNDS" value="ROUNDS">
                    Rounds
                  </MenuItem>
                  <MenuItem id="NONE" value="NONE">
                    None
                  </MenuItem>
                </Select>
              </Box>
              {showNumGamesInput && (
                <Box margin={2}>
                  <InputLabel>Number of Games per Team</InputLabel>
                  <TextField
                    value={numGames}
                    onChange={numGamesChange}
                    variant="outlined"
                    fullWidth
                  />
                </Box>
              )}
            </Box>
          </Box>
          <Box paddingLeft={12} paddingRight={6}>
            <Box marginBottom={2}>
              <Button
                variant="contained"
                onClick={() =>
                  setSelectedTeamIds(possibleTeams.map((team) => team.id))
                }
              >
                Select All
              </Button>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              flexWrap="wrap"
              justifyContent="start"
              height={360}
            >
              {possibleTeams &&
                possibleTeams.map((team) => (
                  <Box key={team.id}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedTeamIds.indexOf(team.id) >= 0}
                          onChange={selectedTeamIdsChange}
                          value={team.id}
                        />
                      }
                      label={<TeamDisplay id={team.id} />}
                    />
                  </Box>
                ))}
            </Box>
          </Box>
          <Box display="flex" justifyContent="end">
            <Button
              type="submit"
              value="Submit"
              variant="contained"
              color="primary"
            >
              Schedule Season
            </Button>
          </Box>
        </form>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Season Created
        </Alert>
      </Snackbar>
    </Box>
  );
}
