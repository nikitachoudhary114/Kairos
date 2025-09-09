import { Button } from "@/components/ui/button";
import { Calendar, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom"; // <-- import Link

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-lg border-b border-gray-800">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 via-violet-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-md">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Weekendly
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Reviews
            </a>
            <a
              href="#pricing"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Pricing
            </a>
            <a
              href="#support"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Support
            </a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-white hover:bg-gray-800"
            >
              Log In
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800 animate-slide-up">
            <div className="flex flex-col gap-4">
              <a
                href="#features"
                className="text-gray-300 hover:text-white transition-colors py-2"
              >
                Features
              </a>
              <a
                href="#testimonials"
                className="text-gray-300 hover:text-white transition-colors py-2"
              >
                Reviews
              </a>
              <a
                href="#pricing"
                className="text-gray-300 hover:text-white transition-colors py-2"
              >
                Pricing
              </a>
              <a
                href="#support"
                className="text-gray-300 hover:text-white transition-colors py-2"
              >
                Support
              </a>
              <div className="flex flex-col gap-2 pt-4 border-t border-gray-800">
                <Button
                  variant="ghost"
                  className="justify-start text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  Log In
                </Button>
                <Button className="justify-start bg-indigo-600 hover:bg-indigo-700 text-white">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
