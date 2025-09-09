import { useState, useMemo } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash2, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { activities as allActivities } from "@/data/activities";
import type { Activity as ActivityType } from "@/types";

const days = ["Saturday", "Sunday"];
const MAX_HOURS = 10;

// Category colors
const categoryColors: Record<string, string> = {
  outdoor: "bg-green-500",
  indoor: "bg-purple-500",
  food: "bg-yellow-500",
  social: "bg-pink-500",
  fitness: "bg-cyan-500",
  culture: "bg-indigo-500",
  relaxation: "bg-teal-500",
};

// Sortable activity item
interface SortableItemProps {
  activity: ActivityType;
  day: string;
  removeActivity: (day: string, id: string) => void;
}

const SortableItem = ({ activity, day, removeActivity }: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: activity.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center justify-between bg-gray-800 p-4 rounded-xl shadow hover:shadow-violet-500/30 transition"
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{activity.icon}</span>
        <div>
          <span className="text-white font-medium block">{activity.name}</span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full text-white mt-1 ${
              categoryColors[activity.category]
            }`}
          >
            {activity.category}
          </span>
          <span className="text-gray-400 text-xs block mt-0.5">
            {activity.duration}h
          </span>
        </div>
      </div>
      <button
        onClick={() => removeActivity(day, activity.id)}
        className="text-red-400 hover:text-red-500 transition"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
};

const Activity = () => {
  const [schedule, setSchedule] = useState<{ [key: string]: ActivityType[] }>({
    Saturday: [],
    Sunday: [],
  });
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [lastAdded, setLastAdded] = useState<{ [key: string]: string | null }>({
    Saturday: null,
    Sunday: null,
  });

  // Filtered activities
  const filteredActivities = useMemo(() => {
    return allActivities.filter((act) => {
      const matchesSearch = act.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || act.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [search, categoryFilter]);

  const addActivity = (day: string, activity: ActivityType) => {
    setSchedule((prev) => {
      if (prev[day].some((a) => a.id === activity.id)) return prev;
      setLastAdded((prevAdded) => ({ ...prevAdded, [day]: activity.id }));
      setTimeout(
        () => setLastAdded((prev) => ({ ...prev, [day]: null })),
        1200
      );
      return { ...prev, [day]: [...prev[day], activity] };
    });
  };

  const removeActivity = (day: string, activityId: string) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: prev[day].filter((a) => a.id !== activityId),
    }));
  };

  // DnD Kit
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent, day: string) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      setSchedule((prev) => ({
        ...prev,
        [day]: arrayMove(
          prev[day],
          prev[day].findIndex((a) => a.id === active.id),
          prev[day].findIndex((a) => a.id === over.id)
        ),
      }));
    }
  };

  const totalDuration = (day: string) =>
    schedule[day].reduce((acc, act) => acc + act.duration, 0);

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-400 to-fuchsia-400 text-center mb-12">
          Plan Your Perfect Weekend
        </h1>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
          <input
            type="text"
            placeholder="Search activities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/3 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-violet-500/60 transition"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-violet-500/60 transition"
          >
            <option value="all">All Categories</option>
            {Object.keys(categoryColors).map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-14">
          {filteredActivities.map((activity) => (
            <motion.div
              key={activity.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-800 rounded-2xl p-4 flex flex-col items-center justify-between cursor-pointer hover:bg-gray-700 transition shadow-lg relative"
            >
              <span className="text-3xl mb-2">{activity.icon}</span>
              <span className="text-white font-semibold text-center mt-1">
                {activity.name}
              </span>
              <span
                className={`text-xs px-2 py-1 mt-1 rounded-full text-white ${
                  categoryColors[activity.category]
                }`}
              >
                {activity.category}
              </span>
              <p className="text-gray-400 text-sm text-center mt-1 line-clamp-2">
                {activity.description}
              </p>
              <div className="flex gap-2 mt-3">
                {days.map((day) => (
                  <button
                    key={day}
                    onClick={() => addActivity(day, activity)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                      lastAdded[day] === activity.id
                        ? "bg-green-600 text-white shadow-lg"
                        : "bg-violet-600 hover:bg-violet-700 text-white"
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                    {day}
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Weekend Schedule */}
        <div className="grid md:grid-cols-2 gap-8">
          {days.map((day) => (
            <div key={day} className="bg-gray-900 p-6 rounded-3xl shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-violet-400">{day}</h3>
                <span
                  className={`text-sm font-medium ${
                    totalDuration(day) > MAX_HOURS
                      ? "text-red-400 font-bold"
                      : "text-gray-400"
                  }`}
                >
                  Total Hours: {totalDuration(day)} / {MAX_HOURS}
                </span>
              </div>

              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={(e) => handleDragEnd(e, day)}
              >
                <SortableContext
                  items={schedule[day].map((a) => a.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-4 min-h-[50px]">
                    {schedule[day].map((activity) => (
                      <SortableItem
                        key={activity.id}
                        activity={activity}
                        day={day}
                        removeActivity={removeActivity}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Activity;
