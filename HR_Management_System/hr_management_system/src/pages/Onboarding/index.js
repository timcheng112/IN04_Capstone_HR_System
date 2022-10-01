import { React, useRef } from "react";
import Navbar from "../../components/Navbar";
import AdminSidebar from "../../components/Sidebar/Admin";
import SelfTasklistTable from "../../features/onboarding/SelfTasklistTable";

export default function Onboarding() {
  const checkbox = useRef();
  //   const [indeterminate, setIndeterminate] = useState(false);

  //   useLayoutEffect(() => {
  //     const isIndeterminate =
  //       selectedTask.length > 0 && selectedTask.length < people.length;
  //     setChecked(selectedTask.length === people.length);
  //     setIndeterminate(isIndeterminate);
  //     checkbox.current.indeterminate = isIndeterminate;
  //   }, [selectedTask]);

  return (
    <div className="">
      <Navbar />
      <div className="flex">
        <div className="flex-1">
          <AdminSidebar pageTitle="Onboarding" />
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
