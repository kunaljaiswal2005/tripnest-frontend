import {
  Umbrella,
  UtensilsCrossed,
  Landmark,
  Sunset,
} from "lucide-react";
import { activities } from "../../data/dashboardData";

const iconMap = {
  "Beach Visit": Umbrella,
  Lunch: UtensilsCrossed,
  "Museum Tour": Landmark,
  "Sunset Point": Sunset,
};

export default function UpcomingActivities() {
  return (
    <section className="bg-[#082A43] rounded-2xl border border-cyan-900/30 p-5">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold text-white">
          Upcoming Activities
        </h2>

        <button className="text-cyan-400 text-sm hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = iconMap[activity.title];

          return (
            <div
              key={activity.id}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#0D314C] transition"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${activity.color}20` }}
              >
                <Icon size={20} color={activity.color} />
              </div>

              <div className="flex-1">
                <h4 className="text-white font-medium">
                  {activity.title}
                </h4>

                <p className="text-slate-400 text-sm">
                  {activity.time} • {activity.location}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}