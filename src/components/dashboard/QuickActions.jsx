import {
  Plus,
  CalendarDays,
  Wallet,
  Upload,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import QuickActionCard from "./QuickActionCard";

const actions = [
  {
    title: "New Trip",
    subtitle: "Create a new journey",
    icon: Plus,
    color: "#FF7568",
    path: "/dashboard/trips/create",
  },
  {
    title: "Create Itinerary",
    subtitle: "Plan your daily schedule",
    icon: CalendarDays,
    color: "#20C9D2",
  },
  {
    title: "Add Expense",
    subtitle: "Track your spending",
    icon: Wallet,
    color: "#4CCB8A",
  },
  {
    title: "Upload Document",
    subtitle: "Store tickets & bookings",
    icon: Upload,
    color: "#8B6DE8",
  },
];

export default function QuickActions() {
  const navigate = useNavigate();

  const handleActionClick = (action) => {
    if (action.path) {
      navigate(action.path);
      return;
    }

    console.log(action.title);
  };

  return (
    <section className="space-y-4">

      <div>
        <h2 className="text-xl font-bold text-white">
          Quick Actions
        </h2>

        <p className="text-slate-400 text-sm">
          Start planning your next adventure
        </p>
      </div>

      {/* 4 Cards in One Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        {actions.map((action) => (
          <QuickActionCard
            key={action.title}
            {...action}
            onClick={() => handleActionClick(action)}
          />
        ))}

      </div>

    </section>
  );
}