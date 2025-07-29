import { useQuery } from "@tanstack/react-query";
import { getIssues } from "../../actions";
import { State } from "../interfaces/issue.interface";
import { useEffect, useState } from "react";

export const useIssues = ({
  state,
  selectedLabels,
}: {
  state: State;
  selectedLabels: string[];
}) => {
  const [page, setPage] = useState(1);

  const issueQuery = useQuery({
    queryKey: ["issues", { state, selectedLabels, page }],
    queryFn: () => getIssues(state, selectedLabels, page),
    staleTime: 1000 * 60,
  });

  useEffect(() => {
    setPage(1);
  }, [state]);

  useEffect(() => {
    setPage(1);
  }, [selectedLabels]);

  const nextPage = () => {
    if (issueQuery.data?.length === 0) {
      return;
    }

    setPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    if (page === 1) {
      return;
    }

    setPage((prevPage) => prevPage - 1);
  };

  return {
    issueQuery,

    page,
    prevPage,
    nextPage,
  };
};
