import { Box } from "@mui/material";

import TeamLogo from "./TeamLogo";
import TeamName from "./TeamName";
import { AppContext } from "../../App";
import { useContext, useMemo } from "react";
import Standing from "../../../types/Standing";

export interface TeamDisplayProps {
  id: number;
  hideName?: boolean;
  hideLogo?: boolean;
  hideLocation?: boolean;
  flipDisplay?: boolean;
  showStanding?: boolean;
}

export default function TeamDisplay(props: TeamDisplayProps) {
  const { standings } = useContext(AppContext);

  const standing: Standing | undefined = useMemo(() => {
    if (!props.showStanding) return undefined;

    return standings?.find(
      (standing: Standing) => standing.teamId === props?.id
    );
  }, [standings, props.id, props.showStanding]);

  return (
    <Box display="flex" flexDirection="row">
      {!props.hideName && props.flipDisplay && (
        <Box marginRight={1}>
          <TeamName
            id={props.id}
            hideLocation={props.hideLocation}
            showStanding={props?.showStanding}
            flipDisplay={props?.flipDisplay}
          />
        </Box>
      )}
      {!props.hideLogo && (
        <Box display="flex" flexDirection="column">
          <Box
            width={32}
            height={30}
            // marginRight={1}
            // marginLeft={1}
            display="flex"
            flexDirection="column"
            alignContent="center"
            justifyContent="center"
          >
            <Box
              display="flex"
              alignContent="center"
              justifyContent="center"
              gap={1}
            >
              <Box color="#aaa" fontSize={14}>
                {props.showStanding && props?.hideName && standing?.ranking}
              </Box>
              <TeamLogo id={props.id} />
            </Box>
          </Box>
          <Box color="#aaa" fontSize={14}>
            {standing &&
              props?.hideName &&
              ` (${standing?.win}-${standing?.loss})`}
          </Box>
        </Box>
      )}
      {!props.hideName && !props.flipDisplay && (
        <Box marginLeft={2} display="flex" gap={1}>
          <TeamName
            id={props.id}
            hideLocation={props.hideLocation}
            showStanding={props?.showStanding}
            flipDisplay={props?.flipDisplay}
          />
        </Box>
      )}
    </Box>
  );
}
