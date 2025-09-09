import { Card } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import {
  motion,
  useInView,
  animate,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Marketing Manager",
      content:
        "Weekendly transformed how I plan my free time. No more wasted Saturdays wondering what to do - every weekend feels like a mini vacation now!",
      rating: 5,
      avatar: "SC",
    },
    {
      name: "Mike Rodriguez",
      role: "Software Developer",
      content:
        "The mood matching feature is incredible. Whether I want adventure or relaxation, Weekendly knows exactly what to suggest. My weekends have never been better.",
      rating: 5,
      avatar: "MR",
    },
    {
      name: "Emma Thompson",
      role: "Teacher",
      content:
        "Planning date nights and friend hangouts used to be so stressful. Now my boyfriend and I just use Weekendly and everything falls into place perfectly.",
      rating: 5,
      avatar: "ET",
    },
  ];

  // Stats animation hooks
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true });

  const [happyPlanners, setHappyPlanners] = useState(0);
  const [weekendsPlanned, setWeekendsPlanned] = useState(0);
  const [appRating, setAppRating] = useState(0);

  useEffect(() => {
    if (statsInView) {
      animate(0, 10000, {
        duration: 2,
        onUpdate(value) {
          setHappyPlanners(Math.round(value));
        },
      });
      animate(0, 500000, {
        duration: 2.5,
        onUpdate(value) {
          setWeekendsPlanned(Math.round(value));
        },
      });
      animate(0, 49, {
        duration: 2,
        onUpdate(value) {
          setAppRating(Math.round(value));
        },
      });
    }
  }, [statsInView]);

  return (
    <section className="py-24 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-violet-500/20 blur-3xl rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-indigo-500/20 blur-3xl rounded-full" />
      </div>

      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-violet-400 via-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">
            Weekend Warriors Love Us
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Join thousands who've discovered the joy of perfectly planned
            weekends
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <Card className="p-8 border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950 shadow-md hover:shadow-xl hover:shadow-violet-500/30 transition-all duration-300 hover:scale-105 group">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <Quote className="w-8 h-8 text-violet-400/40 mb-4" />

                <p className="text-gray-400 leading-relaxed mb-6">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats block */}
        <div ref={statsRef} className="text-center">
          <div className="inline-flex items-center gap-8 p-8 rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950 shadow-lg hover:shadow-violet-500/20 transition-all">
            <div className="text-center">
              <div className="text-3xl font-bold text-violet-400">
                {happyPlanners.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">Happy Planners</div>
            </div>
            <div className="w-px h-12 bg-gray-800"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-400">
                {weekendsPlanned.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">Weekends Planned</div>
            </div>
            <div className="w-px h-12 bg-gray-800"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-fuchsia-400">
                {(appRating / 10).toFixed(1)}★
              </div>
              <div className="text-sm text-gray-400">App Store Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
