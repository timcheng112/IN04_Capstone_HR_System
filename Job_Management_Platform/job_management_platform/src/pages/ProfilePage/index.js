import { Suspense, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import Navbar from "../../components/Navbar.js";
//import SideProfile from './sideprofile.js'
import { PaperClipIcon } from "@heroicons/react/20/solid";
import loading from "../../assets/Spinner.svg";
import { getUserId } from "../../utils/Common.js";
import api from "../../utils/api.js";
import axios from "axios";
import Navbar from "../../components/Navbar";

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
  const [user, setUser] = useState(getUserId()); //logged in user
  const history = useHistory();
  // const email = result[2]
  let [userInfo, setUserInfo] = useState([]);
  const userId = getUserId();
  // const email = result[1]
  const [file, setFileState] = useState("");
  const [fileName, setfileName] = useState("");
  const [docId, setDocId] = useState(null);
  const [error, setError] = useState(null);

  console.log(userId);
  // console.log(email)

  // useEffect to get the user details
  useEffect(
    () => {
      //   async function getUserInfo(){
      //   await api.getUserInfo(userId).then(response => {
      //   setUserInfo(response.data);
      //   console.log(userInfo);
      //       })
      axios.get(`http://localhost:9191/api/user/${userId}`).then((response) => {
        setUserInfo(response.data);
        console.log(userInfo);
      });
    },

    //   }getUserInfo()}
    [userId, userInfo]
  );

  function handleFile(e) {
    console.log(e.target.files, "--");
    console.log(e.target.files[0], "$SSSSS$");
    // let f = e.target.files[0]
    setFileState(e.target.files[0]);
    setfileName(e.target.files[0].name);
    // console.log(file + "what now")
    // console.log(fileName + "printing fileName")
  }
  
  function uploadFile(e) {
    e.preventDefault();
    // console.log(file[0])
    // console.log("printing file contents above")
    let formData = new FormData();
    if(file){
      formData.append("document", file);
    }
  
    try {
      api
        .addCV(formData, user)
        .then((response) => {
          // console.log(response.data)
          if (response.status === 200) {
            //should return a long id
            setDocId(response.data);
            // setDocId(response.data)
            console.log(userInfo);
            alert("Resume added to user succesfully");
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    } catch (err) {
      console.log("There was a problem with upload..");
      console.log(err);
    }
  }
  
  function downloadFile() {
    api.downloadDocument(docId).then((response) => {
      console.log(docId);
      const fileName =
        response.headers["content-disposition"].split("filename=")[1];
      console.log(fileName);
      api.getDocById(docId).then((response) => {
        //console.log(response.data);
        const url = window.URL.createObjectURL(response.data);
  
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      });
    });
  }
  
  function deleteCV() {
    const yes = window.confirm(
      "Are you sure you want to delete your resume? Action is irreversible."
    );
    if(yes){
      if(docId !== null){
        api
          .deleteCV(docId)
          .then((response) => {
            // console.log(response.data)
            if (response.status === 200) {
              //should return a long id
              if (response.data === true) {
                alert("CV deleted successfully.");
                console.log("resume deleted successfully");
                setDocId(null);
                window.location.reload();
              } else {
                console.log("resume not deleted...");
              }
            }
          })
          .catch((error) => {
            alert("No resume to delete");
            console.log(error.response);
          });
      }
    }
  }

  return (
    <>
      {userInfo.firstName ? (
        <>
          <div>
            <Navbar />
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

                <div className=" mt-12 md:col-span-2 h-auto shadow-xl p-4 space-y-2 hidden md:block ">
                  <form onSubmit={uploadFile} encType="multipart/form">
                    <dt className="mt-5 my-5 text-lg font-medium leading-6 text-gray-900">
                      My Documents (CV)
                    </dt>

                    <div className="mb-8 break-word">
                      {/* <input id="file" type="file" name="file" onChange ={(e) => handleFile(e)} /> */}

                      <label
                        // for not ok anymore for react, use htmlFor. same with class - classNames  stroke-width - strokeWidth  stroke-linejoin - strokeLinejoin
                        htmlFor="file"
                        className=" break-word relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
                      >
                        <div>
                          {file ? (
                            ""
                          ) : (
                            <span className=" break-word mb-2 block text-xl font-semibold text-[#07074D]">
                              You have no CV uploaded.
                            </span>
                          )}
                          {/* <span className="mb-2 block text-base font-medium text-[#6B7280]">
                        Or
                      </span> */}
                          <span className="block ml-20 mb-2 block text-md text-[#07074D]">
                            {/* <button id="file"
                          type="file"
                          multiple
                          onChange={(e) => handleFile(e)}>Select a file to upload</button> */}
                            <input
                              id="file"
                              type="file"
                              multiple
                              name="file"
                              onChange={(e) => handleFile(e)}
                            />
                          </span>
                        </div>
                      </label>
                    </div>

                    <dd className="m-1 sm:mt-0">
                      {file ? (
                        <ul role="list">
                          <li className=" py-3 pl-3 pr-4 text-sm">
                            <div className="flex w-0 flex-1 ">
                              {/* where the fetching for download should be */}
                            </div>
                            <div className="flex-1 ml-at mt-4  space-x-4 ">
                              <PaperClipIcon
                                className="inline-block h-6 w-6 flex-shrink-0 text-gray-400"
                                aria-hidden="true"
                              >
                                {" "}
                              </PaperClipIcon>

                              {fileName}
                              <input
                                type="submit"
                                value="Submit"
                                className=" vertical-center px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                              ></input>
                            </div>
                          </li>
                        </ul>
                      ) : (
                        ""
                      )}
                      {/* Uncaught TypeError: Cannot read properties of null (reading 'cv') when i use userInfo.qualificationInformation.cv dk why updated in db but not on front end. qi is null on frontend */}
                      {docId ? (
                        <>
                          <button
                            type="button"
                            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                            onClick={() => downloadFile()}
                          >
                            Download Your CV
                          </button>{" "}
                          <button
                            type="button"
                            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                            onClick={() => deleteCV()}
                          >
                            Delete CV
                          </button>
                        </>
                      ) : (
                        ""
                      )}
                      {/* <button
                  type="button"
                  className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  onClick={() => downloadFile()}
                >
                  Download Your CV
                </button> */}
                    </dd>
                  </form>
                </div>
                <div class="flex items-center mt-12 md:col-span-2 h-auto shadow-xl p-4 space-y-2 hidden md:block">
                  <h3 class="font-bold uppercase"> Coming soon in SR2...</h3>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
          <img className="h-full w-auto" src={loading} alt="" />
        </div>
      )}
    </>
  );
}
