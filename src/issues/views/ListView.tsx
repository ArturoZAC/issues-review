import { useState } from 'react';
import { LoadingSpinner } from '../../shared';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssues } from '../hooks';
import { State } from '../interfaces/issue.interface';

export const ListView = () => {

  const [state, setState] = useState<State>(State.All);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  const { issueQuery, page, prevPage, nextPage } = useIssues({
    state,
    selectedLabels
  });

  const issues = issueQuery.data ?? [];

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
              <>
                <IssueList issues={issues} onStateChange={setState} state={state} />

                <div className="flex items-center justify-center gap-4 mt-6">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors disabled:bg-gray-700 disabled:cursor-not-allowed"
                    disabled={page === 1}
                    onClick={prevPage}
                  >
                    Anterior
                  </button>
                  <span className="text-lg font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded-lg shadow">
                    {page}
                  </span>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                    onClick={nextPage}
                  >
                    Siguiente
                  </button>
                </div>
              </>
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
