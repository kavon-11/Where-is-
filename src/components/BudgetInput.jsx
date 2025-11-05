import { useState } from "react";

function BudgetInput({ budget, setBudget }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = parseFloat(inputValue);
    if (value > 0) {
      setBudget(value);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
        <span className="text-3xl mr-3">💵</span>
        Monthly Budget
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl">
            $
          </span>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter your monthly budget"
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-lg"
            step="0.01"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-md"
        >
          Set Budget
        </button>
      </form>
      {budget > 0 && (
        <div className="mt-4 p-4 bg-green-50 rounded-lg animate-fade-in">
          <p className="text-green-800 text-center font-semibold">
            Budget set:{" "}
            <span className="text-2xl">${budget.toLocaleString()}</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default BudgetInput;
