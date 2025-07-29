import { useInfiniteQuery } from "@tanstack/react-query";
import { getIssues } from "../../actions";
import { State } from "../interfaces/issue.interface";

export const useIssuesInfinite = ({
  state,
  selectedLabels,
}: {
  state: State;
  selectedLabels: string[];
}) => {
  const issueQuery = useInfiniteQuery({
    queryKey: ["issues", "infinite", { state, selectedLabels }],
    queryFn: ({ pageParam, queryKey }) => {
      const [, , args] = queryKey;
      const { state, selectedLabels } = args as {
        state: State;
        selectedLabels: string[];
      };
      return getIssues(state, selectedLabels, pageParam);
    },
    staleTime: 1000 * 60,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) =>
      lastPage.length > 0 ? pages.length : null,
  });

  return {
    issueQuery,
  };
};
