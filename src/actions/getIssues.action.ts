import { githubApi } from '../api/github.api';
import { sleep } from "../helpers/sleep";
import { GitHubIssue, State } from '../issues/interfaces/issue.interface';

export const getIssues = async( state: State, selectedLabels: string[] ): Promise<GitHubIssue[]> => {
  await sleep();
  const params = new URLSearchParams();

  if ( state !== State.All ){
    params.append('state', state );
  }

  if( selectedLabels.length > 0 ){
    params.append('labels', selectedLabels.join(','));
  }

  const { data } = await githubApi.get<GitHubIssue[]>('/issues', { params });
  return data;
}