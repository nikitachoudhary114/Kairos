import { Calendar, Twitter, Instagram, Facebook, Mail } from "lucide-react";
import { useThemeContext } from "@/context/ThemeProvider";

const Footer = () => {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";

  return (
    <footer
      className={`py-16 relative overflow-hidden ${
        isDark ? "bg-gray-950 text-gray-300" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* subtle gradient overlay */}
      <div
        className={`absolute inset-0 pointer-events-none ${
          isDark
            ? "bg-gradient-to-t from-gray-900/70 via-gray-950/95 to-transparent"
            : "bg-gradient-to-t from-gray-200/70 via-gray-100/95 to-transparent"
        }`}
      />

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
            <p
              className={ 
                isDark
                  ? "text-gray-400"
                 : "text-gray-700 leading-relaxed max-w-md mb-6"
              }
            >
              Turn your weekends into extraordinary adventures. Plan activities,
              meals, and moods with the most intuitive weekend planning app.
            </p>
            <div className="flex items-center gap-4 pt-2">
              {[Twitter, Instagram, Facebook, Mail].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors shadow-md ${
                    isDark
                      ? "bg-gray-800/60 hover:bg-indigo-600 hover:text-white"
                      : "bg-gray-200/60 hover:bg-indigo-500 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4
              className={
                isDark
                  ? "text-white font-semibold mb-4"
                  : "text-gray-900 font-semibold mb-4"
              }
            >
              Product
            </h4>
            <ul className="space-y-3">
              {["Features", "Pricing", "Mobile App", "Integrations"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className={`transition-colors ${
                        isDark
                          ? "text-gray-400 hover:text-indigo-400"
                          : "text-gray-700 hover:text-indigo-600"
                      }`}
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
            <h4
              className={
                isDark
                  ? "text-white font-semibold mb-4"
                  : "text-gray-900 font-semibold mb-4"
              }
            >
              Company
            </h4>
            <ul className="space-y-3">
              {["About", "Blog", "Careers", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className={`transition-colors ${
                      isDark
                        ? "text-gray-400 hover:text-indigo-400"
                        : "text-gray-700 hover:text-indigo-600"
                    }`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className={`pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-sm ${
            isDark
              ? "border-gray-800 text-gray-500"
              : "border-gray-200 text-gray-600"
          }`}
        >
          <p>© 2025 Weekendly. All rights reserved.</p>
          <p>Made by Nikita &#10084;</p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className={
                    isDark
                      ? "hover:text-indigo-400 transition-colors"
                      : "hover:text-indigo-600 transition-colors"
                  }
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
