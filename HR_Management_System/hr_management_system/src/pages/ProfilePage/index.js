import { Suspense, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../../utils/Common.js";
import Navbar from "../../components/Navbar.js";
//import SideProfile from './sideprofile.js'
import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import loading from "../../assets/Spinner.svg";

import {
  AcademicCapIcon,
  BanknotesIcon,
  CheckBadgeIcon,
  ClockIcon,
  ReceiptRefundIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { getUserId } from "../../utils/Common.js";
import api from "../../utils/api.js";
import axios from "axios";

// const actions1 = [
//     {
//         title: 'Benefits',
//         href: '#',
//         icon: CheckBadgeIcon,
//         iconForeground: 'text-purple-700',
//         iconBackground: 'bg-purple-50',
//     },
//     {
//         title: 'Schedule',
//         href: '#',
//         icon: UsersIcon,
//         iconForeground: 'text-sky-700',
//         iconBackground: 'bg-sky-50',
//     },

// ]

// const actions2 = [

//     {
//         title: 'Current Pay Info',
//         href: '#',
//         icon: BanknotesIcon,
//         iconForeground: 'text-yellow-700',
//         iconBackground: 'bg-yellow-50',
//     },
//     {
//         title: 'Training',
//         href: '#',
//         icon: AcademicCapIcon,
//         iconForeground: 'text-indigo-700',
//         iconBackground: 'bg-indigo-50',
//     },
// ]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProfilePage(props) {
  //39; userEmail=alexa@libro.com   id and email
  const [user, setUser] = useState(getUserId()); //logged in user
  const [viewUser, setViewUser] = useState(null); //viewing other user
  const history = useHistory();
  const result = user.split(";");
  // const email = result[2]
  let [userInfo, setUserInfo] = useState([]);
  const userId = result[0];
  // const email = result[1]
  const [file, setFileState] =useState('');
  const [fileName , setfileName]= useState('');

  // console.log(userId);
  // console.log(email)

  // useEffect to get the user details
  useEffect(() => {
    async function getUserInfo() {
      await api.getUserInfo(userId).then((response) => {
        setUserInfo(response.data);
        // console.log(userInfo);
      });
    }
    getUserInfo();
  }, [userId, userInfo]);

  // },[])
  // console.log(userInfo)

  // useEffect(() => {
  //     api.getUserInfo(userId).then(response => {
  //         if(response.status == 200){
  //         setUserInfo(response.data);
  //         console.log(userInfo);
  //         }else{
  //             console.log(response.data);
  //         }
  //      }).catch((error) => {
  //         console.log(error.response)
  //      })
  //     })
  // console.log(userInfo)

  // useEffect((userId) => {
  //     api.getUserInfo(userId).then(response => {
  //         setUserInfo(response.data)

  //     }).then(console.log(userInfo));

  // }, [])

  // api.getUserInfo(userId).then(response => {
  // setUserInfo(response.data);
  // console.log(userInfo);})

  // console.log(userInfo + "plz")
  function handleFile(e){
    console.log(e.target.files, "--");
    console.log(e.target.files[0], "$SSSSS$")
    // let f = e.target.files[0]
    setFileState(e.target.files[0])
    setfileName(e.target.files[0].name)
    console.log(file + "what now")
    console.log(fileName + "printing fileName")

  }

  function uploadFile(e){
    e.preventDefault();
    console.log(file[0])
    console.log("printing file contents above")
    let formData = new FormData() ;
    if(file){
      formData.append('document', file)
    }

    try{
      // const res = axios.post(`http://localhost:9191/api/docData/uploadDocument/`,formData).
      api.uploadFile(formData).
      then(response => 
        {console.log(response.data)
        if(response.status ===200){
          alert("Resume submitted succesfully");
        }
        }
      ).catch((error) => {
                console.log(error.response)
             });
      
    } catch(err){
      if(err.response.status === 500){
        console.log("There was a problem with upload..")
      }else{
        console.log(err.response.dataS)
      }

    }
    
    // axios.post(`http://localhost:9191/api/docData/uploadDocument/${file}`).
    // then(response => console.log(response.data)).catch((error) => {
    //           console.log(error.response)
    //        });
    // api.uploadFile(e);
    

  }


  return (
    <>
      {" "}
      {userInfo &&
      userInfo.firstName &&
      userInfo.lastName &&
      userInfo.userRole &&
      userInfo.workEmail ? (
        <>
          <div>
            <Navbar />
          </div>

          <div className="grid grid-cols-3 gap-10 mx-24 p-12 mt-12">
            {/*first col*/}
            <div className=" bg-slate-200/70 row-start-1 row-end-4 rounded-lg">
              <div className="flex justify-center mt-24">
                <img
                  className="flex h-24 w-24 max-w-[550px] rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </div>

              <span className="">
                <div className="my-14">
                  <p className="text-3xl font-medium text-gray-1500 group-hover:text-gray-900">
                    {userInfo.firstName + " " + userInfo.lastName}
                  </p>
                  <p className="text-md font-medium text-gray-1200 group-hover:text-gray-700">
                    {userInfo.userRole}
                  </p>
                </div>
              </span>

              <div className="font-medium text-gray-1500 flex justify-center">
                <div>
                  {" "}
                  Email
                  <a href={"mailto:" + userInfo.workEmail}>
                    <svg
                      xlink="http://www.w3.org/1999/xlink"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-10 w-full max-w-[550px] "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                  </a>
                </div>
                <span className="p-4"></span>
                <div>
                  Team{" "}
                  <a href="/viewTeam">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-10 w-full max-w-[550px]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            {/*span 2*/}

            <div className="col-span-2 "></div>
            <div className="col-span-1 col-start-2 box border border-2 rounded rounded-lg shadow-lg ">
              <h3 className="mt-5 text-lg font-medium leading-6 text-gray-900">
                Personal Information
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Personal details and portfolio.
              </p>

              <div className="mt-5 border-t border-gray-200">
                <dl className="divide-y divide-gray-200">
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">
                      Full name
                    </dt>
                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <span className="flex-grow">
                        {userInfo.firstName + " " + userInfo.lastName}
                      </span>
                      <span className="ml-4 flex-shrink-0">
                        <button
                          type="button"
                          className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        ></button>
                      </span>
                    </dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">
                      Gender
                    </dt>
                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <span className="flex-grow">{userInfo.gender}</span>
                      <span className="ml-4 flex-shrink-0">
                        <button
                          type="button"
                          className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        ></button>
                      </span>
                    </dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">
                      Email address
                    </dt>
                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <span className="flex-grow">{userInfo.email}</span>
                      <span className="ml-4 flex-shrink-0">
                        <button
                          type="button"
                          className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        ></button>
                      </span>
                    </dd>
                  </div>

                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">
                      Phone number
                    </dt>
                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <span className="flex-grow">{userInfo.phone}</span>
                      <span className="ml-4 flex-shrink-0">
                        <button
                          type="button"
                          className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        ></button>
                      </span>
                    </dd>
                  </div>
                  <div className="p-8">
                    <dd>
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
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="row-span-1 col-span-1 col-start-3 box border border-2 rounded rounded-lg shadow-lg ">
              
              
              
              <form onSubmit={uploadFile} encType="multipart/form">
              <dt className="mt-5 my-5 text-lg font-medium leading-6 text-gray-900">
                Qualifications & Documents
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Your CV.</p>
              </dt>
      
              <div className="mb-8">
                {/* <input id="file" type="file" name="file" onChange ={(e) => handleFile(e)} /> */}
               
                <label
                  // for not ok anymore for react, use htmlFor. same with class - classNames  stroke-width - strokeWidth  stroke-linejoin - strokeLinejoin
                  htmlFor="file"
                  className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"

                >
                  <div>
                    <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                      Click here to upload
                    </span>
                    <span className="mb-2 block text-base font-medium text-[#6B7280]">
                      Or
                    </span>
                    <span className="flex ml-10 mb-2 block text-md text-[#07074D]">
                      <input id="file" type="file" multiple name="file" onChange ={(e) => handleFile(e)} />
                      </span> 
                  </div>
                </label>
              </div>
             
              <dd className="m-1 sm:col-span-2 sm:mt-0">
                <ul role="list">
                  <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                    <div className="flex w-0 flex-1 items-center">
                      {/* where the fetching for download should be */}
                    </div>
                    <div className="ml-4 flex flex-shrink-0 space-x-4">
                      
                    <PaperClipIcon
                        className="inline-block h-6 w-6 flex-shrink-0 text-gray-400"
                        aria-hidden="true" 
                      > </PaperClipIcon>
                      {/* <input id="file" type="file" name="file" onChange ={(e) => handleFile(e)} /> */}
                      {/* <button
                        type="button"
                        className="rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={(e) => uploadFile(e)}
                      >
                        Upload
                      </button> */}
                      {fileName}
                      <input type="submit" value="Upload" className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"></input>
                    </div>
                  </li>
                </ul>
                <button
                  type="button"
                  className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  View Your CV
                </button>
              </dd>
              </form>
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

{
  /* <div class="row-span-2 col-start-2 col-end-3 ">
                        <div className="relative bg-white px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-2 lg:pb-28">

                            <div className="relative mx-auto max-w-7xl">
                                <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-1">

                                    <div class="flex-1">

                                        <div className="divide-y divide-gray-200 overflow-clip rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-1 sm:gap-px sm:divide-y-0 ">
                                            {actions1.map((action, actionIdx) => (
                                                <div
                                                    key={action.title}
                                                    className={classNames(
                                                        actionIdx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
                                                        actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
                                                        actionIdx === actions1.length - 2 ? 'sm:rounded-bl-lg' : '',
                                                        actionIdx === actions1.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
                                                        'relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500'
                                                    )}
                                                >
                                                    <div>
                                                        <span
                                                            className={classNames(
                                                                action.iconBackground,
                                                                action.iconForeground,
                                                                'rounded-lg inline-flex p-3 ring-4 ring-white'
                                                            )}
                                                        >
                                                            <action.icon className="h-6 w-6" aria-hidden="true" />
                                                        </span>
                                                    </div>
                                                    <div className="mt-8">
                                                        <h3 className="text-lg font-medium">
                                                            <a href={action.href} className="focus:outline-none">
                                                                
                                                                <span className="absolute inset-0" aria-hidden="true" />
                                                                {action.title}
                                                            </a>
                                                        </h3>
                                                        <p className="mt-2 text-sm text-gray-500">
                                                            Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis et
                                                            quo et molestiae.
                                                        </p>
                                                    </div>
                                                    <span
                                                        className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                                                        aria-hidden="true"
                                                    >
                                                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                                                        </svg>
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */
}

{
  /* <div className=" stretch-1 col-span-1">

                        <div className="relative bg-white px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-2 lg:pb-28">

                            <div className="relative mx-auto max-w-7xl">
                                <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-1">

                                    <div class="flex-1">

                                        <div className="divide-y divide-gray-200 overflow-clip rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-1 sm:gap-px sm:divide-y-0 ">
                                            {actions2.map((action, actionIdx) => (
                                                <div
                                                    key={action.title}
                                                    className={classNames(
                                                        actionIdx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
                                                        actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
                                                        actionIdx === actions2.length - 2 ? 'sm:rounded-bl-lg' : '',
                                                        actionIdx === actions2.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
                                                        'relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500'
                                                    )}
                                                >
                                                    <div>
                                                        <span
                                                            className={classNames(
                                                                action.iconBackground,
                                                                action.iconForeground,
                                                                'rounded-lg inline-flex p-3 ring-4 ring-white'
                                                            )}
                                                        >
                                                            <action.icon className="h-6 w-6" aria-hidden="true" />
                                                        </span>
                                                    </div>
                                                    <div className="mt-8">
                                                        <h3 className="text-lg font-medium">
                                                            <a href={action.href} className="focus:outline-none">
                                                               
                                                                <span className="absolute inset-0" aria-hidden="true" />
                                                                {action.title}
                                                            </a>
                                                        </h3>
                                                        <p className="mt-2 text-sm text-gray-500">
                                                            Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis et
                                                            quo et molestiae.
                                                        </p>
                                                    </div>
                                                    <span
                                                        className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                                                        aria-hidden="true"
                                                    >
                                                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                                                        </svg>
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div> */
}
{
  /* </div>
            </div>
        </>)
    )
} */
}
