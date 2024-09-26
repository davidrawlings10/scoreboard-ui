import { useState, useCallback } from "react";
import Season from "../types/Season";
import Standing from "../types/Standing";
import { sfetchList } from "../sfetch";
import { calculatedPointPercentage } from "./shared/StandingsHelper";

export default function useApp() {
  const [seasons, setSeasons] = useState<Season[] | null>(null);
  const loadSeasons = useCallback(
    (league?: string | null, sport?: string | null) =>
      sfetchList(`/season/getSeasons?league=${league}&sport=${sport}`).then(
        (seasons) => {
          setSeasons(seasons);
        }
      ),
    []
  );

  const [standings, setStandings] = useState<Standing[]>([]);
  const loadStandings = useCallback(
    (seasonId: number) =>
      sfetchList(`/standing/get?seasonId=${seasonId}`).then((standingsList) => {
        setStandings(
          standingsList.map((standing: Standing) => ({
            ...standing,
            goalDiff: standing.gf - standing.ga,
            pointPercentage: calculatedPointPercentage(
              standing.point,
              standing.gp
            ),
          }))
        );
      }),
    []
  );

  return {
    seasons,
    loadSeasons,
    standings,
    loadStandings,
  };
}
