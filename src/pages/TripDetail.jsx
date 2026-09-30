import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { tripAPI, itineraryAPI, activityAPI } from "../utils/api";

const activityTypes = [
  "SIGHTSEEING",
  "TRANSPORTATION",
  "ACCOMMODATION",
  "DINING",
  "ADVENTURE",
  "SHOPPING",
  "OTHER",
];

const typeEmoji = {
  SIGHTSEEING: "🏛️",
  TRANSPORTATION: "🚗",
  ACCOMMODATION: "🏨",
  DINING: "🍽️",
  ADVENTURE: "🏄",
  SHOPPING: "🛍️",
  OTHER: "📌",
};

const TripDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);
  const [itineraries, setItineraries] = useState([]);
  const [activities, setActivities] = useState({});
  const [activeDay, setActiveDay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddActivity, setShowAddActivity] = useState(false);

  const [activityForm, setActivityForm] = useState({
    title: "",
    activityType: "SIGHTSEEING",
    startTime: "",
    endTime: "",
    location: "",
    notes: "",
    estimatedCost: "",
  });

  useEffect(() => {
    fetchTripDetails();
  }, [id]);

  const fetchTripDetails = async () => {
    try {
      const [tripRes, itiRes] = await Promise.all([
        tripAPI.getById(id),
        itineraryAPI.getByTrip(id),
      ]);

      setTrip(tripRes.data);
      setItineraries(itiRes.data);

      if (itiRes.data.length > 0) {
        setActiveDay(itiRes.data[0].id);
        fetchActivities(itiRes.data[0].id);
      }
    } catch {
      navigate("/trips");
    } finally {
      setLoading(false);
    }
  };

  const fetchActivities = async (itineraryId) => {
    try {
      const res = await activityAPI.getByItinerary(itineraryId);

      setActivities((prev) => ({
        ...prev,
        [itineraryId]: res.data,
      }));
    } catch {
      setActivities((prev) => ({
        ...prev,
        [itineraryId]: [],
      }));
    }
  };

  const handleDayClick = (itineraryId) => {
    setActiveDay(itineraryId);
    setShowAddActivity(false);

    if (!activities[itineraryId]) {
      fetchActivities(itineraryId);
    }
  };

  const handleAddActivity = async (e) => {
    e.preventDefault();

    try {
      await activityAPI.create(activeDay, {
        ...activityForm,
        estimatedCost: activityForm.estimatedCost
          ? Number(activityForm.estimatedCost)
          : null,
        startTime: activityForm.startTime || null,
        endTime: activityForm.endTime || null,
      });

      setShowAddActivity(false);

      setActivityForm({
        title: "",
        activityType: "SIGHTSEEING",
        startTime: "",
        endTime: "",
        location: "",
        notes: "",
        estimatedCost: "",
      });

      fetchActivities(activeDay);
    } catch {
      alert("Activity add nahi hui!");
    }
  };

  const handleDeleteActivity = async (activityId) => {
    if (!window.confirm("Delete this activity?")) return;

    try {
      await activityAPI.delete(activityId);
      fetchActivities(activeDay);
    } catch {
      alert("Delete failed!");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="flex justify-center items-center h-64">
          <p className="text-gray-400">Loading trip...</p>
        </div>
      </div>
    );

  const currentActivities = activities[activeDay] || [];
  const activeItinerary = itineraries.find((i) => i.id === activeDay);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 pt-28 pb-8">

        {/* Back */}
        <button
          onClick={() => navigate("/trips")}
          className="text-gray-400 text-sm hover:text-gray-600
                     flex items-center gap-1 mb-6"
        >
          ← Back to trips
        </button>

        {/* Trip Header */}
        <div
          className="bg-white border border-gray-100 rounded-xl
                     p-6 mb-6"
        >
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {trip?.title}
              </h1>

              <p className="text-gray-500 mt-1">
                📍 {trip?.destination}
              </p>
            </div>

            <span
              className="text-xs bg-blue-100 text-blue-700
                         px-3 py-1 rounded-full font-medium"
            >
              {trip?.status}
            </span>
          </div>

          <div
            className="grid grid-cols-4 gap-4 mt-5
                       border-t border-gray-50 pt-5"
          >
            <div>
              <p className="text-xs text-gray-400">Start Date</p>
              <p className="text-sm font-medium">
                {trip?.startDate}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">End Date</p>
              <p className="text-sm font-medium">
                {trip?.endDate}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Duration</p>
              <p className="text-sm font-medium">
                {trip?.totalDays} days
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Budget</p>
              <p className="text-sm font-medium text-green-600">
                {trip?.totalBudget
                  ? `₹${trip.totalBudget.toLocaleString()}`
                  : "Not set"}
              </p>
            </div>
          </div>

          {trip?.description && (
            <p
              className="text-sm text-gray-500 mt-4 border-t
                         border-gray-50 pt-4"
            >
              {trip.description}
            </p>
          )}

          {/* Budget & Expenses Buttons */}
          <div className="flex gap-2 mt-4 pt-4 border-t border-gray-50">
            <button
              onClick={() => navigate(`/trips/${id}/budget`)}
              className="flex-1 py-2 text-sm bg-green-50 text-green-700
                         border border-green-200 rounded-lg
                         hover:bg-green-100 transition"
            >
              💰 Budget
            </button>

            <button
              onClick={() => navigate(`/trips/${id}/expenses`)}
              className="flex-1 py-2 text-sm bg-orange-50 text-orange-700
                         border border-orange-200 rounded-lg
                         hover:bg-orange-100 transition"
            >
              💸 Expenses
            </button>
          </div>
        </div>

        {/* Itinerary Section */}
        <div className="flex gap-6">

          {/* Days Sidebar */}
          <div className="w-48 shrink-0">
            <h2 className="text-sm font-semibold text-gray-700 mb-3">
              Days
            </h2>

            <div className="space-y-2">
              {itineraries.map((day) => (
                <button
                  key={day.id}
                  onClick={() => handleDayClick(day.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg
                    text-sm transition border
                    ${
                      activeDay === day.id
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-100 hover:border-blue-200"
                    }`}
                >
                  <div className="font-medium">
                    Day {day.dayNumber}
                  </div>

                  <div
                    className={`text-xs mt-0.5 ${
                      activeDay === day.id
                        ? "text-blue-200"
                        : "text-gray-400"
                    }`}
                  >
                    {day.date}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Activities Panel */}
          <div className="flex-1">

            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-sm font-semibold text-gray-700">
                  Day {activeItinerary?.dayNumber} Activities
                </h2>

                <p className="text-xs text-gray-400 mt-0.5">
                  {activeItinerary?.date}
                </p>
              </div>

              <button
                onClick={() => setShowAddActivity(!showAddActivity)}
                className="bg-blue-600 text-white text-sm px-4 py-2
                           rounded-lg hover:bg-blue-700 transition"
              >
                + Add Activity
              </button>
            </div>

            {/* Add Activity Form */}
            {showAddActivity && (
              <form
                onSubmit={handleAddActivity}
                className="bg-white border border-blue-100 rounded-xl
                           p-5 mb-4 space-y-3"
              >
                <h3 className="font-medium text-gray-800 text-sm">
                  New Activity
                </h3>

                <input
                  type="text"
                  placeholder="Activity title *"
                  value={activityForm.title}
                  onChange={(e) =>
                    setActivityForm({
                      ...activityForm,
                      title: e.target.value,
                    })
                  }
                  className="w-full border border-gray-200 rounded-lg
                             px-3 py-2 text-sm focus:outline-none
                             focus:ring-2 focus:ring-blue-500"
                  required
                />

                <select
                  value={activityForm.activityType}
                  onChange={(e) =>
                    setActivityForm({
                      ...activityForm,
                      activityType: e.target.value,
                    })
                  }
                  className="w-full border border-gray-200 rounded-lg
                             px-3 py-2 text-sm focus:outline-none
                             focus:ring-2 focus:ring-blue-500"
                >
                  {activityTypes.map((t) => (
                    <option key={t} value={t}>
                      {typeEmoji[t]} {t}
                    </option>
                  ))}
                </select>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="time"
                    value={activityForm.startTime}
                    onChange={(e) =>
                      setActivityForm({
                        ...activityForm,
                        startTime: e.target.value,
                      })
                    }
                    className="border border-gray-200 rounded-lg px-3
                               py-2 text-sm focus:outline-none
                               focus:ring-2 focus:ring-blue-500"
                    placeholder="Start time"
                  />

                  <input
                    type="time"
                    value={activityForm.endTime}
                    onChange={(e) =>
                      setActivityForm({
                        ...activityForm,
                        endTime: e.target.value,
                      })
                    }
                    className="border border-gray-200 rounded-lg px-3
                               py-2 text-sm focus:outline-none
                               focus:ring-2 focus:ring-blue-500"
                    placeholder="End time"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Location"
                  value={activityForm.location}
                  onChange={(e) =>
                    setActivityForm({
                      ...activityForm,
                      location: e.target.value,
                    })
                  }
                  className="w-full border border-gray-200 rounded-lg
                             px-3 py-2 text-sm focus:outline-none
                             focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="number"
                  placeholder="Estimated cost (₹)"
                  value={activityForm.estimatedCost}
                  onChange={(e) =>
                    setActivityForm({
                      ...activityForm,
                      estimatedCost: e.target.value,
                    })
                  }
                  className="w-full border border-gray-200 rounded-lg
                             px-3 py-2 text-sm focus:outline-none
                             focus:ring-2 focus:ring-blue-500"
                />

                <textarea
                  placeholder="Notes"
                  value={activityForm.notes}
                  onChange={(e) =>
                    setActivityForm({
                      ...activityForm,
                      notes: e.target.value,
                    })
                  }
                  rows={2}
                  className="w-full border border-gray-200 rounded-lg
                             px-3 py-2 text-sm focus:outline-none
                             focus:ring-2 focus:ring-blue-500 resize-none"
                />

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddActivity(false)}
                    className="flex-1 py-2 border border-gray-200
                               rounded-lg text-sm text-gray-600
                               hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="flex-1 py-2 bg-blue-600 text-white
                               rounded-lg text-sm font-medium
                               hover:bg-blue-700 transition"
                  >
                    Add Activity
                  </button>
                </div>
              </form>
            )}

            {/* Activities List */}
            {currentActivities.length === 0 ? (
              <div
                className="bg-white border border-gray-100
                           rounded-xl p-10 text-center"
              >
                <div className="text-3xl mb-2">📋</div>

                <p className="text-gray-400 text-sm">
                  Koi activity nahi — upar se add karo!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {currentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="bg-white border border-gray-100
                               rounded-xl p-4 hover:border-blue-100
                               transition"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <span className="text-2xl">
                          {typeEmoji[activity.activityType]}
                        </span>

                        <div>
                          <h4 className="font-medium text-gray-800 text-sm">
                            {activity.title}
                          </h4>

                          <span
                            className="text-xs bg-gray-100
                                       text-gray-500 px-2 py-0.5
                                       rounded-full mt-1 inline-block"
                          >
                            {activity.activityType}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteActivity(activity.id)}
                        className="text-red-400 hover:text-red-600
                                   text-xs transition"
                      >
                        Delete
                      </button>
                    </div>

                    <div
                      className="mt-3 flex flex-wrap gap-3 text-xs
                                 text-gray-500"
                    >
                      {activity.startTime && (
                        <span>
                          🕐 {activity.startTime}
                          {activity.endTime &&
                            ` — ${activity.endTime}`}
                        </span>
                      )}

                      {activity.location && (
                        <span>📍 {activity.location}</span>
                      )}

                      {activity.estimatedCost && (
                        <span className="text-green-600 font-medium">
                          ₹{activity.estimatedCost.toLocaleString()}
                        </span>
                      )}
                    </div>

                    {activity.notes && (
                      <p className="text-xs text-gray-400 mt-2">
                        {activity.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetail;