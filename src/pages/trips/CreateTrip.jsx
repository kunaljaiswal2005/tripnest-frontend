import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plane,
  MapPin,
  CalendarDays,
  Wallet,
  FileText,
  ArrowLeft,
} from "lucide-react";

import api from "../../utils/api";

export default function CreateTrip() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    totalBudget: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const tripData = {
        title: formData.title,
        destination: formData.destination,
        startDate: formData.startDate,
        endDate: formData.endDate,
        totalBudget: formData.totalBudget
          ? Number(formData.totalBudget)
          : null,
        description: formData.description,
      };

      await api.post("/api/trips", tripData);

      navigate("/dashboard/trips");
    } catch (err) {
      console.error("Error creating trip:", err);

      setError(
        err.response?.data?.message ||
          "Unable to create trip. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">

      {/* Header */}
      <div>
        <button
          type="button"
          onClick={() => navigate("/dashboard/trips")}
          className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition mb-4"
        >
          <ArrowLeft size={18} />
          Back to Trip Dashboard
        </button>

        <div className="flex items-center gap-3">
          <Plane className="text-cyan-400" size={28} />

          <h1 className="text-3xl font-bold text-black">
  Create New Trip
</h1>
        </div>

        <p className="text-slate-400 mt-2">
          Plan your trip by adding the basic trip details.
        </p>
      </div>

      {/* Form */}
      <section className="bg-[#08243A] border border-cyan-900/30 rounded-2xl p-6">

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Trip Title */}
          <div>
            <label className="flex items-center gap-2 text-slate-300 text-sm font-medium mb-2">
              <FileText size={17} className="text-cyan-400" />
              Trip Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Goa Vacation"
              required
              className="w-full bg-[#0C314D] border border-cyan-900/40 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-cyan-400"
            />
          </div>

          {/* Destination */}
          <div>
            <label className="flex items-center gap-2 text-slate-300 text-sm font-medium mb-2">
              <MapPin size={17} className="text-cyan-400" />
              Destination
            </label>

            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="e.g. Goa, India"
              required
              className="w-full bg-[#0C314D] border border-cyan-900/40 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-cyan-400"
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Start Date */}
            <div>
              <label className="flex items-center gap-2 text-slate-300 text-sm font-medium mb-2">
                <CalendarDays size={17} className="text-cyan-400" />
                Start Date
              </label>

              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="w-full bg-[#0C314D] border border-cyan-900/40 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400"
              />
            </div>

            {/* End Date */}
            <div>
              <label className="flex items-center gap-2 text-slate-300 text-sm font-medium mb-2">
                <CalendarDays size={17} className="text-cyan-400" />
                End Date
              </label>

              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
                className="w-full bg-[#0C314D] border border-cyan-900/40 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400"
              />
            </div>

          </div>

          {/* Budget */}
          <div>
            <label className="flex items-center gap-2 text-slate-300 text-sm font-medium mb-2">
              <Wallet size={17} className="text-cyan-400" />
              Total Budget
            </label>

            <input
              type="number"
              name="totalBudget"
              value={formData.totalBudget}
              onChange={handleChange}
              placeholder="e.g. 25000"
              min="0"
              className="w-full bg-[#0C314D] border border-cyan-900/40 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-cyan-400"
            />
          </div>

          {/* Description */}
          <div>
            <label className="flex items-center gap-2 text-slate-300 text-sm font-medium mb-2">
              <FileText size={17} className="text-cyan-400" />
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell us something about your trip..."
              rows="4"
              className="w-full bg-[#0C314D] border border-cyan-900/40 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-cyan-400 resize-none"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-900/20 border border-red-800/40 rounded-xl p-4">
              <p className="text-red-400 text-sm">
                {error}
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">

            <button
              type="button"
              onClick={() => navigate("/dashboard/trips")}
              className="px-5 py-3 rounded-xl bg-slate-700 text-white hover:bg-slate-600 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-3 rounded-xl bg-cyan-500 text-slate-950 font-semibold hover:bg-cyan-400 transition disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Trip"}
            </button>

          </div>

        </form>
      </section>
    </div>
  );
}