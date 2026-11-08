"use client";

import { analyticsData } from "@/lib/data";

export default function Dashboard({
  setActiveTab,
}: {
  setActiveTab: (tab: string) => void;
}) {
  const totalWords = analyticsData.monthlyStats.reduce(
    (acc, m) => acc + m.totalWords,
    0
  );
  const avgAccuracy = Math.round(
    analyticsData.monthlyStats.reduce((acc, m) => acc + m.accuracy, 0) /
      analyticsData.monthlyStats.length
  );
  const streak = 12;
  const earnedAchievements = analyticsData.achievements.filter(
    (a) => a.earned
  ).length;

  const stats = [
    {
      label: "إجمالي الكلمات",
      value: totalWords,
      suffix: "كلمة",
      icon: "📚",
      color: "from-purple-600 to-purple-800",
    },
    {
      label: "متوسط الدقة",
      value: avgAccuracy,
      suffix: "%",
      icon: "🎯",
      color: "from-blue-600 to-blue-800",
    },
    {
      label: "أيام متواصلة",
      value: streak,
      suffix: "يوم",
      icon: "🔥",
      color: "from-orange-600 to-orange-800",
    },
    {
      label: "الإنجازات",
      value: earnedAchievements,
      suffix: `/${analyticsData.achievements.length}`,
      icon: "🏆",
      color: "from-yellow-600 to-yellow-800",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="text-center py-8">
        <h2 className="text-4xl font-bold text-white mb-2">
          أَهْلًا وَسَهْلًا! 👋
        </h2>
        <p className="text-purple-300 text-lg">
          واصل رحلتك في تعلم اللغة العربية
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white shadow-xl`}
          >
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-3xl font-bold">
              {stat.value}
              <span className="text-lg font-normal text-white/80 mr-1">
                {stat.suffix}
              </span>
            </div>
            <div className="text-white/70 text-sm mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4">ابدأ التعلم</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              tab: "alphabet",
              title: "تعلم الحروف",
              desc: "٢٨ حرفًا عربيًا مع أمثلة",
              icon: "أ",
              gradient: "from-purple-600/40 to-purple-800/40",
              border: "border-purple-500/30",
            },
            {
              tab: "vocabulary",
              title: "المفردات",
              desc: "كلمات مصنفة حسب المستوى",
              icon: "📖",
              gradient: "from-blue-600/40 to-blue-800/40",
              border: "border-blue-500/30",
            },
            {
              tab: "quiz",
              title: "اختبر نفسك",
              desc: "اختبارات تفاعلية",
              icon: "✏️",
              gradient: "from-green-600/40 to-green-800/40",
              border: "border-green-500/30",
            },
          ].map((item) => (
            <button
              key={item.tab}
              onClick={() => setActiveTab(item.tab)}
              className={`bg-gradient-to-br ${item.gradient} border ${item.border} rounded-2xl p-6 text-right hover:scale-105 transition-all duration-200 shadow-lg`}
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <div className="text-white font-bold text-lg">{item.title}</div>
              <div className="text-purple-300 text-sm mt-1">{item.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Achievements */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4">الإنجازات الأخيرة</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {analyticsData.achievements.map((achievement, i) => (
            <div
              key={i}
              className={`rounded-xl p-4 text-center border transition-all ${
                achievement.earned
                  ? "bg-yellow-500/20 border-yellow-500/50 shadow-lg shadow-yellow-500/10"
                  : "bg-gray-800/30 border-gray-700/30 opacity-50"
              }`}
            >
              <div
                className={`text-3xl mb-2 ${!achievement.earned && "grayscale"}`}
              >
                {achievement.icon}
              </div>
              <div
                className={`text-xs font-medium ${achievement.earned ? "text-yellow-200" : "text-gray-500"}`}
              >
                {achievement.title}
              </div>
              {achievement.earned && (
                <div className="text-yellow-400/70 text-xs mt-1">
                  {achievement.date}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
