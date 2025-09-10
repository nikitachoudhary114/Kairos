import type { Activity } from "@/types";
import React from "react";
import { useThemeContext } from "@/context/ThemeProvider";

interface ActivityCardProps {
  activity: Activity;
  onDragStart: (e: React.DragEvent, activity: Activity) => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  onDragStart,
}) => {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";

  // Minimal neon-ish bright category colors
  const categoryColorsDark: Record<string, string> = {
    indoor: "bg-green-500/80",
    outdoor: "bg-blue-500/80",
    food: "bg-orange-400/80",
    social: "bg-purple-500/80",
    relaxation: "bg-teal-400/80",
    fitness: "bg-red-500/80",
    culture: "bg-yellow-400/80",
  };

  const categoryColorsLight: Record<string, string> = {
    indoor: "bg-green-600/30",
    outdoor: "bg-blue-600/30",
    food: "bg-orange-500/30",
    social: "bg-purple-600/30",
    relaxation: "bg-teal-500/30",
    fitness: "bg-red-500/30",
    culture: "bg-yellow-500/30",
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, activity)}
      className={`rounded-xl p-4 cursor-grab active:cursor-grabbing transform transition-all duration-300 
        ${
          isDark
            ? "bg-gray-900 hover:bg-gray-800 border-gray-700 text-white"
            : "bg-gray-100 hover:bg-white border-gray-200 text-gray-900"
        } 
        shadow-lg hover:shadow-2xl hover:scale-105 border`}
    >
      <div className="flex justify-between items-start mb-2">
        <div className={`text-3xl ${isDark ? "text-white" : "text-gray-800"}`}>
          {activity.icon}
        </div>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${
            isDark
              ? categoryColorsDark[activity.category]
              : categoryColorsLight[activity.category]
          } ${isDark ? "text-white" : "text-gray-900"}`}
        >
          {activity.category}
        </span>
      </div>
      <h4
        className={`font-bold text-lg ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        {activity.name}
      </h4>
      <p
        className={`text-sm mt-1 ${isDark ? "text-gray-300" : "text-gray-600"}`}
      >
        {activity.description}
      </p>
      <div className="flex justify-between mt-3 text-sm">
        <span
          className={`px-2 py-1 rounded ${
            isDark
              ? "bg-gray-800/50 text-gray-200"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          {activity.duration}h
        </span>
        <span
          className={`capitalize ${isDark ? "text-gray-300" : "text-gray-700"}`}
        >
          {activity.mood}
        </span>
      </div>
    </div>
  );
};

export default ActivityCard;
