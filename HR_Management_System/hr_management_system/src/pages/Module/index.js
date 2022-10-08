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
import ModuleBreadcrumb from "../../components/Breadcrumb/ModuleBreadcrumb";
import ModuleSidebar from "../../components/Sidebar/Module";

const people = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  // More people...
];

export default function Module() {
  const [user, setUser] = useState(null);
  const [videos, setVideos] = useState([]);
  const [module, setModule] = useState(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();
  const [refreshKey, setRefreshKey] = useState(0);
  const moduleId = window.location.href.substring(47);

  useEffect(() => {
    console.log("moduleId = " + moduleId);
    api.getUser(getUserId()).then((response) => setUser(response.data));
    api.getModule(moduleId).then((response) => setModule(response.data));
    // api
    //   .getAllModules()
    //   .then((response) => {
    //     setModules(response.data);
    //   })
    //   .catch((error) => setError(error));
  }, []);

  useEffect(() => {
    // api
    //   .getAllModules()
    //   .then((response) => {
    //     setModules(response.data);
    //   })
    //   .catch((error) => setError(error));
  });

  // useEffect(() => {
  //   api
  //     .getAllModules()
  //     .then((response) => {
  //       setModules(response.data);
  //     })
  //     .catch((error) => setError(error));
  // }, [modules]);

  if (error) return `Error`;

  return (
    module && (
      <div>
        <Navbar />
        <div className="flex">
          <div className="flex-1">
            <ModuleSidebar pageTitle={module.title} moduleId={moduleId} />
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
                    {/* replace history.push url to redirect to view a module */}
                    Non-HR Mode
                  </button>
                )}
              </div>
            </div>
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-xl font-semibold text-gray-900">Videos</h1>
                  <p className="mt-2 text-md text-gray-700">
                    {module.title}
                  </p>
                  <p className="mt-2 text-sm text-gray-700">
                    {module.description}
                  </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                  >
                    Add Video
                  </button>
                </div>
              </div>
              <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                            >
                              Name
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Title
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Email
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Role
                            </th>
                            <th
                              scope="col"
                              className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                            >
                              <span className="sr-only">Edit</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {people.map((person) => (
                            <tr key={person.email}>
                              <td className="whitespace-nowrap py-4 pl-6 pr-1 text-sm font-medium text-gray-900 text-left">
                                {person.name}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left">
                                {person.title}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left">
                                {person.email}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left">
                                {person.role}
                              </td>
                              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                <a
                                  href="#"
                                  className="text-indigo-600 hover:text-indigo-900"
                                >
                                  View
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
