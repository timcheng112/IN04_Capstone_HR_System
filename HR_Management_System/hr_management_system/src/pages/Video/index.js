import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import api from "../../utils/api";
import { getUserId } from "../../utils/Common";
import { useHistory, useLocation } from "react-router";
import {
  CheckCircleIcon,
  InformationCircleIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import ConfirmDialog from "../../components/ConfirmDialog";
import VideoSidebar from "../../components/Sidebar/Video";
import ReactPlayer from "react-player";
import EditVideoModal from "../../features/training/EditVideoModal";

export default function Video() {
  const [user, setUser] = useState(null);
  const [videos, setVideos] = useState([]);
  const [module, setModule] = useState(null);
  const [video, setVideo] = useState(null);
  const [watchedBy, setWatchedBy] = useState([]);
  const [assignedTo, setAssignedTo] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();
  const [refreshKey, setRefreshKey] = useState(0);
  const [hrMode, setHrMode] = useState(false);
  const [videoSession, setVideoSession] = useState("");
  const [showInfo, setShowInfo] = useState(true);
  const [watched, setWatched] = useState(false);
  const moduleId = window.location.href.substring(29, 30);
  const videoId = window.location.href.substring(37);
  var videoLength = 0;
  const location = useLocation();
  const initialPage = location.state === undefined ? "" : location.state.params;
  var initialPageName = "";
  if (initialPage === "/mytraining") {
    initialPageName = "My Training";
  } else if (initialPage === "/training") {
    initialPageName = "All Modules";
  } else if (initialPage === "/video") {
    initialPageName = "All Videos";
  } else if (initialPage === "/mytraining/completed") {
    initialPageName = "Completed Training";
  }
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    api
      .getVideosInModule(moduleId)
      .then((response) => setVideos(response.data));
    api.getModule(moduleId).then((response) => {
      setModule(response.data);
    });
    api.getVideo(videoId).then((response) => {
      setVideo(response.data);
      setWatchedBy(response.data.watchedBy);
    });
    api.getUser(getUserId()).then((response) => setUser(response.data));
    setVideoSession(`secondsWatched${videoId}`);
    api
      .getEmployeesAssignedToModule(moduleId)
      .then((response) => {
        setAllWatched(response.data);
        console.log(response.data);
      })
      .then(() => {
        console.log(assignedTo);
      });
    api
      .getIsVideoWatchedByEmployee(videoId, getUserId())
      .then((response) => setWatched(response.data));
    api
      .getIsUserAssignedToModule(moduleId, getUserId())
      .then((response) => setShowDelete(!response.data));
  }, []);

  useEffect(() => {
    console.log("vid " + videoId);
    api
      .getVideosInModule(moduleId)
      .then((response) => setVideos(response.data));
    api.getModule(moduleId).then((response) => {
      setModule(response.data);
    });
    api.getVideo(videoId).then((response) => {
      setVideo(response.data);
      setWatchedBy(response.data.watchedBy);
    });
    api.getUser(getUserId()).then((response) => setUser(response.data));
    setVideoSession(`secondsWatched${videoId}`);
    api
      .getEmployeesAssignedToModule(moduleId)
      .then((response) => {
        setAllWatched(response.data);
        console.log(response.data);
      })
      .then(() => console.log(assignedTo));
    api
      .getIsVideoWatchedByEmployee(videoId, getUserId())
      .then((response) => setWatched(response.data));
  }, [videoId]);

  useEffect(() => {
    console.log("watch");
    const timer = setTimeout(() => {
      api.getVideo(videoId).then((response) => {
        setVideo(response.data);
        setWatchedBy(response.data.watchedBy);
      });
      api.getVideosInModule(moduleId).then((response) => {
        setVideos(response.data);
      });
    }, 3000);
    return () => clearTimeout(timer);
  }, [videos, video]);

  useEffect(() => {
    const timer = setTimeout(() => {
      api
        .getIsVideoWatchedByEmployee(videoId, getUserId())
        .then((response) => setWatched(response.data));
    }, 3000);
    return () => clearTimeout(timer);
  }, [watchedBy, videoId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      api
        .getEmployeesAssignedToModule(moduleId)
        .then((response) => {
          setAllWatched(response.data);
          console.log(response.data);
        })
        .then(() => console.log(assignedTo));
    }, 1500);
    return () => clearTimeout(timer);
  }, [watched, videoId]);

  function deleteVideo() {
    api.deleteVideo(videoId).then(() => {
      alert("Video successfully deleted");
      history.goBack();
    });
  }

  function markAsWatched() {
    api.markVideoAsWatched(videoId, getUserId()).then((response) => {
      api.getVideo(videoId).then((response) => setVideo(response.data));
    });
  }

  function setAllWatched(assigned) {
    assigned.forEach((e) => {
      api
        .getIsVideoWatchedByEmployee(videoId, e.userId)
        .then((response) => (e.watched = response.data));
    });
    setAssignedTo(assigned);
  }

  const findStatusHandler = (user) => {
    return user.watched;
  };

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
              initialPage={{
                name: initialPageName,
                href: initialPage,
                current: false,
              }}
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
                      HR Mode
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className="px-4 sm:px-6 lg:px-8">
              {showInfo && (
                <div
                  type="button"
                  className="mb-5 inline-flex items-center rounded-md border border-transparent bg-blue-50 px-4 py-2 text-base font-medium text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <InformationCircleIcon
                    className="h-5 w-5 mr-2 text-blue-400"
                    aria-hidden="true"
                  />
                  Please do not close the browser while watching. Your progress
                  will be lost!
                  <div className="-mx-1.5 -my-1.5 ml-3">
                    <button
                      type="button"
                      className="inline-flex rounded-md bg-blue-50 p-1.5 text-blue-500 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-blue-50"
                      onClick={() => setShowInfo(false)}
                    >
                      <span className="sr-only">Dismiss</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              )}
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <div className="flex grid justify-items-center">
                    <ReactPlayer
                      controls
                      url={video.video}
                      onStart={() => {
                        sessionStorage.setItem(videoSession, 1);
                      }}
                      onProgress={(progress) => {
                        if (
                          progress.played ===
                          progress.playedSeconds / progress.loadedSeconds
                        ) {
                          videoLength =
                            progress.played * progress.loadedSeconds;
                        }
                        var seconds =
                          parseInt(sessionStorage.getItem(videoSession)) + 1;
                        sessionStorage.setItem(videoSession, seconds);
                        //console.log(sessionStorage.getItem(videoSession))
                      }}
                      onEnded={() => {
                        if (
                          videoLength > 0 &&
                          sessionStorage.getItem(videoSession) > videoLength &&
                          !watched
                        ) {
                          //console.log("You have completed watching this video");
                          markAsWatched();
                          console.log(videoLength);
                        }
                      }}
                    />
                  </div>
                  <h1 className="mt-3 text-xl font-semibold text-gray-900">
                    {video.title}
                  </h1>
                  <p className="mt-2 text-sm text-gray-700">
                    {video.description}
                  </p>
                  {watched && (
                    <div className="mt-3 mb-2 inline-flex items-center rounded-md border border-transparent bg-green-50 px-10 py-3 text-sm font-medium leading-4 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <CheckCircleIcon
                        className="h-5 w-5 mr-2 text-green-400"
                        aria-hidden="true"
                      />
                      Watched
                    </div>
                  )}
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
                      {showDelete && (
                        <>
                          <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:w-auto"
                            onClick={() => setOpenDelete(true)}
                          >
                            <TrashIcon className="-ml-1 mr-2 h-5 w-5 text-white" />
                            Delete Video
                          </button>
                          <ConfirmDialog
                            title={video.title}
                            item="video"
                            open={openDelete}
                            onClose={() => setOpenDelete(false)}
                            setOpen={() => setOpenDelete(false)}
                            onConfirm={deleteVideo}
                          />
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-row justify-center">
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
                                        console.log("push " + initialPage);
                                        history.push(
                                          `/module/${moduleId}/video/${video.videoId}`,
                                          { params: initialPage }
                                        );
                                        //window.location.reload();
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
                {hrMode && (
                  <>
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
                                {assignedTo.map((employee) => (
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
                                      {!findStatusHandler(employee) ? (
                                        <span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
                                          Not Watched
                                        </span>
                                      ) : (
                                        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                          Watched
                                        </span>
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
                                {watchedBy.map((employee) => (
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
                  </>
                )}
              </div>
            </div>
            <EditVideoModal
              open={openEdit}
              onClose={() => setOpenEdit(false)}
              video={video}
              refreshKeyHandler={refreshKey}
            />
          </div>
        </main>
      </div>
    )
  );
}
