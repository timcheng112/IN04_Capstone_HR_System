import Navbar from "../../components/Navbar";
import {
  BriefcaseIcon,
  CalendarIcon,
  EyeIcon,
  ChevronRightIcon,
  CurrencyDollarIcon,
  EnvelopeIcon,
} from '@heroicons/react/20/solid'
import { useState, useEffect } from "react";
import { useHistory, useLocation } from 'react-router-dom';
import api from "../../utils/api";
import { getUserId } from "../../utils/Common";
import ApplicantList from "../../features/jobrequest/ApplicantList";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function JobApplicants() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [job, setJob] = useState(null);
  const [allcandidates, setAllCandidates] = useState([])
  const [interviewCandidates, setInterviewCandidates] = useState([])
  const [offerCandidates, setOfferCandidates] = useState([])
  const [rejectCandidates, setRejectCandidates] = useState([])

  const [all,setAll]= useState(true)
  const [interview,setInterview]= useState(false)
  const [offer,setOffer]= useState(false)
  const [reject,setReject]= useState(false)
  const location = useLocation();
  const history = useHistory();
  const tabs = [
    { name: 'Applied', current: all },
    { name: 'Interview', current: interview },
    { name: 'Offer',  current: offer },
    { name: 'Disqualified',  current: reject },
  ]
  const onChangeHandler = (tabName) => {
    if (tabName === "Applied") {
      setAll(true);
      setInterview(false);
      setOffer(false);
      setReject(false);
    } else if (tabName === "Interview") {
      setAll(false);
      setInterview(true);
      setOffer(false);
      setReject(false);
    } else if (tabName === "Offer") {
      setAll(false);
      setInterview(false);
      setOffer(true);
      setReject(false);
    } else {
      setAll(false);
      setInterview(false);
      setOffer(false);
      setReject(true);
    }
  };


  useEffect(() => {
    api
      .getUser(getUserId())
      .then((response) => {
        setUser(response.data);
        console.log(response.data)
      })
      .catch((error) => setError(error));
  }, []);

  useEffect(() => {
    setJob(location.state.job)
  }, []);

  useEffect(() => {
    api.findApplicationsByPostingId(location.state.job.postingId)
      .then((response) => {
        setAllCandidates(response.data);
        console.log(response.data)
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    api.getShortlistedApplicants(location.state.job.postingId)
      .then((response) => {
        setInterviewCandidates(response.data);
        console.log(response.data)
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    api.getOfferedApplicants(location.state.job.postingId)
      .then((response) => {
        setOfferCandidates(response.data);
        console.log(response.data)
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    api.getRejectedApplicants(location.state.job.postingId)
      .then((response) => {
        setRejectCandidates(response.data);
        console.log(response.data)
      })
      .catch((error) => console.log(error));
  }, []);


  return (
    job && <div>
      <Navbar />

      <header className="bg-gray-50 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between">
          <div className="min-w-0 flex-1">
            <nav className="flex" aria-label="Breadcrumb">
              <ol role="list" className="flex items-center space-x-4">
                <li>
                  <div>
                    {user !== null && !user.isHrEmployee && <a href="/hiring/jobrequest" className="text-sm font-medium text-gray-500 hover:text-gray-700">
                      Jobs
                    </a>}
                    {user !== null && user.isHrEmployee && <a href="/hiring/jobrequesthr" className="text-sm font-medium text-gray-500 hover:text-gray-700">
                      Jobs
                    </a>}
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                    <a href="/hiring/jobapplicants" className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                      Applicants
                    </a>
                  </div>
                </li>
              </ol>
            </nav>
            <div className="py-3" />
            <h1 className="flex mt-2 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {job.jobTitle.charAt(0).toUpperCase() + job.jobTitle.slice(1)}
            </h1>
            <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-8">
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <BriefcaseIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                {job.jobType}
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <CurrencyDollarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                ${job.salaryMin}k &ndash; ${job.salaryMax}k
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                Post on {job.postDate}
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="pt-0 pb-16">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0">
            <h2 className="flex text-lg font-medium text-gray-900">Candidates</h2>
            {/* Tabs */}
            <div className="sm:hidden">
              <label htmlFor="tabs" className="sr-only">
                Select a tab
              </label>
              {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
              <select
                id="tabs"
                name="tabs"
                className="mt-4 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
                value={tabs.find((tab) => tab.current).name}
              >
                {tabs.map((tab) => (
                  <option key={tab.name}>{tab.name}</option>
                ))}
              </select>
            </div>
            <div className="hidden sm:block">
              <div className="border-b border-gray-200">
                <nav className="mt-2 -mb-px flex space-x-8" aria-label="Tabs">
                  {tabs.map((tab) => (
                    <a
                      key={tab.name}
                      onClick={() => onChangeHandler(tab.name)}
                      className={classNames(
                        tab.current
                          ? 'border-purple-500 text-purple-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200',
                        'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                      )}
                    >
                      {tab.name}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>
          {all && <ApplicantList candidates = {allcandidates} job={job}/>}
          {interview && <ApplicantList candidates = {interviewCandidates}/>}
          {offer && <ApplicantList candidates = {offerCandidates}/>}
          {reject && <ApplicantList candidates = {rejectCandidates}/>}
        </div>
      </main>

    </div>
  );
}