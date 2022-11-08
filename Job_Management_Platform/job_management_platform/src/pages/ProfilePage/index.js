import Sidebar from "../../components/Sidebar";
import Education from "../../features/Profile/Education";
import {
  PlusIcon
} from "@heroicons/react/20/solid";
import { ArrowUpTrayIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { Fragment, useState, useEffect } from 'react'
import WorkList from "../../features/Profile/WorkList";

import Language from "../../features/Profile/Language";
import RecommendationList from "../../features/Profile/RecommendationList";
import api from "../../utils/api.js";
import { getUserId } from "../../utils/Common.js";
import { useHistory } from "react-router-dom";

import AddSkillset from "../../features/Profile/AddSkillset";

// const works = [{workId:1, positionName: 'UI designer', companyName:"GIC"},{workId:2, positionName: 'Product Manager', companyName:"DBS"}]
// const recommendations = [{recommendationId:1, name: 'Kong Xinyue', email:"12345@gmail.com"}, {recommendationId:2, name: 'Matthew', email:"12345@gmail.com"}]
export default function Profile() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [aboutMe, setAboutMe] = useState('')
  const [citizenship, setCitizenship] = useState('')
  const [race, setRace] = useState('')
  const [level, setLevel] = useState("")
  const [school, setSchool] = useState("")
  const [year, setYear] = useState()
  const [recommendations, setRecommendations] = useState([])
  const [works, setWorks] = useState([])
  const [languages, setLanguages] = useState(['English', 'Chinese']);
  const [skills, setSkills] = useState([])
  const [userSkills, setUserSkills] = useState([])
  const [refreshKey, setRefreshKey] = useState(0);
  const [addskil, setAddskill] = useState(false)
  const [addCV, setAddCV] = useState(false)
  const [addTranscript, setAddTranscript] = useState(false)
  const [addCoverletter, setAddCoverletter] = useState(false)
  const [user, setUser] = useState(getUserId()); //logged in user
  const history = useHistory();
  // const email = result[2]
  let [userInfo, setUserInfo] = useState([]);
  // const email = result[1]
  const [file, setFileState] = useState("");
  const [fileName, setFileName] = useState("");
  const [docId, setDocId] = useState(null);
  const [error, setError] = useState(null);
  const [userQualificationInfo, setUserQualificationInfo] = useState(null);
  const [clfile, setclFileState] = useState("");
  const [clfileName, setclfileName] = useState("");
  const [tfile, settFileState] = useState("");
  const [tfileName, settfileName] = useState("");

  useEffect(() => {
    api.getUserRecommendations(user).
      then((response) => {
        console.log(response.data);
        setRecommendations(response.data);
      });
  }, [refreshKey]);
  useEffect(() => {
    api.getUserExperiences(user).
      then((response) => {
        console.log(response.data);
        setWorks(response.data);
      });
  }, [refreshKey]);
  useEffect(() => {
    api.getAllSkillsets().
      then((response) => {
        console.log(response.data);
        setSkills(response.data);
        console.log(response.data[0]);
        setUserSkills([{ skill: response.data[0], level: 1 }, { skill: response.data[1], level: 3 }])
      });
  }, []);

  function handleFile(e) {
    console.log(e.target.files, "--");
    console.log(e.target.files[0], "$SSSSS$");
    setFileState(e.target.files[0]);
    setFileName(e.target.files[0].name);
  }

  function uploadFile(type) {
    console.log("upload file")
    let formData = new FormData();
    if (file) {
      formData.append("file", file);
      try {
        api
          .uploadDocument(formData, user, type)
          .then((response) => {
            // console.log(response.data)
            if (response.status === 200) {
              //should return a long id
              setDocId(response.data);
              // setDocId(response.data)
              console.log(userInfo);
              alert("CV added to user succesfully");
            }
          })
          .catch((error) => {
            console.log(error.response);
          });
      } catch (err) {
        console.log("There was a problem with upload..");
        console.log(err);
      }
    } else {
      alert("No file uploaded");
    }

  }
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

  function handleclFile(e) {
    console.log("handle file")
    console.log(e.target.files, "--");
    console.log(e.target.files[0], "$SSSSS$");
    setclFileState(e.target.files[0]);
    setclfileName(e.target.files[0].name);
  }

  function uploadclFile(type) {
    //      e.preventDefault();
    console.log("upload file")
    console.log(clfile)

    let formData = new FormData();
    if (clfile) {
      formData.append("file", clfile);

      try {
        api
          .uploadDocument(formData, user, type)
          .then((response) => {
            // console.log(response.data)
            if (response.status === 200) {
              //should return a long id
              setDocId(response.data);
              // setDocId(response.data)
              console.log(userInfo);
              alert("Cover Letter added to user succesfully");
            }
            //                setclFileState('');
            //                setclfileName('');
          })
          .catch((error) => {
            console.log(error.response);
          });
      } catch (err) {
        console.log("There was a problem with upload..");
        console.log(err);
      }
    } else {
      alert("No file uploaded");
    }

  }
  

  function handletFile(e) {
    console.log("handle file")
    console.log(e.target.files, "--");
    console.log(e.target.files[0], "$SSSSS$");
    settFileState(e.target.files[0]);
    settfileName(e.target.files[0].name);
  }

  function uploadtFile(type) {
    //      e.preventDefault();
    console.log("upload file")
    console.log(tfile)

    let formData = new FormData();
    if (tfile) {
      formData.append("file", tfile);

      try {
        api
          .uploadDocument(formData, user, type)
          .then((response) => {
            // console.log(response.data)
            if (response.status === 200) {
              //should return a long id
              setDocId(response.data);
              // setDocId(response.data)
              console.log(userInfo);
              alert("Transcript added to user succesfully");
            }
            //                settFileState('');
            //                settfileName('');
          })
          .catch((error) => {
            console.log(error.response);
          });
      } catch (err) {
        console.log("There was a problem with upload..");
        console.log(err);
      }
    } else {
      alert("No file uploaded");
    }

    
  }



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
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
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
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                  />
                </div>
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Citizenship
                </label>
                <select
                  id="citizenship"
                  name="citizenship"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm bg-white"
                  value={citizenship}
                  onChange={(e) => setCitizenship(e.target.value)}
                >
                  <option value="CITIZEN">Citizen</option>
                  <option value="PR">PR</option>
                  <option value="FOREINER">Foreiner</option>
                </select>
                <div></div>
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Race
                </label>
                <select
                  id="race"
                  name="race"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm bg-white"
                  value={race}
                  onChange={(e) => setRace(e.target.value)}
                >
                  <option value="CHINESE">Chinese</option>
                  <option value="MALAY">Malay</option>
                  <option value="INDIAN">Indian</option>
                  <option value="EURASIAN">Eurasian</option>
                  <option value="OTHERS">Others</option>
                </select>
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
                    value={aboutMe}
                    onChange={(e) => setAboutMe(e.target.value)}
                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Education
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">

                  <Education level={level} setLevel={setLevel} school={school} setSchool={setSchool} year={year} setYear={setYear} />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="street-address" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Work experience
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <WorkList templateWorks={works} refreshKeyHandler={() => setRefreshKey((oldKey) => oldKey + 1)} />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Skills
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <AddSkillset userSkills={userSkills} setUserSkills={setUserSkills} skills={skills} />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="region" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Language
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <Language languages={languages} setLanguages={setLanguages} />
                </div>
              </div>


              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Recommendations
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <RecommendationList templateRecommendations={recommendations} refreshKeyHandler={() => setRefreshKey((oldKey) => oldKey + 1)} />
                </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  CV
                </label>
                <div className="flex mt-1 sm:col-span-2 sm:mt-0">
                  <input
                    id="file"
                    type="file"
                    multiple
                    name="file"
                    onChange={(e) => handleFile(e)}
                  />
                  <div className="space-x-2">
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => uploadFile("CV")}
                    >
                      <ArrowUpTrayIcon
                        className="md:-ml-0.5 md:mr-2 h-4 w-4"
                        aria-hidden="true"
                      />
                      <span className="hidden md:block">Upload </span>
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick
                    >
                      <ArrowDownTrayIcon
                        className="md:-ml-0.5 md:mr-2 h-4 w-4"
                        aria-hidden="true"
                      />
                      <span className="hidden md:block">Download </span>
                    </button>
                  </div>
                </div>

                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Transcript
                </label>
                <div className="flex mt-1 sm:col-span-2 sm:mt-0">
                  <input
                    id="file"
                    type="file"
                    multiple
                    name="file"
                    onChange={(e) => handletFile(e)}
                  />
                  <div className="space-x-2">
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => uploadtFile("Transcript")}
                    >
                      <ArrowUpTrayIcon
                        className="md:-ml-0.5 md:mr-2 h-4 w-4"
                        aria-hidden="true"
                      />
                      <span className="hidden md:block">Upload </span>
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick
                    >
                      <ArrowDownTrayIcon
                        className="md:-ml-0.5 md:mr-2 h-4 w-4"
                        aria-hidden="true"
                      />
                      <span className="hidden md:block">Download </span>
                    </button>
                  </div>
                </div>
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Cover Letter
                </label>
                <div className="flex mt-1 sm:col-span-2 sm:mt-0">
                  <input
                    id="file"
                    type="file"
                    multiple
                    name="file"
                    onChange={(e) => handletFile(e)}
                  />
                  <div className="space-x-2">
                    <button
                      type="button"
                      className="inline-flex  rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => uploadtFile("Cover Letter")}
                    >
                      <ArrowUpTrayIcon
                        className="md:-ml-0.5 md:mr-2 h-4 w-4"
                        aria-hidden="true"
                      />
                      <span className="hidden md:block">Upload </span>
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick
                    >
                      <ArrowDownTrayIcon
                        className="md:-ml-0.5 md:mr-2 h-4 w-4"
                        aria-hidden="true"
                      />
                      <span className="hidden md:block">Download </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>



          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="submit"
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Save
              </button>
            </div>
          </div>

        </form>
        {/* testing code
        <button
            type="submit"
            onClick= {()=>testMatt()}
          className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
         >
           butt
         </button> */}
      </div>
    </div>
  )
}
