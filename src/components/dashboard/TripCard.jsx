import { Users, CalendarDays } from "lucide-react";

const statusStyles = {
  Upcoming: "bg-green-500/20 text-green-300",
  Planned: "bg-cyan-500/20 text-cyan-300",
  Completed: "bg-purple-500/20 text-purple-300",
};

export default function TripCard({ trip }) {
  return (
    <div className="bg-[#082A43] rounded-2xl overflow-hidden border border-cyan-900/30 hover:-translate-y-1 transition-all duration-200 hover:shadow-xl">
      <img
        src={trip.image}
        alt={trip.destination}
        className="h-36 w-full object-cover"
      />

      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="text-white font-semibold">{trip.title}</h3>

          <span
            className={`text-xs px-2 py-1 rounded-full ${
              statusStyles[trip.status]
            }`}
          >
            {trip.status}
          </span>
        </div>

        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <CalendarDays size={15} />
          {trip.dates}
        </div>

        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <Users size={15} />
          {trip.travelers} Travelers
        </div>
      </div>
    </div>
  );
}