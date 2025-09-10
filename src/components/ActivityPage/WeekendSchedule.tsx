import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import type { ScheduleItem } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeContext } from "@/context/ThemeProvider";

interface Props {
  saturday: ScheduleItem[];
  sunday: ScheduleItem[];
  onDrop: (
    e: React.DragEvent<HTMLDivElement>,
    day: "saturday" | "sunday",
    time: string
  ) => void;
  onRemoveActivity: (id: string) => void;
}

const allTimeSlots = Array.from({ length: 16 }, (_, i) => 8 + i); // 8 AM – 11 PM

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
    const display = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${display}:00 ${suffix}`;
  };

  const parseHour = (time: string) => {
    const [h, rest] = time.split(":");
    let hour = parseInt(h, 10);
    if (rest.includes("PM") && hour !== 12) hour += 12;
    if (rest.includes("AM") && hour === 12) hour = 0;
    return hour;
  };

  const getEndTime = (start: string, duration: number) => {
    const startHour = parseHour(start);
    const endHour = (startHour + duration) % 24;
    return formatTime(endHour);
  };

  const DayColumn = ({
    day,
    items,
  }: {
    day: "saturday" | "sunday";
    items: ScheduleItem[];
  }) => {
    // Sort by actual hour, not string
    const sorted = [...items].sort(
      (a, b) => parseHour(a.startTime) - parseHour(b.startTime)
    );

    return (
      <div className="flex-1 p-4">
        <h4 className="font-bold text-lg mb-4 text-center capitalize">{day}</h4>

        <div
          className="grid gap-2 relative"
          style={{ gridTemplateRows: `repeat(${allTimeSlots.length}, 3.5rem)` }}
        >
          {allTimeSlots.map((slot) => {
            const formatted = formatTime(slot);
            const item = sorted.find((i) => i.startTime === formatted);

            // If this slot is covered by a longer event, skip it
            const isCovered = sorted.some((i) => {
              const start = parseHour(i.startTime);
              const end = start + i.activity.duration;
              return slot > start && slot < end; // this hour lies inside an event
            });

            if (isCovered) return null;

            if (item) {
              const duration = item.activity.duration;
              const endTime = getEndTime(item.startTime, duration);

              return (
                <motion.div
                  key={item.id}
                  className={`border rounded px-3 py-2 flex flex-col justify-between shadow-sm cursor-move ${
                    isDark
                      ? "bg-blue-900 text-white"
                      : "bg-blue-100 text-blue-800"
                  }`}
                  style={{ gridRow: `span ${duration}` }}
                  layout
                >
                  <div
                    draggable
                    onDragStart={(e: React.DragEvent<HTMLDivElement>) => {
                      e.dataTransfer.setData(
                        "application/json",
                        JSON.stringify({ type: "schedule", id: item.id })
                      );
                    }}
                    className="flex justify-between items-center w-full h-full"
                  >
                    <span>
                      {item.activity.icon} {item.activity.name} ({duration}h)
                    </span>
                    <Trash2
                      className="cursor-pointer text-gray-400 hover:text-red-500"
                      onClick={() => onRemoveActivity(item.id)}
                    />
                  </div>
                  <span className="text-xs opacity-80">
                    {item.startTime} → {endTime}
                  </span>
                </motion.div>
              );
            }

            // render empty slot only if not covered
            return (
              <div
                key={formatted}
                className={`border rounded px-3 flex items-center text-sm justify-start ${
                  isDark
                    ? "bg-gray-800 text-gray-400"
                    : "bg-white text-gray-500"
                }`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => onDrop(e, day, formatted)}
              >
                {formatted}
              </div>
            );
          })}
        </div>
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
