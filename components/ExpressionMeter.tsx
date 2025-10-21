"use client";

interface ExpressionMeterProps {
  score: number;
}

export default function ExpressionMeter({ score }: ExpressionMeterProps) {
  // Determine color based on score
  const getColor = (score: number): string => {
    if (score < 30) return "bg-blue-500";
    if (score < 50) return "bg-cyan-500";
    if (score < 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getLabel = (score: number): string => {
    if (score < 30) return "Sad";
    if (score < 50) return "Neutral";
    if (score < 70) return "Happy";
    return "Very Happy";
  };

  return (
    <div className="w-full bg-gray-800 rounded-lg p-6 shadow-xl">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold">Expression Level</h2>
        <span className="text-3xl font-bold">{score}%</span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden mb-2">
        <div
          className={`h-full ${getColor(score)} transition-all duration-300 ease-out`}
          style={{ width: `${score}%` }}
        />
      </div>

      <p className="text-center text-gray-400 text-sm">{getLabel(score)}</p>
    </div>
  );
}
