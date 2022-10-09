import { React, useRef } from "react";
import Navbar from "../../components/Navbar";
import TrainingSideBar from "../../components/Sidebar/Training";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { getUserId, setUserSession } from "../../utils/Common";
import { useHistory } from "react-router-dom";
import ModuleGrid from "../../components/Grid/Module";

export default function Training() {
  const [modules, setModules] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    // api.getUserModules(getUserId()).then((response) => {
    //   setModules(response.data);
    //   console.log(response.data);
    // });
    api
      .getUser(getUserId())
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch((error) => setError(error));
  }, []);

  if (error) return `Error`;

  return (
    <div className="">
      <Navbar />
      <div className="flex">
        <div className="flex-1">
          <TrainingSideBar pageTitle="Training" />
        </div>
      </div>
      <div className="py-10">
        <main className="flex-1">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Training</h1>
          </div>
          <div className="flex items-center">
            <div className="mt-4 ml-auto mr-6">
              {user && user.hrEmployee && (
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                  onClick={() => history.push("/career/traininghr")}
                >
                  HR Mode
                </button>
              )}
            </div>
          </div>
          <div className="py-4 px-6">
            <ModuleGrid files={modules} />
          </div>
        </main>
      </div>
    </div>
  );
}
