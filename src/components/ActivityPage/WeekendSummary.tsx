import React from "react";
import type { ScheduleItem } from "@/types";
import { useThemeContext } from "@/context/ThemeProvider";
import { motion } from "framer-motion";

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

  const moodColors: Record<string, string> = {
    adventurous:
      "bg-orange-300 text-orange-800 dark:bg-orange-700 dark:text-orange-200",
    relaxing:
      "bg-green-300 text-green-800 dark:bg-green-700 dark:text-green-200",
    creative:
      "bg-purple-300 text-purple-800 dark:bg-purple-700 dark:text-purple-200",
    energetic: "bg-red-300 text-red-800 dark:bg-red-700 dark:text-red-200",
    Default: "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
  };


  return (
    <div
      className={`w-full p-6 rounded-2xl mb-8 shadow-lg transition-colors duration-300 
        ${
          isDark
            ? "bg-gray-900 text-gray-100 shadow-gray-800"
            : "bg-white text-gray-900 shadow-gray-200"
        }
      `}
    >
      <h4 className="font-bold text-xl sm:text-2xl mb-4">Weekend Summary</h4>

      <div className="flex flex-col sm:flex-row sm:justify-between mb-4 gap-2 sm:gap-4">
        <p className="text-sm sm:text-base">Total Activities: {all.length}</p>
        <p className="text-sm sm:text-base">
          Total Hours Planned: {totalHours}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {Object.entries(moodCount).map(([m, v]) => {
          const colorClass = moodColors[m] || moodColors["Default"];
          return (
            <motion.span
              key={m}
              className={`px-3 py-1 rounded-full font-medium text-sm cursor-default select-none ${colorClass} transition-all duration-200`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {m} x{v}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
};

export default WeekendSummary;
