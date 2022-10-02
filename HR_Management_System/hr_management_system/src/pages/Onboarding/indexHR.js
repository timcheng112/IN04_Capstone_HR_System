import { useState, useEffect } from "react";
import TasklistTable from "../../features/Onboarding/TasklistTable";
import AddCategoryModal from "../../features/Onboarding/AddCategoryModal";
import Navbar from "../../components/Navbar";
import AdminSidebar from "../../components/Sidebar/Admin";
import api from "../../utils/api";
import { getUserId } from "../../utils/Common";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function OnboardingHR() {
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [error, setError] = useState(null);
  //const [tasks, setTasks] = useState(null)

  // useEffect(() => {
  //   const userId = getUserId();
  //   console.log("USERID: " + userId);
  //   api
  //     .getUser(userId)
  //     .then((response) => {
  //       console.log("RESPONSE DATA: " + response.data);
  //       setUser(response.data);
  //     })
  //     .catch((error) => setError(error));
  //   console.log("User: " + user);
  // }, []);

  useEffect(() => {
    api
      .getCategories()
      .then((response) => {
        console.log(response.data);
        setCategories(response.data);
      })
      .catch((error) => setError(error));
  }, []);

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
          <TasklistTable
            categories={categories}
            setCategories={setCategories}
          />
          <AddCategoryModal
            open={openCreate}
            onClose={() => setOpenCreate(false)}
          />
        </div>
      </main>
    </div>
  );
}
