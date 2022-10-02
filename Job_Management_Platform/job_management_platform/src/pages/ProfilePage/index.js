import { Suspense, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import Navbar from "../../components/Navbar.js";
//import SideProfile from './sideprofile.js'
import { PaperClipIcon } from "@heroicons/react/20/solid";
import loading from "../../assets/Spinner.svg";
import { getUserId } from "../../utils/Common.js";
import api from "../../utils/api.js";
import axios from "axios";

import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  AcademicCapIcon,
  BanknotesIcon,
  CheckBadgeIcon,
  ClockIcon,
  ReceiptRefundIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const actions1 = [
  {
    title: "Benefits",
    href: "#",
    icon: CheckBadgeIcon,
    iconForeground: "text-purple-700",
    iconBackground: "bg-purple-50",
  },
  {
    title: "Schedule",
    href: "#",
    icon: UsersIcon,
    iconForeground: "text-sky-700",
    iconBackground: "bg-sky-50",
  },
];

const actions2 = [
  {
    title: "Current Pay Info",
    href: "#",
    icon: BanknotesIcon,
    iconForeground: "text-yellow-700",
    iconBackground: "bg-yellow-50",
  },
  {
    title: "Training",
    href: "#",
    icon: AcademicCapIcon,
    iconForeground: "text-indigo-700",
    iconBackground: "bg-indigo-50",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProfilePage(props) {
  const [user, setUser] = useState(getUserId()) //logged in user
  const history = useHistory()
  // const email = result[2]
  let [userInfo, setUserInfo] = useState([]);
  const userId = getUserId()
  // const email = result[1]

  console.log(userId)
  // console.log(email)

  // useEffect to get the user details 
  useEffect(() => {
      
    //   async function getUserInfo(){
    //   await api.getUserInfo(userId).then(response => {
    //   setUserInfo(response.data);
    //   console.log(userInfo);
    //       })
    axios.get(`http://localhost:9191/api/user/${userId}`).then(response => { setUserInfo(response.data); console.log(userInfo);
           })
        }

//   }getUserInfo()}
  , [userId, userInfo])

  return (
    <> {userInfo ? (
        <>
    <div>
      {/* <Navbar /> */}
      <div>
        {/* picture */}
        <div class="md:grid grid-cols-4 grid-rows-1  bg-white gap-2 p-24 rounded-xl">
          <div class="md:col-span-1 h-auto shadow-xl box border border-2 rounded bg-rose-50/75 ">
            <div class="flex rounded-full w-full h-full relative  ">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                class="w-44 h-44 m-auto rounded-full border-2"
                alt=""
              ></img>
            </div>
          </div>

          {/* this is personal info */}
          <div class="md:col-span-3 h-auto w-auto shadow-xl p-4 space-y-2 p-3 rounded box-border border-2 items-justify">
            <div class="flex mt-4 ">
              <span class="text-sm  font-bold uppercase rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-2/6">
                Name:
              </span>
              <div class="mt-1  px-4 border-l-0 cursor-default border-gray-300 focus:outline-none  rounded-md rounded-l-none shadow-sm -ml-1 w-4/6">
              {userInfo.firstName + " " + userInfo.lastName}
                             
              </div>
            </div>
            <div class="flex ">
              <span class="text-sm  font-bold uppercase rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-2/6">
                Email:
              </span>
              <div class="mt-1  px-4 border-l-0 cursor-default border-gray-300 focus:outline-none  rounded-md rounded-l-none shadow-sm -ml-1 w-4/6">
                {userInfo.email}
              </div>
            </div>
            <div class="flex ">
              <span class="text-sm  font-bold uppercase rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-2/6">
                D.O.B:
              </span>
              <div class=" px-4 border-l-0 cursor-default border-gray-300 focus:outline-none  rounded-md rounded-l-none shadow-sm -ml-1 w-4/6">
                {userInfo.dob}
              </div>
            </div>
            <div class="flex ">
              <span class="text-sm  font-bold uppercase rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-2/6">
                Role:
              </span>
              <div class=" px-4 border-l-0 cursor-default border-gray-300 focus:outline-none  rounded-md rounded-l-none shadow-sm -ml-1 w-4/6">
                {userInfo.userRole}
              </div>
              {/* class="px-4 border-l-0 cursor-default border-gray-300 focus:outline-none  rounded-md rounded-l-none shadow-sm -ml-1 w-4/6" */}
            </div>
            <button
              type="button"
                onClick={() => history.push("/updateProfile")}
              className="mt-4 rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Update Info
            </button>
            <span> | </span>
            <button
              type="button"
                onClick={() => history.push("/reset")}
              className="mt-4 rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Change Password
            </button>
          </div>

          <div class="mt-12 md:col-span-2 h-auto shadow-xl p-4 space-y-2 hidden md:block">
            <h3 class="font-bold uppercase"> Profile Document</h3>
            <p class="">Your CV</p>

            <div class="mb-8">
              <input type="file" name="file" id="file" class="sr-only" />
              <label
                for="file"
                class="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
              >
                <div>
                  <span class="mb-2 block text-xl font-semibold text-[#07074D]">
                    Click here to upload
                  </span>
                  <span class="mb-2 block text-base font-medium text-[#6B7280]">
                    Or
                  </span>
                  <span class="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                    Browse
                  </span>
                </div>
              </label>
            </div>
            <ul role="list">
              <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                <div className="flex w-0 flex-1 items-center">
                  <PaperClipIcon
                    className="h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="ml-2 w-0 flex-1 truncate">
                    resume_back_end_developer.pdf
                  </span>
                </div>
                <div className="ml-4 flex flex-shrink-0 space-x-4">
                  <button
                    type="button"
                    className="rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Update
                  </button>
                </div>
              </li>
            </ul>
          </div>
          <div class="flex items-center mt-12 md:col-span-2 h-auto shadow-xl p-4 space-y-2 hidden md:block">
            <h3 class="font-bold uppercase"> Coming soon in SR2...</h3>
           
        </div>
        </div>
     
      </div>
    </div>
    </>): (<div className="min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
          <img className="h-full w-auto" src={loading} alt="" />
        </div> )}</> )
}