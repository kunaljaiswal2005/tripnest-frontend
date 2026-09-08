import { useAuth } from '../../context/AuthContext';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';

import {
  adminStats,
  userAnalytics,
  tripAnalytics,
  popularDestinations,
  recentUsers,
  platformActivity,
  monthlyRevenue,
} from '../../data/adminDashboardData';

const AdminDashboard = () => {
  const { user } = useAuth();

  const totalTrips =
    tripAnalytics.planned +
    tripAnalytics.ongoing +
    tripAnalytics.completed;

  const maxRevenue = Math.max(
    ...monthlyRevenue.map((item) => item.amount)
  );

  return (
    <div className="min-h-screen bg-slate-50">

      <DashboardNavbar />

      <main className="
        lg:ml-72
        px-5
        sm:px-8
        lg:px-10
        py-8
        lg:py-10
        pt-24
        lg:pt-10
      ">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <section className="mb-8">

          <div className="
            flex
            flex-col
            sm:flex-row
            sm:items-end
            sm:justify-between
            gap-4
          ">

            <div>

              <div className="
                flex
                items-center
                gap-2
                text-sm
                font-medium
                text-indigo-600
                mb-2
              ">
                <span>🛡️</span>
                Platform Administration
              </div>

              <h1 className="
                text-3xl
                sm:text-4xl
                font-bold
                text-slate-800
              ">
                Admin Control Center
              </h1>

              <p className="
                text-gray-500
                mt-2
              ">
                Monitor platform activity, users, trips, and performance.
              </p>

            </div>


            <div className="
              flex
              items-center
              gap-3
              bg-white
              border
              border-gray-100
              rounded-xl
              px-4
              py-3
              shadow-sm
            ">

              <div className="
                w-9
                h-9
                rounded-full
                bg-indigo-100
                flex
                items-center
                justify-center
              ">
                🛡️
              </div>

              <div>

                <p className="
                  text-xs
                  text-gray-400
                ">
                  Signed in as
                </p>

                <p className="
                  text-sm
                  font-semibold
                  text-slate-700
                ">
                  {user?.name || 'Administrator'}
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            PLATFORM OVERVIEW
        ====================================================== */}

        <section className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-4
          gap-5
          mb-8
        ">

          {/* Users */}

          <div className="
            bg-white
            rounded-2xl
            border
            border-gray-100
            p-5
            shadow-sm
            hover:shadow-lg
            hover:-translate-y-1
            transition-all
            duration-300
          ">

            <div className="flex items-center justify-between">

              <div className="
                w-11
                h-11
                rounded-xl
                bg-indigo-50
                flex
                items-center
                justify-center
                text-xl
              ">
                👥
              </div>

              <span className="
                text-xs
                font-semibold
                text-emerald-600
                bg-emerald-50
                px-2.5
                py-1
                rounded-full
              ">
                +12.4%
              </span>

            </div>

            <p className="
              text-3xl
              font-bold
              text-slate-800
              mt-5
            ">
              {adminStats.totalUsers.toLocaleString('en-IN')}
            </p>

            <p className="
              text-sm
              text-gray-500
              mt-1
            ">
              Registered users
            </p>

          </div>


          {/* Trips */}

          <div className="
            bg-white
            rounded-2xl
            border
            border-gray-100
            p-5
            shadow-sm
            hover:shadow-lg
            hover:-translate-y-1
            transition-all
            duration-300
          ">

            <div className="flex items-center justify-between">

              <div className="
                w-11
                h-11
                rounded-xl
                bg-blue-50
                flex
                items-center
                justify-center
                text-xl
              ">
                ✈️
              </div>

              <span className="
                text-xs
                font-semibold
                text-emerald-600
                bg-emerald-50
                px-2.5
                py-1
                rounded-full
              ">
                +8.7%
              </span>

            </div>

            <p className="
              text-3xl
              font-bold
              text-slate-800
              mt-5
            ">
              {adminStats.totalTrips}
            </p>

            <p className="
              text-sm
              text-gray-500
              mt-1
            ">
              Total trips
            </p>

          </div>


          {/* Destinations */}

          <div className="
            bg-white
            rounded-2xl
            border
            border-gray-100
            p-5
            shadow-sm
            hover:shadow-lg
            hover:-translate-y-1
            transition-all
            duration-300
          ">

            <div className="flex items-center justify-between">

              <div className="
                w-11
                h-11
                rounded-xl
                bg-emerald-50
                flex
                items-center
                justify-center
                text-xl
              ">
                🌍
              </div>

              <span className="
                text-xs
                font-semibold
                text-blue-600
                bg-blue-50
                px-2.5
                py-1
                rounded-full
              ">
                Catalog
              </span>

            </div>

            <p className="
              text-3xl
              font-bold
              text-slate-800
              mt-5
            ">
              {adminStats.destinations}
            </p>

            <p className="
              text-sm
              text-gray-500
              mt-1
            ">
              Destinations
            </p>

          </div>


          {/* Revenue */}

          <div className="
            bg-white
            rounded-2xl
            border
            border-gray-100
            p-5
            shadow-sm
            hover:shadow-lg
            hover:-translate-y-1
            transition-all
            duration-300
          ">

            <div className="flex items-center justify-between">

              <div className="
                w-11
                h-11
                rounded-xl
                bg-amber-50
                flex
                items-center
                justify-center
                text-xl
              ">
                💰
              </div>

              <span className="
                text-xs
                font-semibold
                text-emerald-600
                bg-emerald-50
                px-2.5
                py-1
                rounded-full
              ">
                +16.2%
              </span>

            </div>

            <p className="
              text-3xl
              font-bold
              text-slate-800
              mt-5
            ">
              ₹{adminStats.totalRevenue.toLocaleString('en-IN')}
            </p>

            <p className="
              text-sm
              text-gray-500
              mt-1
            ">
              Platform revenue
            </p>

          </div>

        </section>


        {/* =====================================================
            ANALYTICS GRID
        ====================================================== */}

        <section className="
          grid
          grid-cols-1
          xl:grid-cols-3
          gap-6
          mb-8
        ">

          {/* Revenue Chart */}

          <div className="
            xl:col-span-2
            bg-white
            rounded-2xl
            border
            border-gray-100
            shadow-sm
            p-6
          ">

            <div className="
              flex
              flex-col
              sm:flex-row
              sm:items-center
              sm:justify-between
              gap-3
              mb-6
            ">

              <div>

                <h2 className="
                  text-lg
                  font-bold
                  text-slate-800
                ">
                  Revenue Overview
                </h2>

                <p className="
                  text-sm
                  text-gray-500
                  mt-1
                ">
                  Monthly platform revenue
                </p>

              </div>

              <button className="
                text-sm
                font-semibold
                text-indigo-600
                hover:text-indigo-700
              ">
                View Report →
              </button>

            </div>


            {/* Chart */}

            <div className="
              h-64
              flex
              items-end
              gap-2
              sm:gap-4
              border-b
              border-gray-100
              pb-0
            ">

              {monthlyRevenue.map((item) => {

                const height =
                  Math.max(
                    (item.amount / maxRevenue) * 100,
                    8
                  );

                return (

                  <div
                    key={item.month}
                    className="
                      flex-1
                      h-full
                      flex
                      flex-col
                      justify-end
                      items-center
                      gap-2
                    "
                  >

                    <div className="
                      text-[10px]
                      sm:text-xs
                      text-gray-400
                    ">
                      ₹{Math.round(item.amount / 1000)}k
                    </div>

                    <div
                      className="
                        w-full
                        max-w-10
                        bg-gradient-to-t
                        from-indigo-600
                        to-blue-400
                        rounded-t-lg
                        hover:from-indigo-700
                        hover:to-blue-500
                        transition-all
                        duration-300
                      "
                      style={{
                        height: `${height}%`,
                      }}
                    />

                    <span className="
                      text-xs
                      text-gray-400
                      mb-2
                    ">
                      {item.month}
                    </span>

                  </div>

                );

              })}

            </div>

          </div>


          {/* Trip Status */}

          <div className="
            bg-white
            rounded-2xl
            border
            border-gray-100
            shadow-sm
            p-6
          ">

            <div className="mb-6">

              <h2 className="
                text-lg
                font-bold
                text-slate-800
              ">
                Trip Analytics
              </h2>

              <p className="
                text-sm
                text-gray-500
                mt-1
              ">
                Current platform trip status
              </p>

            </div>


            <div className="
              w-40
              h-40
              mx-auto
              rounded-full
              bg-gradient-to-br
              from-indigo-500
              to-blue-400
              flex
              items-center
              justify-center
              relative
            ">

              <div className="
                w-28
                h-28
                rounded-full
                bg-white
                flex
                flex-col
                items-center
                justify-center
              ">

                <span className="
                  text-2xl
                  font-bold
                  text-slate-800
                ">
                  {totalTrips}
                </span>

                <span className="
                  text-xs
                  text-gray-400
                ">
                  Total trips
                </span>

              </div>

            </div>


            <div className="
              space-y-4
              mt-7
            ">

              <div className="flex items-center gap-3">

                <span className="
                  w-3
                  h-3
                  rounded-full
                  bg-blue-500
                " />

                <span className="
                  flex-1
                  text-sm
                  text-gray-600
                ">
                  Planned
                </span>

                <span className="
                  font-semibold
                  text-slate-700
                ">
                  {tripAnalytics.planned}
                </span>

              </div>


              <div className="flex items-center gap-3">

                <span className="
                  w-3
                  h-3
                  rounded-full
                  bg-amber-400
                " />

                <span className="
                  flex-1
                  text-sm
                  text-gray-600
                ">
                  Ongoing
                </span>

                <span className="
                  font-semibold
                  text-slate-700
                ">
                  {tripAnalytics.ongoing}
                </span>

              </div>


              <div className="flex items-center gap-3">

                <span className="
                  w-3
                  h-3
                  rounded-full
                  bg-emerald-500
                " />

                <span className="
                  flex-1
                  text-sm
                  text-gray-600
                ">
                  Completed
                </span>

                <span className="
                  font-semibold
                  text-slate-700
                ">
                  {tripAnalytics.completed}
                </span>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            USERS + DESTINATIONS
        ====================================================== */}

        <section className="
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-6
          mb-8
        ">

          {/* User Analytics */}

          <div className="
            bg-white
            rounded-2xl
            border
            border-gray-100
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

                <h2 className="
                  text-lg
                  font-bold
                  text-slate-800
                ">
                  User Analytics
                </h2>

                <p className="
                  text-sm
                  text-gray-500
                  mt-1
                ">
                  Platform user distribution
                </p>

              </div>

              <span className="
                text-2xl
              ">
                👥
              </span>

            </div>


            <div className="space-y-5">

              <div>

                <div className="
                  flex
                  justify-between
                  text-sm
                  mb-2
                ">

                  <span className="text-gray-600">
                    Travelers
                  </span>

                  <span className="
                    font-semibold
                    text-slate-700
                  ">
                    {userAnalytics.travelers}
                  </span>

                </div>

                <div className="
                  h-2.5
                  bg-gray-100
                  rounded-full
                  overflow-hidden
                ">

                  <div
                    className="
                      h-full
                      bg-indigo-500
                      rounded-full
                    "
                    style={{
                      width: `${
                        (userAnalytics.travelers /
                          adminStats.totalUsers) *
                        100
                      }%`,
                    }}
                  />

                </div>

              </div>


              <div>

                <div className="
                  flex
                  justify-between
                  text-sm
                  mb-2
                ">

                  <span className="text-gray-600">
                    Group Admins
                  </span>

                  <span className="
                    font-semibold
                    text-slate-700
                  ">
                    {userAnalytics.groupAdmins}
                  </span>

                </div>

                <div className="
                  h-2.5
                  bg-gray-100
                  rounded-full
                  overflow-hidden
                ">

                  <div
                    className="
                      h-full
                      bg-blue-500
                      rounded-full
                    "
                    style={{
                      width: `${
                        (userAnalytics.groupAdmins /
                          adminStats.totalUsers) *
                        100
                      }%`,
                    }}
                  />

                </div>

              </div>


              <div>

                <div className="
                  flex
                  justify-between
                  text-sm
                  mb-2
                ">

                  <span className="text-gray-600">
                    Administrators
                  </span>

                  <span className="
                    font-semibold
                    text-slate-700
                  ">
                    {userAnalytics.administrators}
                  </span>

                </div>

                <div className="
                  h-2.5
                  bg-gray-100
                  rounded-full
                  overflow-hidden
                ">

                  <div
                    className="
                      h-full
                      bg-violet-500
                      rounded-full
                    "
                    style={{
                      width: `${
                        (userAnalytics.administrators /
                          adminStats.totalUsers) *
                        100
                      }%`,
                    }}
                  />

                </div>

              </div>

            </div>


            <button className="
              w-full
              mt-7
              py-2.5
              rounded-xl
              bg-indigo-50
              text-indigo-600
              text-sm
              font-semibold
              hover:bg-indigo-100
              transition
            ">
              Manage Users →
            </button>

          </div>


          {/* Popular Destinations */}

          <div className="
            bg-white
            rounded-2xl
            border
            border-gray-100
            shadow-sm
            overflow-hidden
          ">

            <div className="
              px-6
              py-5
              border-b
              border-gray-100
              flex
              items-center
              justify-between
            ">

              <div>

                <h2 className="
                  text-lg
                  font-bold
                  text-slate-800
                ">
                  Popular Destinations
                </h2>

                <p className="
                  text-sm
                  text-gray-500
                  mt-1
                ">
                  Most planned destinations
                </p>

              </div>

              <button className="
                text-sm
                font-semibold
                text-indigo-600
              ">
                View all →
              </button>

            </div>


            <div className="divide-y divide-gray-100">

              {popularDestinations.map((destination) => (

                <div
                  key={destination.id}
                  className="
                    px-6
                    py-4
                    flex
                    items-center
                    gap-4
                    hover:bg-gray-50
                    transition
                  "
                >

                  <div className="
                    w-11
                    h-11
                    rounded-xl
                    bg-gray-50
                    flex
                    items-center
                    justify-center
                    text-xl
                  ">
                    {destination.icon}
                  </div>

                  <div className="flex-1">

                    <p className="
                      text-sm
                      font-semibold
                      text-slate-800
                    ">
                      {destination.name}
                    </p>

                    <p className="
                      text-xs
                      text-gray-400
                      mt-1
                    ">
                      {destination.country}
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="
                      text-sm
                      font-bold
                      text-slate-700
                    ">
                      {destination.trips}
                    </p>

                    <p className="
                      text-xs
                      text-gray-400
                    ">
                      trips
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </section>


        {/* =====================================================
            RECENT USERS + PLATFORM ACTIVITY
        ====================================================== */}

        <section className="
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-6
          mb-8
        ">

          {/* Recent Users */}

          <div className="
            bg-white
            rounded-2xl
            border
            border-gray-100
            shadow-sm
            overflow-hidden
          ">

            <div className="
              px-6
              py-5
              border-b
              border-gray-100
              flex
              items-center
              justify-between
            ">

              <div>

                <h2 className="
                  text-lg
                  font-bold
                  text-slate-800
                ">
                  Recent Users
                </h2>

                <p className="
                  text-sm
                  text-gray-500
                  mt-1
                ">
                  Latest platform registrations
                </p>

              </div>

              <button className="
                text-sm
                font-semibold
                text-indigo-600
              ">
                View all →
              </button>

            </div>


            <div className="divide-y divide-gray-100">

              {recentUsers.map((newUser) => (

                <div
                  key={newUser.id}
                  className="
                    px-6
                    py-4
                    flex
                    items-center
                    gap-3
                  "
                >

                  <div className="
                    w-10
                    h-10
                    rounded-full
                    bg-indigo-50
                    flex
                    items-center
                    justify-center
                  ">
                    {newUser.icon}
                  </div>

                  <div className="flex-1 min-w-0">

                    <p className="
                      text-sm
                      font-semibold
                      text-slate-800
                      truncate
                    ">
                      {newUser.name}
                    </p>

                    <p className="
                      text-xs
                      text-gray-400
                      truncate
                    ">
                      {newUser.email}
                    </p>

                  </div>

                  <div className="text-right">

                    <span className="
                      inline-block
                      text-xs
                      font-medium
                      px-2
                      py-1
                      rounded-full
                      bg-gray-100
                      text-gray-600
                    ">
                      {newUser.role}
                    </span>

                    <p className="
                      text-[10px]
                      text-gray-400
                      mt-1
                    ">
                      {newUser.joined}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>


          {/* Platform Activity */}

          <div className="
            bg-white
            rounded-2xl
            border
            border-gray-100
            shadow-sm
            overflow-hidden
          ">

            <div className="
              px-6
              py-5
              border-b
              border-gray-100
            ">

              <h2 className="
                text-lg
                font-bold
                text-slate-800
              ">
                Platform Activity
              </h2>

              <p className="
                text-sm
                text-gray-500
                mt-1
              ">
                Latest system events
              </p>

            </div>


            <div className="p-5 space-y-5">

              {platformActivity.map((activity) => (

                <div
                  key={activity.id}
                  className="
                    flex
                    gap-3
                  "
                >

                  <div className="
                    w-10
                    h-10
                    rounded-xl
                    bg-indigo-50
                    flex
                    items-center
                    justify-center
                    text-lg
                    flex-shrink-0
                  ">
                    {activity.icon}
                  </div>

                  <div>

                    <p className="
                      text-sm
                      font-semibold
                      text-slate-800
                    ">
                      {activity.title}
                    </p>

                    <p className="
                      text-xs
                      text-gray-500
                      mt-1
                    ">
                      {activity.description}
                    </p>

                    <p className="
                      text-[10px]
                      text-gray-400
                      mt-1
                    ">
                      {activity.time}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </section>


        {/* =====================================================
            ADMIN ACTIONS
        ====================================================== */}

        <section className="
          bg-white
          rounded-2xl
          border
          border-gray-100
          shadow-sm
          p-6
          mb-8
        ">

          <div className="mb-5">

            <h2 className="
              text-lg
              font-bold
              text-slate-800
            ">
              Administration Tools
            </h2>

            <p className="
              text-sm
              text-gray-500
              mt-1
            ">
              Frequently used platform management tools
            </p>

          </div>


          <div className="
            grid
            grid-cols-2
            sm:grid-cols-4
            gap-4
          ">

            <button className="
              p-4
              rounded-xl
              bg-indigo-50
              text-indigo-700
              hover:bg-indigo-100
              transition
              text-left
            ">

              <span className="text-2xl">
                👥
              </span>

              <p className="
                text-sm
                font-semibold
                mt-3
              ">
                Manage Users
              </p>

              <p className="
                text-xs
                text-indigo-500
                mt-1
              ">
                Accounts & roles
              </p>

            </button>


            <button className="
              p-4
              rounded-xl
              bg-blue-50
              text-blue-700
              hover:bg-blue-100
              transition
              text-left
            ">

              <span className="text-2xl">
                🌍
              </span>

              <p className="
                text-sm
                font-semibold
                mt-3
              ">
                Destinations
              </p>

              <p className="
                text-xs
                text-blue-500
                mt-1
              ">
                Manage catalog
              </p>

            </button>


            <button className="
              p-4
              rounded-xl
              bg-emerald-50
              text-emerald-700
              hover:bg-emerald-100
              transition
              text-left
            ">

              <span className="text-2xl">
                📊
              </span>

              <p className="
                text-sm
                font-semibold
                mt-3
              ">
                Reports
              </p>

              <p className="
                text-xs
                text-emerald-500
                mt-1
              ">
                Analytics & exports
              </p>

            </button>


            <button className="
              p-4
              rounded-xl
              bg-amber-50
              text-amber-700
              hover:bg-amber-100
              transition
              text-left
            ">

              <span className="text-2xl">
                ⚙️
              </span>

              <p className="
                text-sm
                font-semibold
                mt-3
              ">
                Platform Settings
              </p>

              <p className="
                text-xs
                text-amber-500
                mt-1
              ">
                System configuration
              </p>

            </button>

          </div>

        </section>


        {/* =====================================================
            FOOTER
        ====================================================== */}

        <section className="
          rounded-2xl
          bg-gradient-to-r
          from-slate-900
          via-indigo-900
          to-slate-800
          p-6
          sm:p-8
          text-white
          flex
          flex-col
          sm:flex-row
          items-start
          sm:items-center
          justify-between
          gap-5
        ">

          <div>

            <p className="
              text-xs
              uppercase
              tracking-wider
              text-indigo-300
              font-semibold
            ">
              TripNest Administration
            </p>

            <h2 className="
              text-xl
              font-bold
              mt-2
            ">
              Keep the platform running smoothly. 🛡️
            </h2>

            <p className="
              text-slate-300
              text-sm
              mt-1
            ">
              Monitor performance and maintain a great experience for every traveler.
            </p>

          </div>


          <button className="
            bg-white
            text-slate-800
            px-5
            py-2.5
            rounded-xl
            text-sm
            font-semibold
            hover:bg-slate-100
            transition
            whitespace-nowrap
          ">
            Generate Report →
          </button>

        </section>

      </main>

    </div>
  );
};

export default AdminDashboard;