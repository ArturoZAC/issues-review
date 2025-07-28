import { githubApi } from '../api/github.api';
import { sleep } from "../helpers/sleep";
import { GitHubIssue } from '../issues/interfaces/issue.interface';

export const getIssues = async(): Promise<GitHubIssue[]> => {
  await sleep();
  const { data } = await githubApi.get<GitHubIssue[]>('/issues');
  return data;
}