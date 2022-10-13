import { useState, useEffect } from "react";
import TasklistTable from "../../features/onboarding/TasklistTable";
import AddCategoryModal from "../../features/offboarding/AddCategoryModal";
import Navbar from "../../components/Navbar";
import AdminSidebar from "../../components/Sidebar/Admin";
import api from "../../utils/api";
import { getUserId } from "../../utils/Common";
import { useHistory } from "react-router";
import TrainingSidebar from "../../components/Sidebar/Training";
import AddModuleModal from "../../features/training/AddModuleModal";
import ModuleGrid from "../../components/Grid/Module";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AllTraining() {
  const [user, setUser] = useState(null);
  const [modules, setModules] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [error, setError] = useState(null);
  const [hrMode, setHrMode] = useState(false);
  const history = useHistory();
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    api
      .getAllModules()
      .then((response) => {
        setModules(response.data);
      })
      .catch((error) => setError(error));
    api.getUser(getUserId()).then((response) => {
      setUser(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .getAllModules()
      .then((response) => {
        setModules(response.data);
      })
      .catch((error) => setError(error));
  }, [openCreate]);

  if (error) return `Error`;

  return (
    user && (
      <div>
        <Navbar />
        <div className="flex">
          <div className="flex-1">
            <TrainingSidebar pageTitle="Training" />
          </div>
          {hrMode && (
            <div className="flex items-center">
              <div className="mt-4 ml-auto mr-6">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                  onClick={() => setOpenCreate(true)}
                >
                  New Module
                </button>
              </div>
            </div>
          )}
        </div>
        <main className="flex-1">
          <div className="py-4 px-6">
            <div className="flex items-center">
              {user.hrEmployee && (
                <div className="mt-4 ml-auto mr-6">
                  {hrMode ? (
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                      onClick={() => setHrMode(false)}
                    >
                      Non-HR Mode
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                      onClick={() => setHrMode(true)}
                    >
                      HR Mode
                    </button>
                  )}
                </div>
              )}
            </div>
            <p className="text-xl mb-5">All Modules</p>
            <ModuleGrid files={modules} />
            <AddModuleModal
              open={openCreate}
              onClose={() => setOpenCreate(false)}
              refreshKeyHandler={() => setRefreshKey((oldKey) => oldKey + 1)}
            />
          </div>
        </main>
      </div>
    )
  );
}
