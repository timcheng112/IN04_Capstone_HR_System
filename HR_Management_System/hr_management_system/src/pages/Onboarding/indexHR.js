import { useState, useEffect } from "react";
import TasklistTable from "../../features/onboarding/TasklistTable";
import AddCategoryModal from "../../features/onboarding/AddCategoryModal";
import Navbar from "../../components/Navbar";
import AdminSidebar from "../../components/Sidebar/Admin";
import api from "../../utils/api";
import { getUserId } from "../../utils/Common";
import { useHistory } from "react-router";
import Tab from "../../features/jobrequest/Tab";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const tabs = [
  { name: "Tasks", href: "#", current: true },
  {
    name: "Template Checklists",
    href: "/admin/onboardingtemplatechecklists",
    current: false,
  },
];

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
        console.log(categories);
        setCategories(response.data);
      })
      .catch((error) => setError(error));
  }, [refreshKey]);

  if (error) return `Error`;

  return (
    <div>
      <Navbar />
      {/* <div className="relative bg-green-800">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
            alt=""
          />
          <div
            className="absolute inset-0 bg-green-800 mix-blend-multiply"
            aria-hidden="true"
          />
        </div>
        <div className="relative mx-auto max-w-7xl py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Onboarding
          </h1>
        </div>
      </div> */}
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
        <div className="py-5" />
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Onboarding</h1>
        </div>
        <div className="py-4 px-6">
          <div className="sm:flex sm:items-center space-x-4">
            <div className="sm:flex-auto">
              <Tab tabs={tabs} />
            </div>
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
