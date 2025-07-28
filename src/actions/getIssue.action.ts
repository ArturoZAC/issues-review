import { githubApi } from '../api/github.api';
import { sleep } from "../helpers/sleep";
import { GitHubIssue } from '../issues/interfaces/issue.interface';

export const getIssue = async( issueNumber: number ): Promise<GitHubIssue> => {
  await sleep();
  const { data } = await githubApi.get<GitHubIssue>(`/issues/${issueNumber}`);
  return data;
}