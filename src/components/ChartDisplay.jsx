import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

function ChartDisplay({ categories, budget, totalPercentage }) {
  const data = categories.map((cat) => ({
    name: cat.name,
    value: cat.percentage,
    amount: budget > 0 ? (budget * cat.percentage) / 100 : 0,
    color: cat.color,
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800">{payload[0].name}</p>
          <p className="text-blue-600">{payload[0].value.toFixed(1)}%</p>
          {budget > 0 && (
            <p className="text-green-600 font-medium">
              ${payload[0].payload.amount.toFixed(2)}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 sticky top-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
        <span className="text-3xl mr-3">📈</span>
        Spending Visualization
      </h2>

      {categories.length > 0 ? (
        <div className="animate-fade-in">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                animationBegin={0}
                animationDuration={800}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          <div className="mt-6 space-y-3">
            {budget > 0 && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-3">
                  Monthly Breakdown
                </h3>
                {categories.map((cat, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: cat.color }}
                      />
                      <span className="text-gray-700">{cat.name}</span>
                    </div>
                    <span className="font-semibold text-gray-800">
                      ${((budget * cat.percentage) / 100).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <p className="text-yellow-800 font-medium">
                {totalPercentage < 100 &&
                  "💡 You have room to allocate more funds!"}
                {totalPercentage === 100 &&
                  "🌟 Perfect! Your budget is fully allocated!"}
                {totalPercentage > 100 && "⚠️ Warning: You're over budget!"}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-gray-400">
          <p className="text-4xl mb-3">📊</p>
          <p>Add categories to see the chart</p>
        </div>
      )}
    </div>
  );
}

export default ChartDisplay;
