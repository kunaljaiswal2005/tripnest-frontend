import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard,
  Briefcase,
  CalendarDays,
  Wallet,
  Compass,
  FileText,
  Users,
  Bell,
  BarChart3,
  Settings,
  LogOut,
  Plane,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, active: true },
  { name: "My Trips", icon: Briefcase },
  { name: "Itinerary", icon: CalendarDays },
  { name: "Budget & Expenses", icon: Wallet },
  { name: "Discover", icon: Compass },
  { name: "Documents", icon: FileText },
  { name: "Groups", icon: Users },
  { name: "Notifications", icon: Bell },
  { name: "Analytics", icon: BarChart3 },
  { name: "Settings", icon: Settings },
];

export default function DashboardSidebar() {
  const { logout } = useAuth();
    return (
    <aside className="w-64 h-screen bg-[#061B2E] border-r border-cyan-900/40 flex flex-col">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-cyan-900/30">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/10">
            <Plane className="text-cyan-400" size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              <span className="text-white">Trip</span>
              <span className="text-cyan-400">Nest</span>
            </h1>
            <p className="text-xs text-slate-400">
              Plan • Explore • Create Memories
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-5 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                item.active
                  ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20"
                  : "text-slate-300 hover:bg-[#0A2B43] hover:text-white"
              }`}
            >
              <Icon size={20} />
              <span className="text-sm font-medium">{item.name}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-cyan-900/30">
        <button
  onClick={logout}
  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-red-500/10 hover:text-red-300 transition"
>
  <LogOut size={20} />
  Logout
</button>
      </div>
    </aside>
  );
}