import React from "react";
import type { ScheduleItem } from "@/types";
import { useThemeContext } from "@/context/ThemeProvider";

interface Props {
  saturday: ScheduleItem[];
  sunday: ScheduleItem[];
}

const WeekendSummary: React.FC<Props> = ({ saturday, sunday }) => {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";

  const all = [...saturday, ...sunday];
  const totalHours = all.reduce((sum, i) => sum + i.activity.duration, 0);

  const moodCount: Record<string, number> = {};
  all.forEach((i) => {
    moodCount[i.activity.mood] = (moodCount[i.activity.mood] || 0) + 1;
  });

  // Simple dynamic badge colors (customize as needed)
  const moodColors: Record<string, string> = {
    Happy:
      "bg-yellow-200 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-200",
    Sad: "bg-blue-200 text-blue-800 dark:bg-blue-700 dark:text-blue-200",
    Excited: "bg-pink-200 text-pink-800 dark:bg-pink-700 dark:text-pink-200",
    Relaxed:
      "bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-200",
    Default: "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
  };

  return (
    <div
      className={`w-full p-6 rounded-2xl mb-8 shadow-lg transition-colors duration-300 ${
        isDark
          ? "bg-gray-900 text-gray-100 shadow-gray-800"
          : "bg-white text-gray-900 shadow-gray-200"
      }`}
    >
      <h4 className="font-bold text-xl mb-4">Weekend Summary</h4>
      <p className="mb-1">Total Activities: {all.length}</p>
      <p className="mb-4">Total Hours Planned: {totalHours}</p>
      <div className="flex flex-wrap gap-2">
        {Object.entries(moodCount).map(([m, v]) => {
          const colorClass = moodColors[m] || moodColors["Default"];
          return (
            <span
              key={m}
              className={`px-3 py-1 rounded-full font-medium text-sm ${colorClass} transition-all duration-200`}
            >
              {m} x{v}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default WeekendSummary;
