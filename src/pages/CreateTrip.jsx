import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import MapboxSearch from "../components/MapboxSearch";
import { tripAPI, itineraryAPI } from "../utils/api";

const CreateTrip = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    totalBudget: "",
    description: "",
    status: "PLANNING",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await tripAPI.create({
        ...form,
        totalBudget: form.totalBudget
          ? Number(form.totalBudget)
          : null,
      });

      const tripId = res.data.id;

      // Automatically generate itinerary days
      await itineraryAPI.generate(tripId);

      navigate(`/trips/${tripId}`);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Trip create failed! Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">

        {/* ================= TOP HEADER ================= */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/trips")}
            className="group flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition mb-5"
          >
            <span className="group-hover:-translate-x-1 transition-transform">
              ←
            </span>
            Back to trips
          </button>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold mb-3">
                ✨ Plan your next adventure
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Create a New Trip
                <span className="ml-2">✈️</span>
              </h1>

              <p className="text-slate-500 mt-2 max-w-2xl text-sm sm:text-base">
                Add your trip details and let TripNest help you organize your
                journey with a day-wise itinerary.
              </p>
            </div>

            <div className="hidden md:flex items-center gap-2 text-sm text-slate-400">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Step 1 of 1
            </div>
          </div>
        </div>

        {/* ================= ERROR ================= */}
        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 flex items-start gap-3">
            <div className="w-9 h-9 shrink-0 rounded-xl bg-red-100 flex items-center justify-center">
              ⚠️
            </div>

            <div>
              <p className="text-sm font-semibold text-red-700">
                Something went wrong
              </p>

              <p className="text-sm text-red-600 mt-0.5">
                {error}
              </p>
            </div>
          </div>
        )}

        {/* ================= MAIN GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ================= FORM ================= */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden"
            >

              {/* Form Header */}
              <div className="px-6 sm:px-8 py-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-xl">
                    🗺️
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-900">
                      Trip Details
                    </h2>

                    <p className="text-xs text-slate-500 mt-0.5">
                      Tell us about your upcoming journey
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6">

                {/* ================= TITLE + DESTINATION ================= */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  {/* Title */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Trip Title
                      <span className="text-blue-600 ml-1">*</span>
                    </label>

                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-lg">
                        📝
                      </span>

                      <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="e.g. Goa Adventure"
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                        required
                      />
                    </div>
                  </div>

                  {/* Destination - Mapbox */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Destination
                      <span className="text-blue-600 ml-1">*</span>
                    </label>

                    <MapboxSearch
                      placeholder="Search destination..."
                      onPlaceSelect={(place) => {
                        setForm((prev) => ({
                          ...prev,
                          destination: place.name,
                        }));
                      }}
                    />

                    {form.destination && (
                      <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                        <span>✅</span>
                        {form.destination}
                      </p>
                    )}
                  </div>
                </div>

                {/* ================= DATES ================= */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Travel Dates
                    <span className="text-blue-600 ml-1">*</span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                    {/* Start Date */}
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-lg pointer-events-none">
                        🗓️
                      </span>

                      <input
                        type="date"
                        name="startDate"
                        value={form.startDate}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-700 outline-none transition-all focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                        required
                      />

                      <span className="absolute left-11 -top-2 px-1 bg-white text-[10px] text-slate-400">
                        Start date
                      </span>
                    </div>

                    {/* End Date */}
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-lg pointer-events-none">
                        🏁
                      </span>

                      <input
                        type="date"
                        name="endDate"
                        value={form.endDate}
                        onChange={handleChange}
                        min={form.startDate}
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-700 outline-none transition-all focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                        required
                      />

                      <span className="absolute left-11 -top-2 px-1 bg-white text-[10px] text-slate-400">
                        End date
                      </span>
                    </div>
                  </div>
                </div>

                {/* ================= BUDGET + STATUS ================= */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  {/* Budget */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Total Budget
                    </label>

                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base font-bold text-slate-500">
                        ₹
                      </span>

                      <input
                        type="number"
                        name="totalBudget"
                        value={form.totalBudget}
                        onChange={handleChange}
                        min="0"
                        placeholder="25,000"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>

                    <p className="text-[11px] text-slate-400 mt-2">
                      Optional — you can manage expenses later.
                    </p>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Trip Status
                    </label>

                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-lg pointer-events-none">
                        📌
                      </span>

                      <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-700 outline-none appearance-none transition-all focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                      >
                        <option value="PLANNING">
                          Planning
                        </option>

                        <option value="UPCOMING">
                          Upcoming
                        </option>

                        <option value="ONGOING">
                          Ongoing
                        </option>
                      </select>

                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                        ▼
                      </span>
                    </div>
                  </div>
                </div>

                {/* ================= DESCRIPTION ================= */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold text-slate-700">
                      Description
                    </label>

                    <span className="text-[11px] text-slate-400">
                      Optional
                    </span>
                  </div>

                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="What are you planning for this trip? Add some notes, goals or special requirements..."
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-900 placeholder:text-slate-400 outline-none resize-none transition-all focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>

                {/* ================= DIVIDER ================= */}
                <div className="border-t border-slate-100" />

                {/* ================= BUTTONS ================= */}
                <div className="flex flex-col-reverse sm:flex-row gap-3">

                  <button
                    type="button"
                    onClick={() => navigate("/trips")}
                    disabled={loading}
                    className="sm:flex-1 py-3.5 px-5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="sm:flex-[2] py-3.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:hover:translate-y-0 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Creating your trip...
                      </>
                    ) : (
                      <>
                        Create Trip
                        <span>→</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* ================= SIDEBAR ================= */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-28 space-y-5">

              {/* Preview Card */}
              <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">

                <div className="relative h-40 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 overflow-hidden">

                  <div className="absolute -right-8 -top-10 w-40 h-40 rounded-full bg-white/10" />

                  <div className="absolute -left-10 -bottom-16 w-48 h-48 rounded-full bg-white/5" />

                  <div className="relative z-10 h-full flex flex-col justify-between p-5">

                    <div className="flex justify-between items-start">
                      <span className="px-2.5 py-1 rounded-full bg-white/15 border border-white/20 text-white text-[10px] font-semibold backdrop-blur-sm">
                        TRIP PREVIEW
                      </span>

                      <span className="text-3xl">
                        ✈️
                      </span>
                    </div>

                    <div>
                      <p className="text-white/70 text-xs">
                        Your next adventure
                      </p>

                      <h3 className="text-xl font-bold text-white mt-1 truncate">
                        {form.title || "Your Trip"}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="p-5 space-y-4">

                  {/* Destination */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                      📍
                    </div>

                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-wide text-slate-400 font-semibold">
                        Destination
                      </p>

                      <p className="text-sm font-semibold text-slate-800 truncate">
                        {form.destination || "Not selected"}
                      </p>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center">
                      📅
                    </div>

                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-wide text-slate-400 font-semibold">
                        Travel dates
                      </p>

                      <p className="text-sm font-semibold text-slate-800">
                        {form.startDate && form.endDate
                          ? `${form.startDate} → ${form.endDate}`
                          : "Dates not selected"}
                      </p>
                    </div>
                  </div>

                  {/* Budget */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
                      💰
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-wide text-slate-400 font-semibold">
                        Budget
                      </p>

                      <p className="text-sm font-semibold text-slate-800">
                        {form.totalBudget
                          ? `₹${Number(
                              form.totalBudget
                            ).toLocaleString("en-IN")}`
                          : "Not set"}
                      </p>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      Status
                    </span>

                    <span className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-600 border border-purple-100 text-[10px] font-bold">
                      {form.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Info Card */}
              <div className="rounded-3xl bg-slate-900 p-5 relative overflow-hidden">

                <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-blue-500/10" />

                <div className="relative z-10">

                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-xl mb-4">
                    💡
                  </div>

                  <h3 className="font-bold text-white">
                    What happens next?
                  </h3>

                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    After creating your trip, TripNest will automatically
                    generate the itinerary days based on your travel dates.
                  </p>

                  <div className="mt-4 space-y-3">

                    <div className="flex gap-3 items-center">
                      <span className="w-6 h-6 rounded-full bg-blue-500/15 text-blue-400 text-[10px] font-bold flex items-center justify-center">
                        1
                      </span>

                      <span className="text-xs text-slate-300">
                        Trip gets created
                      </span>
                    </div>

                    <div className="flex gap-3 items-center">
                      <span className="w-6 h-6 rounded-full bg-blue-500/15 text-blue-400 text-[10px] font-bold flex items-center justify-center">
                        2
                      </span>

                      <span className="text-xs text-slate-300">
                        Itinerary days are generated
                      </span>
                    </div>

                    <div className="flex gap-3 items-center">
                      <span className="w-6 h-6 rounded-full bg-blue-500/15 text-blue-400 text-[10px] font-bold flex items-center justify-center">
                        3
                      </span>

                      <span className="text-xs text-slate-300">
                        Start customizing your trip
                      </span>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default CreateTrip;