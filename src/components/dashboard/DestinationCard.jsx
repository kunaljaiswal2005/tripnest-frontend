import { Star } from "lucide-react";

export default function DestinationCard({ destination }) {
  return (
    <div className="group bg-[#082A43] rounded-2xl overflow-hidden border border-cyan-900/30 hover:-translate-y-1 transition-all duration-300">
      <div className="overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="h-40 w-full object-cover group-hover:scale-105 transition duration-300"
        />
      </div>

      <div className="p-4 space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-white font-semibold">
            {destination.name}
          </h3>

          <div className="flex items-center gap-1">
            <Star
              size={14}
              className="fill-yellow-400 text-yellow-400"
            />
            <span className="text-sm text-white">
              {destination.rating}
            </span>
          </div>
        </div>

        <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded-full">
          {destination.category}
        </span>
      </div>
    </div>
  );
}