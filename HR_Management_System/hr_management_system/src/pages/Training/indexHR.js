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

export default function TrainingHR() {
  const [user, setUser] = useState(null);
  const [modules, setModules] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    api
      .getAllModules()
      .then((response) => {
        setModules(response.data);
      })
      .catch((error) => setError(error));
  }, []);

  useEffect(() => {
    api
      .getAllModules()
      .then((response) => {
        setModules(response.data);
      })
      .catch((error) => setError(error));
  }, [modules]);

  if (error) return `Error`;

  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className="flex-1">
          <TrainingSidebar pageTitle="Training (HR)" />
        </div>
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
      </div>
      <main className="flex-1">
        <div className="py-4 px-6">
          <div className="flex items-center">
            <div className="mt-4 ml-auto mr-6">
              {user !== null && user.hrEmployee && (
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                  onClick={() => history.push("/admin/onboarding")}
                >
                  Non-HR Mode
                </button>
              )}
            </div>
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
  );
}
