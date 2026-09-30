import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { groupAPI, tripAPI } from "../utils/api";

const Groups = () => {
  const navigate = useNavigate();

  const [groups,   setGroups]   = useState([]);
  const [trips,    setTrips]    = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [inviteGroupId, setInviteGroupId] = useState(null);
  const [inviteEmail,   setInviteEmail]   = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "", description: "", tripId: ""
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [groupRes, tripRes] = await Promise.all([
        groupAPI.getAll(),
        tripAPI.getAll(),
      ]);
      setGroups(groupRes.data);
      setTrips(tripRes.data);
    } catch {
      console.error("Failed to load groups");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await groupAPI.create({
        name: form.name,
        description: form.description,
        tripId: form.tripId ? Number(form.tripId) : null,
      });
      setForm({ name: "", description: "", tripId: "" });
      setShowForm(false);
      fetchData();
    } catch {
      alert("Group create failed!");
    } finally {
      setSubmitting(false);
    }
  };

  const handleInvite = async (e) => {
    e.preventDefault();
    try {
      await groupAPI.invite(inviteGroupId, inviteEmail);
      setInviteGroupId(null);
      setInviteEmail("");
      alert("Invitation sent!");
    } catch (err) {
      alert(err.response?.data?.error || "Invite failed!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this group?")) return;
    try {
      await groupAPI.delete(id);
      fetchData();
    } catch {
      alert("Delete failed!");
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="flex items-center justify-center h-64">
        <p className="text-slate-400">Loading groups...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6
                       pt-24 sm:pt-28 pb-12">

        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              👥 Travel Groups
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Plan trips with friends and family
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2
                       rounded-xl text-sm font-medium
                       hover:bg-blue-700 transition"
          >
            + Create Group
          </button>
        </div>

        {/* Create Group Form */}
        {showForm && (
          <form
            onSubmit={handleCreate}
            className="bg-white border border-slate-200
                       rounded-2xl p-6 mb-6 shadow-sm"
          >
            <h2 className="font-semibold text-slate-800 mb-4">
              New Group
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Group name *"
                value={form.name}
                onChange={(e) => setForm({
                  ...form, name: e.target.value
                })}
                className="w-full border border-slate-200 rounded-xl
                           px-4 py-2.5 text-sm focus:outline-none
                           focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Description (optional)"
                value={form.description}
                onChange={(e) => setForm({
                  ...form, description: e.target.value
                })}
                className="w-full border border-slate-200 rounded-xl
                           px-4 py-2.5 text-sm focus:outline-none
                           focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={form.tripId}
                onChange={(e) => setForm({
                  ...form, tripId: e.target.value
                })}
                className="w-full border border-slate-200 rounded-xl
                           px-4 py-2.5 text-sm focus:outline-none
                           focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select trip (optional)</option>
                {trips.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-3 mt-5">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 py-2.5 border border-slate-200
                           rounded-xl text-sm text-slate-600
                           hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 py-2.5 bg-blue-600 text-white
                           rounded-xl text-sm font-medium
                           hover:bg-blue-700 transition
                           disabled:opacity-50"
              >
                {submitting ? "Creating..." : "Create Group"}
              </button>
            </div>
          </form>
        )}

        {/* Invite Modal */}
        {inviteGroupId && (
          <div className="fixed inset-0 bg-black/40 z-50
                          flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 w-full
                            max-w-md shadow-xl">
              <h3 className="font-semibold text-slate-800 mb-4">
                Invite Member
              </h3>
              <form onSubmit={handleInvite}>
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl
                             px-4 py-2.5 text-sm focus:outline-none
                             focus:ring-2 focus:ring-blue-500 mb-4"
                  required
                  autoFocus
                />
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setInviteGroupId(null);
                      setInviteEmail("");
                    }}
                    className="flex-1 py-2.5 border border-slate-200
                               rounded-xl text-sm text-slate-600
                               hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-blue-600 text-white
                               rounded-xl text-sm font-medium
                               hover:bg-blue-700 transition"
                  >
                    Send Invite
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Groups List */}
        {groups.length === 0 ? (
          <div className="bg-white border border-slate-200
                          rounded-2xl p-12 text-center shadow-sm">
            <div className="text-4xl mb-3">👥</div>
            <h3 className="font-semibold text-slate-800 mb-2">
              No groups yet
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              Create a group to plan trips together
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-6 py-2.5
                         rounded-xl text-sm hover:bg-blue-700"
            >
              Create Group
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {groups.map((group) => (
              <div
                key={group.id}
                className="bg-white border border-slate-200
                           rounded-2xl p-5 shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {group.name}
                    </h3>
                    {group.description && (
                      <p className="text-slate-500 text-sm mt-0.5">
                        {group.description}
                      </p>
                    )}
                    {group.tripTitle && (
                      <span className="text-xs bg-blue-50
                                       text-blue-600 px-2 py-0.5
                                       rounded-full mt-1 inline-block">
                        ✈️ {group.tripTitle}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setInviteGroupId(group.id)}
                      className="text-xs px-3 py-1.5 bg-blue-50
                                 text-blue-600 rounded-lg
                                 hover:bg-blue-100 transition"
                    >
                      + Invite
                    </button>
                    <button
                      onClick={() => handleDelete(group.id)}
                      className="text-xs px-3 py-1.5 bg-red-50
                                 text-red-500 rounded-lg
                                 hover:bg-red-100 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Members */}
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="text-xs text-slate-400 mb-3">
                    {group.memberCount} member
                    {group.memberCount !== 1 ? "s" : ""}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.members?.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center gap-1.5
                                   bg-slate-50 border border-slate-100
                                   rounded-full px-3 py-1"
                      >
                        <div className="w-5 h-5 rounded-full
                                        bg-blue-600 flex items-center
                                        justify-center text-white
                                        text-xs font-bold">
                          {member.email?.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-xs text-slate-600">
                          {member.email}
                        </span>
                        <span className={`text-[10px] font-bold
                                          px-1.5 py-0.5 rounded-full
                                          ${member.role === "ADMIN"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-slate-100 text-slate-500"
                          }`}>
                          {member.role}
                        </span>
                        {member.status === "PENDING" && (
                          <span className="text-[10px] bg-yellow-100
                                           text-yellow-600 px-1.5
                                           py-0.5 rounded-full">
                            Pending
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Groups;