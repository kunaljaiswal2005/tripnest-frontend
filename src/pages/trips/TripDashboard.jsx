import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  CalendarDays,
  Wallet,
  Users,
  Plane,
  Plus,
} from "lucide-react";

import api from "../../utils/api";

export default function TripDashboard() {
  const navigate = useNavigate();

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/api/trips");

        setTrips(response.data);
      } catch (err) {
        console.error("Error fetching trips:", err);

        setError("Unable to load your trips.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  return (
    <div className="space-y-6 animate-fadeIn">

      {/* ==================== PAGE HEADER ==================== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>
          <div className="flex items-center gap-3">

            <Plane
              className="text-cyan-400"
              size={28}
            />

            <h1 className="text-3xl font-bold text-black">
  Trip Dashboard
</h1>


          </div>

          <p className="text-slate-900 font-semibold">
            View and manage your trips, itineraries, and activities.
          </p>
        </div>

        {/* Create Trip Button */}
        <button
          type="button"
          onClick={() => navigate("/dashboard/trips/create")}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-cyan-400 text-slate-900 font-bold hover:bg-cyan-300 transition"
        >
          <Plus size={18} />
          Create Trip
        </button>

      </div>


      {/* ==================== LOADING STATE ==================== */}
      {loading && (
        <section className="bg-[#08243A] border border-cyan-900/30 rounded-2xl p-6">

          <p className="text-slate-300">
            Loading your trips...
          </p>

        </section>
      )}


      {/* ==================== ERROR STATE ==================== */}
      {!loading && error && (
        <section className="bg-[#08243A] border border-red-900/30 rounded-2xl p-6">

          <p className="text-red-400">
            {error}
          </p>

        </section>
      )}


      {/* ==================== NO TRIPS ==================== */}
      {!loading && !error && trips.length === 0 && (
        <section className="bg-[#08243A] border border-cyan-900/30 rounded-2xl p-6">

          <h2 className="text-xl font-semibold text-cyan-300 mb-2">
            No Trips Yet
          </h2>

          <p className="text-slate-300 mb-4">
            You have not created any trips yet.
          </p>

          <button
            type="button"
            onClick={() => navigate("/dashboard/trips/create")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-400 text-slate-900 font-bold hover:bg-cyan-300 transition"
          >
            <Plus size={18} />
            Create Your First Trip
          </button>

        </section>
      )}


      {/* ==================== TRIPS ==================== */}
      {!loading && !error && trips.length > 0 && (
        <section className="bg-[#08243A] border border-cyan-900/30 rounded-2xl p-6">

          {/* Section Header */}
          <div className="flex items-center justify-between mb-5">

            <h2 className="text-xl font-semibold text-cyan-300">
              Your Trips
            </h2>

            <span className="text-sm text-slate-300">
              {trips.length}{" "}
              {trips.length === 1 ? "trip" : "trips"}
            </span>

          </div>


          {/* Trip List */}
          <div className="space-y-4">

            {trips.map((trip) => (
              <div
                key={trip.id}
                className="bg-[#0C314D] border border-cyan-900/30 rounded-xl p-5"
              >

                {/* Trip Title + Status */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">

                  <div>

                    <h3 className="text-lg font-semibold text-white">
                      {trip.title}
                    </h3>

                    <p className="text-slate-300 text-sm mt-1">
                      {trip.description ||
                        "No description available"}
                    </p>

                  </div>


                  {/* Status */}
                  <span className="w-fit text-sm px-3 py-1 rounded-full bg-cyan-900/40 text-cyan-300 border border-cyan-800/40">
                    {trip.status || "PLANNING"}
                  </span>

                </div>


                {/* ==================== TRIP INFORMATION ==================== */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

                  {/* Destination */}
                  <div>

                    <div className="flex items-center gap-2">

                      <MapPin
                        className="text-cyan-400"
                        size={18}
                      />

                      <p className="text-slate-300 text-sm">
                        Destination
                      </p>

                    </div>

                    <p className="text-white font-semibold mt-1">
                      {trip.destination || "Not specified"}
                    </p>

                  </div>


                  {/* Dates */}
                  <div>

                    <div className="flex items-center gap-2">

                      <CalendarDays
                        className="text-cyan-400"
                        size={18}
                      />

                      <p className="text-slate-300 text-sm">
                        Travel Dates
                      </p>

                    </div>

                    <p className="text-white font-semibold mt-1">
                      {trip.startDate || "N/A"}
                      {" → "}
                      {trip.endDate || "N/A"}
                    </p>

                  </div>


                  {/* Budget */}
                  <div>

                    <div className="flex items-center gap-2">

                      <Wallet
                        className="text-cyan-400"
                        size={18}
                      />

                      <p className="text-slate-300 text-sm">
                        Budget
                      </p>

                    </div>

                    <p className="text-white font-semibold mt-1">
                      ₹{trip.totalBudget ?? 0}
                    </p>

                  </div>


                  {/* Travelers */}
                  <div>

                    <div className="flex items-center gap-2">

                      <Users
                        className="text-cyan-400"
                        size={18}
                      />

                      <p className="text-slate-300 text-sm">
                        Travelers
                      </p>

                    </div>

                    <p className="text-white font-semibold mt-1">
                      Not available
                    </p>

                  </div>

                </div>


                {/* ==================== VIEW TRIP ==================== */}
                <div className="flex justify-end mt-5">

                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/dashboard/trips/${trip.id}`)
                    }
                    className="px-4 py-2 rounded-xl bg-cyan-400 text-slate-900 font-bold hover:bg-cyan-300 transition"
                  >
                    View Trip
                  </button>

                </div>

              </div>
            ))}

          </div>

        </section>
      )}


      {/* ==================== TIMELINE PLACEHOLDER ==================== */}
      <section className="bg-[#08243A] border border-cyan-900/30 rounded-2xl p-6">

        <h2 className="text-xl font-semibold text-cyan-300">
          Trip Timeline
        </h2>

        <p className="text-slate-300 mt-2">
          Your itinerary timeline will appear here.
        </p>

      </section>


      {/* ==================== UPCOMING ACTIVITIES ==================== */}
      <section className="bg-[#08243A] border border-cyan-900/30 rounded-2xl p-6">

        <h2 className="text-xl font-semibold text-cyan-300">
          Upcoming Activities
        </h2>

        <p className="text-slate-300 mt-2">
          Upcoming activities for your trip will appear here.
        </p>

      </section>

    </div>
  );
}