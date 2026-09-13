const DocumentsWidget = ({ documents = [] }) => {
  const defaultDocuments = [
    {
      id: 1,
      name: "Hotel Confirmation",
      type: "PDF",
      trip: "Goa Escape",
      icon: "🏨",
    },
    {
      id: 2,
      name: "Flight Tickets",
      type: "PDF",
      trip: "Goa Escape",
      icon: "✈️",
    },
    {
      id: 3,
      name: "Travel Insurance",
      type: "PDF",
      trip: "Himalayan Adventure",
      icon: "🛡️",
    },
  ];

  const items =
    documents.length > 0 ? documents : defaultDocuments;

  return (
    <section className="tn-card p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800">
            Travel Documents
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Keep important travel files organized.
          </p>
        </div>

        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-violet-50 text-lg">
          📁
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {items.map((document) => (
          <div
            key={document.id}
            className="
              group
              flex
              items-center
              gap-3
              rounded-xl
              border
              border-slate-100
              p-3
              transition
              hover:border-sky-100
              hover:bg-sky-50/50
            "
          >
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-slate-50 text-xl transition-transform duration-200 group-hover:scale-105">
              {document.icon || "📄"}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-semibold text-slate-700">
                {document.name}
              </h3>

              <p className="mt-0.5 truncate text-xs text-slate-400">
                {document.trip}
              </p>
            </div>

            <span className="flex-shrink-0 rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-500">
              {document.type}
            </span>

            <button
              type="button"
              aria-label={`Open ${document.name}`}
              className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white hover:text-sky-600"
            >
              →
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="
          mt-5
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
        "
      >
        View All Documents
      </button>
    </section>
  );
};

export default DocumentsWidget;