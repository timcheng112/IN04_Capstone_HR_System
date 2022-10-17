import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import api from "../../utils/api";
import { getUserId } from "../../utils/Common";
import TrainingSidebar from "../../components/Sidebar/Training";
import AddModuleModal from "../../features/training/AddModuleModal";
import AllModuleGrid from "../../components/Grid/AllModule";

export default function AllTraining() {
  const [user, setUser] = useState(null);
  const [modules, setModules] = useState([]);
  const [filteredModules, setFilteredModules] = useState(modules);
  const [openCreate, setOpenCreate] = useState(false);
  const [error, setError] = useState(null);
  const [hrMode, setHrMode] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [searchParam] = useState(["title", "description"]);

  useEffect(() => {
    api
      .getAllModules()
      .then((response) => {
        setModules(response.data);
        setFilteredModules(response.data);
      })
      .catch((error) => setError(error));
    api.getUser(getUserId()).then((response) => {
      setUser(response.data);
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      api
      .getAllModules()
      .then((response) => {
        setModules(response.data);
        setFilteredModules(response.data);
      })
      .catch((error) => setError(error));
      console.log('lag')
    }, 5000);
    return () => clearTimeout(timer);
  }, [openCreate]);

  function search(e, items) {
    const value = e.target.value;
    setFilteredModules(
      items.filter((item) => {
        return searchParam.some((newItem) => {
          return (
            item[newItem]
              .toString()
              .toLowerCase()
              .indexOf(value.toLowerCase()) > -1
          );
        });
      })
    );
  }

  if (error) return `Error`;

  return (
    user && (
      <div>
        <Navbar />
        <div className="flex">
          <div className="flex-1">
            <TrainingSidebar
              currentPage={{
                name: "All Modules",
                href: "/training",
                current: true,
              }}
            />
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
            <p className="font-sans text-xl mb-3">All Modules</p>
            <div className="flex row justify-center">
              <input
                id="module-search"
                name="module-search"
                type="module-search"
                autoComplete="module-search"
                required
                className="block appearance-none w-1/3 rounded-md mr-3 mb-5 border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Name, Description"
                onChange={(e) => {
                  search(e, modules);
                }}
              />
            </div>
            <AllModuleGrid files={filteredModules} currentPage={"/training"} />
            <AddModuleModal
              open={openCreate}
              onClose={() => {
                setOpenCreate(false);
              }}
              refreshKeyHandler={() => setRefreshKey((oldKey) => oldKey + 1)}
            />
          </div>
        </main>
      </div>
    )
  );
}
