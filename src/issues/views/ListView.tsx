import { useState } from 'react';
import { LoadingSpinner } from '../../shared';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssues } from '../hooks';
import { State } from '../interfaces/issue.interface';

export const ListView = () => {

  const [state, setState] = useState<State>( State.All );
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  
  const { issueQuery } = useIssues({
    state,
    selectedLabels
  });

  const issues = issueQuery.data ?? [];

  const onLabelSelected = ( label: string ) => {
    (selectedLabels.includes(label))
      ? setSelectedLabels(selectedLabels.filter( selectedLabel => selectedLabel !== label))
      : setSelectedLabels([...selectedLabels, label])
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 mt-5">
      <div className="col-span-1 sm:col-span-2">
        {
          ( issueQuery.isLoading )
            ? <LoadingSpinner />
            : <IssueList issues={issues} onStateChange={ setState } state={ state }/>
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
