const DestinationCarousel = ({ destinations = [] }) => {
  const defaultDestinations = [
    {
      id: 1,
      name: "Goa",
      country: "India",
      description: "Beaches, sunsets & coastal vibes",
      icon: "🏝️",
      className: "from-sky-100 via-cyan-50 to-teal-100",
    },
    {
      id: 2,
      name: "Manali",
      country: "India",
      description: "Mountains, adventure & fresh air",
      icon: "🏔️",
      className: "from-slate-100 via-sky-50 to-cyan-100",
    },
    {
      id: 3,
      name: "Kerala",
      country: "India",
      description: "Backwaters, greenery & culture",
      icon: "🌴",
      className: "from-emerald-50 via-teal-50 to-cyan-100",
    },
    {
      id: 4,
      name: "Bali",
      country: "Indonesia",
      description: "Tropical escapes & island life",
      icon: "🌺",
      className: "from-rose-50 via-orange-50 to-amber-100",
    },
  ];

  const items =
    destinations.length > 0 ? destinations : defaultDestinations;

  return (
    <section className="mb-8">
      {/* Section heading */}
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="tn-section-title">
            Explore Destinations
          </h2>

          <p className="tn-section-subtitle">
            Find inspiration for your next adventure.
          </p>
        </div>

        <button
          type="button"
          className="
            hidden
            text-sm
            font-semibold
            text-sky-600
            transition
            hover:text-sky-700
            sm:block
          "
        >
          View all →
        </button>
      </div>

      {/* Destination cards */}
      <div className="flex gap-4 overflow-x-auto pb-3">
        {items.map((destination) => (
          <article
            key={destination.id}
            className="
              group
              min-w-[230px]
              flex-1
              overflow-hidden
              rounded-2xl
              border
              border-slate-100
              bg-white
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-lg
            "
          >
            {/* Destination image area */}
            <div
              className={`
                relative
                h-36
                overflow-hidden
                bg-gradient-to-br
                ${destination.className || "from-sky-100 to-teal-100"}
              `}
            >
              {/* Decorative shapes */}
              <div
                className="
                  absolute
                  -right-8
                  -top-8
                  h-24
                  w-24
                  rounded-full
                  bg-white/30
                "
              />

              <div
                className="
                  absolute
                  -bottom-10
                  -left-6
                  h-28
                  w-28
                  rounded-full
                  bg-white/20
                "
              />

              {/* Destination icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="
                    text-6xl
                    drop-shadow-sm
                    transition-transform
                    duration-300
                    group-hover:scale-110
                  "
                  role="img"
                  aria-label={destination.name}
                >
                  {destination.icon || "🌍"}
                </span>
              </div>

              {/* Explore label */}
              <span
                className="
                  absolute
                  left-3
                  top-3
                  rounded-full
                  bg-white/80
                  px-2.5
                  py-1
                  text-[10px]
                  font-semibold
                  text-slate-600
                  shadow-sm
                  backdrop-blur-sm
                "
              >
                Explore
              </span>
            </div>

            {/* Destination information */}
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-slate-800">
                    {destination.name}
                  </h3>

                  <p className="mt-0.5 text-xs text-slate-400">
                    {destination.country}
                  </p>
                </div>

                <span
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-lg
                    bg-sky-50
                    text-sky-600
                    transition
                    group-hover:bg-sky-100
                  "
                  aria-hidden="true"
                >
                  →
                </span>
              </div>

              <p className="mt-3 text-xs leading-5 text-slate-500">
                {destination.description}
              </p>

              <button
                type="button"
                className="
                  mt-4
                  w-full
                  rounded-xl
                  bg-sky-50
                  px-4
                  py-2.5
                  text-xs
                  font-semibold
                  text-sky-700
                  transition
                  hover:bg-sky-100
                "
              >
                Discover destination
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Mobile button */}
      <button
        type="button"
        className="
          mt-2
          w-full
          rounded-xl
          border
          border-sky-100
          bg-sky-50
          px-4
          py-2.5
          text-sm
          font-semibold
          text-sky-700
          transition
          hover:bg-sky-100
          sm:hidden
        "
      >
        View all destinations →
      </button>
    </section>
  );
};

export default DestinationCarousel;