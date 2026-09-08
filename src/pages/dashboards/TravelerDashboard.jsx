import { useAuth } from '../../context/AuthContext';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';

import {
  travelerStats,
  upcomingTrips,
  recentExpenses,
  favoriteDestinations,
  notifications,
} from '../../data/travelerDashboardData';


const TravelerDashboard = () => {
  const { user } = useAuth();

  const totalBudget = travelerStats.travelBudget;
  const spentAmount = recentExpenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const remainingBudget = totalBudget - spentAmount;
  const budgetPercentage = Math.min(
    Math.round((spentAmount / totalBudget) * 100),
    100
  );

  return (
    <div className="min-h-screen bg-slate-50">

      <DashboardNavbar />

      <main className="lg:ml-72 pt-20 lg:pt-0">

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-8">

          {/* =====================================================
              WELCOME SECTION
          ====================================================== */}

          <section className="mb-8">

            <p className="text-sm font-semibold text-blue-600 mb-2">
              ✨ Welcome back
            </p>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">

              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
                  Hello, {user?.name || 'Traveler'} 👋
                </h1>

                <p className="text-gray-500 mt-2">
                  Ready to plan your next unforgettable adventure?
                </p>
              </div>

              <div className="text-sm text-gray-500">
                📅 {new Date().toLocaleDateString('en-IN', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                })}
              </div>

            </div>

          </section>


          {/* =====================================================
              HERO
          ====================================================== */}

          <section className="
            relative
            overflow-hidden
            rounded-3xl
            bg-gradient-to-br
            from-blue-600
            via-indigo-600
            to-violet-700
            p-7
            sm:p-10
            mb-8
            shadow-xl
          ">

            <div className="relative z-10 max-w-2xl">

              <div className="
                inline-flex
                items-center
                gap-2
                px-3
                py-1.5
                rounded-full
                bg-white/15
                border
                border-white/20
                text-white
                text-xs
                font-medium
              ">
                🌍 TRAVEL SMART
              </div>

              <h2 className="
                text-3xl
                sm:text-4xl
                font-bold
                text-white
                mt-5
                leading-tight
              ">
                Every journey begins
                <br className="hidden sm:block" />
                with a plan.
              </h2>

              <p className="
                mt-4
                text-blue-100
                text-sm
                sm:text-base
                max-w-xl
                leading-relaxed
              ">
                Organize your trips, track your expenses and keep
                your travel memories in one beautiful place.
              </p>

              <div className="flex flex-wrap gap-3 mt-7">

                <button className="
                  bg-white
                  text-blue-600
                  px-5
                  py-3
                  rounded-xl
                  font-semibold
                  text-sm
                  hover:bg-blue-50
                  hover:-translate-y-0.5
                  transition
                  shadow-lg
                ">
                  + Plan a Trip
                </button>

                <button className="
                  bg-white/10
                  border
                  border-white/20
                  text-white
                  px-5
                  py-3
                  rounded-xl
                  font-semibold
                  text-sm
                  hover:bg-white/20
                  transition
                ">
                  Explore Destinations →
                </button>

              </div>

            </div>


            {/* Decorative airplane */}

            <div className="
              absolute
              right-8
              top-8
              text-7xl
              sm:text-9xl
              opacity-20
              rotate-12
              select-none
            ">
              ✈️
            </div>

            <div className="
              absolute
              -right-24
              -bottom-32
              w-80
              h-80
              rounded-full
              bg-white/10
            " />

            <div className="
  absolute
  right-40
  -top-32
  w-64
  h-64
  rounded-full
  bg-white/5
"/>

          </section>


          {/* =====================================================
    STATISTICS
====================================================== */}
<section className="
  grid
  grid-cols-1
  sm:grid-cols-2
  xl:grid-cols-4
  gap-5
  mb-8
">

  {/* Upcoming Trips */}
  <div className="
    bg-white
    rounded-2xl
    border border-gray-100
    p-5
    shadow-sm
    hover:shadow-lg
    hover:-translate-y-1
    transition-all duration-300
  ">
    <div className="flex justify-between items-start">

      <div className="
        w-11 h-11
        rounded-xl
        bg-blue-50
        flex items-center justify-center
        text-xl
      ">
        ✈️
      </div>

      <span className="
        text-xs
        font-medium
        text-blue-600
        bg-blue-50
        px-2.5
        py-1
        rounded-full
      ">
        Upcoming
      </span>

    </div>

    <p className="text-3xl font-bold text-slate-800 mt-5">
      {travelerStats.upcomingTrips}
    </p>

    <p className="text-sm text-gray-500 mt-1">
      Upcoming trips
    </p>
  </div>


  {/* Budget */}
  <div className="
    bg-white
    rounded-2xl
    border border-gray-100
    p-5
    shadow-sm
    hover:shadow-lg
    hover:-translate-y-1
    transition-all duration-300
  ">

    <div className="flex justify-between items-start">

      <div className="
        w-11 h-11
        rounded-xl
        bg-emerald-50
        flex items-center justify-center
        text-xl
      ">
        💰
      </div>

      <span className="
        text-xs
        font-medium
        text-emerald-600
        bg-emerald-50
        px-2.5
        py-1
        rounded-full
      ">
        Budget
      </span>

    </div>

    <p className="text-3xl font-bold text-slate-800 mt-5">
      ₹{totalBudget.toLocaleString('en-IN')}
    </p>

    <p className="text-sm text-gray-500 mt-1">
      Travel budget
    </p>

  </div>


  {/* Completed Trips */}
  <div className="
    bg-white
    rounded-2xl
    border border-gray-100
    p-5
    shadow-sm
    hover:shadow-lg
    hover:-translate-y-1
    transition-all duration-300
  ">

    <div className="flex justify-between items-start">

      <div className="
        w-11 h-11
        rounded-xl
        bg-violet-50
        flex items-center justify-center
        text-xl
      ">
        🏆
      </div>

      <span className="
        text-xs
        font-medium
        text-violet-600
        bg-violet-50
        px-2.5
        py-1
        rounded-full
      ">
        Completed
      </span>

    </div>

    <p className="text-3xl font-bold text-slate-800 mt-5">
      {travelerStats.completedTrips}
    </p>

    <p className="text-sm text-gray-500 mt-1">
      Completed trips
    </p>

  </div>


  {/* Destinations */}
  <div className="
    bg-white
    rounded-2xl
    border border-gray-100
    p-5
    shadow-sm
    hover:shadow-lg
    hover:-translate-y-1
    transition-all duration-300
  ">

    <div className="flex justify-between items-start">

      <div className="
        w-11 h-11
        rounded-xl
        bg-orange-50
        flex items-center justify-center
        text-xl
      ">
        🌍
      </div>

      <span className="
        text-xs
        font-medium
        text-orange-600
        bg-orange-50
        px-2.5
        py-1
        rounded-full
      ">
        Explored
      </span>

    </div>

    <p className="text-3xl font-bold text-slate-800 mt-5">
      {travelerStats.destinationsVisited}
    </p>

    <p className="text-sm text-gray-500 mt-1">
      Destinations visited
    </p>

  </div>

</section>


          {/* =====================================================
              MAIN CONTENT
          ====================================================== */}

          <section className="
            grid
            grid-cols-1
            xl:grid-cols-3
            gap-6
          ">


            {/* =================================================
                UPCOMING TRIPS
            ================================================== */}

            <div className="
              xl:col-span-2
              bg-white
              rounded-2xl
              border border-gray-100
              shadow-sm
              p-6
            ">

              <div className="
                flex
                items-center
                justify-between
                mb-6
              ">

                <div>
                  <h2 className="text-lg font-bold text-slate-800">
                    Upcoming Adventures
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Your next planned journeys
                  </p>
                </div>

                <button className="
                  text-sm
                  font-semibold
                  text-blue-600
                  hover:text-blue-700
                ">
                  View all →
                </button>

              </div>


              <div className="space-y-4">

                {upcomingTrips.map((trip) => (

                  <div
                    key={trip.id}
                    className="
                      group
                      flex
                      flex-col
                      sm:flex-row
                      sm:items-center
                      justify-between
                      gap-5
                      p-5
                      rounded-2xl
                      border
                      border-gray-100
                      hover:border-blue-200
                      hover:shadow-md
                      transition-all duration-300
                    "
                  >

                    <div className="flex items-center gap-4">

                      <div className="
                        w-14
                        h-14
                        shrink-0
                        rounded-2xl
                        bg-gradient-to-br
                        from-blue-50
                        to-indigo-100
                        flex
                        items-center
                        justify-center
                        text-2xl
                        group-hover:scale-110
                        transition
                      ">
                        {trip.icon}
                      </div>

                      <div>

                        <h3 className="
                          font-bold
                          text-slate-800
                          group-hover:text-blue-600
                          transition
                        ">
                          {trip.name}
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                          📍 {trip.destination}
                        </p>

                      </div>

                    </div>


                    <div className="
                      flex
                      items-center
                      justify-between
                      sm:justify-end
                      gap-5
                    ">

                      <div className="sm:text-right">

                        <p className="text-sm font-semibold text-slate-700">
                          {trip.startDate} – {trip.endDate}
                        </p>

                        <p className="text-xs text-gray-400 mt-1">
                          {trip.duration}
                        </p>

                      </div>

                      <button className="
                        w-9 h-9
                        rounded-full
                        bg-gray-50
                        text-gray-500
                        hover:bg-blue-600
                        hover:text-white
                        transition
                      ">
                        →
                      </button>

                    </div>

                  </div>

                ))}

              </div>

            </div>


            {/* =================================================
                NOTIFICATIONS
            ================================================== */}

            <div className="
              bg-white
              rounded-2xl
              border border-gray-100
              shadow-sm
              p-6
            ">

              <div className="flex items-center justify-between mb-6">

                <div>
                  <h2 className="text-lg font-bold text-slate-800">
                    Notifications
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Stay up to date
                  </p>
                </div>

                <div className="
                  w-9 h-9
                  rounded-xl
                  bg-blue-50
                  flex items-center justify-center
                ">
                  🔔
                </div>

              </div>


              <div className="space-y-4">

                {notifications.map((notification) => (

                  <div
                    key={notification.id}
                    className="
                      flex
                      gap-3
                      p-3
                      rounded-xl
                      bg-gray-50
                      hover:bg-blue-50
                      transition
                    "
                  >

                    <div className="
                      w-9 h-9
                      shrink-0
                      rounded-lg
                      bg-white
                      flex
                      items-center
                      justify-center
                      shadow-sm
                    ">
                      {notification.icon}
                    </div>

                    <div className="min-w-0">

                      <p className="text-sm font-semibold text-slate-700">
                        {notification.title}
                      </p>

                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                        {notification.message}
                      </p>

                      <p className="text-[11px] text-gray-400 mt-1">
                        {notification.time}
                      </p>

                    </div>

                  </div>

                ))}

              </div>


              <button className="
                w-full
                mt-5
                py-2.5
                rounded-xl
                border border-gray-200
                text-sm
                font-medium
                text-gray-600
                hover:bg-gray-50
                transition
              ">
                View all notifications
              </button>

            </div>

          </section>


          {/* =====================================================
              BUDGET + PROFILE
          ====================================================== */}

          <section className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-6
            mt-6
          ">


            {/* Budget Overview */}

            <div className="
              bg-white
              rounded-2xl
              border border-gray-100
              shadow-sm
              p-6
            ">

              <div className="
                flex
                items-start
                justify-between
              ">

                <div>
                  <h2 className="text-lg font-bold text-slate-800">
                    Budget Overview
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Keep your travel spending on track
                  </p>
                </div>

                <div className="
                  w-10 h-10
                  rounded-xl
                  bg-emerald-50
                  flex items-center justify-center
                  text-xl
                ">
                  💰
                </div>

              </div>


              <div className="mt-7">

                <div className="
                  flex
                  items-end
                  justify-between
                  mb-3
                ">

                  <div>
                    <p className="text-3xl font-bold text-slate-800">
                      ₹{spentAmount.toLocaleString('en-IN')}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      spent of ₹{totalBudget.toLocaleString('en-IN')}
                    </p>
                  </div>

                  <p className="
                    text-sm
                    font-semibold
                    text-emerald-600
                  ">
                    {budgetPercentage}%
                  </p>

                </div>


                {/* Progress Bar */}

                <div className="
                  w-full
                  h-3
                  rounded-full
                  bg-gray-100
                  overflow-hidden
                ">

                  <div
                    className="
                      h-full
                      rounded-full
                      bg-gradient-to-r
                      from-emerald-400
                      to-emerald-600
                      transition-all
                      duration-700
                    "
                    style={{
                      width: `${budgetPercentage}%`,
                    }}
                  />

                </div>


                <div className="
                  flex
                  justify-between
                  mt-3
                  text-xs
                ">

                  <span className="text-gray-500">
                    ₹{spentAmount.toLocaleString('en-IN')} spent
                  </span>

                  <span className="text-gray-500">
                    ₹{remainingBudget.toLocaleString('en-IN')} remaining
                  </span>

                </div>

              </div>


              <button className="
                w-full
                mt-6
                py-2.5
                rounded-xl
                bg-emerald-50
                text-emerald-700
                text-sm
                font-semibold
                hover:bg-emerald-100
                transition
              ">
                Manage Budget →
              </button>

            </div>


            {/* Profile Card */}

            <div className="
              bg-white
              rounded-2xl
              border border-gray-100
              shadow-sm
              p-6
            ">

              <div className="
                flex
                items-center
                justify-between
                mb-6
              ">

                <div>
                  <h2 className="text-lg font-bold text-slate-800">
                    Your Travel Profile
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Your TripNest account
                  </p>
                </div>

                <span className="text-2xl">
                  👤
                </span>

              </div>


              <div className="flex items-center gap-4">

                <div className="
                  w-16 h-16
                  rounded-2xl
                  bg-gradient-to-br
                  from-blue-100
                  to-indigo-100
                  flex items-center justify-center
                  text-3xl
                ">
                  👤
                </div>

                <div className="min-w-0">

                  <h3 className="font-bold text-slate-800">
                    {user?.name || 'Traveler'}
                  </h3>

                  <p className="text-sm text-gray-500 truncate mt-1">
                    {user?.email}
                  </p>

                  <span className="
                    inline-block
                    mt-2
                    text-xs
                    font-medium
                    bg-blue-50
                    text-blue-600
                    px-2.5
                    py-1
                    rounded-full
                  ">
                    {user?.role || 'TRAVELER'}
                  </span>

                </div>

              </div>


              <div className="
                grid
                grid-cols-2
                gap-3
                mt-6
              ">

                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400">
                    Trips
                  </p>

                  <p className="text-lg font-bold text-slate-800 mt-1">
                    {travelerStats.completedTrips}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400">
                    Destinations
                  </p>

                  <p className="text-lg font-bold text-slate-800 mt-1">
                    {travelerStats.destinationsVisited}
                  </p>
                </div>

              </div>

            </div>

          </section>


          {/* =====================================================
              EXPENSES + FAVORITES
          ====================================================== */}

          <section className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-6
            mt-6
          ">


            {/* Recent Expenses */}

            <div className="
              bg-white
              rounded-2xl
              border border-gray-100
              shadow-sm
              p-6
            ">

              <div className="
                flex
                items-center
                justify-between
                mb-6
              ">

                <div>
                  <h2 className="text-lg font-bold text-slate-800">
                    Recent Expenses
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Your latest travel spending
                  </p>
                </div>

                <span className="text-2xl">
                  💳
                </span>

              </div>


              <div className="space-y-3">

                {recentExpenses.map((expense) => (

                  <div
                    key={expense.id}
                    className="
                      flex
                      items-center
                      justify-between
                      p-3
                      rounded-xl
                      hover:bg-gray-50
                      transition
                    "
                  >

                    <div className="flex items-center gap-3">

                      <div className="
                        w-10 h-10
                        rounded-xl
                        bg-gray-100
                        flex items-center justify-center
                      ">
                        {expense.icon}
                      </div>

                      <div>

                        <p className="text-sm font-semibold text-slate-700">
                          {expense.name}
                        </p>

                        <p className="text-xs text-gray-400 mt-1">
                          {expense.category}
                        </p>

                      </div>

                    </div>

                    <p className="text-sm font-bold text-slate-800">
                      ₹{expense.amount.toLocaleString('en-IN')}
                    </p>

                  </div>

                ))}

              </div>

              <button className="
                w-full
                mt-4
                py-2.5
                rounded-xl
                border border-gray-200
                text-sm
                font-medium
                text-gray-600
                hover:bg-gray-50
                transition
              ">
                View all expenses →
              </button>

            </div>


            {/* Favorite Destinations */}

            <div className="
              bg-white
              rounded-2xl
              border border-gray-100
              shadow-sm
              p-6
            ">

              <div className="
                flex
                items-center
                justify-between
                mb-6
              ">

                <div>
                  <h2 className="text-lg font-bold text-slate-800">
                    Favorite Destinations
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Places you'd love to visit again
                  </p>
                </div>

                <span className="text-2xl">
                  ❤️
                </span>

              </div>


              <div className="grid grid-cols-3 gap-3">

                {favoriteDestinations.map((destination) => (

                  <div
                    key={destination.id}
                    className="
                      group
                      rounded-2xl
                      bg-gray-50
                      p-4
                      text-center
                      hover:bg-blue-50
                      hover:-translate-y-1
                      transition-all duration-300
                      cursor-pointer
                    "
                  >

                    <div className="
                      text-3xl
                      group-hover:scale-110
                      transition
                    ">
                      {destination.icon}
                    </div>

                    <p className="
                      text-sm
                      font-semibold
                      text-slate-700
                      mt-3
                    ">
                      {destination.name}
                    </p>

                    <p className="text-[11px] text-gray-400 mt-1">
                      {destination.country}
                    </p>

                  </div>

                ))}

              </div>


              <button className="
                w-full
                mt-5
                py-2.5
                rounded-xl
                bg-blue-50
                text-blue-600
                text-sm
                font-semibold
                hover:bg-blue-100
                transition
              ">
                Explore more destinations →
              </button>

            </div>

          </section>


          {/* =====================================================
              FINAL CTA
          ====================================================== */}

          <section className="
            mt-6
            rounded-2xl
            border border-blue-100
            bg-blue-50
            p-6
            sm:p-7
            flex
            flex-col
            sm:flex-row
            items-start
            sm:items-center
            justify-between
            gap-5
          ">

            <div>

              <h2 className="text-xl font-bold text-slate-800">
                Your next adventure is waiting. 🌎
              </h2>

              <p className="text-sm text-gray-500 mt-2">
                Start planning today and turn your travel ideas into memories.
              </p>

            </div>

            <button className="
              shrink-0
              bg-blue-600
              text-white
              px-5
              py-3
              rounded-xl
              text-sm
              font-semibold
              hover:bg-blue-700
              hover:-translate-y-0.5
              transition
              shadow-md
            ">
              Start Planning →
            </button>

          </section>

        </div>

      </main>

    </div>
  );
};

export default TravelerDashboard;