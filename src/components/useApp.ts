import { useState, useCallback } from "react";
import Season from "../types/Season";
import { sfetchList } from "../sfetch";

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

  return {
    seasons,
    loadSeasons,
  };
}
