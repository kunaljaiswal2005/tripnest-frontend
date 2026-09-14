import { useNavigate } from "react-router-dom";

import { DashboardLayout } from "../../components/dashboard";
import WelcomeHero from "../../components/dashboard/WelcomeHero";
import QuickActions from "../../components/dashboard/QuickActions";
import UpcomingTripCard from "../../components/dashboard/UpcomingTripCard";
import UpcomingActivities from "../../components/dashboard/UpcomingActivities";
import TripCard from "../../components/dashboard/TripCard";
import { trips } from "../../data/dashboardData";
import BudgetOverview from "../../components/dashboard/BudgetOverview";
import ExploreDestinations from "../../components/dashboard/ExploreDestinations";
import TravelDocuments from "../../components/dashboard/TravelDocuments";
import RecentActivity from "../../components/dashboard/RecentActivity";
import TravelStatistics from "../../components/dashboard/TravelStatistics";
import TravelInspiration from "../../components/dashboard/TravelInspiration";

export default function TravelerDashboard() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>

      <div className="space-y-6 animate-fadeIn">

        {/* TOP: Welcome + Statistics */}
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_290px] gap-6 items-stretch">

          <WelcomeHero />

          <TravelStatistics />

        </div>


        {/* MAIN DASHBOARD */}
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_290px] gap-6 items-stretch">

          {/* ================= LEFT COLUMN ================= */}
          <div className="flex min-h-full flex-col gap-6">

            {/* Quick Actions */}
            <QuickActions />


            {/* Upcoming Trip */}
            <UpcomingTripCard />


            {/* Your Trips */}
            <section className="space-y-4">

              <div className="flex justify-between items-center">

                <h2 className="text-2xl font-bold text-white">
                  Your Trips
                </h2>

                <button
                  type="button"
                  onClick={() => navigate("/dashboard/trips")}
                  className="text-cyan-400 text-sm hover:underline"
                >
                  View All
                </button>

              </div>


              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

                {trips.map((trip) => (
                  <TripCard
                    key={trip.id}
                    trip={trip}
                  />
                ))}

              </div>

            </section>


            {/* Explore Destinations */}
            <ExploreDestinations />


            {/* Travel Banner */}
            <div className="flex-1 min-h-[220px]">
              <TravelInspiration />
            </div>

          </div>


          {/* ================= RIGHT COLUMN ================= */}
          <div className="flex min-h-full w-full flex-col gap-6">

            {/* Budget */}
            <BudgetOverview />


            {/* Activities */}
            <UpcomingActivities />


            {/* Travel Documents */}
            <TravelDocuments />


            {/* Recent Activity */}
            <RecentActivity />

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}