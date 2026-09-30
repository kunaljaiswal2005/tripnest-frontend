import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { expenseAPI, tripAPI } from "../utils/api";

const CATEGORIES = [
  "TRANSPORTATION", "HOTEL", "FOOD",
  "SHOPPING", "ENTERTAINMENT", "MISCELLANEOUS"
];

const catEmoji = {
  TRANSPORTATION: "🚗", HOTEL: "🏨",
  FOOD: "🍽️",          SHOPPING: "🛍️",
  ENTERTAINMENT: "🎭",  MISCELLANEOUS: "📦",
};

const Expenses = () => {
  const { tripId } = useParams();
  const navigate   = useNavigate();

  const [trip,      setTrip]      = useState(null);
  const [expenses,  setExpenses]  = useState([]);
  const [summary,   setSummary]   = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [showForm,  setShowForm]  = useState(false);
  const [filter,    setFilter]    = useState("ALL");
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    description: "",
    amount: "",
    category: "FOOD",
    expenseDate: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    fetchData();
  }, [tripId]);

  const fetchData = async () => {
    try {
      const [tripRes, expRes, sumRes] = await Promise.all([
        tripAPI.getById(tripId),
        expenseAPI.getAll(tripId),
        expenseAPI.summary(tripId),
      ]);
      setTrip(tripRes.data);
      setExpenses(expRes.data);
      setSummary(sumRes.data);
    } catch {
      navigate("/trips");
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await expenseAPI.add(tripId, {
        ...form,
        amount: Number(form.amount),
      });
      setForm({
        description: "",
        amount: "",
        category: "FOOD",
        expenseDate: new Date().toISOString().split("T")[0],
      });
      setShowForm(false);
      fetchData();
    } catch {
      alert("Expense add failed!");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this expense?")) return;
    try {
      await expenseAPI.delete(id);
      fetchData();
    } catch {
      alert("Delete failed!");
    }
  };

  const filtered = filter === "ALL"
    ? expenses
    : expenses.filter((e) => e.category === filter);

  if (loading) return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="flex items-center justify-center h-64">
        <p className="text-slate-400">Loading expenses...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6
                       pt-24 sm:pt-28 pb-12">

        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate(`/trips/${tripId}`)}
            className="text-slate-400 text-sm hover:text-slate-600
                       flex items-center gap-1 mb-4"
          >
            ← Back to trip
          </button>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                💸 Expenses
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                {trip?.title}
              </p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 text-white px-4 py-2
                         rounded-xl text-sm font-medium
                         hover:bg-blue-700 transition"
            >
              + Add Expense
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        {summary && (
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white border border-slate-200
                            rounded-2xl p-4 shadow-sm text-center">
              <p className="text-xs text-slate-400">Total Spent</p>
              <p className="text-xl font-bold text-red-500 mt-1">
                ₹{summary.totalSpent?.toLocaleString()}
              </p>
            </div>
            <div className="bg-white border border-slate-200
                            rounded-2xl p-4 shadow-sm text-center">
              <p className="text-xs text-slate-400">Budget</p>
              <p className="text-xl font-bold text-blue-600 mt-1">
                ₹{summary.totalBudget?.toLocaleString() || "—"}
              </p>
            </div>
            <div className="bg-white border border-slate-200
                            rounded-2xl p-4 shadow-sm text-center">
              <p className="text-xs text-slate-400">Remaining</p>
              <p className={`text-xl font-bold mt-1 ${
                (summary.remainingBudget || 0) < 0
                  ? "text-red-500" : "text-emerald-600"
              }`}>
                ₹{summary.remainingBudget?.toLocaleString() || "—"}
              </p>
            </div>
          </div>
        )}

        {/* Add Expense Form */}
        {showForm && (
          <form
            onSubmit={handleAddExpense}
            className="bg-white border border-blue-100
                       rounded-2xl p-6 mb-6 shadow-sm"
          >
            <h2 className="font-semibold text-slate-800 mb-4">
              New Expense
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="col-span-2">
                <input
                  type="text"
                  placeholder="Description *"
                  value={form.description}
                  onChange={(e) => setForm({
                    ...form, description: e.target.value
                  })}
                  className="w-full border border-slate-200 rounded-xl
                             px-4 py-2.5 text-sm focus:outline-none
                             focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Amount (₹) *"
                  value={form.amount}
                  onChange={(e) => setForm({
                    ...form, amount: e.target.value
                  })}
                  className="w-full border border-slate-200 rounded-xl
                             px-4 py-2.5 text-sm focus:outline-none
                             focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <input
                  type="date"
                  value={form.expenseDate}
                  onChange={(e) => setForm({
                    ...form, expenseDate: e.target.value
                  })}
                  className="w-full border border-slate-200 rounded-xl
                             px-4 py-2.5 text-sm focus:outline-none
                             focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="col-span-2">
                <select
                  value={form.category}
                  onChange={(e) => setForm({
                    ...form, category: e.target.value
                  })}
                  className="w-full border border-slate-200 rounded-xl
                             px-4 py-2.5 text-sm focus:outline-none
                             focus:ring-2 focus:ring-blue-500"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {catEmoji[c]} {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 py-2.5 border border-slate-200
                           rounded-xl text-sm text-slate-600
                           hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 py-2.5 bg-blue-600 text-white
                           rounded-xl text-sm font-medium
                           hover:bg-blue-700 transition
                           disabled:opacity-50"
              >
                {submitting ? "Adding..." : "Add Expense"}
              </button>
            </div>
          </form>
        )}

        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap mb-5">
          {["ALL", ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-full text-xs
                          font-medium transition border ${
                filter === cat
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"
              }`}
            >
              {cat !== "ALL" && catEmoji[cat]} {cat}
            </button>
          ))}
        </div>

        {/* Expenses List */}
        {filtered.length === 0 ? (
          <div className="bg-white border border-slate-200
                          rounded-2xl p-12 text-center shadow-sm">
            <div className="text-4xl mb-3">💸</div>
            <p className="text-slate-400 text-sm">
              No expenses yet
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((expense) => (
              <div
                key={expense.id}
                className="bg-white border border-slate-200
                           rounded-2xl p-4 shadow-sm flex
                           items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-slate-50
                                  flex items-center justify-center
                                  text-xl">
                    {catEmoji[expense.category]}
                  </div>
                  <div>
                    <p className="font-medium text-slate-800 text-sm">
                      {expense.description}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-slate-400">
                        {expense.expenseDate}
                      </span>
                      <span className="text-xs bg-slate-100
                                       text-slate-500 px-2 py-0.5
                                       rounded-full">
                        {expense.category}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-800">
                    ₹{expense.amount?.toLocaleString()}
                  </span>
                  <button
                    onClick={() => handleDelete(expense.id)}
                    className="text-red-400 hover:text-red-600
                               text-xs transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {/* Total */}
            <div className="bg-slate-800 rounded-2xl p-4
                            flex justify-between items-center">
              <span className="text-white font-medium text-sm">
                Total ({filtered.length} expenses)
              </span>
              <span className="text-white font-bold">
                ₹{filtered
                    .reduce((s, e) => s + (e.amount || 0), 0)
                    .toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Expenses;