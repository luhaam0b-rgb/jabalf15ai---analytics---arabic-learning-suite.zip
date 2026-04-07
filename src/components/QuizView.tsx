"use client";

import { useState, useCallback } from "react";
import { vocabulary } from "@/lib/data";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function generateQuestion(words: typeof vocabulary) {
  const correct = words[Math.floor(Math.random() * words.length)];
  const others = shuffle(words.filter((w) => w !== correct)).slice(0, 3);
  const options = shuffle([correct, ...others]);
  return { correct, options };
}

export default function QuizView() {
  const [started, setStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);
  const [questions, setQuestions] = useState<ReturnType<typeof generateQuestion>[]>([]);
  const totalQuestions = 10;

  const startQuiz = useCallback(() => {
    const qs = Array.from({ length: totalQuestions }, () =>
      generateQuestion(vocabulary)
    );
    setQuestions(qs);
    setQuestionIndex(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
    setStarted(true);
  }, []);

  const handleAnswer = (english: string) => {
    if (selected) return;
    setSelected(english);
    const isCorrect = english === questions[questionIndex].correct.english;
    if (isCorrect) setScore((s) => s + 1);

    setTimeout(() => {
      if (questionIndex + 1 >= totalQuestions) {
        setFinished(true);
      } else {
        setQuestionIndex((q) => q + 1);
        setSelected(null);
      }
    }, 1200);
  };

  if (!started) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-6">
        <div className="text-6xl">✏️</div>
        <h2 className="text-3xl font-bold text-white">اختبر معلوماتك</h2>
        <p className="text-purple-300 text-center max-w-md">
          {totalQuestions} أسئلة متعددة الخيارات عن المفردات العربية. اختر الترجمة الصحيحة لكل كلمة.
        </p>
        <button
          onClick={startQuiz}
          className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all duration-200 shadow-lg shadow-purple-500/30 hover:scale-105"
        >
          ابدأ الاختبار
        </button>
      </div>
    );
  }

  if (finished) {
    const percentage = Math.round((score / totalQuestions) * 100);
    const emoji =
      percentage >= 90 ? "🏆" : percentage >= 70 ? "🌟" : percentage >= 50 ? "👍" : "💪";
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-6">
        <div className="text-7xl">{emoji}</div>
        <h2 className="text-3xl font-bold text-white">انتهى الاختبار!</h2>
        <div className="bg-white/10 border border-purple-500/30 rounded-2xl p-8 text-center">
          <div className="text-6xl font-bold text-purple-400 mb-2">
            {score}/{totalQuestions}
          </div>
          <div className="text-2xl text-white mb-2">{percentage}%</div>
          <div className="text-purple-300">
            {percentage >= 90
              ? "ممتاز! أنت في القمة!"
              : percentage >= 70
                ? "جيد جداً! استمر في التقدم!"
                : percentage >= 50
                  ? "جيد! واصل التمرين!"
                  : "لا تستسلم! التكرار مفتاح النجاح!"}
          </div>
        </div>
        <button
          onClick={startQuiz}
          className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all hover:scale-105"
        >
          حاول مرة أخرى
        </button>
      </div>
    );
  }

  const q = questions[questionIndex];
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-purple-300 text-sm">
          السؤال {questionIndex + 1} من {totalQuestions}
        </span>
        <span className="text-purple-300 text-sm">النقاط: {score}</span>
      </div>
      <div className="w-full bg-purple-900/50 rounded-full h-2">
        <div
          className="bg-purple-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((questionIndex + 1) / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="bg-white/5 border border-purple-500/30 rounded-2xl p-8 text-center">
        <p className="text-purple-300 text-sm mb-4">ما معنى هذه الكلمة؟</p>
        <div className="arabic-text text-6xl font-bold text-white">
          {q.correct.arabic}
        </div>
        <div className="text-purple-400 text-sm mt-2">{q.correct.category}</div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3">
        {q.options.map((option, i) => {
          const isCorrect = option.english === q.correct.english;
          const isSelected = option.english === selected;
          let className =
            "p-4 rounded-xl border text-white font-medium text-lg transition-all duration-200";

          if (!selected) {
            className += " bg-white/5 border-white/20 hover:bg-purple-700/40 hover:border-purple-500 hover:scale-105 cursor-pointer";
          } else if (isCorrect) {
            className += " bg-green-500/30 border-green-400 shadow-lg shadow-green-500/20";
          } else if (isSelected) {
            className += " bg-red-500/30 border-red-400";
          } else {
            className += " bg-white/5 border-white/10 opacity-50";
          }

          return (
            <button key={i} onClick={() => handleAnswer(option.english)} className={className}>
              {option.english}
            </button>
          );
        })}
      </div>
    </div>
  );
}
