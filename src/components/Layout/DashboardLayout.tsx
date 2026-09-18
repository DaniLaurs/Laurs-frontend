import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";


function DashboardLayout() {

    
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (

 <div className="flex min-h-screen bg-gray-50">

         <Sidebar
            open={sidebarOpen}
            setOpen={setSidebarOpen}
            />

      <div className="flex-1 flex flex-col">

            <DashboardHeader
            onMenuClick={() => setSidebarOpen(!sidebarOpen)}
            />
        <main className="flex-1 p-6">

          <Outlet />

        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;