import {
  Plane,
  Hotel,
  ShieldCheck,
  Image,
} from "lucide-react";

import { documents } from "../../data/dashboardData";

const icons = {
  "Flight Tickets": Plane,
  "Hotel Bookings": Hotel,
  "Travel Insurance": ShieldCheck,
  Photos: Image,
};

export default function TravelDocuments() {
  return (
    <section className="bg-[#082A43] rounded-2xl border border-cyan-900/30 p-5">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold text-white">
          Travel Documents
        </h2>

        <button className="text-cyan-400 text-sm hover:underline">
          Manage
        </button>
      </div>

      <div className="space-y-3">
        {documents.map((doc) => {
          const Icon = icons[doc.title];

          return (
            <div
              key={doc.id}
              className="flex items-center gap-4 bg-[#0C314D] rounded-xl p-3 hover:bg-[#113C5C] transition"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${doc.color}20` }}
              >
                <Icon size={20} color={doc.color} />
              </div>

              <div className="flex-1">
                <h4 className="text-white font-medium">
                  {doc.title}
                </h4>

                <p className="text-slate-400 text-sm">
                  {doc.files} files
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}