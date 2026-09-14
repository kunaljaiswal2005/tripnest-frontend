export default function QuickActionCard({
  title,
  subtitle,
  icon: Icon,
  color,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="group w-full bg-[#082A43] rounded-2xl border border-cyan-900/30 p-5 text-left transition-all duration-200 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-950/20"
    >
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110"
        style={{ backgroundColor: `${color}20` }}
      >
        <Icon size={24} color={color} />
      </div>

      {/* Title */}
      <h3 className="text-white font-semibold text-base">{title}</h3>

      {/* Subtitle */}
      <p className="text-slate-400 text-sm mt-1">{subtitle}</p>

      {/* Bottom CTA */}
      <div className="mt-5">
        <span
          className="text-xs font-medium px-3 py-1 rounded-full"
          style={{
            backgroundColor: `${color}18`,
            color,
          }}
        >
          Open →
        </span>
      </div>
    </button>
  );
}