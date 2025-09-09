import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero2.jpg";
import { CalendarDays, Sparkles, Heart } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  const container = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.15, duration: 0.6 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-950 via-zinc-900 to-gray-800">
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='24' height='24' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 24 0 L 0 0 0 24' fill='none' stroke='rgba(255,255,255,0.05)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Left Content */}
          <motion.div className="text-center lg:text-left" variants={item}>
            {/* Badge */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
              <Sparkles className="w-6 h-6 text-indigo-400 animate-pulse" />
              <span className="text-indigo-300 font-medium tracking-wider uppercase text-sm">
                Weekend Magic Awaits
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
              Plan Your{" "}
              <span className="block bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Perfect Weekend
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-2xl">
              Turn ordinary Saturdays and Sundays into extraordinary adventures.
              Choose activities, plan meals, set your mood, and let Weekendly
              craft your personalized weekend schedule.
            </p>

            {/* Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              variants={item}
            >
              <Button className="text-lg px-8 py-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 shadow-lg transition-transform transform hover:-translate-y-1 hover:scale-105">
                <CalendarDays className="w-5 h-5" />
                Start Planning Now
              </Button>
              <Button
                variant="outline"
                className="text-lg px-8 py-6 rounded-xl border border-gray-600 text-gray-500 hover:bg-gray-800/60 hover:text-white flex items-center gap-2 transition-transform transform hover:-translate-y-1 hover:scale-105"
              >
                <Heart className="w-5 h-5" />
                See How It Works
              </Button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-gray-400"
              variants={item}
            >
              {[
                { color: "green", label: "Free to Start" },
                { color: "yellow", label: "No Credit Card" },
                { color: "cyan", label: "Instant Setup" },
              ].map((badge, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                >
                  <div
                    className={`w-3 h-3 bg-${badge.color}-400 rounded-full animate-pulse`}
                  />
                  <span className="text-sm">{badge.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Hero Image */}
          <motion.div
            className="relative"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="relative">
              <img
                src={heroImage}
                alt="Friends planning their perfect weekend with Weekendly app"
                className="w-full h-auto rounded-2xl shadow-2xl border border-gray-700"
              />
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-tr from-indigo-500 to-cyan-400 rounded-full opacity-80 blur-lg animate-pulse" />
              <div
                className="absolute -bottom-6 -left-6 w-28 h-28 bg-gradient-to-tr from-purple-500 to-indigo-500 rounded-full opacity-70 blur-lg animate-pulse"
                style={{ animationDelay: "1s" }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Accent Elements */}
      {[
        { top: "20", left: "10", size: 6, color: "indigo", delay: 0 },
        { bottom: "32", right: "16", size: 8, color: "cyan", delay: 2 },
        { top: "1/3", right: "20", size: 4, color: "violet", delay: 1.5 },
      ].map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute ${orb.top ? `top-${orb.top}` : ""} ${
            orb.bottom ? `bottom-${orb.bottom}` : ""
          } ${orb.left ? `left-${orb.left}` : ""} ${
            orb.right ? `right-${orb.right}` : ""
          } w-${orb.size} h-${orb.size} bg-${
            orb.color
          }-400 rounded-full opacity-50`}
          animate={{
            y: [0, -10, 0],
            x: [0, 10, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "loop",
            delay: orb.delay,
          }}
        />
      ))}
    </section>
  );
};

export default Hero;
