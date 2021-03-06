import { Box } from "@material-ui/core";
import Season from "../Entity/Season";
import TeamDisplay from "../Shared/TeamDisplay/TeamDisplay";

export type SeasonHeaderProps = {
  season: Season;
};

export default function SeasonHeader(props: SeasonHeaderProps) {
  const { season } = props;
  return (
    <Box>
      <Box marginTop={1} border="1px solid #474f97" bgcolor="primary.main">
        <Box display="flex" paddingLeft={4}>
          <Box marginRight={6}>
            <h1>{season.title}</h1>
          </Box>
          <Box display="flex" flexDirection="row">
            <Box
              marginRight={6}
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Box>Number of Teams</Box>
              <Box>{season.numTeams}</Box>
            </Box>
            <Box
              marginRight={6}
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Box>Schedule</Box>
              {season.scheduleType}
            </Box>
            <Box
              marginRight={6}
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Box>League Id</Box>
              <Box>{season.leagueId}</Box>
            </Box>
            <Box
              marginRight={6}
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Box>Winner</Box>
              <Box>
                <TeamDisplay id={season.winnerTeamId} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      {!!season.summary && (
        <Box
          paddingLeft={4}
          paddingRight={4}
          paddingTop={1}
          paddingBottom={1}
          bgcolor="primary.dark"
          border="1px solid #474f97"
        >
          {season.summary}
        </Box>
      )}
    </Box>
  );
}
