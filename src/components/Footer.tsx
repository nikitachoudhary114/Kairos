import { Calendar, Twitter, Instagram, Facebook, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300 py-16 relative overflow-hidden">
      {/* subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-950/95 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 via-violet-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-md">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Weekendly
              </span>
            </div>
            <p className="leading-relaxed max-w-md mb-6 text-gray-400">
              Turn your weekends into extraordinary adventures. Plan activities,
              meals, and moods with the most intuitive weekend planning app.
            </p>
            <div className="flex items-center gap-4">
              {[Twitter, Instagram, Facebook, Mail].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-800/60 hover:bg-indigo-600 hover:text-white transition-colors shadow-md"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-3">
              {["Features", "Pricing", "Mobile App", "Integrations"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-indigo-400 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {["About", "Blog", "Careers", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-indigo-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2024 Weekendly. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="hover:text-indigo-400 transition-colors"
                >
                  {item}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
