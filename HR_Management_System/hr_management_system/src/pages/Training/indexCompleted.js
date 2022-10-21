import { React } from "react";
import Navbar from "../../components/Navbar";
import TrainingSideBar from "../../components/Sidebar/Training";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { getUserId } from "../../utils/Common";
import AllModuleGrid from "../../components/Grid/AllModule";

export default function TrainingCompleted() {
  const [modules, setModules] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    api
      .getUser(getUserId())
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch((error) => setError(error));
    api
      .getUserCompletedModules(getUserId())
      .then((response) => setModules(response.data));
  }, []);

  if (error) return `Error`;

  return (
    <div className="">
      <Navbar />
      <div className="flex">
        <div className="flex-1">
          <TrainingSideBar
            currentPage={{
              name: "Completed Training",
              href: "/mytraining/completed",
              current: true,
            }}
          />
        </div>
      </div>
      <div className="py-10">
        <main className="flex-1">
          <div className="sm:flex-auto">
            <h1 className="font-sans text-xl font-semibold text-gray-900">
              Completed Training
            </h1>
          </div>
          {modules.length > 0 ? (
            <div className="py-4 px-6">
              <AllModuleGrid files={modules} currentPage={'/mytraining/completed'} />
            </div>
          ) : (
            <h1 className="font-sans">No Training Completed</h1>
          )}
        </main>
      </div>
    </div>
  );
}
