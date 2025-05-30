import React from "react";
import { Link } from "react-router-dom";
import { Github, Twitter } from "lucide-react";
import logo from "../../assets/logo.png"

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      label: "GitHub",
      href: "https://github.com/Devemmy01/TypeFury",
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      label: "Twitter",
      href: "https://x.com/Devemmy25",
    },
  ];

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center justify-center">
        <div className="text-center">
          {/* Brand Section */}
          <div className="space-y-4 text-center flex flex-col items-center justify-center">
            <Link to="/" className="flex items-center space-x-2">
              {/* <Keyboard className="w-6 h-6 text-primary dark:text-secondary" /> */}
              <img src={logo} className="w-12 h-12" alt="" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                TypeFury
              </span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xl">
              Improve your typing speed and accuracy with our interactive typing
              test platform. Practice daily, track your progress, and earn
              achievements.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                  aria-label={label}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            © {currentYear} TypeFury. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
