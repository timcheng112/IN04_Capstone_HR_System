import { React, useRef } from "react";
import Navbar from "../../components/Navbar";
import AdminSidebar from "../../components/Sidebar/Admin";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { getUserId, setUserSession } from "../../utils/Common";
import { useHistory } from "react-router-dom";
import SelfTasklistTable from "../../features/offboarding/SelfTaskListTable";

export default function Offboarding() {
  const checkbox = useRef();
  const [taskListItems, setTaskListItems] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const history = useHistory();
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    api
      .getUser(getUserId())
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch((error) => setError(error));
  }, []);

  useEffect(() => {
    api
      .getOffboardingTaskListItemsByEmployee(getUserId())
      .then((response) => {
        setTaskListItems(response.data);
      })
      .catch((error) => setError(error));
  }, [refreshKey]);

  if (error) return `Error`;

  return (
    <div className="">
      <Navbar />
      <div className="flex">
        <div className="flex-1">
          <AdminSidebar pageTitle="Offboarding" />
        </div>
      </div>
      <div className="py-10">
        <main className="flex-1">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Offboarding</h1>
          </div>
          <div className="flex items-center">
            <div className="mt-4 ml-auto mr-6">
              {user !== null && user.hrEmployee && (
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                  onClick={() => history.push("/admin/offboardinghr")}
                >
                  HR Mode
                </button>
              )}
            </div>
          </div>
          <div className="py-4 px-6">
            <SelfTasklistTable
              taskListItems={taskListItems}
              setTaskListItems={setTaskListItems}
              refreshKeyHandler={() => setRefreshKey((oldKey) => oldKey + 1)}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
