import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Icon = ({ children }) => (
  <span
    className="flex h-7 w-7 flex-shrink-0 items-center justify-center text-[15px]"
    aria-hidden="true"
  >
    {children}
  </span>
);

const DashboardNavbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const role = user?.role;

  const dashboardPath =
    role === "ADMIN"
      ? "/dashboard/admin"
      : "/dashboard/traveler";

  const navItems =
    role === "ADMIN"
      ? [
          { label: "Dashboard", icon: "⌂", path: "/dashboard/admin" },
          { label: "Users", icon: "♙", path: "/users" },
          { label: "Trips", icon: "✈", path: "/trips" },
          { label: "Destinations", icon: "◎", path: "/destinations" },
          { label: "Reports", icon: "▥", path: "/reports" },
          { label: "Settings", icon: "⚙", path: "/settings" },
        ]
      : [
          { label: "Dashboard", icon: "⌂", path: "/dashboard/traveler" },
          { label: "My Trips", icon: "✈", path: "/trips" },
          { label: "Itinerary", icon: "▣", path: "/itinerary" },
          { label: "Budget & Expenses", icon: "◉", path: "/budget" },
          { label: "Discover", icon: "◎", path: "/explore" },
          { label: "Documents", icon: "▤", path: "/documents" },
          { label: "Groups & Collaboration", icon: "♧", path: "/groups" },
          { label: "Notifications", icon: "♢", path: "/notifications" },
          { label: "Analytics", icon: "▥", path: "/analytics" },
          { label: "Settings", icon: "⚙", path: "/settings" },
        ];

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* MOBILE HEADER */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#dde5e5] bg-white px-4 py-3 lg:hidden">
        <div className="flex items-center justify-between">
          <NavLink
            to={dashboardPath}
            onClick={closeMenu}
            className="flex items-center gap-2"
          >
            <span className="text-xl text-[#1f6f8b]">✈</span>

            <span className="text-xl font-extrabold text-[#17324d]">
              <span className="text-[#1f6f8b]">Trip</span>Nest
            </span>
          </NavLink>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg bg-[#dff3f7] px-3 py-2 text-[#174a5b]"
            aria-label="Toggle navigation"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>

      {/* MOBILE OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#17324d]/30 lg:hidden"
          onClick={closeMenu}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          flex
          h-screen
          w-[235px]
          flex-col
          border-r
          border-[#dde5e5]
          bg-[#fffefa]
          transition-transform
          duration-300
          lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* LOGO */}
        <div className="border-b border-[#edf1ef] px-5 py-5">
          <NavLink
            to={dashboardPath}
            onClick={closeMenu}
            className="flex items-center gap-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1f6f8b] text-lg text-white">
              ✈
            </div>

            <div>
              <div className="text-xl font-extrabold tracking-tight text-[#17324d]">
                <span className="text-[#1f6f8b]">Trip</span>Nest
              </div>

              <p className="text-[8px] font-medium text-[#7b8b92]">
                Plan • Explore • Create Memories
              </p>
            </div>
          </NavLink>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <p className="mb-3 px-3 text-[9px] font-bold uppercase tracking-[0.15em] text-[#8a999f]">
            {role === "ADMIN" ? "Administration" : "Travel"}
          </p>

          <div className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `
                    flex
                    items-center
                    gap-2
                    rounded-lg
                    px-2.5
                    py-2
                    text-[10px]
                    font-semibold
                    transition-all
                    duration-200
                    ${
                      isActive
                        ? "bg-[#1f6f8b] text-white shadow-sm"
                        : "text-[#526b76] hover:bg-[#dff3f7] hover:text-[#174a5b]"
                    }
                  `
                }
              >
                <Icon>{item.icon}</Icon>

                <span className="truncate">
                  {item.label}
                </span>

                {item.label === "Notifications" && (
                  <span className="ml-auto flex h-4 w-4 items-center justify-center rounded-full bg-[#d96c62] text-[8px] font-bold text-white">
                    1
                  </span>
                )}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* USER */}
        <div className="border-t border-[#edf1ef] p-3">
          <div className="mb-2 flex items-center gap-2 rounded-xl bg-[#f5ebdd] p-2.5">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#8ed1e8] text-xs font-bold text-[#174a5b]">
              {(user?.name || "U").charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0">
              <p className="truncate text-[10px] font-bold text-[#17324d]">
                {user?.name || "Traveler"}
              </p>

              <p className="truncate text-[8px] text-[#71828a]">
                {user?.email || "Account"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-[10px] font-semibold text-[#667784] transition hover:bg-[#f9e9e7] hover:text-[#d96c62]"
          >
            <span>↪</span>
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default DashboardNavbar;