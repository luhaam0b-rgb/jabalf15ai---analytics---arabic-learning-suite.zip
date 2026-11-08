"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts";
import { analyticsData } from "@/lib/data";

export default function AnalyticsView() {
  const radarData = analyticsData.skillBreakdown.map((s) => ({
    subject: s.skill,
    score: s.score,
  }));

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">تحليلات التقدم</h2>
        <p className="text-purple-300">تتبع تطورك في تعلم اللغة العربية</p>
      </div>

      {/* Weekly Progress */}
      <div className="bg-white/5 border border-purple-500/20 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-6">
          التقدم الأسبوعي 📅
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={analyticsData.weeklyProgress}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(168,85,247,0.1)" />
            <XAxis dataKey="day" tick={{ fill: "#c4b5fd", fontSize: 12 }} />
            <YAxis tick={{ fill: "#c4b5fd", fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                background: "rgba(88,28,135,0.9)",
                border: "1px solid rgba(168,85,247,0.3)",
                borderRadius: "12px",
                color: "#fff",
              }}
            />
            <Line
              type="monotone"
              dataKey="wordsLearned"
              name="كلمات"
              stroke="#a855f7"
              strokeWidth={3}
              dot={{ fill: "#a855f7", r: 5 }}
              activeDot={{ r: 7, fill: "#c084fc" }}
            />
            <Line
              type="monotone"
              dataKey="quizScore"
              name="درجة الاختبار"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: "#3b82f6", r: 5 }}
              activeDot={{ r: 7, fill: "#60a5fa" }}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex gap-6 mt-3 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500" />
            <span className="text-purple-300 text-sm">كلمات مكتسبة</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-purple-300 text-sm">درجة الاختبار</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skill Breakdown Radar */}
        <div className="bg-white/5 border border-purple-500/20 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">
            تحليل المهارات 🎯
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(168,85,247,0.2)" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: "#c4b5fd", fontSize: 12 }}
              />
              <Radar
                name="المهارات"
                dataKey="score"
                stroke="#a855f7"
                fill="#a855f7"
                fillOpacity={0.3}
              />
            </RadarChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {analyticsData.skillBreakdown.map((skill, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: skill.color }}
                />
                <span className="text-purple-300 text-sm">{skill.skill}</span>
                <span className="text-white text-sm font-bold mr-auto">
                  {skill.score}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Stats */}
        <div className="bg-white/5 border border-purple-500/20 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">
            الإحصاءات الشهرية 📊
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={analyticsData.monthlyStats}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(168,85,247,0.1)"
              />
              <XAxis
                dataKey="month"
                tick={{ fill: "#c4b5fd", fontSize: 12 }}
              />
              <YAxis tick={{ fill: "#c4b5fd", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  background: "rgba(88,28,135,0.9)",
                  border: "1px solid rgba(168,85,247,0.3)",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />
              <Bar
                dataKey="totalWords"
                name="الكلمات"
                fill="#a855f7"
                radius={[6, 6, 0, 0]}
              />
              <Bar
                dataKey="accuracy"
                name="الدقة %"
                fill="#3b82f6"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Time Spent */}
      <div className="bg-white/5 border border-purple-500/20 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-6">
          وقت الدراسة (دقائق) ⏱️
        </h3>
        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={analyticsData.weeklyProgress}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(168,85,247,0.1)"
            />
            <XAxis dataKey="day" tick={{ fill: "#c4b5fd", fontSize: 12 }} />
            <YAxis tick={{ fill: "#c4b5fd", fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                background: "rgba(88,28,135,0.9)",
                border: "1px solid rgba(168,85,247,0.3)",
                borderRadius: "12px",
                color: "#fff",
              }}
            />
            <Bar
              dataKey="timeSpent"
              name="الوقت (دقائق)"
              fill="#10b981"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
