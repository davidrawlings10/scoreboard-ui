import React, { useContext, useMemo } from "react";
import { Box } from "@mui/material";

import config from "../../../config";
import { searchCacheForTeam, cacheTeam } from "./TeamNameCache";
import Team from "../../../types/Team";
import Standing from "../../../types/Standing";
import { AppContext } from "../../App";

export interface TeamNameProps {
  id: number;
  hideLocation?: boolean;
  showStanding?: boolean;
  flipDisplay?: boolean;
}

export default function TeamName(props: TeamNameProps) {
  const { standings } = useContext(AppContext);
  const [team, setTeam] = React.useState<Team | null>(null);

  async function getTeamDisplay(id: number) {
    var res = await fetch(config.baseUrl + "/team/getTeamById?teamId=" + id);
    var team = await res.json();
    return team;
  }

  React.useEffect(() => {
    let team = searchCacheForTeam(props.id);

    if (!!team) {
      setTeam({
        id: props.id,
        location: team.location,
        name: team.name,
        division: team.division,
      });
    } else {
      if (!!props.id) {
        getTeamDisplay(props.id).then((team) => {
          setTeam({
            id: props.id,
            location: team.location,
            name: team.name,
            division: team.division,
          });
          cacheTeam(props.id, team);
        });
      } else {
        setTeam({ id: -1, location: "", name: "", division: "" });
      }
    }
  }, [props.id]);

  const standing: Standing | undefined = useMemo(() => {
    if (!props.showStanding) return undefined;

    return standings?.find(
      (standing: Standing) => standing.teamId === props?.id
    );
  }, [standings, props.id, props.showStanding]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      // alignItems={props.flipDisplay ? "flex-start" : "flex-end"}
    >
      <Box
        display="flex"
        // justifyContent="center"
        // alignItems="center"
        gap={0.5}
        // justifyContent={props.flipDisplay ? "flex-end" : "flex-start"}
      >
        <Box color="#aaa">
          {standing && standing.ranking && `${standing.ranking} `}
        </Box>
        {props.hideLocation || team?.location === null ? "" : team?.location}{" "}
        {team?.name}
      </Box>
      {/* <Typography color="#aaa" fontSize={15}> */}
      <Box color="#aaa" fontSize={14}>
        {standing && ` (${standing?.win}-${standing?.loss})`}
      </Box>
      {/* </Typography> */}
    </Box>
  );
}
