import { React, useRef } from "react";
import Navbar from "../../components/Navbar";
import TrainingSideBar from "../../components/Sidebar/Training";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { getUserId, setUserSession } from "../../utils/Common";
import { useHistory } from "react-router-dom";
import ModuleGrid from "../../components/Grid/Module";
import AllModuleGrid from "../../components/Grid/AllModule";

export default function TrainingCompleted() {
  const [modules, setModules] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    api
      .getUser(getUserId())
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch((error) => setError(error));
    api.getUserCompletedModules(getUserId()).then(response => setModules(response.data))
  }, []);

  if (error) return `Error`;

  return (
    <div className="">
      <Navbar />
      <div className="flex">
        <div className="flex-1">
          <TrainingSideBar pageTitle="Completed Training" />
        </div>
      </div>
      <div className="py-10">
        <main className="flex-1">
          <div className="sm:flex-auto">
            <h1 className="font-sans text-xl font-semibold text-gray-900">Completed Training</h1>
          </div>
          {modules.length > 0 ? (
            <div className="py-4 px-6">
              <AllModuleGrid files={modules} />
            </div>
          ) : (
            <h1>No Training Left</h1>
          )}
        </main>
      </div>
    </div>
  );
}
