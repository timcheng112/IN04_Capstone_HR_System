import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import api from "../../utils/api";
import { getUserId } from "../../utils/Common";
import { useHistory } from "react-router";
import ModuleSidebar from "../../components/Sidebar/Module";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

const people = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
];

export default function AllVideos() {
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
  const [openAdd, setOpenAdd] = useState(false);
  const [hrMode, setHrMode] = useState(false);
  const moduleId = window.location.href.substring(29);

  useEffect(() => {
    api.getUser(getUserId()).then((response) => setUser(response.data));
    api.getVideos().then((response) => setVideos(response.data));
  }, []);

  if (error) return `Error`;

  return (
    videos &&
    user && (
      <div>
        <Navbar />
        <div className="flex">
          <div className="flex-1">
            <ModuleSidebar pageTitle="Videos" moduleId={moduleId} />
          </div>
        </div>
        <main className="flex-1">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-xl mt-5 font-semibold text-gray-900">
                  All Videos
                </h1>
                <p>{videos.length} videos</p>
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
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Module
                          </th>
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
                            <td className="whitespace-nowrap text-left px-3 py-4 text-sm text-gray-500">
                              {}
                            </td>
                            <td className="whitespace-nowrap text-left py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {video.title}
                            </td>
                            <td className="whitespace-nowrap text-left  px-3 py-4 text-sm text-gray-500">
                              {video.description}
                            </td>
                            <td className="relative whitespace-nowrap text-left py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <button
                                type="button"
                                className="inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                onClick={() => history.push(``)}
                              >
                                <ChevronRightIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </button>
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
        </main>
      </div>
    )
  );
}
