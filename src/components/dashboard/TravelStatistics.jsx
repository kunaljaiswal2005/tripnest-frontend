import {
  CheckCircle2,
  Globe,
  CalendarDays,
  MapPin,
} from "lucide-react";

import { travelStatistics } from "../../data/dashboardData";

const stats = [
  {
    title: "Trips",
    value: travelStatistics.tripsCompleted,
    icon: CheckCircle2,
    color: "#4CCB8A",
  },
  {
    title: "Countries",
    value: travelStatistics.countriesVisited,
    icon: Globe,
    color: "#20C9D2",
  },
  {
    title: "Days",
    value: travelStatistics.travelDays,
    icon: CalendarDays,
    color: "#3B82F6",
  },
  {
    title: "Favorite",
    value: travelStatistics.favoriteDestination,
    icon: MapPin,
    color: "#FF7568",
  },
];

export default function TravelStatistics() {
  return (
    <section className="bg-[#082A43] rounded-2xl border border-cyan-900/30 p-4 h-full flex flex-col">
      <h2 className="text-lg font-bold text-white mb-4">
        Travel Statistics
      </h2>

      <div className="grid grid-cols-2 gap-3">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="bg-[#0C314D] rounded-lg p-3"
            >
              <Icon
                size={18}
                color={item.color}
                className="mb-2"
              />

              <h3 className="text-lg font-bold text-white">
                {item.value}
              </h3>

              <p className="text-slate-400 text-xs">
                {item.title}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}