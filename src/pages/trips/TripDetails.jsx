import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Wallet,
  Users,
  Clock,
  MapPinned,
  IndianRupee,
} from "lucide-react";
import api from "../../utils/api";

const TripDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [trip, setTrip] = useState(null);
  const [itineraries, setItineraries] = useState([]);
  const [activities, setActivities] = useState({});

  const [loading, setLoading] = useState(true);
  const [itineraryLoading, setItineraryLoading] = useState(true);
  const [activityLoading, setActivityLoading] = useState(false);

  const [error, setError] = useState("");
  const [itineraryError, setItineraryError] = useState("");
  const [activityError, setActivityError] = useState("");

  // Fetch trip details
  useEffect(() => {
    const fetchTrip = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/api/trips/${id}`);

        setTrip(response.data);
      } catch (err) {
        console.error("Error fetching trip:", err);
        setError("Unable to load trip details.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [id]);

  // Fetch itinerary
  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        setItineraryLoading(true);
        setItineraryError("");

        const response = await api.get(
          `/api/trips/${id}/itineraries`
        );

        setItineraries(response.data);
      } catch (err) {
        console.error("Error fetching itineraries:", err);
        setItineraryError("Unable to load itinerary.");
      } finally {
        setItineraryLoading(false);
      }
    };

    fetchItineraries();
  }, [id]);

  // Fetch activities for every itinerary day
  useEffect(() => {
    const fetchActivities = async () => {
      if (itineraries.length === 0) {
        setActivities({});
        return;
      }

      try {
        setActivityLoading(true);
        setActivityError("");

        const activityResults = await Promise.all(
          itineraries.map(async (itinerary) => {
            const response = await api.get(
              `/api/itineraries/${itinerary.id}/activities`
            );

            return {
              itineraryId: itinerary.id,
              activities: response.data,
            };
          })
        );

        const activityMap = {};

        activityResults.forEach((result) => {
          activityMap[result.itineraryId] = result.activities;
        });

        setActivities(activityMap);
      } catch (err) {
        console.error("Error fetching activities:", err);
        setActivityError("Unable to load activities.");
      } finally {
        setActivityLoading(false);
      }
    };

    fetchActivities();
  }, [itineraries]);

  /*
   * Convert activities object into one flat list.
   *
   * Example:
   *
   * activities = {
   *   5: [activity1, activity2],
   *   6: [activity3]
   * }
   *
   * becomes:
   *
   * [
   *   { ...activity1, itinerary: day1 },
   *   { ...activity2, itinerary: day1 },
   *   { ...activity3, itinerary: day2 }
   * ]
   */
  const upcomingActivities = itineraries.flatMap((itinerary) => {
    const dayActivities = activities[itinerary.id] || [];

    return dayActivities.map((activity) => ({
      ...activity,
      itineraryDay: itinerary.dayNumber,
      itineraryDate: itinerary.date,
    }));
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#061826] text-white flex items-center justify-center">
        <p className="text-slate-400">
          Loading trip details...
        </p>
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="min-h-screen bg-[#061826] text-white p-6">

        <button
          onClick={() => navigate("/dashboard/trips")}
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-6"
        >
          <ArrowLeft size={18} />
          Back to Trips
        </button>

        <div className="bg-[#0C314D] rounded-2xl p-6">
          <p className="text-red-400">
            {error || "Trip not found."}
          </p>
        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#061826] text-white p-6">

      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard/trips")}
        className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-6 transition"
      >
        <ArrowLeft size={18} />
        Back to Trips
      </button>

      {/* Trip Header */}
      <div className="bg-[#0C314D] rounded-2xl p-6 mb-6">

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

          <div>
            <h1 className="text-3xl font-bold">
              {trip.title}
            </h1>

            <p className="text-slate-400 mt-2">
              {trip.description || "No description available"}
            </p>
          </div>

          <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-sm font-medium w-fit">
            {trip.status || "PLANNING"}
          </span>

        </div>

        {/* Trip Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">

          {/* Destination */}
          <div className="bg-[#08263B] rounded-xl p-4">

            <div className="flex items-center gap-2 text-cyan-400 mb-2">
              <MapPin size={18} />
              <span className="text-sm">
                Destination
              </span>
            </div>

            <p className="font-semibold">
              {trip.destination || "Not specified"}
            </p>

          </div>

          {/* Travel Dates */}
          <div className="bg-[#08263B] rounded-xl p-4">

            <div className="flex items-center gap-2 text-cyan-400 mb-2">
              <CalendarDays size={18} />
              <span className="text-sm">
                Travel Dates
              </span>
            </div>

            <p className="font-semibold">
              {trip.startDate || "N/A"}
            </p>

            <p className="text-slate-400 text-sm">
              to {trip.endDate || "N/A"}
            </p>

          </div>

          {/* Budget */}
          <div className="bg-[#08263B] rounded-xl p-4">

            <div className="flex items-center gap-2 text-cyan-400 mb-2">
              <Wallet size={18} />
              <span className="text-sm">
                Budget
              </span>
            </div>

            <p className="font-semibold">
              ₹{trip.totalBudget ?? 0}
            </p>

          </div>

          {/* Travelers */}
          <div className="bg-[#08263B] rounded-xl p-4">

            <div className="flex items-center gap-2 text-cyan-400 mb-2">
              <Users size={18} />
              <span className="text-sm">
                Travelers
              </span>
            </div>

            <p className="font-semibold">
              Not available
            </p>

          </div>

        </div>

      </div>

      {/* Trip Timeline */}
      <div className="bg-[#0C314D] rounded-2xl p-6 mb-6">

        <div className="flex items-center gap-3 mb-6">

          <Clock
            className="text-cyan-400"
            size={22}
          />

          <div>
            <h2 className="text-2xl font-bold">
              Trip Timeline
            </h2>

            <p className="text-slate-400 text-sm mt-1">
              Your day-by-day itinerary and activities
            </p>
          </div>

        </div>

        {/* Itinerary Loading */}
        {itineraryLoading && (
          <p className="text-slate-400">
            Loading itinerary...
          </p>
        )}

        {/* Itinerary Error */}
        {!itineraryLoading && itineraryError && (
          <p className="text-red-400">
            {itineraryError}
          </p>
        )}

        {/* No Itinerary */}
        {!itineraryLoading &&
          !itineraryError &&
          itineraries.length === 0 && (
            <div className="bg-[#08263B] rounded-xl p-6 text-center">

              <p className="text-slate-400">
                No itinerary has been created for this trip yet.
              </p>

            </div>
          )}

        {/* Timeline */}
        {!itineraryLoading &&
          !itineraryError &&
          itineraries.length > 0 && (

            <div className="relative">

              {/* Vertical Line */}
              <div className="absolute left-[15px] top-4 bottom-4 w-px bg-cyan-500/30" />

              <div className="space-y-8">

                {itineraries.map((itinerary) => {

                  const dayActivities =
                    activities[itinerary.id] || [];

                  return (
                    <div
                      key={itinerary.id}
                      className="relative flex gap-5"
                    >

                      {/* Timeline Marker */}
                      <div className="relative z-10 flex-shrink-0">

                        <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-slate-950 font-bold text-sm shadow-lg">
                          {itinerary.dayNumber}
                        </div>

                      </div>

                      {/* Timeline Content */}
                      <div className="flex-1 bg-[#08263B] rounded-xl p-5">

                        {/* Day Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

                          <h3 className="text-lg font-semibold text-white">
                            Day {itinerary.dayNumber}
                          </h3>

                          {itinerary.date && (
                            <span className="text-cyan-400 text-sm">
                              {itinerary.date}
                            </span>
                          )}

                        </div>

                        {/* Day Notes */}
                        <p className="text-slate-400 mt-3">
                          {itinerary.notes ||
                            "No notes available for this day."}
                        </p>

                        {/* Activities */}
                        <div className="mt-5">

                          <h4 className="text-sm font-semibold text-white mb-3">
                            Activities
                          </h4>

                          {activityLoading && (
                            <p className="text-slate-500 text-sm">
                              Loading activities...
                            </p>
                          )}

                          {!activityLoading &&
                            activityError && (
                              <p className="text-red-400 text-sm">
                                {activityError}
                              </p>
                            )}

                          {!activityLoading &&
                            !activityError &&
                            dayActivities.length === 0 && (
                              <div className="bg-[#061826] rounded-lg p-4">

                                <p className="text-slate-500 text-sm">
                                  No activities added for this day.
                                </p>

                              </div>
                            )}

                          {!activityLoading &&
                            !activityError &&
                            dayActivities.length > 0 && (

                              <div className="space-y-3">

                                {dayActivities.map(
                                  (activity) => (
                                    <div
                                      key={activity.id}
                                      className="bg-[#061826] rounded-lg p-4"
                                    >

                                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">

                                        <div>

                                          <h5 className="font-semibold text-white">
                                            {activity.title}
                                          </h5>

                                          {activity.activityType && (
                                            <span className="inline-block mt-1 text-xs text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">
                                              {activity.activityType}
                                            </span>
                                          )}

                                        </div>

                                        {activity.startTime && (
                                          <div className="flex items-center gap-1 text-slate-400 text-sm">
                                            <Clock size={15} />
                                            {activity.startTime}

                                            {activity.endTime &&
                                              ` - ${activity.endTime}`}
                                          </div>
                                        )}

                                      </div>

                                      {activity.location && (
                                        <div className="flex items-center gap-2 text-slate-400 text-sm mt-3">
                                          <MapPinned size={15} />
                                          {activity.location}
                                        </div>
                                      )}

                                      {activity.estimatedCost != null && (
                                        <div className="flex items-center gap-2 text-slate-400 text-sm mt-2">
                                          <IndianRupee size={15} />
                                          Estimated cost: ₹
                                          {activity.estimatedCost}
                                        </div>
                                      )}

                                      {activity.notes && (
                                        <p className="text-slate-500 text-sm mt-3">
                                          {activity.notes}
                                        </p>
                                      )}

                                    </div>
                                  )
                                )}

                              </div>
                            )}

                        </div>

                      </div>

                    </div>
                  );
                })}

              </div>
            </div>
          )}

      </div>

      {/* Upcoming Activities */}
      <div className="bg-[#0C314D] rounded-2xl p-6 mb-6">

        <div className="flex items-center gap-3 mb-6">

          <Clock
            className="text-cyan-400"
            size={22}
          />

          <div>
            <h2 className="text-2xl font-bold">
              Upcoming Activities
            </h2>

            <p className="text-slate-400 text-sm mt-1">
              Activities planned for your trip
            </p>
          </div>

        </div>

        {/* Loading */}
        {activityLoading && (
          <p className="text-slate-400">
            Loading upcoming activities...
          </p>
        )}

        {/* Error */}
        {!activityLoading && activityError && (
          <p className="text-red-400">
            {activityError}
          </p>
        )}

        {/* No Activities */}
        {!activityLoading &&
          !activityError &&
          upcomingActivities.length === 0 && (
            <div className="bg-[#08263B] rounded-xl p-6 text-center">

              <p className="text-slate-400">
                No upcoming activities have been added yet.
              </p>

            </div>
          )}

        {/* Activity List */}
        {!activityLoading &&
          !activityError &&
          upcomingActivities.length > 0 && (

            <div className="space-y-3">

              {upcomingActivities.map((activity) => (

                <div
                  key={`${activity.itineraryDay}-${activity.id}`}
                  className="bg-[#08263B] rounded-xl p-4"
                >

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    {/* Activity Information */}
                    <div className="flex items-start gap-4">

                      <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                        <Clock
                          size={18}
                          className="text-cyan-400"
                        />
                      </div>

                      <div>

                        <h3 className="font-semibold text-white">
                          {activity.title}
                        </h3>

                        <p className="text-slate-400 text-sm mt-1">
                          Day {activity.itineraryDay}

                          {activity.itineraryDate &&
                            ` • ${activity.itineraryDate}`}
                        </p>

                        {activity.location && (
                          <div className="flex items-center gap-2 text-slate-500 text-sm mt-2">
                            <MapPinned size={14} />
                            {activity.location}
                          </div>
                        )}

                      </div>

                    </div>

                    {/* Time */}
                    <div className="text-left md:text-right">

                      {activity.startTime ? (
                        <p className="text-cyan-400 font-semibold">
                          {activity.startTime}
                        </p>
                      ) : (
                        <p className="text-slate-500 text-sm">
                          Time not set
                        </p>
                      )}

                      {activity.endTime && (
                        <p className="text-slate-500 text-sm">
                          until {activity.endTime}
                        </p>
                      )}

                    </div>

                  </div>

                </div>

              ))}

            </div>
          )}

      </div>

      {/* Trip Description */}
      <div className="bg-[#0C314D] rounded-2xl p-6">

        <h2 className="text-2xl font-bold mb-3">
          Trip Description
        </h2>

        <p className="text-slate-400 leading-relaxed">
          {trip.description ||
            "No additional description has been provided for this trip."}
        </p>

      </div>

    </div>
  );
};

export default TripDetails;