import { Search, Bell, ChevronDown } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function DashboardHeader() {
  const { user } = useAuth();

  const travelerName = user?.name || "Traveler";

  const initials = travelerName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <header className="h-20 bg-[#08243A] border-b border-cyan-900/30 flex items-center justify-between px-8">
      {/* Search */}
      <div className="w-[480px] relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          size={18}
        />

        <input
          type="text"
          placeholder="Search destinations, trips, activities..."
          className="w-full bg-[#0C314D] text-white rounded-xl pl-11 pr-4 py-3 outline-none border border-transparent focus:border-cyan-400 placeholder:text-slate-400"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        <button className="relative p-2 rounded-full hover:bg-[#0C314D] transition">
          <Bell className="text-white" size={22} />

          <span className="absolute -top-1 -right-1 w-5 h-5 bg-coral-500 rounded-full text-[10px] flex items-center justify-center text-white">
            3
          </span>
        </button>

        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-11 h-11 rounded-full bg-[#0C314D] border-2 border-cyan-400 flex items-center justify-center text-cyan-400 font-semibold">
  {initials}
</div>

          <div className="text-left">
            <p className="text-white text-sm font-semibold">
  {travelerName}
</p>
            <p className="text-slate-400 text-xs">Traveler</p>
          </div>

          <ChevronDown className="text-slate-400" size={18} />
        </div>
      </div>
    </header>
  );
}