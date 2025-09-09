import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  UtensilsCrossed,
  Smile,
  Clock,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

const Features = () => {
  const features = [
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description:
        "Drag, drop, and arrange your weekend activities with our intuitive calendar interface.",
      gradient: "from-violet-500/30 to-indigo-500/30",
    },
    {
      icon: UtensilsCrossed,
      title: "Meal Planning",
      description:
        "Discover restaurants, plan home cooking, or find the perfect brunch spots for your weekend.",
      gradient: "from-purple-500/30 to-fuchsia-500/30",
    },
    {
      icon: Smile,
      title: "Mood Matching",
      description:
        "Choose your weekend vibe - adventurous, relaxing, social, or romantic - and get personalized suggestions.",
      gradient: "from-indigo-500/30 to-violet-500/30",
    },
    {
      icon: Clock,
      title: "Time Optimization",
      description:
        "Smart algorithms ensure you have enough time for everything while avoiding rushed schedules.",
      gradient: "from-violet-500/30 to-fuchsia-500/30",
    },
    {
      icon: Users,
      title: "Social Coordination",
      description:
        "Invite friends, coordinate group activities, and share your weekend plans seamlessly.",
      gradient: "from-indigo-500/30 to-violet-500/30",
    },
    {
      icon: Zap,
      title: "Instant Updates",
      description:
        "Real-time weather, traffic, and venue updates keep your plans flexible and stress-free.",
      gradient: "from-violet-500/30 to-indigo-500/30",
    },
  ];

  // Define Framer Motion variants
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="py-24 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-violet-500/20 blur-3xl rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-indigo-500/20 blur-3xl rounded-full" />
      </div>

      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={container}
        >
          <motion.h2
            className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-violet-400 via-indigo-400 to-fuchsia-400 bg-clip-text text-transparent"
            variants={item}
          >
            Weekend Planning Made Simple
          </motion.h2>
          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
            variants={item}
          >
            Every feature is designed to turn your weekend planning from a chore
            into an exciting preview of the amazing time ahead.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={container}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={item}>
              <Card className="p-8 border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950 hover:shadow-xl hover:shadow-violet-500/20 transition-all duration-300 hover:scale-105 group">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className="w-8 h-8 text-white drop-shadow-md" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Button
            size="lg"
            className="text-lg px-8 py-6 bg-gradient-to-r from-violet-600 via-indigo-600 to-fuchsia-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-violet-500/40 hover:scale-105 transition-all"
          >
            Explore All Features
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
