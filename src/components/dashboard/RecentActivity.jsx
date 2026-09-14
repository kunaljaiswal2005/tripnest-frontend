import { Clock } from "lucide-react";
import { recentActivities } from "../../data/dashboardData";

export default function RecentActivity() {
  return (
    <section className="bg-[#082A43] rounded-2xl border border-cyan-900/30 p-5">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold text-white">
          Recent Activity
        </h2>

        <Clock className="text-cyan-400" size={18} />
      </div>

      <div className="space-y-5">
        {recentActivities.map((activity) => (
          <div
            key={activity.id}
            className="flex gap-3"
          >
            <div className="flex flex-col items-center">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: activity.color }}
              />

              <div className="w-px h-full bg-slate-700 mt-1" />
            </div>

            <div className="pb-3">
              <h4 className="text-white text-sm font-medium">
                {activity.title}
              </h4>

              <p className="text-slate-400 text-xs mt-1">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}