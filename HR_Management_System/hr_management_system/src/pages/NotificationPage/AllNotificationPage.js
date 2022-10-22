import { EnvelopeIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/20/solid";
import Navbar from "../../components/Navbar";
import { useLayoutEffect, useRef, useState, useEffect } from "react";

import api from "../../utils/api";
import { deleteUser, getUserId } from "../../utils/Common.js";
// import { getUserId } from "../../Common";
import { useHistory } from "react-router";
import Notification from "../../components/Notification";

export default function Example() {
  // const [userId, setUser] = useState("");
  // setUser(getUserId());
  const userId = getUserId();
  //   console.log(userId);
  const history = useHistory();

  const [notification, setNotification] = useState([]);
  let [userInfo, setUserInfo] = useState([]);
//   const history = useHistory();

  useEffect(() => {
    // console.log(userId)
    api
      .getAllNotificationsForUser(getUserId())
      .then((response) => {
        // console.log(response.data);
        setNotification(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Unable to get all notifications right now");
      });
  }, []);

  const deleteANotification = ( notificationId ) => {
    // evt.preventDefault();
    // console.log(userInfo.authorities);
    const boo = window.confirm(
      "Are you sure you want to delete this notification?"
    );

    if(boo){
      api
        .deleteANotification(notificationId, getUserId())
        .then((response) => {
          console.log(response.data);
          //   setNotification(response.data);
        //   history.push("/AllNotifications");
          window.location.reload();
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
            window.location.reload();
        //   history.push("/AllNotifications");
        })
        .catch((error) => {
          console.log(error);
          alert("Unable to delete your notification right now");
        });
    }
  };

  // useEffect(() => {
  //     // console.log(userId)
  //     api
  //         .deleteAllNotifications(getUserId()).then((response) => {
  //         // console.log(response.data);
  //         setNotification(response.data);

  //         })
  //         .catch((error) => {
  //         console.log(error);
  //         alert("Unable to delete all your notifications right now")
  //         });
  //     },[]);

        
  return (

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

      {/* start of list */}
      <ul role="list" className="divide-y divide-gray-200 p-40">
        {/* trash button to trash all */}
        <button
          type="button"
          className="inline-flex items-left rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 m-4"
          onClick={() => {deleteAllNotifications()}}
        >
          <TrashIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
          Delete All Notifications
        </button>
        <button
          type="button"
          className="inline-flex items-left rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 m-4"
          onClick={() => history.push('/AddNotification')}
        >
          <PlusCircleIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
          Add Notification
        </button>

        {notification.map((message) => (
          <li
            key={message.notificationId}
            className="relative bg-white py-5 px-4 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 hover:bg-gray-50"
          >
            <div className="flex justify-between space-x-3">

            <button
                type="button"
                className="inline-flex items-left rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 m-4"
                // value={message.id}
                onClick={() => {
                    // console.log("clicked");
                    console.log(message.notificationId)
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
                {/* <a
                  href="/NotificationExpandPage"
                  className="block focus:outline-none"
                > */}
                  <span className="" aria-hidden="true" />

                  <p className="truncate text-sm text-black-1500 font-bold">
                    {message.title}
                  </p>
                {/* </a> */}
              </div>
              <time
                dateTime={message.notifTime}
                className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500"
              >
                {message.time}
              </time>
            </div>
            <div className="mt-1">
              <p className="text-sm text-gray-600 line-clamp-1">
                {message.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
