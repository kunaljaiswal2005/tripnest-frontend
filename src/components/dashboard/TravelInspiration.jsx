import { ArrowRight } from "lucide-react";

export default function TravelInspiration() {
  return (
    <section className="relative overflow-hidden rounded-2xl h-full min-h-[220px]">
      <img
        src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1200&q=80"
        alt="Travel Inspiration"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#041624]/90 via-[#082A43]/60 to-transparent" />

      <div className="relative h-full flex items-center p-6">
        <div className="max-w-sm space-y-3">
          <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-xs font-medium">
            New Collection
          </span>

          <h2 className="text-3xl font-bold text-white leading-tight">
            New destinations.
            <br />
            New stories.
          </h2>

          <p className="text-slate-200 text-sm">
            Discover breathtaking places and start planning your next unforgettable journey.
          </p>

          <button className="flex items-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-[#041624] font-semibold px-5 py-2.5 rounded-xl transition">
            Explore Now
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}