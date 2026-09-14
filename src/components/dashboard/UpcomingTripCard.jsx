import { CalendarDays, Users, ArrowRight } from "lucide-react";
import { upcomingTrip } from "../../data/dashboardData";

export default function UpcomingTripCard() {
  const percentage = (upcomingTrip.spent / upcomingTrip.budget) * 100;

  return (
    <section className="bg-[#082A43] rounded-2xl border border-cyan-900/30 overflow-hidden">
      {/* Header Image */}
      <div className="relative h-44">
        <img
          src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80"
          alt="Goa"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#082A43] via-transparent to-transparent" />

        <span className="absolute top-4 left-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
          Upcoming
        </span>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-white">
            {upcomingTrip.title}
          </h2>

          <div className="flex items-center gap-4 mt-2 text-slate-300 text-sm">
            <div className="flex items-center gap-1">
              <CalendarDays size={15} />
              {upcomingTrip.startDate}
            </div>

            <div className="flex items-center gap-1">
              <Users size={15} />
              {upcomingTrip.travelers}
            </div>
          </div>
        </div>

        {/* Progress */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-300">Trip Progress</span>
            <span className="text-cyan-400 font-semibold">
              {upcomingTrip.progress}%
            </span>
          </div>

          <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-cyan-400 rounded-full transition-all duration-700"
              style={{ width: `${upcomingTrip.progress}%` }}
            />
          </div>
        </div>

        {/* Budget */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-slate-400 text-sm">Budget</p>
            <h3 className="text-white font-bold">
              ₹{upcomingTrip.spent.toLocaleString()} / ₹
              {upcomingTrip.budget.toLocaleString()}
            </h3>
          </div>

          <button className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-[#041624] font-semibold px-4 py-2 rounded-xl transition">
            View Trip
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}