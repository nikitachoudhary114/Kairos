import React from "react";
import { motion } from "framer-motion";
import { useThemeContext } from "@/context/ThemeProvider";

const Header: React.FC = () => {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";

  // Light theme gradient & text
  const bgLight = "bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200";
  const textLight = "text-gray-800";

  // Dark theme gradient & text
  const bgDark =
    "bg-gradient-to-r from-indigo-800 via-violet-700 to-fuchsia-700";
  const textDark = "text-white";

  return (
    <header className="relative py-6 mb-8 rounded-xl shadow-lg overflow-hidden">
      {/* Background gradient depending on theme */}
      <div
        className={`absolute inset-0 rounded-xl ${isDark ? bgDark : bgLight}`}
      />

      {/* Floating orbs */}
      <div
        className={`absolute top-2 left-4 w-4 h-4 rounded-full opacity-50 animate-bounce ${
          isDark ? "bg-violet-500/50" : "bg-indigo-500/50"
        }`}
      />
      <div
        className={`absolute bottom-2 right-6 w-6 h-6 rounded-full opacity-40 animate-bounce`}
        style={{ animationDelay: "1s" }}
      >
        <div
          className={
            isDark
              ? "bg-indigo-400/50 w-full h-full rounded-full"
              : "bg-pink-300/50 w-full h-full rounded-full"
          }
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1
          className={`text-3xl md:text-4xl font-bold ${
            isDark ? textDark : textLight
          }`}
        >
          Weekend Planner
        </h1>
        <p
          className={`mt-1 text-sm md:text-base ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Your weekend, your way—schedule, play, and create memories every step
          of the way!
        </p>
      </motion.div>
    </header>
  );
};

export default Header;
