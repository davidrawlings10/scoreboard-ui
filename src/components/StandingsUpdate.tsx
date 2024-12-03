import { useContext } from "react";
import { AppContext } from "./App";
import { Box } from "@mui/material";
import TeamDisplay from "./shared/TeamDisplay/TeamDisplay";

export default function StandingsUpdate() {
  // const [index, setIndex] = useState<number>(0); <-- ??? why was this state. what was it doing?
  const index: number = 0;
  const { standings } = useContext(AppContext);

  return (
    !!standings && (
      <Box paddingLeft={2}>
        {standings[index] && (
          <Box display="flex" gap={1} alignItems="center">
            {standings[index].ranking && `#${standings[index].ranking}`}
            <TeamDisplay id={standings[index].teamId} />
            <div>
              {standings[index].win}-{standings[index].loss}
            </div>
          </Box>
        )}
      </Box>
    )
  );
}
