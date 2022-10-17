import Navbar from "../../components/Navbar";
import {
  EyeIcon,
  CheckIcon,
  XMarkIcon,
  MagnifyingGlassIcon
} from "@heroicons/react/20/solid";
import { useHistory } from 'react-router-dom';
import Tabs from '../../features/leave/Tab'
import { useState } from "react";
import AdminSidebar from "../../components/Sidebar/Admin";
import ApprovalModal from "../../features/leave/ApproveModal";
import RejectModal from "../../features/leave/RejectModal";
import ViewModal from "../../features/leave/ViewModal";

const leaves = [
  { id: 1, applicant: 'Xinyue', appliedDate: '2022-08-15', type: 'ANL', status: 'Created' },
  { id: 2, applicant: 'Matthew', appliedDate: '2022-08-17', type: 'MCL', status: 'Created' },
]

export default function Leave() {
  const history = useHistory();
  const [approve, setApprove] = useState(false);
  const [reject, setReject] = useState(false);
  const [view, setView] = useState(false);

  const [filteredLeaves, setFilteredLeaves] =
    useState(leaves);
  const [searchParam] = useState([
    "applicant"
  ]);

  function search(e, items) {
    const value = e.target.value;
    setFilteredLeaves(
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
    <div className="">
      <Navbar />
      <div className="flex">
        <div className="flex-1">
          <AdminSidebar pageTitle="Leaves" />
        </div>
      </div>
      <div className="py-5"></div>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center space-x-4">
          <div className="sm:flex-auto">
            {/* <h1 className="text-xl font-semibold text-gray-900">Job Requests</h1> */}
            <Tabs />
          </div>
          <div className="w-full max-w-lg lg:max-w-xs">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative">
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
                  search(e, leaves);
                }}
              />
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Applicant
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Applied Date
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Leave Type
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Status
                      </th>
                      {/* <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Edit</span>
                      </th> */}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {filteredLeaves.map((leave) => (
                      <tr key={leave.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-6">
                          {leave.applicant}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">{leave.appliedDate}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">{leave.type}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">{leave.status}</td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <div className="space-x-4">
                            <button
                              type="button"
                              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              onClick={() => setView(true)}
                            >
                              <EyeIcon
                                className="md:-ml-0.5 md:mr-2 h-4 w-4"
                                aria-hidden="true"
                              />
                              <span className="hidden md:block">view</span>
                            </button>

                            <button
                              type="button"
                              className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                              onClick={() => setApprove(true)}
                            >
                              <CheckIcon
                                className="md:-ml-0.5 md:mr-2 h-4 w-4"
                                aria-hidden="true"
                              />
                              <span className="hidden md:block">Approve</span>
                            </button>

                            <button
                              type="button"
                              className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                              onClick={() => setReject(true)}
                            >
                              <XMarkIcon
                                className="md:-ml-0.5 md:mr-2 h-4 w-4"
                                aria-hidden="true"
                              />
                              <span className="hidden md:block">Reject</span>
                            </button>
                          </div>
                          <ApprovalModal
                            open={approve}
                            setOpen={() => setApprove(false)}
                            leave={leave}/>
                          <RejectModal
                            open={reject}
                            setOpen={() => setReject(false)}
                            leave={leave}/>
                          <ViewModal
                            open={view}
                            setOpen={() => setView(false)}
                            leave={leave}/>
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
  )
}
