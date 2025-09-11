import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Mail, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useThemeContext } from "@/context/ThemeProvider";

const perks = [
  { color: "violet", text: "Free 14-day trial" },
  { color: "indigo", text: "No credit card required" },
  { color: "fuchsia", text: "Cancel anytime" },
];

const CTA = () => {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";

  const sectionBg = isDark
    ? "bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950"
    : "bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50";

  const textColor = isDark ? "text-gray-400" : "text-gray-700";
  const inputBg = isDark
    ? "bg-gray-800 border-gray-700 text-gray-200 placeholder:text-gray-500"
    : "bg-white border-gray-300 text-gray-800 placeholder:text-gray-500";

  return (
    <section
      className={`py-16 md:py-24 relative overflow-hidden transition-colors ${sectionBg}`}
    >
      {/* Glow accents */}
      <div className="absolute inset-0 -z-10">
        <div
          className={`absolute top-1/3 left-1/4 w-56 md:w-72 h-56 md:h-72 blur-3xl rounded-full transition-colors ${
            isDark ? "bg-violet-500/20" : "bg-violet-200/40"
          }`}
        />
        <div
          className={`absolute bottom-1/4 right-1/4 w-56 md:w-72 h-56 md:h-72 blur-3xl rounded-full transition-colors ${
            isDark ? "bg-indigo-500/20" : "bg-indigo-200/40"
          }`}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Animated Calendar */}
          <motion.div
            className="mx-auto mb-6 md:mb-8"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
          >
            <Calendar
              className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto ${
                isDark ? "text-violet-400" : "text-violet-600"
              }`}
            />
          </motion.div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight bg-gradient-to-r from-violet-400 via-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">
            Your Best Weekend
            <span className="block">Starts Here</span>
          </h2>

          {/* Description */}
          <p
            className={`text-lg sm:text-xl mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed transition-colors ${textColor}`}
          >
            Join thousands of weekend warriors who've discovered the secret to
            perfectly planned Saturdays and Sundays. Your future self will thank
            you.
          </p>

          {/* Email input + button */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 md:mb-12 max-w-md sm:max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative flex-1">
              <Mail
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
                  isDark ? "text-gray-500" : "text-gray-400"
                }`}
              />
              <Input
                placeholder="Enter your email"
                className={`pl-12 h-12 sm:h-14 text-base sm:text-lg transition-colors ${inputBg} focus:ring-2 focus:ring-violet-500/60`}
              />
            </div>
            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 25px rgba(139, 92, 246, 0.4)",
              }}
            >
              <Button
                size="lg"
                className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg transition-all"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </motion.div>

          {/* CTA perks */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 transition-colors ${textColor}`}
          >
            {perks.map((perk, idx) => (
              <motion.div
                key={idx}
                className="flex items-center justify-center gap-2 sm:gap-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
              >
                <div
                  className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition-colors ${
                    isDark
                      ? `bg-${perk.color}-500/20`
                      : `bg-${perk.color}-500/30`
                  }`}
                >
                  <div
                    className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-colors ${
                      isDark ? `bg-${perk.color}-500` : `bg-${perk.color}-600`
                    }`}
                  />
                </div>
                <span className="text-sm sm:text-base">{perk.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Floating orbs */}
      <motion.div
        className={`absolute top-16 left-16 w-6 h-6 md:w-8 md:h-8 rounded-full transition-colors ${
          isDark ? "bg-violet-500/20" : "bg-violet-400/40"
        }`}
        animate={{ y: [0, -10, 0], x: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        className={`absolute bottom-16 right-16 w-10 h-10 md:w-12 md:h-12 rounded-full transition-colors ${
          isDark ? "bg-indigo-500/20" : "bg-indigo-400/40"
        }`}
        animate={{ y: [0, 10, 0], x: [0, -10, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "mirror",
          delay: 1,
        }}
      />
      <motion.div
        className={`absolute top-1/2 left-8 w-4 h-4 md:w-6 md:h-6 rounded-full transition-colors ${
          isDark ? "bg-fuchsia-500/20" : "bg-fuchsia-400/40"
        }`}
        animate={{ y: [0, -8, 0], x: [0, 8, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "mirror",
          delay: 2,
        }}
      />
    </section>
  );
};

export default CTA;
