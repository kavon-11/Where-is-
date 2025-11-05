function WarningModal({ totalPercentage, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-slide-up">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce-slow">⚠️</div>
          <h3 className="text-2xl font-bold text-red-600 mb-4">
            Budget Alert!
          </h3>
          <p className="text-gray-700 mb-2">
            Your total spending is at{" "}
            <span className="font-bold text-red-600">
              {totalPercentage.toFixed(1)}%
            </span>
          </p>
          <p className="text-gray-600 mb-6">
            You're{" "}
            <span className="font-bold">
              {(totalPercentage - 100).toFixed(1)}%
            </span>{" "}
            over your budget. Consider adjusting your categories to stay within
            100%.
          </p>
          <div className="bg-red-50 p-4 rounded-lg mb-6">
            <p className="text-red-700 text-sm">
              💪 Remember: Living within your means is the key to financial
              freedom!
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transform hover:scale-[1.02] transition-all duration-200 shadow-md"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
}

export default WarningModal;
