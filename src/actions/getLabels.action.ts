import { githubApi } from '../api/github.api';
import { sleep } from "../helpers/sleep";
import { GitHubLabel } from "../issues/interfaces";

export const getLabels = async(): Promise<GitHubLabel[]> => {
  await sleep();
  const { data } = await githubApi.get<GitHubLabel[]>('/labels');
  return data;
}