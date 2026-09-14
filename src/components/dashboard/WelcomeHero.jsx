import { Search, MapPin } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function WelcomeHero() {
  const { user } = useAuth?.() || {};

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
      ? "Good Afternoon"
      : "Good Evening";

  const firstName =
    user?.firstName ||
    user?.name?.split(" ")?.[0] ||
    "Traveler";

  return (
    <section className="relative overflow-hidden rounded-3xl h-[320px] lg:h-[340px]">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80&auto=format&fit=crop"
        alt="Mediterranean Coast"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#041624]/90 via-[#082A43]/55 to-[#041624]/20" />

      {/* Decorative Glow */}
      <div className="absolute -top-20 -right-10 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center px-8 lg:px-12">
        <div className="max-w-2xl space-y-5">
          {/* Greeting */}
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              {greeting},{" "}
              <span className="text-cyan-400">{firstName}!</span>
            </h1>

            <p className="mt-3 text-lg text-slate-200">
              Where will your next adventure take you?
            </p>
          </div>

          {/* Search */}
          <div className="relative max-w-xl">
            <Search
              size={20}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search destinations, trips, activities..."
              className="w-full bg-white/95 backdrop-blur rounded-full pl-14 pr-5 py-4 text-slate-700 outline-none focus:ring-2 focus:ring-cyan-400 placeholder:text-slate-400 shadow-xl"
            />
          </div>

          {/* Quote */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur w-fit px-5 py-3 rounded-full border border-white/20">
            <MapPin size={18} className="text-cyan-300" />

            <p className="text-sm text-cyan-50">
              Collect moments, not things ✈️
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}