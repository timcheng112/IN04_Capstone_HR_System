import { PlusCircleIcon, TrashIcon } from "@heroicons/react/20/solid";
import Navbar from "../../components/Navbar";
import { useState, useEffect } from "react";

import api from "../../utils/api";
import { getUserId } from "../../utils/Common.js";
import { useHistory } from "react-router";
import Moment from "react-moment";

export default function Notifications() {
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState([]);
  const [read, setRead] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    api.getUser(getUserId()).then((response) => {
      console.log(response.data);
      setUser(response.data);
    });
}, []);

  useEffect(() => {
    api
      .getUserUnreadNotifications(getUserId())
      .then((response) => setUnread(response.data));

    api
      .getUserReadNotifications(getUserId())
      .then((response) => setRead(response.data));

    // api
    //   .getAllNotificationsForUser(getUserId())
    //   .then((response) => {
    //     // console.log(response.data);
    //     setNotifications(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     alert("Unable to get all notifications right now");
    //   });
  }, []);

  useEffect(() => {
    api
      .getUserUnreadNotifications(getUserId())
      .then((response) => setUnread(response.data));

    api
      .getUserReadNotifications(getUserId())
      .then((response) => setRead(response.data));
  }, [refresh]);

  const deleteANotification = (notificationId) => {
    // evt.preventDefault();
    // console.log(userInfo.authorities);
    const boo = window.confirm(
      "Are you sure you want to delete this notification?"
    );

    if (boo) {
      api
        .deleteANotification(notificationId, getUserId())
        .then((response) => {
          console.log(response.data);
          //   setNotification(response.data);
          //   history.push("/AllNotifications");
          setRefresh(refresh + 1);
        })
        .then(() => {
          console.log("are you here");
          // history.push("/home");
        })
        .catch((error) => {
          console.log(error);
          alert("Unable to delete your notification right now");
        });
    }
  };

  const deleteAllNotifications = (notificationId) => {
    // evt.preventDefault();
    // console.log(userInfo.authorities);
    const boo = window.confirm(
      "Are you sure you want to delete all notifications?"
    );

    if (boo) {
      api
        .deleteAllNotifications(getUserId())
        .then((response) => {
          console.log(response.data);
          //   setNotification(response.data);
        })
        .then(() => {
          console.log("are you here");
          setRefresh(refresh + 1);
          window.location.reload();
          //   history.push("/AllNotifications");
        })
        .catch((error) => {
          console.log(error);
          alert("Unable to delete your notification right now");
        });
    }
  };

  function markAsRead(notificationId) {
    console.log("to read");
    api.markNotificationAsRead(notificationId, getUserId()).then((response) => {
      window.location.reload();
      setRefresh(refresh + 1);
      console.log("set refresh");
      
    });
  }

  function time(datetime) {
    let dt = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }).format(datetime);
    return dt;
  }

  return (
    read &&
    unread && user && (
      <>
        <Navbar />
        <div className="relative bg-indigo-800">
          <div className="absolute inset-0">
            <img
              className="h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&&sat=-100"
              alt=""
            />
            <div
              className="absolute inset-0 bg-indigo-800 mix-blend-multiply"
              aria-hidden="true"
            />
          </div>
          <div className="relative mx-auto max-w-7xl py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              All Notifications
            </h1>
          </div>
        </div>

        {/* start of lists */}
        <ul role="list" className="p-40">
          {(user.notificationsRead).length > 0 ? <button
            type="button"
            className="inline-flex items-left rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 m-4"
            onClick={() => {
              deleteAllNotifications();
            }}
          >
            <TrashIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
            Delete All
          </button> : ""}

          <div>
          {user.userRole === "ADMINISTRATOR" ?
          <button
            type="button"
            className="inline-flex items-left rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 m-4"
            onClick={() => history.push("/AddNotification")}
          >
            <PlusCircleIcon
              className="-ml-0.5 mr-2 h-4 w-8"
              aria-hidden="true"
            />
            Add Notifications
          </button> 
          : ""} </div>

          {unread.map((message) => (
            <div
              className="flex flex-row mb-5 items-center"
              key={message.notificationId}
            >
              <button
                type="button"
                className="inline-flex items-left rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 m-4"
                onClick={() => {
                  // console.log("clicked");
                  console.log(message.notificationId);
                  deleteANotification(message.notificationId);
                }}
              >
                <TrashIcon
                  className="-ml-0.5 mr-2 h-4 w-4"
                  aria-hidden="true"
                />
                Delete
              </button>
              <button
                className="basis-7/8 w-full"
                onClick={() => {
                  markAsRead(message.notificationId);
                }}
              >
                <li className="relative bg-white py-5 px-4 w-full focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 hover:bg-gray-50 border-4 border-r-indigo-600 border-y-white border-l-white rounded-lg">
                  <div className="flex justify-between space-x-3">
                    <div className="min-w-0 flex-1 ">
                      <span className="" aria-hidden="true" />
                      <p className="truncate text-lg text-indigo-600 font-bold">
                        {message.title}
                      </p>
                      <p className="mt-5 text-md text-gray-600 line-clamp-1">
                        {message.description}
                      </p>
                    </div>
                    <Moment
                      parse="YYYY-MM-DD HH:mm"
                      className=" text-sm text-gray-500"
                      locale="Asia/Singapore"
                      format="DD/MM/YYYY H:mm"
                    >
                      {message.notifTime}
                    </Moment>
                   
                  </div>
                </li>
              </button>
            </div>
          ))}

          {read.length === 0 && unread.length === 0 ? "You have no notifications" : read.map((message) => (
            <><li
              key={message.notificationId}
              className="relative bg-white py-5 px-4 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 "
            >
              <div className="flex justify-between space-x-3">
                <button
                  type="button"
                  className="inline-flex items-left rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 m-4"
                  onClick={() => {
                    // console.log("clicked");
                    console.log(message.notificationId);
                    deleteANotification(message.notificationId);
                  }}
                >
                  <TrashIcon
                    className="-ml-0.5 mr-2 h-4 w-4"
                    aria-hidden="true"
                  />
                  Delete
                </button>
                <div className="min-w-0 flex-1">
                  <span className="" aria-hidden="true" />

                  <p className="truncate text-sm text-black-1500 font-bold">
                    {message.title}
                  </p>
                  <p className="mt-5 text-sm text-gray-600 line-clamp-1">
                    {message.description}
                  </p>
                </div>
                <Moment
                  parse="YYYY-MM-DD HH:mm"
                  className=" text-sm text-gray-500"
                  locale="Asia/Singapore"
                  format="DD/MM/YYYY H:mm"
                >
                  {message.notifTime}
                </Moment>

                
              </div>
              <div className="mt-1"></div>
            </li> </>
          ))}
        </ul>
      </>
    )
  );
}
