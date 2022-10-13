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
import AddVideoModal from "../../features/training/AddVideoModal";
import VideoSidebar from "../../components/Sidebar/Video";
import ReactPlayer from "react-player";

export default function Video() {
  const [user, setUser] = useState(null);
  const [videos, setVideos] = useState([]);
  const [module, setModule] = useState(null);
  const [video, setVideo] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();
  const [refreshKey, setRefreshKey] = useState(0);
  const [openAdd, setOpenAdd] = useState(false);
  const [hrMode, setHrMode] = useState(false);
  const moduleId = window.location.href.substring(29, 30);
  const videoId = window.location.href.substring(37);

  useEffect(() => {
    api
      .getVideosInModule(moduleId)
      .then((response) => setVideos(response.data));
    api.getModule(moduleId).then((response) => {
      setModule(response.data);
      setEmployees(response.data.employees);
    });
    api.getVideo(videoId).then((response) => setVideo(response.data));
    api.getUser(getUserId()).then((response) => setUser(response.data));
  }, []);

  function deleteVideo() {}

  if (error) return `Error`;

  return (
    module &&
    video &&
    videos &&
    user && (
      <div>
        <Navbar />
        <div className="flex">
          <div className="flex-1">
            <VideoSidebar
              modulePageTitle={module.title}
              moduleId={moduleId}
              pageTitle={video.title}
              videoId={video.videoId}
            />
          </div>
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
                      Non-HR Mode
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <div className="flex grid justify-items-center">
                    <ReactPlayer
                      controls
                      url={video.video}
                      onEnded={() =>
                        console.log(
                          "To updated watched attribute with logged in user"
                        )
                      }
                    />
                  </div>
                  <h1 className="mt-3 text-xl font-semibold text-gray-900">
                    {video.title}
                  </h1>
                  <p className="mt-2 text-sm text-gray-700">
                    {video.description}
                  </p>
                  {hrMode && (
                    <div className="pt-3">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md mr-1 border border-transparent bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:w-auto"
                        onClick={() => setOpenEdit(true)}
                      >
                        <PencilIcon className="-ml-1 mr-2 h-5 w-5 text-white" />
                        Edit Video
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:w-auto"
                        onClick={() => setOpenDelete(true)}
                      >
                        <TrashIcon className="-ml-1 mr-2 h-5 w-5 text-white" />
                        Delete Video
                      </button>
                      <ConfirmDialog
                        title="module"
                        item="module"
                        open={openDelete}
                        onClose={() => setOpenDelete(false)}
                        setOpen={() => setOpenDelete(false)}
                        onConfirm={deleteVideo}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-row justify-center">
                {/* <div className="mt-8 sm:mt-0 sm:ml-16 sm:flex-none">
                  <button
                    type="button"
                    className="inline-flex mt-7 mr-7 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                    onClick={() => setOpenAdd(true)}
                  >
                    <PlusCircleIcon className="-ml-1 mr-1 h-5 w-5 text-white" />
                    Add Video
                  </button>
                  <AddVideoModal
                    open={openAdd}
                    onClose={() => setOpenAdd(false)}
                    module={module}
                    refreshKeyHandler={() =>
                      setRefreshKey((oldKey) => oldKey + 1)
                    }
                  />
                </div> */}
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
                            {videos.map((video) => (
                              <tr key={video.videoId}>
                                <td className="whitespace-nowrap py-4 pl-6 pr-1 text-sm font-medium text-gray-900 text-left">
                                  {video.title}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left">
                                  {video.description}
                                </td>
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                  {video.videoId + "" !== videoId + "" && (
                                    <button
                                      onClick={() => {
                                        history.push(
                                          `/module/${moduleId}/video/${video.videoId}`
                                        );
                                        window.location.reload();
                                      }}
                                      className="text-indigo-600 hover:text-indigo-900"
                                    >
                                      View
                                    </button>
                                  )}
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
                                Watched
                              </th>
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
                        Watched by
                      </h1>
                      {/* <p>Including employees video is assigned to</p> */}
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
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
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
