import { LoadingSpinner } from "../../shared";
import { useLabels } from "../hooks/useLabels";

interface Props {
  selectedLabels: string[];
  onLabelSelected: (label: string) => void;
}

export const LabelPicker = ({selectedLabels, onLabelSelected}: Props) => {

  const { labelsQuery } = useLabels();

  if( labelsQuery.isLoading ){
    return (
      <div className="flex justify-center items-center py-4 h-96">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="flex flex-wrap justify-center">
      {labelsQuery.data?.map(label => (
      <span
        key={label.id}
        onClick={ () => onLabelSelected( label.name )}
        className={`animate-fadeIn px-2 py-1 m-1 rounded-full text-xs font-semibold hover:bg-slate-800 cursor-pointer transition-colors ${ selectedLabels.includes( label.name ) ? 'selected-label': ''}`}
        style={{
        border: `1px solid #${label.color}`,
        color: `#${label.color}`,
        }}
      >
        {label.name}
      </span>
      ))}
    </div>
  );
};
