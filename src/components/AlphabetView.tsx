"use client";

import { useState } from "react";
import { arabicLetters } from "@/lib/data";

export default function AlphabetView() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">الحروف العربية</h2>
        <p className="text-purple-300">
          اضغط على أي حرف لتتعلم المزيد عنه
        </p>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-7 gap-3">
        {arabicLetters.map((item, i) => (
          <button
            key={i}
            onClick={() => setSelected(selected === i ? null : i)}
            className={`rounded-2xl p-4 text-center transition-all duration-200 border ${
              selected === i
                ? "bg-purple-600 border-purple-400 shadow-xl shadow-purple-500/30 scale-110"
                : "bg-white/5 border-white/10 hover:bg-purple-800/30 hover:border-purple-500/50 hover:scale-105"
            }`}
          >
            <div className="text-4xl font-bold text-white arabic-text">
              {item.letter}
            </div>
            <div className="text-purple-300 text-xs mt-1">{item.name}</div>
          </button>
        ))}
      </div>

      {selected !== null && (
        <div className="bg-white/5 border border-purple-500/30 rounded-2xl p-6 animate-in slide-in-from-bottom-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="text-8xl font-bold text-purple-400 arabic-text min-w-[100px] text-center">
              {arabicLetters[selected].letter}
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-1">
                {arabicLetters[selected].name}
              </h3>
              <p className="text-purple-300 mb-4">
                النطق: {arabicLetters[selected].transliteration}
              </p>
              <div>
                <p className="text-purple-200 font-medium mb-2">أمثلة:</p>
                <div className="flex flex-wrap gap-2">
                  {arabicLetters[selected].examples.map((ex, j) => (
                    <span
                      key={j}
                      className="bg-purple-700/40 border border-purple-500/30 rounded-lg px-4 py-2 text-white arabic-text text-lg"
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
