import { Fragment, useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import {
  BriefcaseIcon,
  CalendarIcon,
  PlusIcon,
  ChevronRightIcon,
  CurrencyDollarIcon,
  LinkIcon,
  BookmarkIcon,
  UserCircleIcon as UserCircleIconMini,
} from '@heroicons/react/20/solid'
import { useLocation } from 'react-router'
import { getUserId } from "../../utils/Common.js";
import api from "../../utils/api";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function JobOffer() {
  const location = useLocation();
  const [job, setJob] = useState(null);
  const [title, setTitle] = useState("")
  const [jobType, setJobType] = useState("");
  const [salary, setSalary] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [postDate, setPostDate] = useState("")
  const [startDate, setStartDate] = useState("")
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [requirements, setRequirements] = useState([]);
  const [apply, setApply] = useState([])
  const [help,setHelp] = useState(false)


  const [user, setUser] = useState(getUserId());
  const [error, setError] = useState();

  const [open, setOpen] = useState(false);

  function accept() {
    console.log("accept offer")
//    api.addUserBookmark(user, location.state.job.postingId)
//      .then(() => alert("Successfully bookmark."))
//      .catch((error) => setError(error));
  }

  function reject() {
      console.log("reject offer")
  //    api.addUserBookmark(user, location.state.job.postingId)
  //      .then(() => alert("Successfully bookmark."))
  //      .catch((error) => setError(error));
    }

  useEffect(() => {
    console.log(location.state.job)
    setTitle(location.state.job.jobTitle)
    setJobType(location.state.job.jobType)
    setSalaryMin(location.state.job.salaryMin)
    setSalaryMax(location.state.job.salaryMax)
    setPostDate(location.state.job.postDate)
    setStartDate(location.state.job.preferredStartDate)
    setDescription(location.state.job.jobDescription)
    setStatus(location.state.job.status)
    setRequirements(location.state.job.jobPostRequirements)
    setJob(location.state.job)
  }, [location]);

  return (
    <>
      <Sidebar />
      <div className="flex flex-1 flex-col md:pl-64">
        <header className="bg-gray-50 py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between">
            <div className="min-w-0 flex-1">
              <nav className="flex" aria-label="Breadcrumb">
                <ol role="list" className="flex items-center space-x-4">
                  <li>
                    <div>
                      <a href="/jobposting" className="text-sm font-medium text-gray-500 hover:text-gray-700">
                        Jobs
                      </a>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                      <a className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                        Job Offer Detail
                      </a>
                    </div>
                  </li>
                </ol>
              </nav>
              <div className='py-2' />
              <h1 className="mt-2 text-2xl flex font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                {title.charAt(0).toUpperCase() + title.slice(1)}
              </h1>
              <div className='py-2' />
              <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-8">
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <BriefcaseIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                  {jobType}
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <CurrencyDollarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                  ${salaryMin}k &ndash; ${salaryMax}k
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                  Post on {postDate}
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  {status == 'CREATED' && <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-800">
                    OPEN
                  </span>}
                  {status !== 'CREATED' && <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-800">
                    {status}
                  </span>}
                </div>
              </div>
            </div>
            {status !== 'CLOSED'&& <div className="mt-5 flex xl:mt-0 xl:ml-4">
              <span className="ml-3 hidden sm:block">
                <button
                  type="button"
                  onClick={() => accept()}
                  className="inline-flex items-center rounded-md border border-red-500 bg-white px-4 py-2 text-sm font-medium text-red-500 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  <BookmarkIcon className="-ml-1 mr-2 h-5 w-5 text-red-400" aria-hidden="true" />
                  Accept
                </button>
              </span>

              <span className="ml-3 hidden sm:block">
                <button
                  type="button"
                  onClick={() => reject()}
                  className="inline-flex items-center rounded-md border border-red-500 bg-white px-4 py-2 text-sm font-medium text-red-500 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  <BookmarkIcon className="-ml-1 mr-2 h-5 w-5 text-red-400" aria-hidden="true" />
                  Reject
                </button>
              </span>

            </div>}
          </div>
        </header>
        <main className="pt-8 pb-16">
          <div className="flex space-x-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="px-4 ">
              <h2 className="flex text-lg font-medium text-gray-900">Description</h2>
            </div>
            <textarea
              id="description"
              name="description"
              rows={5}
              value={description}
              disabled
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className='py-3' />
          <div className="flex space-x-12 mx-auto  sm:px-6 lg:px-8">
            <div className="px-4 ">
              <h2 className="flex text-lg font-medium text-gray-900">StartDate</h2>
            </div>
            <textarea
              id="description"
              name="description"
              rows={2}
              disabled
              defaultValue={startDate}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className='py-5' />
          <div className="flex space-x-12 mx-auto  sm:px-6 lg:px-8">
            <div className="px-4 ">
              <h2 className="flex text-lg font-medium text-gray-900">Requirements</h2>
            </div>
            {requirements.map((skill) => (
              <span className="inline-flex items-center rounded-md bg-indigo-100 px-2.5 py-1.5 text-sm font-medium text-indigo-800">
                <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-indigo-400" fill="currentColor" viewBox="0 0 8 8">
                  <circle cx={4} cy={4} r={3} />
                </svg>
                {skill.skillsetName}
              </span>
            ))}
          </div>
        </main>
      </div>
    </>
  )
}
