function ExpenseEditor({
  categories,
  onCategoryUpdate,
  onAddCategory,
  onRemoveCategory,
  totalPercentage,
  budget,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
          <span className="text-3xl mr-3">✏️</span>
          Edit Categories
        </h2>
        <button
          onClick={onAddCategory}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium transform hover:scale-105 duration-200"
        >
          + Add
        </button>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div
              className="w-4 h-4 rounded-full flex-shrink-0"
              style={{ backgroundColor: category.color }}
            />
            <input
              type="text"
              value={category.name}
              onChange={(e) => onCategoryUpdate(index, "name", e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            />
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={category.percentage}
                onChange={(e) =>
                  onCategoryUpdate(index, "percentage", e.target.value)
                }
                className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                step="0.1"
                min="0"
              />
              <span className="text-gray-600 font-medium">%</span>
            </div>
            {budget > 0 && (
              <span className="text-sm text-gray-600 w-24 text-right">
                ${((budget * category.percentage) / 100).toFixed(2)}
              </span>
            )}
            <button
              onClick={() => onRemoveCategory(index)}
              className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded transition-colors"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>

      <div
        className={`mt-4 p-4 rounded-lg ${
          totalPercentage > 100
            ? "bg-red-50"
            : totalPercentage === 100
            ? "bg-green-50"
            : "bg-blue-50"
        }`}
      >
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-700">Total:</span>
          <span
            className={`text-2xl font-bold ${
              totalPercentage > 100
                ? "text-red-600 animate-pulse-slow"
                : totalPercentage === 100
                ? "text-green-600"
                : "text-blue-600"
            }`}
          >
            {totalPercentage.toFixed(1)}%
          </span>
        </div>
        {totalPercentage === 100 && (
          <p className="text-green-700 text-sm mt-2 text-center animate-fade-in">
            🎯 Perfect balance achieved!
          </p>
        )}
      </div>
    </div>
  );
}

export default ExpenseEditor;
