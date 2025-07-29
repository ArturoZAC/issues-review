import { useState } from 'react';
import { LoadingSpinner } from '../../shared';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { State } from '../interfaces/issue.interface';
import { useIssuesInfinite } from '../hooks/useIssuesInfinite';

export const ListViewInfinite = () => {

  const [state, setState] = useState<State>(State.All);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  const { issueQuery } = useIssuesInfinite({
    state,
    selectedLabels
  });

  const issues = issueQuery.data?.pages.flat() ?? [];
  // const ids = issues.map(i => i.id);
  // const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
  // console.log("Duplicated IDs:", duplicates);

  const onLabelSelected = (label: string) => {
    (selectedLabels.includes(label))
      ? setSelectedLabels(selectedLabels.filter(selectedLabel => selectedLabel !== label))
      : setSelectedLabels([...selectedLabels, label])
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 mt-5">
      <div className="col-span-1 sm:col-span-2">
        {
          (issueQuery.isLoading)
            ? <LoadingSpinner />
            : (
              <div className='flex flex-col justify-center'>
                <IssueList issues={issues} onStateChange={setState} state={state} />

                <button
                  onClick={() => issueQuery.fetchNextPage()}
                  disabled={issueQuery.isFetchingNextPage}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-500 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                  {
                    issueQuery.isFetchingNextPage
                      ? 'Cargando más...'
                      : 'Cargar más...'
                  }
                </button>
              </div>
            )
        }
      </div>

      <div className="col-span-1 px-2">
        <LabelPicker
          onLabelSelected={onLabelSelected}
          selectedLabels={selectedLabels}
        />
      </div>
    </div>
  );
};
