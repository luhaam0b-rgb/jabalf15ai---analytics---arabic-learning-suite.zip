"use client";

import { useState } from "react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabs = [
  { id: "dashboard", label: "لوحة التحكم", icon: "📊" },
  { id: "alphabet", label: "الحروف", icon: "أ" },
  { id: "vocabulary", label: "المفردات", icon: "📖" },
  { id: "quiz", label: "اختبار", icon: "✏️" },
  { id: "analytics", label: "التحليلات", icon: "📈" },
];

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-purple-900/50 backdrop-blur-sm border-b border-purple-700/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌙</span>
            <div>
              <h1 className="text-white font-bold text-lg leading-none">
                تعلم العربية
              </h1>
              <p className="text-purple-300 text-xs">Arabic Learning Suite</p>
            </div>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-500/25"
                    : "text-purple-200 hover:text-white hover:bg-purple-800/50"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMenuOpen(false);
                }}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center gap-3 ${
                  activeTab === tab.id
                    ? "bg-purple-600 text-white"
                    : "text-purple-200 hover:bg-purple-800/50"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
