import DestinationCard from "./DestinationCard";
import { destinations } from "../../data/dashboardData";

export default function ExploreDestinations() {
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Explore Destinations
          </h2>

          <p className="text-slate-400 text-sm">
            Discover your next favorite place
          </p>
        </div>

        <button className="text-cyan-400 text-sm hover:underline">
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5">
        {destinations.map((item) => (
          <DestinationCard
            key={item.id}
            destination={item}
          />
        ))}
      </div>
    </section>
  );
}