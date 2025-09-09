import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Mail, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const perks = [
  { color: "violet", text: "Free 14-day trial" },
  { color: "indigo", text: "No credit card required" },
  { color: "fuchsia", text: "Cancel anytime" },
];

const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      {/* Glow accents */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-violet-500/20 blur-3xl rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-indigo-500/20 blur-3xl rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Animated Calendar */}
          <motion.div
            className="mx-auto mb-8"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
          >
            <Calendar className="w-16 h-16 text-violet-400" />
          </motion.div>

          {/* Heading */}
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-violet-400 via-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">
            Your Best Weekend
            <span className="block">Starts Here</span>
          </h2>

          {/* Description */}
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of weekend warriors who've discovered the secret to
            perfectly planned Saturdays and Sundays. Your future self will thank
            you.
          </p>

          {/* Email input + button */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <Input
                placeholder="Enter your email"
                className="pl-12 h-14 text-lg bg-gray-800 border border-gray-700 text-gray-200 placeholder:text-gray-500 focus:ring-2 focus:ring-violet-500/60"
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
                className="h-14 px-8 text-lg font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg transition-all"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </motion.div>

          {/* CTA perks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-400">
            {perks.map((perk, idx) => (
              <motion.div
                key={idx}
                className="flex items-center justify-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
              >
                <div
                  className={`w-6 h-6 bg-${perk.color}-500/20 rounded-full flex items-center justify-center`}
                >
                  <div
                    className={`w-2 h-2 bg-${perk.color}-500 rounded-full`}
                  />
                </div>
                <span>{perk.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Floating orbs */}
      <motion.div
        className="absolute top-20 left-20 w-8 h-8 bg-violet-500/20 rounded-full"
        animate={{ y: [0, -10, 0], x: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-12 h-12 bg-indigo-500/20 rounded-full"
        animate={{ y: [0, 10, 0], x: [0, -10, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "mirror",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute top-1/2 left-10 w-6 h-6 bg-fuchsia-500/20 rounded-full"
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
