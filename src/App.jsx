import { useState, useEffect } from "react";
import BudgetInput from "./components/BudgetInput";
import ModelSelector from "./components/ModelSelector";
import ExpenseEditor from "./components/ExpenseEditor";
import ChartDisplay from "./components/ChartDisplay";
import WarningModal from "./components/WarningModal";

const SPENDING_MODELS = {
  economy: {
    name: "Economy",
    categories: [
      { name: "Housing", percentage: 30, color: "#3B82F6" },
      { name: "Food", percentage: 20, color: "#10B981" },
      { name: "Transportation", percentage: 15, color: "#F59E0B" },
      { name: "Entertainment", percentage: 10, color: "#EF4444" },
      { name: "Investments", percentage: 25, color: "#8B5CF6" },
    ],
  },
  regular: {
    name: "Regular",
    categories: [
      { name: "Housing", percentage: 35, color: "#3B82F6" },
      { name: "Food", percentage: 25, color: "#10B981" },
      { name: "Transportation", percentage: 15, color: "#F59E0B" },
      { name: "Entertainment", percentage: 15, color: "#EF4444" },
      { name: "Investments", percentage: 10, color: "#8B5CF6" },
    ],
  },
  expensive: {
    name: "Expensive",
    categories: [
      { name: "Housing", percentage: 40, color: "#3B82F6" },
      { name: "Food", percentage: 30, color: "#10B981" },
      { name: "Transportation", percentage: 15, color: "#F59E0B" },
      { name: "Entertainment", percentage: 10, color: "#EF4444" },
      { name: "Investments", percentage: 5, color: "#8B5CF6" },
    ],
  },
};

function App() {
  const [budget, setBudget] = useState(0);
  const [selectedModel, setSelectedModel] = useState("regular");
  const [categories, setCategories] = useState(
    SPENDING_MODELS.regular.categories
  );
  const [showWarning, setShowWarning] = useState(false);

  const totalPercentage = categories.reduce(
    (sum, cat) => sum + cat.percentage,
    0
  );

  useEffect(() => {
    if (totalPercentage > 100 && budget > 0) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }
  }, [totalPercentage, budget]);

  const handleModelChange = (model) => {
    setSelectedModel(model);
    setCategories(SPENDING_MODELS[model].categories);
  };

  const handleCategoryUpdate = (index, field, value) => {
    const newCategories = [...categories];
    newCategories[index][field] =
      field === "percentage" ? parseFloat(value) || 0 : value;
    setCategories(newCategories);
  };

  const handleAddCategory = () => {
    const colors = [
      "#3B82F6",
      "#10B981",
      "#F59E0B",
      "#EF4444",
      "#8B5CF6",
      "#EC4899",
      "#14B8A6",
    ];
    setCategories([
      ...categories,
      {
        name: "New Category",
        percentage: 0,
        color: colors[categories.length % colors.length],
      },
    ]);
  };

  const handleRemoveCategory = (index) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Where 💰
          </h1>
          <p className="text-gray-600 text-lg">
            Track your money, master your future
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6 animate-slide-up">
            <BudgetInput budget={budget} setBudget={setBudget} />
            <ModelSelector
              selectedModel={selectedModel}
              onModelChange={handleModelChange}
              models={SPENDING_MODELS}
            />
            <ExpenseEditor
              categories={categories}
              onCategoryUpdate={handleCategoryUpdate}
              onAddCategory={handleAddCategory}
              onRemoveCategory={handleRemoveCategory}
              totalPercentage={totalPercentage}
              budget={budget}
            />
          </div>

          <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <ChartDisplay
              categories={categories}
              budget={budget}
              totalPercentage={totalPercentage}
            />
          </div>
        </div>

        {showWarning && (
          <WarningModal
            totalPercentage={totalPercentage}
            onClose={() => setShowWarning(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
