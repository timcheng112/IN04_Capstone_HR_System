import Sidebar from "../../components/Sidebar"
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import api from "../../utils/api";
import JobPostingOption from "../../features/JobApplication/JobPostingOption";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function JobPosting() {

  const skills = [{ id: 1, name: 'java' }, { id: 2, name: 'python' }, { id: 3, name: 'matlab' }]

  const[jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([jobs]);
  const [searchParam] = useState([
    "jobTitle","status"
  ]);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .getAllJobPosts()
      .then((response) => {
        setJobs(response.data);
        setFilteredJobs(response.data);
        console.log(response.data);
      })
      .catch((error) => setError(error));
  }, []);

  function search(e, items) {
    const value = e.target.value;
    setFilteredJobs(
      items.filter((item) => {
        return searchParam.some((newItem) => {
          return (
            item[newItem]
              .toString()
              .toLowerCase()
              .indexOf(value.toLowerCase()) > -1
          );
        });
      })
    );
  }

  return (
    <>
      <div>
        <Sidebar />
        <div className="flex flex-1 flex-col md:pl-64">
          <div className='py-6'/>
          <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
            <h3 className="text-lg  mx-10 font-medium leading-6 text-gray-900">Job Postings</h3>
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
                            Type
                          </th>
                          <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                            Status
                          </th>
                          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 md:pr-0">
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {filteredJobs.map((job) => (
                          <tr key={job.jobTitle}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-6">
                              {job.jobTitle}
                            </td>
                            <td className="whitespace-nowrap py-4 px-3 text-left text-sm text-gray-500">{job.jobDescription}</td>
                            <td className="whitespace-nowrap py-4 px-3 text-left text-sm text-gray-500">{job.jobType}</td>
                            <td className="whitespace-nowrap py-4 px-3 text-left text-sm text-gray-500">{job.status = 'CREATED' ? 'OPEN' : job.status}</td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <JobPostingOption job = {job}/>
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
