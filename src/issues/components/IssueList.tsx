import { IssueItem } from './IssueItem';
import { GitHubIssue } from '../interfaces/issue.interface';

export const IssueList = ({ issues } : { issues : GitHubIssue[]}) => {
  return (
    <>
      {/* Botones de All, Open, Closed */}
      <div className="flex gap-4">
        <button className="btn active">All</button>
        <button className="btn">Open</button>
        <button className="btn">Closed</button>
      </div>

      {/* Lista de issues */}
      <div className="mt-4 animate-fadeIn">
        {issues.map((issue) => (
          <IssueItem key={issue.id} issue={issue}/>
        ))}
      </div>
    </>
  );
};
