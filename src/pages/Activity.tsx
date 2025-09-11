import React, { useState, useEffect } from "react";
import type { IActivity, ScheduleItem } from "@/types";
import Header from "@/components/ActivityPage/Header";
import ActivityLibrary from "@/components/ActivityPage/ActivityLibrary";
import { activities } from "@/data/activities";
import WeekendSchedule from "@/components/ActivityPage/WeekendSchedule";
import WeekendSummary from "@/components/ActivityPage/WeekendSummary";
import PlanActions from "@/components/ActivityPage/PlanActions";
import { useToast } from "@/components/ui/toaster";
import { useThemeContext } from "@/context/ThemeProvider";
import * as htmlToImage from "html-to-image";
import { motion } from "framer-motion";

function Activity() {
  const [saturday, setSaturday] = useState<ScheduleItem[]>([]);
  const [sunday, setSunday] = useState<ScheduleItem[]>([]);

  const { toast } = useToast();
  const { theme } = useThemeContext();
  const isDark = theme === "dark";

  useEffect(() => {
    const savedSat = localStorage.getItem("saturday");
    const savedSun = localStorage.getItem("sunday");
    if (savedSat) setSaturday(JSON.parse(savedSat));
    if (savedSun) setSunday(JSON.parse(savedSun));
  }, []);

  useEffect(() => {
    localStorage.setItem("saturday", JSON.stringify(saturday));
    localStorage.setItem("sunday", JSON.stringify(sunday));
  }, [saturday, sunday]);

  const handleDragStart = (e: React.DragEvent, activity: IActivity) => {
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({ type: "activity", activity })
    );
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    day: "saturday" | "sunday",
    time: string
  ) => {
    e.preventDefault();
    const setDay = day === "saturday" ? setSaturday : setSunday;
    const data = e.dataTransfer.getData("application/json");
    if (!data) return;

    const parsed = JSON.parse(data);

    setDay((prev) => {
      let updated = [...prev];

      if (parsed.type === "schedule") {
        updated = updated.map((i) =>
          i.id === parsed.id ? { ...i, startTime: time } : i
        );
        return updated;
      }

      if (parsed.type === "activity") {
        const activity = parsed.activity;
        const newItemStart = parseInt(time.split(":")[0], 10);
        const newItemEnd = newItemStart + activity.duration;

        updated = updated.map((i) => {
          const existingStart = parseInt(i.startTime.split(":")[0], 10);
          const existingEnd = existingStart + i.activity.duration;

          if (existingStart < newItemEnd && existingEnd > newItemStart) {
            const shiftedStart = newItemEnd;
            const suffix = shiftedStart >= 12 ? "PM" : "AM";
            const display =
              shiftedStart > 12 ? shiftedStart - 12 : shiftedStart;
            return { ...i, startTime: `${display}:00 ${suffix}` };
          }
          return i;
        });

        const newItem = {
          id: crypto.randomUUID(),
          activity,
          startTime: time,
          day,
        };
        return [...updated, newItem];
      }

      return prev;
    });
  };

  const handleRemove = (id: string) => {
    setSaturday((prev) => prev.filter((i) => i.id !== id));
    setSunday((prev) => prev.filter((i) => i.id !== id));
  };

  const handleClear = () => {
    setSaturday([]);
    setSunday([]);
  };

  const handleSave = () =>
    toast({
      title: "Plan Saved!",
      description: "Your weekend plan is stored.",
    });

  const exportPoster = () => {
    const schedule = document.getElementById("schedule-export-all");
    if (!schedule) return;

    htmlToImage
      .toPng(schedule, {
        pixelRatio: 3,
        backgroundColor: "#ffffff",
      })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "weekend-plan.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => console.error("Export failed:", err));
  };

  return (
    <div
      className={`relative min-h-screen container mx-auto px-4 sm:px-6 lg:px-8 py-10 transition-colors duration-300 mt-16`}
    >
      {/* Page Header */}
      <Header />

      <motion.div
        className="flex flex-col lg:flex-row gap-6 lg:gap-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Left column */}
        <motion.div
          className="flex-1 flex flex-col gap-6 order-1 lg:order-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Activity Library */}
          <div
            className={`rounded-2xl p-6 backdrop-blur-md border transition-colors h-full ${
              isDark
                ? "bg-gray-900/80 border-gray-800"
                : "bg-white/70 border-gray-200 shadow-sm"
            }`}
          >
            <ActivityLibrary
              activities={activities}
              onDragStart={handleDragStart}
            />
          </div>

          {/* Weekend Summary (below Activity Library on large screens) */}
          <div
            className={`rounded-2xl p-6 backdrop-blur-md border transition-colors ${
              isDark
                ? "bg-gray-900/80 border-gray-800"
                : "bg-white/70 border-gray-200 shadow-sm"
            }`}
          >
            <WeekendSummary saturday={saturday} sunday={sunday} />
          </div>
        </motion.div>

        {/* Right column */}
        <motion.div
          className="flex-1 flex flex-col gap-6 order-2 lg:order-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Weekend Schedule */}
          <div
            id="schedule-export-all"
            className={`rounded-2xl p-6 backdrop-blur-md border transition-colors h-full flex flex-col ${
              isDark
                ? "bg-gray-900/80 border-gray-800"
                : "bg-white/70 border-gray-200 shadow-sm"
            }`}
          >
            <WeekendSchedule
              saturday={saturday}
              sunday={sunday}
              onDrop={handleDrop}
              onRemoveActivity={handleRemove}
            />
          </div>

          {/* Plan Actions */}
          <PlanActions
            saturday={saturday}
            sunday={sunday}
            onClear={handleClear}
            onSave={handleSave}
            onExport={exportPoster}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Activity;
