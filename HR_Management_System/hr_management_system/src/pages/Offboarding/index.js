import { React } from "react";
import Navbar from "../../components/Navbar";
import AdminSidebar from "../../components/Sidebar/Admin";
import SelfTasklistTable from "../../features/onboarding/SelfTasklistTable";

function Offboarding() {
  return (
    <div className="">
      <Navbar />
      <div className="flex">
        <div className="flex-1">
          <AdminSidebar pageTitle="Offboarding" />
        </div>
      </div>
      <main className="flex-1">
        <div className="py-4 px-6">
          <SelfTasklistTable />
        </div>
      </main>
    </div>
  );
}

export default Offboarding;
