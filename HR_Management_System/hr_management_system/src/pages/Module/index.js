import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import api from "../../utils/api";
import { getUserId } from "../../utils/Common";
import { useHistory } from "react-router";
import AddModuleModal from "../../features/training/AddModuleModal";
import ModuleSidebar from "../../components/Sidebar/Module";
import {
  PencilIcon,
  PlusCircleIcon,
  TrashIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import ConfirmDialog from "../../components/ConfirmDialog";
import EditModuleModal from "../../features/training/EditModuleModal";

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
  const [employees, setEmployees] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();
  const [refreshKey, setRefreshKey] = useState(0);
  const moduleId = window.location.href.substring(47);

  useEffect(() => {
    console.log("moduleId = " + moduleId);
    api.getUser(getUserId()).then((response) => setUser(response.data));
    api.getModule(moduleId).then((response) => {
      setModule(response.data);
      setEmployees(response.data.employees);
    });
  }, []);

  useEffect(() => {
    api.getModule(moduleId).then((response) => {
      setModule(response.data);
      //setEmployees(response.data.employees);
    });
  }, [openEdit]);

  function deleteModule() {
    if (module.employees.length !== 0) {
      alert(
        "There are " +
          module.employees.length +
          " employees assigned to this module. Unassign them before deleting."
      );
    } else if (module.videoList.length !== 0) {
      alert(
        "There are " +
          module.videoList.length +
          " videos in this module. Delete the videos first."
      );
    } else {
      api
        .deleteModule(moduleId)
        .then(() => {
          alert("Module successfully deleted");
          history.goBack();
        })
        .catch((error) => setError(error));
    }
  }

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
                  <div className="flex grid justify-items-center">
                    <img
                      src={module.thumbnail}
                      alt=""
                      className="pointer-events-none h-25 w-15 object-contain w-1/6"
                    />
                  </div>
                  <h1 className="mt-3 text-xl font-semibold text-gray-900">
                    {module.title}
                  </h1>
                  <p className="mt-2 text-md text-gray-700">
                    {module.videoList.length} videos
                  </p>
                  <p className="mt-2 text-sm text-gray-700">
                    {module.description}
                  </p>
                  <div className="pt-3">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-md mr-1 border border-transparent bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:w-auto"
                      onClick={() => setOpenEdit(true)}
                    >
                      <PencilIcon className="-ml-1 mr-2 h-5 w-5 text-white" />
                      Edit Module
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-md border border-transparent bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:w-auto"
                      onClick={() => setOpenDelete(true)}
                    >
                      <TrashIcon className="-ml-1 mr-2 h-5 w-5 text-white" />
                      Delete Module
                    </button>
                    <ConfirmDialog
                      title="module"
                      item="module"
                      open={openDelete}
                      onClose={() => setOpenDelete(false)}
                      setOpen={() => setOpenDelete(false)}
                      onConfirm={deleteModule}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-center">
                <div className="mt-8 sm:mt-0 sm:ml-16 sm:flex-none">
                  <button
                    type="button"
                    className="inline-flex mt-7 mr-7 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                  >
                    <PlusCircleIcon className="-ml-1 mr-1 h-5 w-5 text-white" />
                    Add Video
                  </button>
                </div>
                <div className="mt-8 flex">
                  <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                      <h1 className="text-xl font-semibold text-gray-900">
                        Videos
                      </h1>
                      <div className="mt-5 overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                              >
                                Title
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                Description
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
                <div className="mt-8 ml-5 flex">
                  <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                      <h1 className="text-xl font-semibold text-gray-900">
                        Assigned to
                      </h1>
                      <div className="mt-5 overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
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
                                Work Email
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                Role
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                Progress
                              </th>
                              {/* <th
                                scope="col"
                                className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                              >
                                <span className="sr-only">Edit</span>
                              </th> */}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            {employees.map((employee) => (
                              <tr key={employee.email}>
                                <td className="whitespace-nowrap py-4 pl-6 pr-1 text-sm font-medium text-gray-900 text-left">
                                  {employee.firstName} {employee.lastName}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left">
                                  {employee.workEmail}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left">
                                  {employee.userRole}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left">
                                  {employee.email}
                                </td>
                                {/* <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                  <a
                                    href="#"
                                    className="text-indigo-600 hover:text-indigo-900"
                                  >
                                    View
                                  </a>
                                </td> */}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-8 sm:flex-none">
                  <button
                    type="button"
                    className="inline-flex mt-8 items-center justify-center rounded-md border border-transparent bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:w-auto"
                  >
                    <UserPlusIcon className="-ml-1 mr-1 h-5 w-5 text-white" />
                    Assign Module
                  </button>
                </div>
              </div>
            </div>

            <AddModuleModal
              open={openCreate}
              onClose={() => setOpenCreate(false)}
              refreshKeyHandler={() => setRefreshKey((oldKey) => oldKey + 1)}
            />
            <EditModuleModal
              open={openEdit}
              onClose={() => setOpenEdit(false)}
              module={module}
              refreshKeyHandler={refreshKey}
            />
          </div>
        </main>
      </div>
    )
  );
}
