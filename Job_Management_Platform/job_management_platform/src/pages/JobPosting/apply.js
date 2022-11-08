import Sidebar from "../../components/Sidebar"
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import MyApplicationOption from "../../features/JobApplication/MyApplicationOption";
import api from "../../utils/api.js";
import { getUserId } from "../../utils/Common.js";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function JobApplication() {
  const[jobs, setJobs] = useState([])
  const [user, setUser] = useState(getUserId()); 
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [error, setError] = useState(null);
  const [searchParam] = useState([
    "jobTitle"
  ]);

  useEffect(() => {
    api
      .getApplicantApplications(user)
      .then((response) => {
        setJobs(response.data);
        setFilteredJobs(response.data);
        console.log(response.data);
      })
      .catch((error) => setError(error));
  }, []);

  function search(e, items) {
    const value = e.target.value;
    console.log(items);

    let finding = Array.of(value.toLowerCase());
    console.log(finding);
    let filtered = new Set();

    var titleFilter = items.filter(x => finding.some(y => x.jobPosting.jobTitle.toLowerCase().indexOf(y) != -1))
    titleFilter.forEach(item => filtered.add(item))

    var descFilter = items.filter(x => finding.some(y => x.jobPosting.jobDescription.toLowerCase().indexOf(y) != -1))
    descFilter.forEach(item => filtered.add(item))

    var jtFilter = items.filter(x => finding.some(y => x.jobPosting.jobType.toLowerCase().indexOf(y) != -1))
    jtFilter.forEach(item => filtered.add(item))

    var statusFilter = items.filter(x => finding.some(y => x.status.toLowerCase().indexOf(y) != -1))
    statusFilter.forEach(item => filtered.add(item))

//    console.log(filtered);
    setFilteredJobs(Array.from(filtered));
  }

  return (
    <>
      <div>
        <Sidebar />
        <div className="flex flex-1 flex-col md:pl-64">
          <div className='py-6'/>
          <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
            <h3 className="text-lg  mx-10 font-medium leading-6 text-gray-900">My Application</h3>
            <div className="mt-3 mx-20 sm:mt-0 sm:ml-4">
              <label htmlFor="desktop-search-candidate" className="sr-only">
                Search
              </label>
              <div className="flex rounded-md shadow-sm">
                <div className="relative flex-grow focus-within:z-10">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    id="search"
                    name="search"
                    className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Search"
                    type="search"
                    onChange={(e) => {
                      search(e, jobs);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="mt-8 flex flex-col">
              <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900  sm:pl-6"
                          >
                            Title
                          </th>
                          <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                            Description
                          </th>
                          <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                            Job Type
                          </th>
                          <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                            Application Status
                          </th>
                          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 md:pr-0">
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {filteredJobs.map((job) => (
                          <tr key={job.jobPosting.jobTitle}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-6">
                              {job.jobPosting.jobTitle}
                            </td>
                            <td className="whitespace-nowrap py-4 px-3 text-left text-sm text-gray-500">{job.jobPosting.jobDescription}</td>
                            <td className="whitespace-nowrap py-4 px-3 text-left text-sm text-gray-500">{job.jobPosting.jobType}</td>
                            <td className="whitespace-nowrap py-4 px-3 text-left text-sm text-gray-500">{job.status}</td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <MyApplicationOption application={job.jobPosting} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
