import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import type { ScheduleItem } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeContext } from "@/context/ThemeProvider";

interface Props {
  saturday: ScheduleItem[];
  sunday: ScheduleItem[];
  onDrop: (
    e: React.DragEvent,
    day: "saturday" | "sunday",
    time: string
  ) => void;
  onRemoveActivity: (id: string) => void;
}

const allTimeSlots = Array.from({ length: 16 }, (_, i) => 8 + i); // 8 to 23

const WeekendSchedule: React.FC<Props> = ({
  saturday,
  sunday,
  onDrop,
  onRemoveActivity,
}) => {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";
  const [activeDay, setActiveDay] = useState<"saturday" | "sunday">("saturday");

  const formatTime = (t: number) => {
    const hour = t % 24;
    const suffix = hour >= 12 ? "PM" : "AM";
    const display = hour > 12 ? hour - 12 : hour;
    return `${display}:00 ${suffix}`;
  };

  const DayColumn = ({
    day,
    items,
  }: {
    day: "saturday" | "sunday";
    items: ScheduleItem[];
  }) => {
    const getItem = (time: string) => items.find((i) => i.startTime === time);

    return (
      <div className="flex-1 flex flex-col gap-2 relative p-4">
        <h4 className="font-bold text-lg mb-4 text-center capitalize">{day}</h4>
        {allTimeSlots.map((slot) => {
          const formatted = formatTime(slot);
          const item = getItem(formatted);

          return (
            <motion.div
              key={formatted}
              className={`border rounded h-14 px-3 flex items-center justify-between shadow-sm ${
                isDark
                  ? "bg-gray-800 border-gray-700 text-gray-200"
                  : "bg-white/80 border-gray-200 text-gray-700 backdrop-blur-md"
              }`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => onDrop(e, day, formatted)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              layout
            >
              {item ? (
                <>
                  <span>
                    {item.activity.icon} {item.activity.name}
                  </span>
                  <Trash2
                    className="cursor-pointer text-gray-500 hover:text-red-500"
                    onClick={() => onRemoveActivity(item.id)}
                  />
                </>
              ) : (
                <span className="text-gray-400">{formatted}</span>
              )}
            </motion.div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col items-center gap-8">
      {/* Toggle Buttons */}
      <div className="flex gap-4">
        {["saturday", "sunday"].map((day) => (
          <button
            key={day}
            onClick={() => setActiveDay(day as "saturday" | "sunday")}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 shadow-md ${
              activeDay === day
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white scale-105"
                : isDark
                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
          >
            {day.charAt(0).toUpperCase() + day.slice(1)}
          </button>
        ))}
      </div>

      {/* Animated Schedule */}
      <div className="relative w-full max-w-5xl overflow-hidden">
        <AnimatePresence mode="wait">
          {activeDay === "saturday" ? (
            <motion.div
              key="saturday"
              initial={{ x: -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 80, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="w-full"
            >
              <DayColumn day="saturday" items={saturday} />
            </motion.div>
          ) : (
            <motion.div
              key="sunday"
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -80, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="w-full"
            >
              <DayColumn day="sunday" items={sunday} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WeekendSchedule;
