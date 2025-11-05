function ModelSelector({ selectedModel, onModelChange, models }) {
  const modelKeys = Object.keys(models);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
        <span className="text-3xl mr-3">📊</span>
        Spending Model
      </h2>
      <div className="grid grid-cols-3 gap-3">
        {modelKeys.map((key) => (
          <button
            key={key}
            onClick={() => onModelChange(key)}
            className={`py-3 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${
              selectedModel === key
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {models[key].name}
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm text-gray-600 text-center">
        {selectedModel === "economy" && "💪 Save more, spend wisely!"}
        {selectedModel === "regular" && "⚖️ Balanced lifestyle approach"}
        {selectedModel === "expensive" && "✨ Live a little luxuriously"}
      </p>
    </div>
  );
}

export default ModelSelector;
