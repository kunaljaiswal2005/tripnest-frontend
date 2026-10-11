import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import {
    tripAPI,
    itineraryAPI,
    activityAPI,
    tripMemberAPI,
} from '../utils/api';
import { useAuth } from '../context/AuthContext';

const activityTypes = [
    'SIGHTSEEING', 'TRANSPORTATION', 'ACCOMMODATION',
    'DINING', 'ADVENTURE', 'SHOPPING', 'OTHER',
];

const typeEmoji = {
    SIGHTSEEING:    '🏛️',
    TRANSPORTATION: '🚗',
    ACCOMMODATION:  '🏨',
    DINING:         '🍽️',
    ADVENTURE:      '🏄',
    SHOPPING:       '🛍️',
    OTHER:          '📌',
};

const STATUS_BADGE = {
    PLANNING:  'bg-blue-100 text-blue-700',
    UPCOMING:  'bg-yellow-100 text-yellow-700',
    ONGOING:   'bg-green-100 text-green-700',
    COMPLETED: 'bg-slate-100 text-slate-600',
    CANCELLED: 'bg-red-100 text-red-600',
};

const TripDetail = () => {
    const { id }     = useParams();
    const navigate   = useNavigate();
    const { user }   = useAuth();

    const [trip,         setTrip]         = useState(null);
    const [itineraries,  setItineraries]  = useState([]);
    const [activities,   setActivities]   = useState({});
    const [members,      setMembers]      = useState([]);
    const [activeDay,    setActiveDay]    = useState(null);
    const [loading,      setLoading]      = useState(true);
    const [activeMainTab, setActiveMainTab] =
            useState('itinerary');
    const [showAddActivity, setShowAddActivity] =
            useState(false);
    const [activityForm, setActivityForm] = useState({
        title:        '',
        activityType: 'SIGHTSEEING',
        startTime:    '',
        endTime:      '',
        location:     '',
        notes:        '',
        estimatedCost: '',
    });

    // Invite state
    const [inviteEmail,   setInviteEmail]   = useState('');
    const [inviteLoading, setInviteLoading] = useState(false);
    const [inviteError,   setInviteError]   = useState('');
    const [inviteSuccess, setInviteSuccess] = useState('');

    // ============================================================
    // FETCH
    // ============================================================

    useEffect(() => {
        fetchAll();
    }, [id]);

    const fetchAll = async () => {
        try {
            const [tripRes, itiRes, membersRes] =
                    await Promise.all([
                tripAPI.getById(id),
                itineraryAPI.getByTrip(id),
                tripMemberAPI.getMembers(id),
            ]);
            setTrip(tripRes.data);
            setItineraries(itiRes.data);
            setMembers(membersRes.data);

            if (itiRes.data.length > 0) {
                setActiveDay(itiRes.data[0].id);
                fetchActivities(itiRes.data[0].id);
            }
        } catch {
            navigate('/trips');
        } finally {
            setLoading(false);
        }
    };

    const fetchActivities = async (itineraryId) => {
        try {
            const res = await activityAPI
                    .getByItinerary(itineraryId);
            setActivities(prev => ({
                ...prev, [itineraryId]: res.data,
            }));
        } catch {
            setActivities(prev => ({
                ...prev, [itineraryId]: [],
            }));
        }
    };

    const fetchMembers = async () => {
        try {
            const res = await tripMemberAPI.getMembers(id);
            setMembers(res.data);
        } catch {}
    };

    // ============================================================
    // COMPUTED
    // ============================================================

    const storedUser = localStorage.getItem('user');
    const currentEmail = user?.email
        || (storedUser ? JSON.parse(storedUser).email : '');
    const isOwner = trip?.ownerEmail === currentEmail;

    const currentActivities = activities[activeDay] || [];
    const activeItinerary = itineraries.find(
            i => i.id === activeDay);

    // ============================================================
    // HANDLERS
    // ============================================================

    const handleDayClick = (itineraryId) => {
        setActiveDay(itineraryId);
        setShowAddActivity(false);
        if (!activities[itineraryId]) {
            fetchActivities(itineraryId);
        }
    };

    const handleAddActivity = async (e) => {
        e.preventDefault();
        try {
            await activityAPI.create(activeDay, {
                ...activityForm,
                estimatedCost:
                    activityForm.estimatedCost
                    ? Number(activityForm.estimatedCost)
                    : null,
                startTime: activityForm.startTime || null,
                endTime:   activityForm.endTime   || null,
            });
            setShowAddActivity(false);
            setActivityForm({
                title: '', activityType: 'SIGHTSEEING',
                startTime: '', endTime: '',
                location: '', notes: '',
                estimatedCost: '',
            });
            fetchActivities(activeDay);
        } catch {
            alert('Activity add nahi hui!');
        }
    };

    const handleDeleteActivity = async (activityId) => {
        if (!window.confirm(
                'Delete this activity?')) return;
        try {
            await activityAPI.delete(activityId);
            fetchActivities(activeDay);
        } catch {}
    };

    const handleInvite = async (e) => {
        e.preventDefault();
        if (!inviteEmail.trim()) return;

        setInviteLoading(true);
        setInviteError('');
        setInviteSuccess('');

        try {
            await tripMemberAPI.invite(id, inviteEmail);
            setInviteSuccess(
                    `✅ Invitation sent to ${inviteEmail}`);
            setInviteEmail('');
            fetchMembers();
        } catch (err) {
            setInviteError(
                    err.response?.data?.error
                    || 'Invite failed!');
        } finally {
            setInviteLoading(false);
        }
    };

    const handleRemoveMember = async (memberId) => {
        if (!window.confirm(
                'Remove this member?')) return;
        try {
            await tripMemberAPI.remove(id, memberId);
            fetchMembers();
        } catch (err) {
            alert(err.response?.data?.error
                    || 'Remove failed!');
        }
    };

    // ============================================================
    // LOADING
    // ============================================================

    if (loading) return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="flex justify-center
                            items-center h-64">
                <div className="text-center">
                    <div className="w-8 h-8 border-2
                        border-blue-600 border-t-transparent
                        rounded-full animate-spin mx-auto
                        mb-2" />
                    <p className="text-slate-400 text-sm">
                        Loading trip...
                    </p>
                </div>
            </div>
        </div>
    );

    // ============================================================
    // RENDER
    // ============================================================

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="max-w-5xl mx-auto px-4 sm:px-6
                            pt-24 sm:pt-28 pb-12">

                {/* Back */}
                <button
                    onClick={() => navigate('/trips')}
                    className="text-slate-400 text-sm
                               hover:text-slate-600 flex
                               items-center gap-1 mb-6"
                >
                    ← Back to trips
                </button>

                {/* ============================================
                    TRIP HEADER
                ============================================ */}
                <div className="bg-white border
                    border-slate-200 rounded-2xl p-6 mb-6">

                    <div className="flex justify-between
                                    items-start">
                        <div className="flex-1 min-w-0">
                            <h1 className="text-2xl font-bold
                                text-slate-900 truncate">
                                {trip?.title}
                            </h1>
                            <p className="text-slate-500 mt-1
                                          text-sm">
                                📍 {trip?.destination}
                            </p>
                        </div>
                        <span className={`text-xs px-3 py-1
                            rounded-full font-semibold
                            shrink-0 ml-3
                            ${STATUS_BADGE[trip?.status]
                                || STATUS_BADGE.PLANNING}`}>
                            {trip?.status}
                        </span>
                    </div>

                    {/* Trip Info */}
                    <div className="grid grid-cols-2
                        sm:grid-cols-4 gap-4 mt-5
                        border-t border-slate-50 pt-5">
                        <div>
                            <p className="text-xs
                                          text-slate-400">
                                Start
                            </p>
                            <p className="text-sm font-medium
                                          text-slate-700">
                                {trip?.startDate || '—'}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs
                                          text-slate-400">
                                End
                            </p>
                            <p className="text-sm font-medium
                                          text-slate-700">
                                {trip?.endDate || '—'}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs
                                          text-slate-400">
                                Duration
                            </p>
                            <p className="text-sm font-medium
                                          text-slate-700">
                                {trip?.totalDays || 0} days
                            </p>
                        </div>
                        <div>
                            <p className="text-xs
                                          text-slate-400">
                                Budget
                            </p>
                            <p className="text-sm font-medium
                                          text-green-600">
                                {trip?.totalBudget
                                    ? `₹${trip.totalBudget
                                        .toLocaleString()}`
                                    : 'Not set'}
                            </p>
                        </div>
                    </div>

                    {trip?.description && (
                        <p className="text-sm text-slate-500
                            mt-4 border-t border-slate-50
                            pt-4">
                            {trip.description}
                        </p>
                    )}

                    {/* Owner badge */}
                    <div className="flex items-center gap-2
                                    mt-4 pt-4 border-t
                                    border-slate-50">
                        <span className="text-xs
                            text-slate-400">
                            Created by:
                        </span>
                        <span className="text-xs font-medium
                            text-slate-600">
                            {trip?.ownerName}
                            {isOwner && ' (You)'}
                        </span>
                        <span className="text-xs
                            bg-slate-100 text-slate-500
                            px-2 py-0.5 rounded-full ml-1">
                            {members.length} member
                            {members.length !== 1 ? 's' : ''}
                        </span>
                    </div>

                    {/* Quick action buttons */}
                    <div className="flex gap-2 mt-4 flex-wrap">
                        <button
                            onClick={() =>
                                navigate(
                                    `/trips/${id}/documents`)}
                            className="px-3 py-1.5 border
                                border-slate-200 rounded-xl
                                text-xs text-slate-600
                                hover:border-blue-200
                                hover:bg-blue-50 transition"
                        >
                            📂 Documents
                        </button>
                        <button
                            onClick={() =>
                                navigate(
                                    `/reports/trips/${id}`)}
                            className="px-3 py-1.5 border
                                border-slate-200 rounded-xl
                                text-xs text-slate-600
                                hover:border-blue-200
                                hover:bg-blue-50 transition"
                        >
                            📊 Report
                        </button>
                        <button
                            onClick={() =>
                                navigate(
                                    `/trips/${id}/settlement`)}
                            className="px-3 py-1.5 border
                                border-slate-200 rounded-xl
                                text-xs text-slate-600
                                hover:border-green-200
                                hover:bg-green-50 transition"
                        >
                            💸 Settlement
                        </button>
                    </div>
                </div>

                {/* ============================================
                    MAIN TABS
                ============================================ */}
                <div className="flex gap-1 mb-6 border-b
                    border-slate-200 overflow-x-auto">
                    {[
                        { id: 'itinerary',
                          label: '📅 Itinerary' },
                        { id: 'members',
                          label: `👥 Members (${members.length})` },
                        { id: 'expenses',
                          label: '💰 Expenses'  },
                        { id: 'documents',
                          label: '📂 Documents' },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() =>
                                setActiveMainTab(tab.id)}
                            className={`pb-3 px-4 text-sm
                                font-medium whitespace-nowrap
                                transition border-b-2
                                ${activeMainTab === tab.id
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* ============================================
                    ITINERARY TAB
                ============================================ */}
                {activeMainTab === 'itinerary' && (
                    <div className="flex gap-5">

                        {/* Days Sidebar */}
                        <div className="w-44 shrink-0">
                            <h2 className="text-xs font-semibold
                                text-slate-500 mb-3 uppercase
                                tracking-wide">
                                Days
                            </h2>
                            <div className="space-y-2">
                                {itineraries.map(day => (
                                    <button
                                        key={day.id}
                                        onClick={() =>
                                            handleDayClick(
                                                day.id)}
                                        className={`w-full
                                            text-left px-4 py-3
                                            rounded-xl text-sm
                                            transition border
                                            ${activeDay === day.id
                                                ? 'bg-blue-600 text-white border-blue-600'
                                                : 'bg-white text-slate-700 border-slate-200 hover:border-blue-200'}`}
                                    >
                                        <div className="font-medium">
                                            Day {day.dayNumber}
                                        </div>
                                        <div className={`text-xs mt-0.5
                                            ${activeDay === day.id
                                                ? 'text-blue-200'
                                                : 'text-slate-400'}`}>
                                            {day.date}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Activities Panel */}
                        <div className="flex-1">
                            <div className="flex
                                justify-between items-center
                                mb-4">
                                <div>
                                    <h2 className="text-sm
                                        font-semibold
                                        text-slate-700">
                                        Day {activeItinerary
                                            ?.dayNumber}
                                        {' '}Activities
                                    </h2>
                                    <p className="text-xs
                                        text-slate-400 mt-0.5">
                                        {activeItinerary?.date}
                                    </p>
                                </div>
                                <button
                                    onClick={() =>
                                        setShowAddActivity(
                                            !showAddActivity)}
                                    className="bg-blue-600
                                        text-white text-sm px-4
                                        py-2 rounded-xl
                                        hover:bg-blue-700
                                        transition"
                                >
                                    + Add Activity
                                </button>
                            </div>

                            {/* Add Activity Form */}
                            {showAddActivity && (
                                <form
                                    onSubmit={handleAddActivity}
                                    className="bg-white border
                                        border-blue-100
                                        rounded-2xl p-5 mb-4
                                        space-y-3"
                                >
                                    <h3 className="font-medium
                                        text-slate-800 text-sm">
                                        New Activity
                                    </h3>

                                    <input
                                        type="text"
                                        placeholder="Title *"
                                        value={activityForm.title}
                                        onChange={e =>
                                            setActivityForm(p => ({
                                                ...p,
                                                title: e.target.value
                                            }))}
                                        className="w-full border
                                            border-slate-200
                                            rounded-xl px-3 py-2
                                            text-sm
                                            focus:outline-none
                                            focus:ring-2
                                            focus:ring-blue-500"
                                        required
                                    />

                                    <select
                                        value={
                                            activityForm
                                                .activityType}
                                        onChange={e =>
                                            setActivityForm(p => ({
                                                ...p,
                                                activityType:
                                                    e.target.value
                                            }))}
                                        className="w-full border
                                            border-slate-200
                                            rounded-xl px-3 py-2
                                            text-sm
                                            focus:outline-none
                                            focus:ring-2
                                            focus:ring-blue-500"
                                    >
                                        {activityTypes.map(t => (
                                            <option key={t}
                                                    value={t}>
                                                {typeEmoji[t]}
                                                {' '}{t}
                                            </option>
                                        ))}
                                    </select>

                                    <div className="grid
                                        grid-cols-2 gap-3">
                                        <input
                                            type="time"
                                            value={
                                                activityForm
                                                    .startTime}
                                            onChange={e =>
                                                setActivityForm(
                                                p => ({
                                                    ...p,
                                                    startTime:
                                                        e.target.value
                                                }))}
                                            className="border
                                                border-slate-200
                                                rounded-xl px-3
                                                py-2 text-sm
                                                focus:outline-none
                                                focus:ring-2
                                                focus:ring-blue-500"
                                        />
                                        <input
                                            type="time"
                                            value={
                                                activityForm
                                                    .endTime}
                                            onChange={e =>
                                                setActivityForm(
                                                p => ({
                                                    ...p,
                                                    endTime:
                                                        e.target.value
                                                }))}
                                            className="border
                                                border-slate-200
                                                rounded-xl px-3
                                                py-2 text-sm
                                                focus:outline-none
                                                focus:ring-2
                                                focus:ring-blue-500"
                                        />
                                    </div>

                                    <input
                                        type="text"
                                        placeholder="Location"
                                        value={
                                            activityForm.location}
                                        onChange={e =>
                                            setActivityForm(p => ({
                                                ...p,
                                                location:
                                                    e.target.value
                                            }))}
                                        className="w-full border
                                            border-slate-200
                                            rounded-xl px-3 py-2
                                            text-sm
                                            focus:outline-none
                                            focus:ring-2
                                            focus:ring-blue-500"
                                    />

                                    <input
                                        type="number"
                                        placeholder="Cost (₹)"
                                        value={
                                            activityForm
                                                .estimatedCost}
                                        onChange={e =>
                                            setActivityForm(p => ({
                                                ...p,
                                                estimatedCost:
                                                    e.target.value
                                            }))}
                                        className="w-full border
                                            border-slate-200
                                            rounded-xl px-3 py-2
                                            text-sm
                                            focus:outline-none
                                            focus:ring-2
                                            focus:ring-blue-500"
                                    />

                                    <textarea
                                        placeholder="Notes"
                                        value={activityForm.notes}
                                        onChange={e =>
                                            setActivityForm(p => ({
                                                ...p,
                                                notes: e.target.value
                                            }))}
                                        rows={2}
                                        className="w-full border
                                            border-slate-200
                                            rounded-xl px-3 py-2
                                            text-sm resize-none
                                            focus:outline-none
                                            focus:ring-2
                                            focus:ring-blue-500"
                                    />

                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowAddActivity(
                                                    false)}
                                            className="flex-1
                                                py-2 border
                                                border-slate-200
                                                rounded-xl text-sm
                                                text-slate-600
                                                hover:bg-slate-50"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1
                                                py-2 bg-blue-600
                                                text-white
                                                rounded-xl text-sm
                                                font-medium
                                                hover:bg-blue-700"
                                        >
                                            Add
                                        </button>
                                    </div>
                                </form>
                            )}

                            {/* Activities List */}
                            {currentActivities.length === 0 ? (
                                <div className="bg-white border
                                    border-slate-200 rounded-2xl
                                    p-10 text-center">
                                    <div className="text-3xl mb-2">
                                        📋
                                    </div>
                                    <p className="text-slate-400
                                                  text-sm">
                                        No activities — add one!
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {currentActivities.map(
                                        activity => (
                                        <div
                                            key={activity.id}
                                            className="bg-white
                                                border
                                                border-slate-200
                                                rounded-2xl p-4
                                                hover:border-blue-100
                                                transition"
                                        >
                                            <div className="flex
                                                justify-between
                                                items-start">
                                                <div className="flex
                                                    gap-3">
                                                    <span className="text-2xl">
                                                        {typeEmoji[
                                                            activity
                                                            .activityType]
                                                        }
                                                    </span>
                                                    <div>
                                                        <h4 className="font-medium
                                                            text-slate-800
                                                            text-sm">
                                                            {activity.title}
                                                        </h4>
                                                        <span className="text-xs
                                                            bg-slate-100
                                                            text-slate-500
                                                            px-2 py-0.5
                                                            rounded-full
                                                            mt-1
                                                            inline-block">
                                                            {activity.activityType}
                                                        </span>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() =>
                                                        handleDeleteActivity(
                                                            activity.id)}
                                                    className="text-red-400
                                                        hover:text-red-600
                                                        text-xs"
                                                >
                                                    Delete
                                                </button>
                                            </div>

                                            <div className="mt-3
                                                flex flex-wrap
                                                gap-3 text-xs
                                                text-slate-500">
                                                {activity.startTime && (
                                                    <span>
                                                        🕐{' '}
                                                        {activity.startTime}
                                                        {activity.endTime &&
                                                            ` — ${activity.endTime}`}
                                                    </span>
                                                )}
                                                {activity.location && (
                                                    <span>
                                                        📍{' '}
                                                        {activity.location}
                                                    </span>
                                                )}
                                                {activity.estimatedCost && (
                                                    <span className="text-green-600
                                                        font-medium">
                                                        ₹{activity
                                                            .estimatedCost
                                                            .toLocaleString()}
                                                    </span>
                                                )}
                                            </div>

                                            {activity.notes && (
                                                <p className="text-xs
                                                    text-slate-400
                                                    mt-2">
                                                    {activity.notes}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* ============================================
                    MEMBERS TAB
                ============================================ */}
                {activeMainTab === 'members' && (
                    <div className="space-y-4">

                        {/* Invite Form — Only owner */}
                        {isOwner && (
                            <div className="bg-white border
                                border-slate-200 rounded-2xl
                                p-5">
                                <h3 className="font-semibold
                                    text-slate-800 mb-3">
                                    Invite Member ✉️
                                </h3>

                                {inviteSuccess && (
                                    <div className="mb-3
                                        bg-green-50 border
                                        border-green-200
                                        text-green-700
                                        rounded-xl px-4
                                        py-2 text-sm">
                                        {inviteSuccess}
                                    </div>
                                )}
                                {inviteError && (
                                    <div className="mb-3
                                        bg-red-50 border
                                        border-red-200
                                        text-red-600
                                        rounded-xl px-4
                                        py-2 text-sm">
                                        ⚠️ {inviteError}
                                    </div>
                                )}

                                <form
                                    onSubmit={handleInvite}
                                    className="flex gap-3"
                                >
                                    <input
                                        type="email"
                                        value={inviteEmail}
                                        onChange={e =>
                                            setInviteEmail(
                                                e.target.value)}
                                        placeholder="friend@gmail.com"
                                        className="flex-1
                                            border border-slate-200
                                            rounded-xl px-3 py-2
                                            text-sm
                                            focus:outline-none
                                            focus:ring-2
                                            focus:ring-blue-500"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        disabled={inviteLoading}
                                        className="bg-blue-600
                                            text-white px-5
                                            py-2 rounded-xl
                                            text-sm font-medium
                                            hover:bg-blue-700
                                            disabled:opacity-50
                                            transition"
                                    >
                                        {inviteLoading
                                            ? 'Sending...'
                                            : 'Invite'}
                                    </button>
                                </form>

                                <p className="text-xs
                                    text-slate-400 mt-2">
                                    They must be registered
                                    on TripNest. An email
                                    invitation will be sent.
                                </p>
                            </div>
                        )}

                        {/* Members List */}
                        <div className="bg-white border
                            border-slate-200 rounded-2xl p-5">
                            <h3 className="font-semibold
                                text-slate-800 mb-4">
                                Team Members
                                ({members.length})
                            </h3>

                            {members.length === 0 ? (
                                <div className="text-center
                                    py-8 text-slate-400">
                                    <div className="text-3xl mb-2">
                                        👥
                                    </div>
                                    <p className="text-sm">
                                        No members yet.
                                        {isOwner &&
                                            ' Invite someone!'}
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {members.map(member => (
                                        <div
                                            key={member.id}
                                            className="flex
                                                items-center
                                                justify-between
                                                p-3 bg-slate-50
                                                rounded-xl"
                                        >
                                            <div className="flex
                                                items-center
                                                gap-3">
                                                <div className="w-10
                                                    h-10
                                                    bg-blue-100
                                                    rounded-full
                                                    flex items-center
                                                    justify-center
                                                    text-blue-700
                                                    font-bold text-sm">
                                                    {member.name
                                                        ?.charAt(0)
                                                        ?.toUpperCase()
                                                        || '?'}
                                                </div>
                                                <div>
                                                    <p className="font-medium
                                                        text-slate-800
                                                        text-sm flex
                                                        items-center
                                                        gap-1">
                                                        {member.name}
                                                        {member.email
                                                            === currentEmail
                                                        && (
                                                            <span className="text-[10px]
                                                                text-blue-500">
                                                                (You)
                                                            </span>
                                                        )}
                                                    </p>
                                                    <p className="text-xs
                                                        text-slate-400">
                                                        {member.email}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex
                                                items-center
                                                gap-2">
                                                <span className={`
                                                    text-xs px-2
                                                    py-1 rounded-full
                                                    font-semibold
                                                    ${member.role
                                                        === 'ADMIN'
                                                        ? 'bg-blue-100 text-blue-700'
                                                        : 'bg-slate-100 text-slate-600'}`}>
                                                    {member.role
                                                        === 'ADMIN'
                                                        ? '👑 Admin'
                                                        : '👤 Member'}
                                                </span>

                                                {/* Remove —
                                                    owner only,
                                                    not self */}
                                                {isOwner
                                                    && member.email
                                                        !== currentEmail
                                                    && (
                                                    <button
                                                        onClick={() =>
                                                            handleRemoveMember(
                                                                member.id)}
                                                        className="text-xs
                                                            text-red-400
                                                            hover:text-red-600
                                                            transition"
                                                    >
                                                        Remove
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* ============================================
                    EXPENSES TAB
                ============================================ */}
                {activeMainTab === 'expenses' && (
                    <div className="space-y-4">
                        <button
                            onClick={() =>
                                navigate(
                                    `/trips/${id}/expenses`)}
                            className="w-full bg-white border
                                border-slate-200 rounded-2xl
                                p-6 text-left
                                hover:border-blue-200
                                hover:shadow-sm transition"
                        >
                            <div className="flex items-center
                                            gap-4">
                                <div className="text-3xl">💰</div>
                                <div>
                                    <p className="font-semibold
                                        text-slate-800">
                                        Manage Expenses
                                    </p>
                                    <p className="text-xs
                                        text-slate-400 mt-1">
                                        Add expenses, view
                                        summary, manage shared
                                        expenses
                                    </p>
                                </div>
                            </div>
                        </button>

                        <button
                            onClick={() =>
                                navigate(
                                    `/trips/${id}/settlement`)}
                            className="w-full bg-white border
                                border-slate-200 rounded-2xl
                                p-6 text-left
                                hover:border-green-200
                                hover:shadow-sm transition"
                        >
                            <div className="flex items-center
                                            gap-4">
                                <div className="text-3xl">💸</div>
                                <div>
                                    <p className="font-semibold
                                        text-slate-800">
                                        View Settlement
                                    </p>
                                    <p className="text-xs
                                        text-slate-400 mt-1">
                                        Who owes whom — settle
                                        shared expenses
                                    </p>
                                </div>
                            </div>
                        </button>
                    </div>
                )}

                {/* ============================================
                    DOCUMENTS TAB
                ============================================ */}
                {activeMainTab === 'documents' && (
                    <div>
                        <button
                            onClick={() =>
                                navigate(
                                    `/trips/${id}/documents`)}
                            className="w-full bg-white border
                                border-slate-200 rounded-2xl
                                p-6 text-left
                                hover:border-blue-200
                                hover:shadow-sm transition"
                        >
                            <div className="flex items-center
                                            gap-4">
                                <div className="text-3xl">📂</div>
                                <div>
                                    <p className="font-semibold
                                        text-slate-800">
                                        Documents & Photos
                                    </p>
                                    <p className="text-xs
                                        text-slate-400 mt-1">
                                        Upload tickets, bookings,
                                        travel photos
                                    </p>
                                </div>
                            </div>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TripDetail;