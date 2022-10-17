import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import api from "../../utils/api";
import { getUserId } from "../../utils/Common";
import { useHistory } from "react-router";
import ModuleSidebar from "../../components/Sidebar/Module";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

export default function AllVideos() {
  const [user, setUser] = useState(null);
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState(videos);
  const [error, setError] = useState(null);
  const history = useHistory();
  const moduleId = window.location.href.substring(29);
  const [searchParam] = useState(["title", "description"]);

  useEffect(() => {
    api.getUser(getUserId()).then((response) => setUser(response.data));
    api.getVideos().then((response) => {
      setVideos(response.data);
      setFilteredVideos(response.data);
    });
  }, []);

  function goToVideo(vId) {
    api.getModuleFromVideo(vId).then((response) => {
      console.log("vId " + vId);
      history.push(`/module/${response.data.moduleId}/video/${vId}`, {params: '/video'});
    });
  }

  function search(e, items) {
    const value = e.target.value;
    setFilteredVideos(
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
    videos &&
    user && (
      <div>
        <Navbar />
        <div className="flex">
          <div className="flex-1">
            <ModuleSidebar 
            currentPage={{
              name: 'All Videos',
              href: '/video',
              current: true
            }}
            previousPage={{
              name: 'All Videos',
              href: '/video',
              current: false
            }}
            />
          </div>
        </div>
        <main className="flex-1">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="font-sans text-xl mt-5 font-semibold text-gray-900">
                  All Videos
                </h1>
                <p className="font-sans mb-2">{videos.length} video(s)</p>
                <div className="flex row justify-center">
                  <input
                    id="video-search"
                    name="video-search"
                    type="video-search"
                    autoComplete="video-search"
                    required
                    className="block appearance-none w-1/3 rounded-md mr-3 border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Name, Description"
                    onChange={(e) => {
                      search(e, videos);
                    }}
                  />
                </div>
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
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Viewed by
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
                        {filteredVideos.map((video) => (
                          <tr key={video.videoId}>
                            <td className="whitespace-nowrap text-left py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {video.title}
                            </td>
                            <td className="whitespace-nowrap text-left  px-3 py-4 text-sm text-gray-500">
                              {video.description}
                            </td>
                            <td className="whitespace-nowrap text-left  px-3 py-4 text-sm text-gray-500">
                              {video.watchedBy.length} employees
                            </td>
                            <td className="relative whitespace-nowrap text-left py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <button
                                type="button"
                                className="inline-flex items-center rounded-full border border-transparent p-2 text-gray-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                onClick={() => goToVideo(video.videoId)}
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
