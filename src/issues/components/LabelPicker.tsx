import { LoadingSpinner } from "../../shared";
import { useLabels } from "../hooks/useLabels";

export const LabelPicker = () => {

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
        className="animate-fadeIn px-2 py-1 m-1 rounded-full text-xs font-semibold hover:bg-slate-800 cursor-pointer transition-colors"
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
