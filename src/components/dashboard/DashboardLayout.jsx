import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";

export default function DashboardLayout({ children }) {
  return (
    <div className="h-screen bg-[#041624] flex overflow-hidden">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        <DashboardHeader />

        <main className="flex-1 overflow-y-auto bg-[#051A2D] p-6">
  <div className="max-w-[1500px] mx-auto">
    {children}
  </div>
</main>
      </div>
    </div>
  );
}