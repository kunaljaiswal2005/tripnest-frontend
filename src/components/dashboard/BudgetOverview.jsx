import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

import { Wallet, ArrowDownRight } from "lucide-react";

import {
  budgetSummary,
  expenseCategories,
} from "../../data/dashboardData";

export default function BudgetOverview() {
  return (
    <section className="bg-[#082A43] rounded-2xl border border-cyan-900/30 p-5 h-fit">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="text-xl font-bold text-white">
            Budget Overview
          </h2>
          <p className="text-slate-400 text-sm">
            Track your travel expenses
          </p>
        </div>

        <button className="text-cyan-400 text-sm hover:underline">
          View Details
        </button>
      </div>

      {/* Donut */}
      <div className="h-40 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={expenseCategories}
              dataKey="value"
              innerRadius={42}
              outerRadius={60}
              paddingAngle={3}
              stroke="transparent"
            >
              {expenseCategories.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-bold text-white">
            {budgetSummary.usedPercentage}%
          </span>
          <span className="text-slate-400 text-sm">
            Used
          </span>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-2 my-4">
        <div className="bg-[#0C314D] rounded-lg p-2.5">
          <p className="text-slate-400 text-[11px]">Total</p>
          <h3 className="text-white font-bold text-sm">
            ₹{budgetSummary.total.toLocaleString()}
          </h3>
        </div>

        <div className="bg-[#0C314D] rounded-lg p-2.5">
          <p className="text-slate-400 text-[11px]">Spent</p>
          <h3 className="text-orange-300 font-bold text-sm">
            ₹{budgetSummary.spent.toLocaleString()}
          </h3>
        </div>

        <div className="bg-[#0C314D] rounded-lg p-2.5">
          <p className="text-slate-400 text-[11px]">Remaining</p>
          <h3 className="text-green-300 font-bold text-sm">
            ₹{budgetSummary.remaining.toLocaleString()}
          </h3>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-2.5">
        {expenseCategories.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />

              <span className="text-slate-200 text-sm">
                {item.name}
              </span>
            </div>

            <span className="text-white text-sm font-medium">
              ₹{item.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      {/* Budget Health */}
      <div className="mt-5 p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
          <Wallet className="text-cyan-300" size={18} />
        </div>

        <div className="flex-1">
          <p className="text-cyan-200 text-sm font-medium">
            Budget Health
          </p>

          <p className="text-slate-300 text-xs">
            You're within budget with 59% remaining.
          </p>
        </div>

        <ArrowDownRight
          className="text-green-300"
          size={18}
        />
      </div>
    </section>
  );
}