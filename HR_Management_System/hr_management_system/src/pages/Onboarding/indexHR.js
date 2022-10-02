import { useState, useEffect } from "react";
import TasklistTable from "../../features/onboarding/TasklistTable";
import AddCategoryModal from "../../features/onboarding/AddCategoryModal";
import Navbar from "../../components/Navbar";
import AdminSidebar from "../../components/Sidebar/Admin";
import api from "../../utils/api";
import { getUserId } from "../../utils/Common";
import { useHistory } from "react-router";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function OnboardingHR() {
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();
  const [refreshKey, setRefreshKey] = useState(0);
  //const [tasks, setTasks] = useState(null)

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
      .getCategories()
      .then((response) => {
        // console.log(response.data);
        setCategories(response.data);
      })
      .catch((error) => setError(error));
  }, [refreshKey]);

  if (error) return `Error`;

  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className="flex-1">
          <AdminSidebar pageTitle="Onboarding (HR)" />
        </div>
        <div className="flex items-center">
          <div className="mt-4 ml-auto mr-6">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              onClick={() => setOpenCreate(true)}
            >
              New Category
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
          <TasklistTable
            categories={categories}
            setCategories={setCategories}
            refreshKeyHandler={() => setRefreshKey((oldKey) => oldKey + 1)}
          />
          <AddCategoryModal
            open={openCreate}
            onClose={() => setOpenCreate(false)}
            refreshKeyHandler={() => setRefreshKey((oldKey) => oldKey + 1)}
          />
        </div>
      </main>
    </div>
  );
}
