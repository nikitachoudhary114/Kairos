import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero2.jpg";
import { CalendarDays, Sparkles, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useThemeContext } from "@/context/ThemeProvider";

const Hero = () => {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";

  // Light theme classes (soft whites)
  const bgLight = "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200";
  const textLight = "text-gray-800";
  const descLight = "text-gray-600";
  const borderLight = "border-gray-200";
  const outlineBtnLight =
    "border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-800";

  return (
    <section
      className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-colors ${
        isDark
          ? "bg-gradient-to-br from-gray-950 via-zinc-900 to-gray-800"
          : bgLight
      }`}
    >
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='24' height='24' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 24 0 L 0 0 0 24' fill='none' stroke='rgba(0,0,0,0.03)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left animate-fadeInUp">
            {/* Badge */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
              <Sparkles
                className={`w-6 h-6 animate-pulse ${
                  isDark ? "text-indigo-400" : "text-indigo-500"
                }`}
              />
              <span
                className={`font-medium tracking-wider uppercase text-sm ${
                  isDark ? "text-indigo-300" : "text-indigo-600"
                }`}
              >
                Weekend Magic Awaits
              </span>
            </div>

            {/* Heading */}
            <h1
              className={`text-5xl lg:text-7xl font-extrabold mb-6 leading-tight ${
                isDark ? "text-white" : textLight
              }`}
            >
              Plan Your{" "}
              <span className="block bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Perfect Weekend
              </span>
            </h1>

            {/* Description */}
            <p
              className={`text-lg mb-8 leading-relaxed max-w-2xl transition-colors ${
                isDark ? "text-gray-300" : descLight
              }`}
            >
              Turn ordinary Saturdays and Sundays into extraordinary adventures.
              Choose activities, plan meals, set your mood, and let Weekendly
              craft your personalized weekend schedule.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/activity">
                <Button className="text-lg px-8 py-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 shadow-lg transition">
                  <CalendarDays className="w-5 h-5" />
                  Start Planning Now
                </Button>
              </Link>
              <Button
                variant="outline"
                className={`text-lg px-8 py-6 rounded-xl flex items-center gap-2 transition ${
                  isDark
                    ? "border border-gray-600 text-gray-400 hover:bg-gray-800/60 hover:text-white"
                    : outlineBtnLight
                }`}
              >
                <Heart className="w-5 h-5" />
                See How It Works
              </Button>
            </div>

            {/* Trust Badges */}
            <div
              className={`mt-12 flex items-center justify-center lg:justify-start gap-8 transition-colors ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm">Free to Start</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
                <span className="text-sm">No Credit Card</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
                <span className="text-sm">Instant Setup</span>
              </div>
            </div>
          </div>

          {/* Right Side - Hero Image */}
          <div
            className="relative animate-fadeInUp"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="relative">
              <img
                src={heroImage}
                alt="Friends planning their perfect weekend with Weekendly app"
                className={`w-full h-auto rounded-2xl shadow-2xl border transition-colors ${
                  isDark ? "border-gray-700" : borderLight
                }`}
              />
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-tr from-indigo-500 to-cyan-400 rounded-full opacity-80 blur-lg animate-pulse" />
              <div
                className="absolute -bottom-6 -left-8 w-28 h-28 bg-gradient-to-tr from-purple-500 to-indigo-500 rounded-full opacity-70 blur-lg animate-pulse"
                style={{ animationDelay: "1s" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Accent Elements */}
      <div
        className={`absolute top-20 left-12 w-6 h-6 rounded-full opacity-60 animate-bounce ${
          isDark ? "bg-indigo-400" : "bg-indigo-600/70"
        }`}
      />
      <div
        className={`absolute bottom-32 right-16 w-8 h-8 rounded-full opacity-40 animate-bounce ${
          isDark ? "bg-cyan-400" : "bg-cyan-500/60"
        }`}
        style={{ animationDelay: "2s" }}
      />
      <div
        className={`absolute top-1/3 right-15 w-4 h-4 rounded-full opacity-50 animate-bounce ${
          isDark ? "bg-violet-400" : "bg-violet-500/60"
        }`}
        style={{ animationDelay: "1.5s" }}
      />
    </section>
  );
};

export default Hero;
