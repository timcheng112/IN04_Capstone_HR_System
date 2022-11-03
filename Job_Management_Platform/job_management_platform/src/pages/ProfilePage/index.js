import Sidebar from "../../components/Sidebar";
import Education from "../../features/Profile/Education";
import {
  PlusIcon
} from "@heroicons/react/20/solid";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { Fragment, useState } from 'react'
import WorkList from "../../features/Profile/WorkList";
import AddSkill from "../../features/Profile/AddSkill";
import Language from "../../features/Profile/Language";
import RecommendationList from "../../features/Profile/RecommendationList";
import api from "../../utils/api.js";
import { getUserId } from "../../utils/Common.js";
import { useHistory } from "react-router-dom";

import AddSkillset from "../../features/Profile/AddSkillset";

const works = [{workId:1, positionName: 'UI designer', companyName:"GIC"},{workId:2, positionName: 'Product Manager', companyName:"DBS"}]
const recommendations = [{recommendationId:1, name: 'Kong Xinyue', email:"12345@gmail.com"}, {recommendationId:2, name: 'Matthew', email:"12345@gmail.com"}]
export default function Profile() {
  const [addskil, setAddskill] = useState(false)
  const [addCV, setAddCV] = useState(false)
  const [addTranscript, setAddTranscript] = useState(false)
  const [addCoverletter, setAddCoverletter] = useState(false)
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


  // function handleFile(e) {
  //   console.log(e.target.files, "--");
  //   console.log(e.target.files[0], "$SSSSS$");
  //   // let f = e.target.files[0]
  //   setFileState(e.target.files[0]);
  //   setfileName(e.target.files[0].name);
  //   // console.log(file + "what now")
  //   // console.log(fileName + "printing fileName")
  // }
  
  // function uploadFile(e) {
  //   e.preventDefault();
  //   // console.log(file[0])
  //   // console.log("printing file contents above")
  //   let formData = new FormData();
  //   if(file){
  //     formData.append("document", file);
  //   }
  
  //   try {
  //     api
  //       .addCV(formData, user)
  //       .then((response) => {
  //         // console.log(response.data)
  //         if (response.status === 200) {
  //           //should return a long id
  //           setDocId(response.data);
  //           // setDocId(response.data)
  //           console.log(userInfo);
  //           alert("Resume added to user succesfully");
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error.response);
  //       });
  //   } catch (err) {
  //     console.log("There was a problem with upload..");
  //     console.log(err);
  //   }
  // }
  
  // function downloadFile() {
  //   api.downloadDocument(docId).then((response) => {
  //     console.log(docId);
  //     const fileName =
  //       response.headers["content-disposition"].split("filename=")[1];
  //     console.log(fileName);
  //     api.getDocById(docId).then((response) => {
  //       //console.log(response.data);
  //       const url = window.URL.createObjectURL(response.data);
  
  //       const link = document.createElement("a");
  //       link.href = url;
  //       link.setAttribute("download", fileName);
  //       document.body.appendChild(link);
  //       link.click();
  //       link.parentNode.removeChild(link);
  //     });
  //   });
  // }
  
  // function deleteCV() {
  //   const yes = window.confirm(
  //     "Are you sure you want to delete your resume? Action is irreversible."
  //   );
  //   if(yes){
  //     if(docId !== null){
  //       api
  //         .deleteCV(docId)
  //         .then((response) => {
  //           // console.log(response.data)
  //           if (response.status === 200) {
  //             //should return a long id
  //             if (response.data === true) {
  //               alert("CV deleted successfully.");
  //               console.log("resume deleted successfully");
  //               setDocId(null);
  //               window.location.reload();
  //             } else {
  //               console.log("resume not deleted...");
  //             }
  //           }
  //         })
  //         .catch((error) => {
  //           alert("No resume to delete");
  //           console.log(error.response);
  //         });
  //     }
  //   }
  // }

  return (
    <div>
      <Sidebar />
      <div className="flex flex-1 flex-col md:pl-64">
        <div className='py-6' />
        <form className="space-y-8 divide-y divide-gray-200">
          <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
            <div className="space-y-6 sm:space-y-5">
              <div>
                <h3 className="text-lg font-medium  leading-6 text-gray-900">Profile</h3>
              </div>

            </div>
            <div className="space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  First name
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                  />
                </div>

                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Last name
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  About me
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Education
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">

                  <Education />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="street-address" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Work experience
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <WorkList  templateWorks={works}/>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Skills
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                {/* <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick = {()=> setAddskill(true)}
                  >
                    <PlusIcon
                      className="md:-ml-0.5 md:mr-2 h-4 w-4"
                      aria-hidden="true"
                    />
                    <span className="hidden md:block">Add skill</span>
                  </button> */}
                  <AddSkillset />
                </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="region" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Language
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <Language />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Recommendations
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <RecommendationList templateRecommendations={recommendations}/>
                </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  CV
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick = {()=> setAddCV(true)}
                  >
                    <ArrowUpTrayIcon 
                      className="md:-ml-0.5 md:mr-2 h-4 w-4"
                      aria-hidden="true"
                    />
                    <span className="hidden md:block">Upload CV</span>
                  </button>
                </div>

                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Transcript
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick = {()=> setAddTranscript(true)}
                  >
                    <ArrowUpTrayIcon 
                      className="md:-ml-0.5 md:mr-2 h-4 w-4"
                      aria-hidden="true"
                    />
                    <span className="hidden md:block">Upload Transcript</span>
                  </button>
                </div>
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Cover Letter
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <button
                    type="button"
                    className="inline-flex  rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick = {()=> setAddCoverletter(true)}
                  >
                    <ArrowUpTrayIcon 
                      className="md:-ml-0.5 md:mr-2 h-4 w-4"
                      aria-hidden="true"
                    />
                    <span className="hidden md:block">Upload Cover Letter</span>
                  </button>
                </div>
              </div>
            </div>
          </div>



          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="button"
                className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Save
              </button>
            </div>
          </div>

        </form>
        <AddSkill open ={addskil} setOpen={() => setAddskill(false)} />
      </div>
    </div>
  )
}
