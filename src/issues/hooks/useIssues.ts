import { useQuery } from "@tanstack/react-query";
import { getIssues } from "../../actions";
import { State } from "../interfaces/issue.interface";

export const useIssues = ({ state, selectedLabels }: { state: State, selectedLabels: string[] }) => {

  const issueQuery = useQuery({
    queryKey: ['issues', { state, selectedLabels }],
    queryFn: () => getIssues( state, selectedLabels ),
    staleTime: 1000 * 60,
  })

  return {
    issueQuery
  }
};
