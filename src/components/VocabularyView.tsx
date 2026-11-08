"use client";

import { useState } from "react";
import { vocabulary } from "@/lib/data";

const levels = ["الكل", "مبتدئ", "متوسط", "متقدم"];

export default function VocabularyView() {
  const [level, setLevel] = useState("الكل");
  const [search, setSearch] = useState("");
  const [flipped, setFlipped] = useState<number | null>(null);

  const filtered = vocabulary.filter((v) => {
    const matchLevel = level === "الكل" || v.level === level;
    const matchSearch =
      v.arabic.includes(search) ||
      v.english.toLowerCase().includes(search.toLowerCase()) ||
      v.category.includes(search);
    return matchLevel && matchSearch;
  });

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">المفردات</h2>
        <p className="text-purple-300">اضغط على البطاقة لترى الترجمة</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="ابحث عن كلمة..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-white/10 border border-purple-500/30 rounded-xl px-4 py-3 text-white placeholder-purple-400 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all"
          dir="rtl"
        />
        <div className="flex gap-2">
          {levels.map((l) => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                level === l
                  ? "bg-purple-600 text-white shadow-lg"
                  : "bg-white/10 text-purple-300 hover:bg-purple-800/40"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="text-purple-400 text-sm">
        {filtered.length} كلمة
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((word, i) => (
          <button
            key={i}
            onClick={() => setFlipped(flipped === i ? null : i)}
            className="group relative h-36 rounded-2xl transition-all duration-300"
          >
            <div
              className={`absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-4 border transition-all duration-300 ${
                flipped === i
                  ? "bg-purple-600 border-purple-400 shadow-xl shadow-purple-500/30"
                  : "bg-white/5 border-white/10 hover:bg-purple-800/30 hover:border-purple-500/40"
              }`}
            >
              {flipped === i ? (
                <>
                  <div className="text-white font-bold text-lg">
                    {word.english}
                  </div>
                  <div className="text-purple-200 text-xs mt-1">
                    {word.category}
                  </div>
                </>
              ) : (
                <>
                  <div className="arabic-text text-2xl font-bold text-white">
                    {word.arabic}
                  </div>
                  <div className="mt-2 flex gap-2">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        word.level === "مبتدئ"
                          ? "bg-green-500/20 text-green-300"
                          : word.level === "متوسط"
                            ? "bg-yellow-500/20 text-yellow-300"
                            : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {word.level}
                    </span>
                  </div>
                </>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
