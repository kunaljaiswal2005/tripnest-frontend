import React, { useState, useEffect } from 'react';
import { 
  Search, Bell, Plus, Compass, Calendar, MapPin, DollarSign, 
  Users, Heart, Plane, ShieldCheck, PieChart, TrendingUp, 
  ChevronRight, MoreVertical, ExternalLink, ArrowUpRight,
  Coffee, Hotel, ShoppingBag, Utensils, Award, Sparkles, CheckCircle2
} from 'lucide-react';

export default function TripNestDashboard() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [hoveredExpense, setHoveredExpense] = useState(null);
  const [favoriteStates, setFavoriteStates] = useState({ 0: true, 1: true, 2: false, 3: true });
  const [countUpSpent, setCountUpSpent] = useState(0);

  // Animated counter effect for Expense Summary
  useEffect(() => {
    let start = 0;
    const end = 3450;
    const duration = 1200;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = end / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCountUpSpent(end);
        clearInterval(timer);
      } else {
        setCountUpSpent(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const toggleFavorite = (id) => {
    setFavoriteStates(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="relative min-h-screen w-full bg-slate-950 text-slate-100 font-sans overflow-x-hidden selection:bg-coral-500/30 selection:text-coral-300">
      
      {/* Dynamic Background Photography Layer */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 transform scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop')`,
        }}
      >
        {/* Deep Ocean & Dark Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-950/80 to-blue-950/50 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-500/15 via-transparent to-transparent" />
      </div>

      {/* Main Glassmorphic Container Layout */}
      <div className="relative z-10 flex flex-col min-h-screen max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        
        {/* ================= HEADER ================= */}
        <header className="sticky top-4 z-40 my-4 rounded-2xl bg-white/[0.07] backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3">
            
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                <Compass className="h-6 w-6 text-white animate-spin-slow" />
              </div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                Trip<span className="text-orange-400">Nest</span>
              </span>
            </div>

            {/* Search Bar - Hidden on mobile */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search trips, flights, places..." 
                className="w-full bg-slate-900/40 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent backdrop-blur-sm transition-all"
              />
            </div>

            {/* Right Header Actions */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button 
                className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-medium text-sm px-4 py-2 rounded-xl transition-all shadow-md shadow-orange-500/20 active:scale-95"
              >
                <Plus className="h-4 w-4" />
                <span>New Trip</span>
              </button>

              {/* Notification Bell with Badge */}
              <div className="relative">
                <button 
                  aria-label="Notifications"
                  className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-slate-200 transition-all active:scale-95 relative"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 bg-orange-500 rounded-full ring-2 ring-slate-950">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  </span>
                </button>
              </div>

              {/* User Avatar */}
              <div className="flex items-center gap-3 pl-2 border-l border-white/10">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" 
                    alt="User Avatar" 
                    className="h-10 w-10 rounded-xl object-cover ring-2 ring-orange-500/40"
                  />
                  <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-slate-950" />
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-semibold text-slate-100 leading-tight">Elena Rostova</p>
                  <p className="text-xs text-orange-300 font-medium">Pro Traveler</p>
                </div>
              </div>

            </div>
          </div>
        </header>

        {/* Dashboard Title & Quick Filter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between my-6 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
              Where to next, Elena? <Sparkles className="h-6 w-6 text-orange-400 inline-block" />
            </h1>
            <p className="text-slate-300 text-sm mt-1">
              You have <span className="text-orange-400 font-semibold">2 upcoming trips</span> scheduled for this quarter.
            </p>
          </div>

          {/* Pill Tabs */}
          <div className="flex items-center gap-1 bg-white/[0.05] border border-white/10 p-1 rounded-xl backdrop-blur-md self-start md:self-auto">
            {['Overview', 'Itinerary', 'Documents', 'Analytics'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === tab 
                    ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-md' 
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* ================= SECTION 1: UPCOMING TRIPS CAROUSEL ================= */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Plane className="h-5 w-5 text-orange-400" />
              Upcoming Trips
            </h2>
            <button className="text-xs font-semibold text-orange-400 hover:text-orange-300 flex items-center gap-1 transition-colors">
              View All Trips <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-4 pt-1 snap-x scrollbar-none">
            
            {/* Trip Card 1 - Active / Featured */}
            <div className="min-w-[300px] sm:min-w-[380px] lg:min-w-[420px] rounded-3xl bg-white/[0.08] hover:bg-white/[0.12] border border-white/15 backdrop-blur-xl p-5 shadow-2xl transition-all duration-300 hover:-translate-y-1 snap-start relative group overflow-hidden">
              {/* Background Image Container */}
              <div className="relative h-48 sm:h-52 w-full rounded-2xl overflow-hidden mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop" 
                  alt="Bali Trip" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                
                {/* Status Pill */}
                <div className="absolute top-3 left-3 bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 text-emerald-300 font-semibold text-xs px-3 py-1 rounded-full flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Confirmed
                </div>

                {/* Countdown Badge */}
                <div className="absolute top-3 right-3 bg-slate-950/60 backdrop-blur-md border border-white/10 text-orange-300 font-bold text-xs px-3 py-1 rounded-full">
                  12 days to Bali
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-wide">Bali Retreat & Island Hopping</h3>
                    <p className="text-xs text-slate-300 flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3.5 w-3.5 text-orange-400" /> Indonesia
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Footer Details */}
              <div className="flex items-center justify-between text-xs text-slate-300 pt-1">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-orange-400" />
                  <span>Oct 14 – Oct 24</span>
                </div>
                
                {/* Stacked Avatars */}
                <div className="flex items-center -space-x-2 overflow-hidden">
                  <img className="inline-block h-7 w-7 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" alt="User" />
                  <img className="inline-block h-7 w-7 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" alt="User" />
                  <img className="inline-block h-7 w-7 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop" alt="User" />
                  <div className="flex items-center justify-center h-7 w-7 rounded-full ring-2 ring-slate-900 bg-slate-800 text-[10px] font-bold text-slate-200">
                    +2
                  </div>
                </div>
              </div>
            </div>

            {/* Trip Card 2 */}
            <div className="min-w-[300px] sm:min-w-[380px] lg:min-w-[420px] rounded-3xl bg-white/[0.08] hover:bg-white/[0.12] border border-white/15 backdrop-blur-xl p-5 shadow-2xl transition-all duration-300 hover:-translate-y-1 snap-start relative group overflow-hidden">
              <div className="relative h-48 sm:h-52 w-full rounded-2xl overflow-hidden mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop" 
                  alt="Paris Trip" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                
                <div className="absolute top-3 left-3 bg-orange-500/20 backdrop-blur-md border border-orange-400/30 text-orange-300 font-semibold text-xs px-3 py-1 rounded-full flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                  Planning
                </div>

                <div className="absolute top-3 right-3 bg-slate-950/60 backdrop-blur-md border border-white/10 text-slate-300 font-bold text-xs px-3 py-1 rounded-full">
                  45 days away
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-xl font-bold text-white tracking-wide">Paris & Amalfi Coast</h3>
                  <p className="text-xs text-slate-300 flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3.5 w-3.5 text-orange-400" /> France & Italy
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-300 pt-1">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-orange-400" />
                  <span>Nov 18 – Dec 02</span>
                </div>

                <div className="flex items-center -space-x-2 overflow-hidden">
                  <img className="inline-block h-7 w-7 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" alt="User" />
                  <img className="inline-block h-7 w-7 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" alt="User" />
                </div>
              </div>
            </div>

            {/* Trip Card 3 */}
            <div className="min-w-[300px] sm:min-w-[380px] lg:min-w-[420px] rounded-3xl bg-white/[0.08] hover:bg-white/[0.12] border border-white/15 backdrop-blur-xl p-5 shadow-2xl transition-all duration-300 hover:-translate-y-1 snap-start relative group overflow-hidden">
              <div className="relative h-48 sm:h-52 w-full rounded-2xl overflow-hidden mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=800&auto=format&fit=crop" 
                  alt="Tokyo Trip" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                
                <div className="absolute top-3 left-3 bg-blue-500/20 backdrop-blur-md border border-blue-400/30 text-blue-300 font-semibold text-xs px-3 py-1 rounded-full flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                  Wishlist
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-xl font-bold text-white tracking-wide">Tokyo Winter Wonders</h3>
                  <p className="text-xs text-slate-300 flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3.5 w-3.5 text-orange-400" /> Japan
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-300 pt-1">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-orange-400" />
                  <span>Jan 2025 (Proposed)</span>
                </div>
                <span className="text-xs text-orange-300 font-medium hover:underline cursor-pointer">Start Planning</span>
              </div>
            </div>

          </div>
        </section>

        {/* ================= SECTION 2: BUDGET & EXPENSE + STATS GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          
          {/* Budget Overview Widget (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-white/[0.07] border border-white/10 backdrop-blur-xl p-6 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-emerald-400" />
                  Budget Overview
                </h3>
                <p className="text-xs text-slate-400">Bali Retreat 2024</p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                On Track
              </span>
            </div>

            {/* Arc / Circular Progress */}
            <div className="flex flex-col sm:flex-row items-center justify-around my-2 gap-6">
              <div className="relative h-44 w-44 flex items-center justify-center">
                {/* SVG Ring */}
                <svg className="h-full w-full transform -rotate-90" viewBox="0 0 36 36">
                  {/* Background Track */}
                  <path
                    className="text-white/10"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Animated Fill Track (69% spent) */}
                  <path
                    className="text-gradient drop-shadow-[0_0_10px_rgba(249,115,22,0.5)] transition-all duration-1000 ease-out"
                    strokeDasharray="69, 100"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="url(#orange-gradient)"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <defs>
                    <linearGradient id="orange-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f97316" />
                      <stop offset="100%" stopColor="#f43f5e" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Inner Center Content */}
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-xs text-slate-400 font-medium">Spent so far</span>
                  <span className="text-2xl font-extrabold text-white">${countUpSpent.toLocaleString()}</span>
                  <span className="text-[10px] text-slate-400">of $5,000 cap</span>
                </div>
              </div>

              {/* Quick Breakdown Badges */}
              <div className="flex flex-col gap-2.5 w-full sm:w-auto">
                <div className="flex items-center justify-between gap-4 p-2 rounded-xl bg-white/[0.04] border border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-orange-500" />
                    <span className="text-xs text-slate-300">Flights</span>
                  </div>
                  <span className="text-xs font-bold text-white">$1,200</span>
                </div>
                <div className="flex items-center justify-between gap-4 p-2 rounded-xl bg-white/[0.04] border border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                    <span className="text-xs text-slate-300">Stays</span>
                  </div>
                  <span className="text-xs font-bold text-white">$1,450</span>
                </div>
                <div className="flex items-center justify-between gap-4 p-2 rounded-xl bg-white/[0.04] border border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    <span className="text-xs text-slate-300">Activities</span>
                  </div>
                  <span className="text-xs font-bold text-white">$800</span>
                </div>
              </div>
            </div>

            <div className="mt-2 text-center sm:text-left">
              <p className="text-xs text-slate-400">
                💡 <span className="text-slate-200">Tip:</span> You are $250 under your projected accommodation budget.
              </p>
            </div>
          </div>

          {/* Expense Breakdown Visualizer (4 cols) */}
          <div className="lg:col-span-4 rounded-3xl bg-white/[0.07] border border-white/10 backdrop-blur-xl p-6 shadow-xl flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <PieChart className="h-5 w-5 text-orange-400" />
                Category Breakdown
              </h3>
              <button aria-label="More Options" className="text-slate-400 hover:text-white">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>

            {/* Custom Bar Visualizer */}
            <div className="space-y-3.5 my-auto py-2">
              {[
                { label: 'Hotels & Resort', pct: 42, color: 'bg-rose-500', icon: Hotel, amount: '$1,450' },
                { label: 'Flights & Transit', pct: 35, color: 'bg-orange-500', icon: Plane, amount: '$1,200' },
                { label: 'Dining & Cafes', pct: 15, color: 'bg-amber-400', icon: Utensils, amount: '$520' },
                { label: 'Shopping & Excursions', pct: 8, color: 'bg-emerald-400', icon: ShoppingBag, amount: '$280' },
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className="group relative cursor-pointer"
                  onMouseEnter={() => setHoveredExpense(item.label)}
                  onMouseLeave={() => setHoveredExpense(null)}
                >
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium flex items-center gap-1.5">
                      <item.icon className="h-3.5 w-3.5 text-slate-400 group-hover:text-orange-400 transition-colors" />
                      {item.label}
                    </span>
                    <span className="text-slate-200 font-semibold">{item.amount} ({item.pct}%)</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-white/5">
                    <div 
                      className={`h-full ${item.color} rounded-full transition-all duration-700 ease-out group-hover:brightness-125`}
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>

                  {/* Tooltip on Hover */}
                  {hoveredExpense === item.label && (
                    <div className="absolute right-0 -top-8 bg-slate-900 border border-white/15 text-slate-100 text-[11px] px-2.5 py-1 rounded-md shadow-lg z-20 pointer-events-none animate-fade-in">
                      {item.pct}% of total spent
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button className="w-full py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-semibold text-slate-200 transition-all flex items-center justify-center gap-1.5 mt-2">
              <span>View Detailed Ledger</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Travel Stats Panel (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-4 justify-between">
            
            {/* Stat Card 1 */}
            <div className="flex-1 rounded-2xl bg-white/[0.07] border border-white/10 backdrop-blur-xl p-4 shadow-lg flex items-center gap-4 transition-transform hover:-translate-y-0.5">
              <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400">
                <Compass className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Countries Visited</p>
                <p className="text-2xl font-black text-white mt-0.5">24</p>
                <p className="text-[10px] text-emerald-400 font-medium flex items-center gap-0.5 mt-0.5">
                  <TrendingUp className="h-3 w-3" /> +3 this year
                </p>
              </div>
            </div>

            {/* Stat Card 2 */}
            <div className="flex-1 rounded-2xl bg-white/[0.07] border border-white/10 backdrop-blur-xl p-4 shadow-lg flex items-center gap-4 transition-transform hover:-translate-y-0.5">
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Total Trips Completed</p>
                <p className="text-2xl font-black text-white mt-0.5">48</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Top 5% Explorer</p>
              </div>
            </div>

            {/* Stat Card 3 */}
            <div className="flex-1 rounded-2xl bg-white/[0.07] border border-white/10 backdrop-blur-xl p-4 shadow-lg flex items-center gap-4 transition-transform hover:-translate-y-0.5">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Days Traveled</p>
                <p className="text-2xl font-black text-white mt-0.5">142</p>
                <p className="text-[10px] text-emerald-400 font-medium mt-0.5">18 days active streak</p>
              </div>
            </div>

          </div>

        </div>

        {/* ================= SECTION 3: FAVORITE DESTINATIONS GRID ================= */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Heart className="h-5 w-5 text-rose-400" />
                Saved Wishlist Destinations
              </h2>
              <p className="text-xs text-slate-400">Places you're bookmarking for upcoming adventures</p>
            </div>
            <button className="text-xs font-semibold text-orange-400 hover:text-orange-300 flex items-center gap-1">
              Explore All <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { id: 0, title: 'Santorini Coast', location: 'Greece', img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=600&auto=format&fit=crop', rating: '4.9' },
              { id: 1, title: 'Kyoto Temples', location: 'Japan', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600&auto=format&fit=crop', rating: '4.8' },
              { id: 2, title: 'Banff National Park', location: 'Canada', img: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=600&auto=format&fit=crop', rating: '5.0' },
              { id: 3, title: 'Amalfi Cliffs', location: 'Italy', img: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=600&auto=format&fit=crop', rating: '4.9' },
            ].map((dest) => (
              <div 
                key={dest.id}
                className="group relative rounded-2xl overflow-hidden bg-white/[0.06] border border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-2xl"
              >
                {/* Destination Image */}
                <div className="h-44 w-full overflow-hidden relative">
                  <img 
                    src={dest.img} 
                    alt={dest.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  {/* Heart / Bookmark Button */}
                  <button 
                    onClick={() => toggleFavorite(dest.id)}
                    aria-label={`Save ${dest.title} to favorites`}
                    className="absolute top-3 right-3 p-2 rounded-full bg-slate-950/40 backdrop-blur-md border border-white/10 text-white hover:bg-slate-950/70 transition-all active:scale-75"
                  >
                    <Heart 
                      className={`h-4 w-4 transition-colors ${
                        favoriteStates[dest.id] ? 'text-rose-500 fill-rose-500' : 'text-slate-300'
                      }`} 
                    />
                  </button>

                  {/* Rating Tag */}
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-slate-950/60 backdrop-blur-md text-[11px] font-bold text-amber-300 flex items-center gap-1">
                    ★ {dest.rating}
                  </div>
                </div>

                {/* Content Overlay */}
                <div className="p-4 flex justify-between items-end">
                  <div>
                    <h4 className="font-bold text-sm text-white group-hover:text-orange-300 transition-colors">{dest.title}</h4>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3 w-3 text-orange-400" /> {dest.location}
                    </p>
                  </div>
                  <button aria-label={`View details for ${dest.title}`} className="p-1.5 rounded-lg bg-white/10 hover:bg-orange-500 text-white transition-colors">
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* ================= FLOATING QUICK ACTIONS DOCK ================= */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-2 sm:gap-3 p-2 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/15 shadow-[0_10px_40px_0_rgba(0,0,0,0.5)]">
          <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 text-white text-xs font-bold hover:brightness-110 active:scale-95 transition-all shadow-md shadow-orange-500/20">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Trip</span>
          </button>
          
          <div className="h-5 w-[1px] bg-white/10" />

          <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 text-xs font-medium active:scale-95 transition-all">
            <DollarSign className="h-4 w-4 text-emerald-400" />
            <span className="hidden md:inline">Add Expense</span>
          </button>

          <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 text-xs font-medium active:scale-95 transition-all">
            <Users className="h-4 w-4 text-blue-400" />
            <span className="hidden md:inline">Invite Group</span>
          </button>

          <button aria-label="Explore places" className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 active:scale-95 transition-all">
            <Compass className="h-4 w-4 text-orange-400" />
          </button>
        </div>
      </div>

    </div>
  );
}