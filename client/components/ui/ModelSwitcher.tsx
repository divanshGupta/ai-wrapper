"use client";

type Props = {
  model: string;
  setModel: (model: string) => void;
  availableModels: string[];
};

export default function ModelSwitcher({ model, setModel, availableModels}: Props) {
  return (
    <div className="px-2 py-2">
      <select
        value={model}
        onChange={(e) => setModel(e.target.value)}
        className="w-full bg-(--bg-secondary) text-(--text-primary) p-2 rounded-lg"
      >
        {availableModels?.length > 0 ? (
          availableModels.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
          ))
        ) : (
          <option disabled>No models found</option>
        )}
      </select>
    </div>
  );
}