import React, { useState, useEffect } from "react";
import type { Activity, ScheduleItem } from "@/types";
import { v4 as uuid } from "uuid";
import Header from "@/components/ActivityPage/Header";
import ActivityLibrary from "@/components/ActivityPage/ActivityLibrary";
import { activities } from "@/data/activities";
import WeekendSchedule from "@/components/ActivityPage/WeekendSchedule";
import WeekendSummary from "@/components/ActivityPage/WeekendSummary";
import PlanActions from "@/components/ActivityPage/PlanActions";
import { useToast } from "@/components/ui/toaster";
import { useThemeContext } from "@/context/ThemeProvider";
// import domtoimage from "dom-to-image-more";
import * as htmlToImage from "html-to-image";

function Activity() {
  const [saturday, setSaturday] = useState<ScheduleItem[]>([]);
  const [sunday, setSunday] = useState<ScheduleItem[]>([]);
  const [dragActivity, setDragActivity] = useState<Activity | null>(null);

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

  const handleDragStart = (
    e: React.DragEvent,
    activity: Activity
  ) => {
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
      // MOVE existing item
      updated = updated.map((i) =>
        i.id === parsed.id ? { ...i, startTime: time } : i
      );
      return updated;
    }

    if (parsed.type === "activity") {
      const activity: Activity = parsed.activity;
      const newItem: ScheduleItem = {
        id: uuid(),
        activity,
        startTime: time,
        day,
      };

      // Push down logic
      const newDuration = activity.duration;
      const dropHour = parseInt(time.split(":")[0], 10);

      updated = updated.map((i) => {
        const itemHour = parseInt(i.startTime.split(":")[0], 10);
        if (itemHour >= dropHour) {
          const newHour = itemHour + newDuration;
          const newSuffix = newHour >= 12 ? "PM" : "AM";
          const display = newHour > 12 ? newHour - 12 : newHour;
          return { ...i, startTime: `${display}:00 ${newSuffix}` };
        }
        return i;
      });

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
      pixelRatio: 3, // replaces scale
      backgroundColor: "#ffffff", // replaces bgcolor
    })
    .then((dataUrl) => {
      const link = document.createElement("a");
      link.download = "weekend-plan.png";
      link.href = dataUrl;
      link.click();
    })
    .catch((err) => {
      console.error("Export failed:", err);
    });
};





  return (
    <div
      className={`relative min-h-screen container mx-auto px-8 py-10 transition-colors duration-300 mt-16`}
    >
      {/* Floating Glow Orbs */}
      <div
        className={`absolute top-12 left-10 w-8 h-8 rounded-full opacity-40 animate-bounce ${
          isDark ? "bg-indigo-400/40" : "bg-indigo-600/40"
        }`}
      />
      <div
        className="absolute bottom-24 right-14 w-10 h-10 rounded-full opacity-30 animate-bounce"
        style={{ animationDelay: "1.5s" }}
      >
        <div
          className={`w-full h-full rounded-full ${
            isDark ? "bg-cyan-400/40" : "bg-cyan-500/40"
          }`}
        />
      </div>
      <div
        className={`absolute top-1/3 right-20 w-6 h-6 rounded-full opacity-40 animate-bounce ${
          isDark ? "bg-violet-400/40" : "bg-violet-500/40"
        }`}
        style={{ animationDelay: "2s" }}
      />

      {/* Page Header */}
      <Header />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10 items-start">
        {/* Activity Library */}
        <div
          className={`rounded-2xl p-6 backdrop-blur-md border h-full flex flex-col transition ${
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

        <div className="flex flex-col gap-8">
          {/* Weekend Schedule */}
          <div
             id="schedule-export-all"
            className={`rounded-2xl p-6 backdrop-blur-md border h-full flex flex-col transition ${
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


          {/* Hidden export layout */}
<div
  id="schedule-export-all"
  className="hidden absolute left-[-9999px] top-0 w-[1000px] bg-white p-6 rounded-2xl shadow-lg"
>
  <h2 className="text-2xl font-bold mb-4 text-center">Weekend Plan</h2>

  <div className="flex gap-8">
    {/* Saturday */}
    <div className="flex-1">
      <h3 className="text-xl font-semibold mb-2">Saturday</h3>
      <WeekendSchedule
        saturday={saturday}
        sunday={[]} // empty, we only want Sat
        onDrop={handleDrop}
        onRemoveActivity={handleRemove}
      />
    </div>

    {/* Sunday */}
    <div className="flex-1">
      <h3 className="text-xl font-semibold mb-2">Sunday</h3>
      <WeekendSchedule
        saturday={[]} // empty, we only want Sun
        sunday={sunday}
        onDrop={handleDrop}
        onRemoveActivity={handleRemove}
      />
    </div>
  </div>
</div>


          {/* Actions */}
          <div className="backdrop-blur-md transition">
            <PlanActions
              saturday={saturday}
              sunday={sunday}
              onClear={handleClear}
              onSave={handleSave}
              onExport={exportPoster}
            />
          </div>

          {/* Weekend Summary */}
          <div
            className={`rounded-2xl p-6 backdrop-blur-md border transition ${
              isDark
                ? "bg-gray-900/80 border-gray-800"
                : "bg-white/70 border-gray-200 shadow-sm"
            }`}
          >
            <WeekendSummary saturday={saturday} sunday={sunday} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Activity;
