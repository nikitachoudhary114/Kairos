import React, { useState } from "react";
import ActivityCard from "./ActivityCard";
import { Search, Filter } from "lucide-react";
import type { IActivity } from "@/types";
import { useThemeContext } from "@/context/ThemeProvider";

interface Props {
  activities: IActivity[];
  onDragStart: (e: React.DragEvent, activity: IActivity) => void;
}

const ActivityLibrary: React.FC<Props> = ({ activities, onDragStart }) => {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = activities.filter(
    (a) =>
      (a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.description.toLowerCase().includes(search.toLowerCase())) &&
      (category === "all" || a.category === category)
  );

  const categories = [
    "all",
    "indoor",
    "outdoor",
    "food",
    "social",
    "relaxation",
    "fitness",
    "culture",
  ];

  return (
    <div
      className={`p-4 sm:p-6 rounded-2xl shadow-xl transition-colors flex flex-col h-full ${
        isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Header */}
      <div className="flex items-center mb-4">
        <Filter
          className={`${isDark ? "text-green-400" : "text-blue-500"} mr-2`}
        />
        <h3 className="font-bold text-lg">Activity Library</h3>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 w-full">
        <div className="relative flex-1">
          <Search
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
              isDark ? "text-gray-500" : "text-gray-400"
            }`}
          />
          <input
            placeholder="Search activities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full pl-10 pr-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition
              ${
                isDark
                  ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-green-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-400"
              }`}
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={`px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition
            ${
              isDark
                ? "bg-gray-800 border-gray-700 text-white focus:ring-green-400"
                : "bg-white border-gray-300 text-gray-900 focus:ring-blue-400"
            }`}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Activity Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 overflow-y-auto max-h-[calc(100vh-220px)] px-2 sm:px-0 pb-4 ">
        {filtered.map((activity) => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            onDragStart={onDragStart}
          />
        ))}
        {filtered.length === 0 && (
          <p className="text-gray-500 text-center col-span-full">
            No activities found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ActivityLibrary;
