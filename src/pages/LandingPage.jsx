import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const features = [
  { icon: '🗓️', title: 'Trip planning', desc: 'Day-wise itineraries with activities, timings, and notes.' },
  { icon: '💰', title: 'Budget management', desc: 'Set budgets, track expenses by category — never overspend.' },
  { icon: '👥', title: 'Group collaboration', desc: 'Share itineraries and split expenses with your group.' },
  { icon: '🧭', title: 'Destination discovery', desc: 'Explore attractions, guides, and weather before you go.' },
  { icon: '📄', title: 'Document storage', desc: 'Upload tickets, bookings, and travel photos securely.' },
  { icon: '🔔', title: 'Smart notifications', desc: 'Trip reminders, budget alerts — never miss a thing.' },
];

const destinations = [
  { emoji: '🏖️', name: 'Goa', count: '2.4k trips', tag: 'Beach' },
  { emoji: '🏔️', name: 'Manali', count: '1.8k trips', tag: 'Mountains' },
  { emoji: '🏰', name: 'Rajasthan', count: '3.1k trips', tag: 'Heritage' },
  { emoji: '🌴', name: 'Kerala', count: '2.0k trips', tag: 'Nature' },
];

const steps = [
  { num: 1, icon: '👤', title: 'Create account', desc: 'Sign up free in 30 seconds' },
  { num: 2, icon: '🗺️', title: 'Plan your trip', desc: 'Add destination and dates' },
  { num: 3, icon: '📋', title: 'Build itinerary', desc: 'Day-wise activity planning' },
  { num: 4, icon: '✈️', title: 'Travel smart', desc: 'Track budget and explore' },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (user) { navigate('/dashboard'); return null; }

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 flex justify-between items-center px-8 py-4">
        <div className="text-xl font-semibold text-blue-600">✈️ TripNest</div>
        <div className="flex gap-3">
          <button onClick={() => navigate('/login')}
            className="px-4 py-2 text-sm text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition">
            Login
          </button>
          <button onClick={() => navigate('/register')}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Sign up free
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-blue-50 border-b border-blue-100 px-8 py-20 text-center">
        <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full border border-green-200 mb-6">
          ✨ Smart travel planning
        </span>
        <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Plan your perfect trip,<br/>every time
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto mb-6 leading-relaxed">
          Day-wise itineraries, budget tracking, group collaboration,
          and destination discovery — all in one place.
        </p>
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {['🗺️ Itinerary builder','💰 Budget tracker','👥 Group trips','🔔 Smart alerts'].map(t => (
            <span key={t} className="text-xs bg-white border border-gray-200 text-gray-500 px-3 py-1 rounded-full">{t}</span>
          ))}
        </div>
        <div className="flex gap-3 justify-center flex-wrap">
          <button onClick={() => navigate('/register')}
            className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition text-base">
            Start planning — it's free
          </button>
          <button onClick={() => navigate('/login')}
            className="px-8 py-3 text-blue-600 border-2 border-blue-300 font-medium rounded-lg hover:bg-blue-50 transition text-base">
            Login to your account
          </button>
        </div>
      </section>

      {/* STATS */}
      <div className="grid grid-cols-3 divide-x divide-gray-100 border-b border-gray-100">
        {[['10K+','Trips planned'],['50K+','Happy travelers'],['200+','Destinations']].map(([n,l]) => (
          <div key={l} className="py-8 text-center bg-white">
            <div className="text-3xl font-bold text-blue-600">{n}</div>
            <div className="text-sm text-gray-400 mt-1">{l}</div>
          </div>
        ))}
      </div>

      {/* FEATURES */}
      <section className="py-20 px-8 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">Everything you need to travel smart</h2>
        <p className="text-center text-gray-400 mb-12">All the tools you need, in one dashboard</p>
        <div className="grid grid-cols-3 gap-6">
          {features.map(f => (
            <div key={f.title} className="bg-white border border-gray-100 rounded-xl p-6 hover:border-blue-200 hover:shadow-sm transition">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-xl mb-4">{f.icon}</div>
              <h3 className="font-semibold text-gray-800 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="bg-gray-50 border-y border-gray-100 py-20 px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">Popular destinations</h2>
          <p className="text-center text-gray-400 mb-12">Trending right now</p>
          <div className="grid grid-cols-4 gap-5">
            {destinations.map(d => (
              <div key={d.name} onClick={() => navigate('/register')}
                className="bg-white border border-gray-100 rounded-xl overflow-hidden cursor-pointer hover:border-blue-200 hover:shadow-sm transition">
                <div className="h-24 bg-blue-50 flex items-center justify-center text-5xl">{d.emoji}</div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold text-gray-800 text-sm">{d.name}</span>
                    <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{d.tag}</span>
                  </div>
                  <div className="text-xs text-gray-400">{d.count} planned</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-8 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">How it works</h2>
        <p className="text-center text-gray-400 mb-14">Get started in minutes</p>
        <div className="grid grid-cols-4 gap-6 text-center">
          {steps.map((s, i) => (
            <div key={s.num}>
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm mx-auto mb-4">{s.num}</div>
              <div className="text-3xl mb-3">{s.icon}</div>
              <div className="font-semibold text-gray-800 text-sm mb-1">{s.title}</div>
              <div className="text-xs text-gray-400">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-20 px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-3">Ready for your next adventure?</h2>
        <p className="text-blue-200 mb-8 text-lg">Join thousands of travelers who plan smarter with TripNest</p>
        <button onClick={() => navigate('/register')}
          className="px-10 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition text-lg">
          Get started for free
        </button>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-8 flex justify-between items-center">
        <div className="text-white font-semibold">✈️ TripNest</div>
        <div className="text-sm">© 2024 TripNest. Travel planning made simple.</div>
      </footer>
    </div>
  );
};

export default LandingPage;