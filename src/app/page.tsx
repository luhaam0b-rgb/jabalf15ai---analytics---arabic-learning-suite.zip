"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Dashboard from "@/components/Dashboard";
import AlphabetView from "@/components/AlphabetView";
import VocabularyView from "@/components/VocabularyView";
import QuizView from "@/components/QuizView";
import AnalyticsView from "@/components/AnalyticsView";

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderTab = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard setActiveTab={setActiveTab} />;
      case "alphabet":
        return <AlphabetView />;
      case "vocabulary":
        return <VocabularyView />;
      case "quiz":
        return <QuizView />;
      case "analytics":
        return <AnalyticsView />;
      default:
        return <Dashboard setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderTab()}
      </main>
      <footer className="text-center py-6 text-purple-500/60 text-sm border-t border-purple-900/30 mt-12">
        <p>Arabic Learning Suite — تعلم العربية مع التحليلات المتقدمة</p>
      </footer>
    </div>
  );
}
