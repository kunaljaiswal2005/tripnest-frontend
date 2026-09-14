const TripHealthCard = ({
  itinerary = 100,
  budget = 85,
  documents = 75,
  activities = 60,
}) => {
  const overall = Math.round(
    (itinerary + budget + documents + activities) / 4
  );

  const getStatus = (value) => {
    if (value >= 80) {
      return {
        label: "On track",
        icon: "✓",
        className: "bg-emerald-50 text-emerald-700",
      };
    }

    if (value >= 60) {
      return {
        label: "Almost ready",
        icon: "!",
        className: "bg-amber-50 text-amber-700",
      };
    }

    return {
      label: "Needs attention",
      icon: "!",
      className: "bg-rose-50 text-rose-700",
    };
  };

  const items = [
    {
      label: "Itinerary",
      value: itinerary,
    },
    {
      label: "Budget",
      value: budget,
    },
    {
      label: "Documents",
      value: documents,
    },
    {
      label: "Activities",
      value: activities,
    },
  ];

  return (
    <section className="tn-card p-5 sm:p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800">
            Trip Health
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            See how ready your next trip is.
          </p>
        </div>

        {/* Overall score */}
        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-sky-50">
          <div className="text-center">
            <p className="text-lg font-bold leading-none text-sky-700">
              {overall}%
            </p>
          </div>
        </div>
      </div>

      {/* Progress items */}
      <div className="mt-6 space-y-4">
        {items.map((item) => {
          const status = getStatus(item.value);

          return (
            <div key={item.label}>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-600">
                  {item.label}
                </span>

                <span className="text-xs font-semibold text-slate-500">
                  {item.value}%
                </span>
              </div>

              <div
                className="h-2 overflow-hidden rounded-full bg-slate-100"
                role="progressbar"
                aria-label={`${item.label} completion`}
                aria-valuenow={item.value}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-sky-500 to-teal-400 transition-all duration-500"
                  style={{ width: `${item.value}%` }}
                />
              </div>

              <div className="mt-1.5 flex justify-end">
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${status.className}`}
                >
                  {status.icon} {status.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TripHealthCard;