import { useAuth } from '../../context/AuthContext';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';

import {
  groupAdminStats,
  managedGroups,
  recentGroupActivity,
  pendingInvitations,
  groupExpenses,
} from '../../data/groupAdminDashboardData';

const GroupAdminDashboard = () => {
  const { user } = useAuth();

  const totalExpenses = groupExpenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const expensePercentage = Math.min(
    Math.round((totalExpenses / groupAdminStats.sharedExpenses) * 100),
    100
  );

  return (
    <div className="min-h-screen bg-slate-50">

      <DashboardNavbar />

      <main className="lg:ml-72 px-5 sm:px-8 lg:px-10 py-8 lg:py-10 pt-24 lg:pt-10">

        {/* =====================================================
            WELCOME
        ====================================================== */}

        <section className="mb-8">

          <p className="text-sm font-medium text-blue-600 mb-2">
            Group Administration
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
            Welcome back, {user?.name || 'Group Admin'} 👋
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your travel groups, coordinate trips, and keep everyone
            on the same journey.
          </p>

        </section>


        {/* =====================================================
            HERO
        ====================================================== */}

        <section className="
          relative
          overflow-hidden
          rounded-3xl
          bg-gradient-to-br
          from-indigo-600
          via-blue-600
          to-cyan-500
          p-7
          sm:p-10
          mb-8
          text-white
          shadow-xl
        ">

          <div className="relative z-10 max-w-2xl">

            <span className="
              inline-flex
              items-center
              gap-2
              bg-white/15
              backdrop-blur-sm
              border border-white/20
              px-3
              py-1.5
              rounded-full
              text-xs
              font-medium
              mb-5
            ">
              👥 Group Control Center
            </span>

            <h2 className="
              text-3xl
              sm:text-4xl
              font-bold
              leading-tight
            ">
              Bring everyone together.
            </h2>

            <p className="
              text-blue-100
              mt-3
              text-sm
              sm:text-base
              max-w-xl
            ">
              Organize trips, manage members, coordinate itineraries,
              and keep group expenses under control.
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
                transition
                shadow-lg
              ">
                + Create Group
              </button>

              <button className="
                bg-white/10
                border
                border-white/25
                px-5
                py-3
                rounded-xl
                font-semibold
                text-sm
                hover:bg-white/20
                transition
              ">
                Manage Members →
              </button>

            </div>

          </div>

          {/* Decorative elements */}

          <div className="
            absolute
            -right-20
            -top-20
            w-72
            h-72
            rounded-full
            bg-white/10
          " />

          <div className="
            absolute
            right-20
            -bottom-32
            w-80
            h-80
            rounded-full
            border
            border-white/10
          " />

          <div className="
            absolute
            right-12
            top-12
            text-7xl
            sm:text-8xl
            opacity-20
            rotate-12
          ">
            🧭
          </div>

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

          {/* Active Groups */}

          <div className="
            bg-white
            rounded-2xl
            border border-gray-100
            p-5
            shadow-sm
            hover:shadow-lg
            hover:-translate-y-1
            transition-all
            duration-300
          ">

            <div className="flex justify-between items-start">

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
                font-medium
                text-indigo-600
                bg-indigo-50
                px-2.5
                py-1
                rounded-full
              ">
                Active
              </span>

            </div>

            <p className="text-3xl font-bold text-slate-800 mt-5">
              {groupAdminStats.activeGroups}
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Active groups
            </p>

          </div>


          {/* Upcoming Trips */}

          <div className="
            bg-white
            rounded-2xl
            border border-gray-100
            p-5
            shadow-sm
            hover:shadow-lg
            hover:-translate-y-1
            transition-all
            duration-300
          ">

            <div className="flex justify-between items-start">

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
                font-medium
                text-blue-600
                bg-blue-50
                px-2.5
                py-1
                rounded-full
              ">
                Trips
              </span>

            </div>

            <p className="text-3xl font-bold text-slate-800 mt-5">
              {groupAdminStats.upcomingTrips}
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Upcoming group trips
            </p>

          </div>


          {/* Members */}

          <div className="
            bg-white
            rounded-2xl
            border border-gray-100
            p-5
            shadow-sm
            hover:shadow-lg
            hover:-translate-y-1
            transition-all
            duration-300
          ">

            <div className="flex justify-between items-start">

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
                🧑‍🤝‍🧑
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
                Members
              </span>

            </div>

            <p className="text-3xl font-bold text-slate-800 mt-5">
              {groupAdminStats.totalMembers}
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Total group members
            </p>

          </div>


          {/* Expenses */}

          <div className="
            bg-white
            rounded-2xl
            border border-gray-100
            p-5
            shadow-sm
            hover:shadow-lg
            hover:-translate-y-1
            transition-all
            duration-300
          ">

            <div className="flex justify-between items-start">

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
                font-medium
                text-amber-600
                bg-amber-50
                px-2.5
                py-1
                rounded-full
              ">
                Shared
              </span>

            </div>

            <p className="text-3xl font-bold text-slate-800 mt-5">
              ₹{groupAdminStats.sharedExpenses.toLocaleString('en-IN')}
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Shared expenses
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
          mb-8
        ">

          {/* Managed Groups */}

          <div className="
            xl:col-span-2
            bg-white
            rounded-2xl
            border border-gray-100
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
                <h2 className="font-bold text-lg text-slate-800">
                  Managed Groups
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Your active travel communities
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


            <div className="divide-y divide-gray-100">

              {managedGroups.map((group) => (

                <div
                  key={group.id}
                  className="
                    p-5
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-center
                    gap-4
                    hover:bg-gray-50
                    transition
                  "
                >

                  <div className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-blue-50
                    flex
                    items-center
                    justify-center
                    text-2xl
                    flex-shrink-0
                  ">
                    {group.icon}
                  </div>


                  <div className="flex-1 min-w-0">

                    <h3 className="
                      font-semibold
                      text-slate-800
                    ">
                      {group.name}
                    </h3>

                    <p className="
                      text-sm
                      text-gray-500
                      mt-1
                    ">
                      📍 {group.destination}
                    </p>

                    <div className="
                      flex
                      flex-wrap
                      gap-3
                      mt-2
                      text-xs
                      text-gray-500
                    ">
                      <span>
                        👥 {group.members} members
                      </span>

                      <span>
                        📅 {group.tripDate}
                      </span>
                    </div>

                  </div>


                  <span className={`
                    text-xs
                    font-medium
                    px-3
                    py-1.5
                    rounded-full
                    w-fit
                    ${
                      group.status === 'Confirmed'
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-amber-50 text-amber-600'
                    }
                  `}>
                    {group.status}
                  </span>


                  <button className="
                    text-sm
                    font-medium
                    text-gray-500
                    hover:text-blue-600
                    transition
                  ">
                    Manage
                  </button>

                </div>

              ))}

            </div>

          </div>


          {/* Recent Activity */}

          <div className="
            bg-white
            rounded-2xl
            border border-gray-100
            shadow-sm
            overflow-hidden
          ">

            <div className="
              px-6
              py-5
              border-b
              border-gray-100
            ">

              <h2 className="font-bold text-lg text-slate-800">
                Recent Activity
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                What's happening in your groups
              </p>

            </div>


            <div className="p-5 space-y-5">

              {recentGroupActivity.map((activity) => (

                <div
                  key={activity.id}
                  className="flex gap-3"
                >

                  <div className="
                    w-9
                    h-9
                    rounded-full
                    bg-blue-50
                    flex
                    items-center
                    justify-center
                    text-sm
                    flex-shrink-0
                  ">
                    {activity.icon}
                  </div>

                  <div className="min-w-0">

                    <p className="
                      text-sm
                      text-gray-700
                      leading-relaxed
                    ">
                      <span className="font-semibold text-slate-800">
                        {activity.member}
                      </span>{' '}
                      {activity.action}
                    </p>

                    <p className="
                      text-xs
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
            LOWER CONTENT
        ====================================================== */}

        <section className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-6
          mb-8
        ">


          {/* Shared Expense Overview */}

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

                <h2 className="font-bold text-lg text-slate-800">
                  Shared Expense Overview
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Combined spending across groups
                </p>

              </div>

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
                💳
              </div>

            </div>


            <div className="mb-5">

              <div className="
                flex
                justify-between
                text-sm
                mb-2
              ">

                <span className="text-gray-500">
                  Recorded expenses
                </span>

                <span className="font-semibold text-slate-700">
                  ₹{totalExpenses.toLocaleString('en-IN')}
                </span>

              </div>

              <div className="
                h-3
                bg-gray-100
                rounded-full
                overflow-hidden
              ">

                <div
                  className="
                    h-full
                    bg-gradient-to-r
                    from-emerald-400
                    to-teal-500
                    rounded-full
                    transition-all
                    duration-500
                  "
                  style={{ width: `${expensePercentage}%` }}
                />

              </div>

            </div>


            <div className="space-y-4">

              {groupExpenses.map((expense) => (

                <div
                  key={expense.id}
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  <div className="
                    w-9
                    h-9
                    rounded-lg
                    bg-gray-50
                    flex
                    items-center
                    justify-center
                  ">
                    {expense.icon}
                  </div>

                  <span className="
                    flex-1
                    text-sm
                    text-gray-600
                  ">
                    {expense.category}
                  </span>

                  <span className="
                    text-sm
                    font-semibold
                    text-slate-700
                  ">
                    ₹{expense.amount.toLocaleString('en-IN')}
                  </span>

                </div>

              ))}

            </div>


            <button className="
              w-full
              mt-6
              py-2.5
              rounded-xl
              bg-slate-50
              text-sm
              font-semibold
              text-slate-700
              hover:bg-blue-50
              hover:text-blue-600
              transition
            ">
              Manage Shared Expenses →
            </button>

          </div>


          {/* Pending Invitations */}

          <div className="
            bg-white
            rounded-2xl
            border border-gray-100
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

                <h2 className="font-bold text-lg text-slate-800">
                  Pending Invitations
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Members waiting to join
                </p>

              </div>

              <span className="
                min-w-7
                h-7
                px-2
                rounded-full
                bg-orange-50
                text-orange-600
                text-xs
                font-bold
                flex
                items-center
                justify-center
              ">
                {pendingInvitations.length}
              </span>

            </div>


            <div className="p-5 space-y-4">

              {pendingInvitations.map((invite) => (

                <div
                  key={invite.id}
                  className="
                    flex
                    items-center
                    gap-3
                    p-3
                    rounded-xl
                    bg-gray-50
                  "
                >

                  <div className="
                    w-10
                    h-10
                    rounded-full
                    bg-white
                    flex
                    items-center
                    justify-center
                    text-lg
                    shadow-sm
                  ">
                    {invite.icon}
                  </div>

                  <div className="flex-1 min-w-0">

                    <p className="
                      text-sm
                      font-semibold
                      text-slate-800
                    ">
                      {invite.name}
                    </p>

                    <p className="
                      text-xs
                      text-gray-500
                      truncate
                    ">
                      {invite.email}
                    </p>

                    <p className="
                      text-xs
                      text-blue-600
                      mt-1
                    ">
                      Invited to {invite.group}
                    </p>

                  </div>

                  <button className="
                    text-xs
                    font-semibold
                    text-blue-600
                    hover:text-blue-700
                    px-3
                    py-2
                    rounded-lg
                    hover:bg-blue-50
                    transition
                  ">
                    Review
                  </button>

                </div>

              ))}


              <button className="
                w-full
                mt-2
                py-2.5
                rounded-xl
                border
                border-gray-200
                text-sm
                font-semibold
                text-gray-600
                hover:border-blue-300
                hover:text-blue-600
                transition
              ">
                Invite New Members +
              </button>

            </div>

          </div>

        </section>


        {/* =====================================================
            QUICK ACTIONS
        ====================================================== */}

        <section className="
          bg-white
          rounded-2xl
          border border-gray-100
          shadow-sm
          p-6
          mb-8
        ">

          <div className="mb-5">

            <h2 className="font-bold text-lg text-slate-800">
              Quick Actions
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Frequently used group management tools
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
              bg-blue-50
              text-blue-700
              hover:bg-blue-100
              transition
              text-left
            ">
              <span className="text-2xl">
                ➕
              </span>

              <p className="
                text-sm
                font-semibold
                mt-3
              ">
                Create Group
              </p>

              <p className="
                text-xs
                text-blue-500
                mt-1
              ">
                Start a new trip
              </p>
            </button>


            <button className="
              p-4
              rounded-xl
              bg-violet-50
              text-violet-700
              hover:bg-violet-100
              transition
              text-left
            ">
              <span className="text-2xl">
                🧑‍🤝‍🧑
              </span>

              <p className="
                text-sm
                font-semibold
                mt-3
              ">
                Manage Members
              </p>

              <p className="
                text-xs
                text-violet-500
                mt-1
              ">
                Control group access
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
                🗓️
              </span>

              <p className="
                text-sm
                font-semibold
                mt-3
              ">
                Edit Itinerary
              </p>

              <p className="
                text-xs
                text-emerald-500
                mt-1
              ">
                Plan group activities
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
                💰
              </span>

              <p className="
                text-sm
                font-semibold
                mt-3
              ">
                Group Expenses
              </p>

              <p className="
                text-xs
                text-amber-500
                mt-1
              ">
                Track shared spending
              </p>
            </button>

          </div>

        </section>


        {/* =====================================================
            FOOTER CTA
        ====================================================== */}

        <section className="
          rounded-2xl
          bg-gradient-to-r
          from-slate-800
          to-slate-700
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

            <h2 className="text-xl font-bold">
              Your next group adventure starts here. 🌎
            </h2>

            <p className="
              text-slate-300
              text-sm
              mt-1
            ">
              Keep your travelers connected and your plans organized.
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
            View All Groups →
          </button>

        </section>

      </main>

    </div>
  );
};

export default GroupAdminDashboard;