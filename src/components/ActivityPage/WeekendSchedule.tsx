import React, { useState, useEffect } from "react";
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

const TIME_SLOTS = Array.from({ length: 16 }, (_, i) => 8 + i); // 8 AM–11 PM

const WeekendSchedule: React.FC<Props> = ({
  saturday,
  sunday,
  onDrop,
  onRemoveActivity,
}) => {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";
  const [activeDay, setActiveDay] = useState<"saturday" | "sunday">("saturday");

  const [focusedSlot, setFocusedSlot] = useState<{
    day: "saturday" | "sunday";
    index: number;
  } | null>(null);

  const parseHour = (time: string) => {
    const [h, rest] = time.split(":");
    let hour = parseInt(h, 10);
    if (rest.includes("PM") && hour !== 12) hour += 12;
    if (rest.includes("AM") && hour === 12) hour = 0;
    return hour;
  };

  const formatTime = (hour: number) => {
    const suffix = hour >= 12 ? "PM" : "AM";
    const display = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${display}:00 ${suffix}`;
  };

  const getEndTime = (start: string, duration: number) => {
    const startHour = parseHour(start);
    const endHour = (startHour + duration) % 24;
    return formatTime(endHour);
  };

  

 useEffect(() => {
   const handleGlobalKey = (e: KeyboardEvent) => {
     if (!focusedSlot) return;
     let { day, index } = focusedSlot;
     const list = day === "saturday" ? saturday : sunday;

     if (!list || list.length === 0) return;

     if (e.key === "ArrowDown") {
       index = (index + 1) % TIME_SLOTS.length;
       setFocusedSlot({ day, index });
     } else if (e.key === "ArrowUp") {
       index = (index - 1 + TIME_SLOTS.length) % TIME_SLOTS.length;
       setFocusedSlot({ day, index });
     } else if (e.key === "ArrowLeft") {
       const otherDay = day === "saturday" ? "sunday" : "saturday";
       setActiveDay(otherDay);
       setFocusedSlot({ day: otherDay, index: 0 });
     } else if (e.key === "ArrowRight") {
       const otherDay = day === "saturday" ? "sunday" : "saturday";
       setActiveDay(otherDay);
       setFocusedSlot({ day: otherDay, index: 0 });
     } else if (e.key === "Delete" || e.key === "Backspace") {
       const slotEvent = list.find(
         (ev) => parseHour(ev.startTime) === TIME_SLOTS[index]
       );
       if (slotEvent) onRemoveActivity(slotEvent.id);
     }
   };

   window.addEventListener("keydown", handleGlobalKey);
   return () => window.removeEventListener("keydown", handleGlobalKey);
 }, [focusedSlot, saturday, sunday]);

  
  useEffect(() => {
    setFocusedSlot({ day: "saturday", index: 0 });
  }, []);


  const DayColumn = ({
    day,
    items,
  }: {
    day: "saturday" | "sunday";
    items: ScheduleItem[];
  }) => {
    const sorted = [...items].sort(
      (a, b) => parseHour(a.startTime) - parseHour(b.startTime)
    );
    const occupiedHours: number[] = [];
    sorted.forEach((ev) => {
      const start = parseHour(ev.startTime);
      for (let i = 0; i < ev.activity.duration; i++)
        occupiedHours.push(start + i);
    });

    return (
      <div className="flex-1 p-4">
        <h4 className="font-bold text-lg mb-4 text-center capitalize">{day}</h4>
        <div className="flex flex-col gap-2">
          {TIME_SLOTS.map((hour, idx) => {
            const event = sorted.find((ev) => parseHour(ev.startTime) === hour);
            if (event) {
              const duration = event.activity.duration;
              const endTime = getEndTime(event.startTime, duration);
              return (
                <motion.div
                  key={event.id}
                  id={`${day}-slot-${idx}`}
                  tabIndex={0}
                  
                  layout
                  className={`border rounded px-3 py-2 flex flex-col justify-between shadow-sm cursor-move outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDark
                      ? "bg-blue-900 text-white"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  <div
                    draggable
                    onDragStart={(e: React.DragEvent<HTMLDivElement>) =>
                      e.dataTransfer.setData(
                        "application/json",
                        JSON.stringify({ type: "schedule", id: event.id })
                      )
                    }
                    className="flex flex-col"
                  >
                    <div className="flex justify-between items-center">
                      <span>
                        {event.activity.icon} {event.activity.name} ({duration}
                        h)
                      </span>
                      <Trash2
                        className="cursor-pointer text-gray-400 hover:text-red-500"
                        onClick={() => onRemoveActivity(event.id)}
                      />
                    </div>
                    <span className="text-xs opacity-80">
                      {event.startTime} → {endTime}
                    </span>
                  </div>
                </motion.div>
              );
            } else if (!occupiedHours.includes(hour)) {
              return (
                <div
                  key={`slot-${hour}`}
                  id={`${day}-slot-${idx}`}
                  tabIndex={0}
                 

                  className={`border border-dashed rounded px-3 py-2 cursor-pointer text-center outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDark
                      ? "border-gray-600 text-gray-400"
                      : "border-gray-300 text-gray-500"
                  }`}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => onDrop(e, day, formatTime(hour))}
                >
                  Drop here ({formatTime(hour)})
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col items-center gap-8">
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

      <div className="relative w-full max-w-5xl overflow-hidden">
        <AnimatePresence mode="wait">
          {activeDay === "saturday" ? (
            <motion.div
              key="saturday"
              initial={{ x: -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 80, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
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
