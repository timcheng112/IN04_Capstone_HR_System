import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import AdminSidebar from "../../components/Sidebar/Admin";
import AddCategoryModal from "../../features/offboarding/AddCategoryModal";
import TasklistTable from "../../features/offboarding/TaskListTable";
import api from "../../utils/api";
import { getUserId } from "../../utils/Common";

function OffboardingHr() {
  const [openCreate, setOpenCreate] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
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
          <AdminSidebar pageTitle="Offboarding (HR)" />
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
          <TasklistTable isHr={true} categories={categories} />
          <AddCategoryModal
            open={openCreate}
            onClose={() => setOpenCreate(false)}
            // category={category}
            // setCategory={setCategory}
          />
        </div>
      </main>
    </div>
  );
}

export default OffboardingHr;
