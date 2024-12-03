import { useState } from "react";
import { makeStyles } from "@mui/styles";

// @ts-ignore
const useStyles = makeStyles((theme) => ({
  root: {
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

const SortableTable = () => {
  const [sortBy, setSortBy] = useState<string>("pointPercentage");
  const [sortDirection, setSortDirection] = useState<SortDirection>("ASC");

  type SortDirection = "ASC" | "DESC";

  function updateSort(_sortBy: string) {
    if (sortBy === _sortBy) {
      setSortDirection(sortDirection === "ASC" ? "DESC" : "ASC");
    } else {
      setSortBy(_sortBy);
      setSortDirection("ASC");
    }
  }

  interface ThProps {
    attribute: string;
    title?: string;
    children: string;
  }

  function sortTable(list: any) {
    return list.sort((a: any, b: any) =>
      sortDirection === "ASC" ? b[sortBy] - a[sortBy] : a[sortBy] - b[sortBy]
    );
  }

  const classes = useStyles();

  const Th = (props: ThProps) => {
    const { attribute, title } = props;
    return (
      <th
        className={classes.root}
        onClick={() => updateSort(attribute)}
        title={title}
      >
        {props.children}
      </th>
    );
  };

  return { Th, sortTable };
};

export default SortableTable;
