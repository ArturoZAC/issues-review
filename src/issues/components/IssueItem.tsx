import { FiInfo, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { GitHubIssue, State } from '../interfaces/issue.interface';
import { useQueryClient } from '@tanstack/react-query';
import { getIssue, getIssueComments } from '../../actions';
import { timeSince } from '../../helpers/timeSince';

export const IssueItem = ({ issue }: { issue: GitHubIssue }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const prefecthData = () => {
    queryClient.prefetchQuery({
      queryKey: ['issues', issue.number],
      queryFn: () => getIssue(issue.number),
      staleTime: 1000 * 60,
    })

    queryClient.prefetchQuery({
      queryKey: ['issues', issue.number, 'comments'],
      queryFn: () => getIssueComments(issue.number),
      staleTime: 1000 * 60,
    })
  }

  const presetData = () => {
    queryClient.setQueryData(['issues', issue.number], issue, { updatedAt: Date.now() + 1000 * 60 });
  }

  return (
    <div
      onMouseEnter={prefecthData}
      // onMouseEnter={ presetData }
      className="flex items-center px-2 py-3 mb-2.5 border rounded-md bg-slate-900 hover:bg-slate-800"
    >

      {
        (issue.state === State.Close)
          ? <FiCheckCircle size={30} color="green" className="min-w-10" />
          : <FiInfo size={30} color="red" className="min-w-10" />
      }

      <div className="flex flex-col flex-grow px-2">
        <a
          onClick={() => navigate(`/issues/issue/${issue.number}`)}
          className="hover:underline"
        >
          {issue.title}
        </a>
        <span className="text-gray-500">
          #${issue.number} opened {timeSince(issue.created_at)} ago by {' '}
          <span className="font-bold">{issue.user.login}</span>
        </span>

        <div className='flex flex-wrap'>
          {
            issue.labels.map(label => (
              <span
                key={label.id}
                className={`p-1 mr-2 text-xs rounded-md`}
                style={{
                  border: `1px solid #${label.color}`,
                  color: `#${label.color}`,
                }}
              >
                {label.name}
              </span>
            ))
          }
        </div>


      </div>

      <img
        src={issue.user.avatar_url}
        alt="User Avatar"
        className="w-8 h-8 rounded-full"
      />
      <div className="flex flex-col mx-2 items-center">
        <FiMessageSquare size={30} className="min-w-5" color="gray" />
        <span className="px-4 text-gray-400">{issue.comments}</span>
      </div>
    </div>
  );
};
