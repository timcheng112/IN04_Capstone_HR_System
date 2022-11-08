import Navbar from "../../components/Navbar";
import { ArrowUpTrayIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { Fragment, useState, useEffect } from 'react'
import WorkList from "../../features/jobrequest/WorkList";
import Offer from "../../features/jobrequest/Offer";
import RecommendationList from "../../features/jobrequest/RecommendationList";
import api from "../../utils/api.js";
import { getUserId } from "../../utils/Common.js";
import { useHistory, useLocation } from 'react-router-dom';



export default function Profile() {
  const [applicant, setApplicant] = useState(null)
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
  const [languages, setLanguages] = useState([])
  const [userSkills, setUserSkills] = useState(null)
  const [job, setJob] = useState()
  const [uId, setUId] = useState()
  const [postId, setPostId] = useState()
  const [open,setOpen] = useState(false)

  const [curfileName, setcurFileName] = useState(null);
  const [curclfileName, setcurclfileName] = useState(null);
  const [curtfileName, setcurtfileName] = useState(null);
  const [cvId, setCVId] = useState('');
  const [clId, setCLId] = useState('');
  const [tId, setTId] = useState('');
  const [fName, setFName] = useState(null);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    setApplicant(location.state.applicant)
    setUId(location.state.applicant.applicant.userId)
    setPostId(location.state.applicant.jobPosting.postingId)
    setFirstName(location.state.applicant.applicant.firstName)
    setLastName(location.state.applicant.applicant.lastName)
    setCitizenship(location.state.applicant.applicant.citizenship)
    setRace(location.state.applicant.applicant.race)
    setJob(location.state.job)
    console.log(location.state.job)
  }, []);

  useEffect(() => {
    api.getUserRecommendations(location.state.applicant.applicant.userId).
      then((response) => {
        console.log(response.data);
        setRecommendations(response.data);
      });
  }, []);
  useEffect(() => {
    api.getUserExperiences(location.state.applicant.applicant.userId).
      then((response) => {
        console.log(response.data);
        setWorks(response.data);
      });
  }, []);

  useEffect(() => {
    api.getUserQualificationInformation(location.state.applicant.applicant.userId).
      then((response) => {
        console.log(response.data);
        setAboutMe(response.data.personalStatement);
        setSchool(response.data.schoolName);
        setYear(response.data.schoolGradYear);
        if (response.data.highestEducation === "O") {
          setLevel("O Level");
        } else if (response.data.highestEducation === "N") {
          setLevel("N Level");
        } else if (response.data.highestEducation === "A") {
          setLevel("A Level");
        } else {
          setLevel(response.data.highestEducation)
        }
        setLanguages(response.data.languagesSpoken);
        setUserSkills(response.data.userSkills);

        if (response.data.cv === null) {
          console.log("cv dont exist");
        } else {
          console.log("cv exist");
          setcurFileName(response.data.cv.name);
          setCVId(response.data.cv.docId);
        }
        if (response.data.transcript === null) {
          console.log("transcript dont exist");
        } else {
          console.log("transcript exist");
          setcurtfileName(response.data.transcript.name);
          setTId(response.data.transcript.docId);
        }
      })
      if (location.state.applicant.coverLetter === null) {
        console.log("cover letter dont exist");
      } else {
        console.log("cover letter exist");
        setcurclfileName(location.state.applicant.coverLetter.name);
        setCLId(location.state.applicant.coverLetter.docId);
      }
  }, []);

  function downloadFile(fileType) {
    var docToGet;
    if (fileType === "CV") {
      docToGet = cvId;
      setFName(curfileName);
    } else if (fileType == "CL") {
      docToGet = clId;
      setFName(curclfileName);
    } else if (fileType == "T") {
      docToGet = tId;
      setFName(curtfileName);
    }

    api.downloadDocument(docToGet).then((response) => {
      const fileName =
        response.headers["content-disposition"].split("filename=")[1];
      api.getDocById(docToGet).then((response) => {
        const url = window.URL.createObjectURL(response.data);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fName);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      });
    });
  }

  function shortList(){
    api.shortlistApplicant(uId,job.postingId)
    .then(() => {alert("Successfully shortlist the applicant.")});
  }
  function reject(){
    api.rejectApplicant(uId,job.postingId)
    .then(() => {alert("Successfully reject the applicant.")});
  }

  return (
    userSkills && job && <div>
      <Navbar />
      <div className="flex flex-1 flex-col">
        <div className='py-6' />
        <form className="space-y-8 divide-y divide-gray-200">
          <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
            <div className="space-y-6 sm:space-y-5">
              <div>
                <h3 className="text-lg font-medium  leading-6 text-gray-900">Applicant Detail</h3>
              </div>

            </div>
            <div className="space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  First Name
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    value={firstName}
                    disabled
                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                  />
                </div>
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Last Name
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    value={lastName}
                    disabled
                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                  />
                </div>
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Citizenship
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    value={citizenship}
                    disabled
                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                  />
                </div>
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Race
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    value={race}
                    disabled
                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Introduction
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    disabled
                    value={aboutMe}
                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Education
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <div>
                    <label htmlFor="email" className="flex text-sm font-medium text-gray-500">
                      Highest Level
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={level}
                        disabled
                        className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className='py-3' />
                  <div>
                    <label htmlFor="email" className="flex text-sm font-medium text-gray-500">
                      School Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={school}
                        disabled
                        className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className='py-3' />
                  <div>
                    <label htmlFor="email" className="flex text-sm font-medium text-gray-500">
                      Graduate Year
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={year}
                        disabled
                        className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="street-address" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Work experience
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <WorkList templateWorks={works} />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Skills
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  {userSkills.map((skill) => (<div className="flex space-x-2">
                    <div>
                      <label htmlFor="email" className="flex text-sm font-medium text-gray-500">
                        Skill
                      </label>
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        value={skill.skillset.skillsetName}
                        disabled
                        className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="flex text-sm font-medium text-gray-500">
                        Level
                      </label>
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        value={skill.skillLevel}
                        disabled
                        className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                      />
                    </div>
                  </div>))}
                </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="region" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Language
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    value={languages.toString()}
                    disabled
                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Recommendations
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <RecommendationList templateRecommendations={recommendations} />
                </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  CV
                </label>
                <div className="flex mt-1 sm:col-span-2 sm:mt-0">
                  {curfileName !== null &&
                    <div className="flex space-x-3">
                      <label  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        {curfileName}
                      </label>
                      <button
                        type="button"
                        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={() => downloadFile("CV")}
                      >
                        <ArrowDownTrayIcon
                          className="md:-ml-0.5 md:mr-2 h-4 w-4"
                          aria-hidden="true"
                        />
                        <span className="hidden md:block">Download CV</span>
                      </button>
                    </div>
                  }
                </div>

                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Transcript
                </label>
                <div className="flex mt-1 sm:col-span-2 sm:mt-0">
                  {curtfileName !== null &&
                    <div className="flex space-x-3">
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        {curtfileName}
                      </label>
                      <button
                        type="button"
                        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={() => downloadFile("T")}
                      >
                        <ArrowDownTrayIcon
                          className="md:-ml-0.5 md:mr-2 h-4 w-4"
                          aria-hidden="true"
                        />
                        <span className="hidden md:block">Download Transcript</span>
                      </button>
                    </div>
                  }
                </div>
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Cover Letter
                </label>
                <div className="flex mt-1 sm:col-span-2 sm:mt-0">
                  <button
                    type="button"
                    className="inline-flex  rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => downloadFile("CL")}
                  >
                    <ArrowDownTrayIcon
                      className="md:-ml-0.5 md:mr-2 h-4 w-4"
                      aria-hidden="true"
                    />
                    <span className="hidden md:block">Download Cover Letter</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => history.push({ pathname: "/hiring/allapplicants", state: { job: job } })}
                className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Back
              </button>
              {applicant.status=='PENDING' && <button
                type="button"
                onClick = {()=>shortList()}
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Shortlist
              </button>}
              {(applicant.status=='PENDING' || applicant.status=='SHORTLISTED') && <button
                type="button"
                onClick = {()=>reject()}
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Reject
              </button>}
              {applicant.status=='SHORTLISTED' && <button
                type="button"
                onClick = {()=>setOpen(true)}
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Offer
              </button>}
              <Offer open={open} setOpen={setOpen} uId={uId} postingId={postId}/>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
