import Navbar from "../../components/Navbar";
import {
  EyeIcon,
  CheckIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import Tabs from "../../features/jobrequest/Tab";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../utils/api";
import { getUserId } from "../../utils/Common";
import RequestOption from "../../features/jobrequest/RequestOption";

const tabs = [
  { name: "Job Request", href: "/hiring/jobrequesthr", current: true },
  { name: "Job Post", href: "/hiring/jobpost", current: false },
];

export default function JobRequestHR() {
  const history = useHistory();
  const [requests, setRequests] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [filteredRequests, setFilteredRequests] = useState(requests);
  //  const [searchParam] = useState([
  //    "jobTitle", "status",
  //    "requestedBy"
  //  ]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    api
      .getUser(getUserId())
      .then((response) => {
        setUser(response.data);
        //        console.log(response.data);
      })
      .catch((error) => setError(error));
  }, []);

  useEffect(() => {
    api
      .getAllSubmittedJobRequests(getUserId())
      .then((response) => {
        setRequests(response.data);
        setFilteredRequests(response.data);
        console.log(response.data);
      })
      .catch((error) => setError(error));
  }, [refreshKey]);


  function search(e, items) {

    const value = e.target.value;
    //    console.log("looking for this value");
    //    console.log(value);
    let finding = Array.of(value.toLowerCase());
    //    console.log(finding);

    let filtered = new Set();
    var titleFilter = items.filter((x) =>
      finding.some((y) => x.jobTitle.toLowerCase().indexOf(y) != -1)
    );
    titleFilter.forEach((item) => filtered.add(item));

    var statusFilter = items.filter((x) =>
      finding.some((y) => x.status.toLowerCase().indexOf(y) != -1)
    );
    statusFilter.forEach((item) => filtered.add(item));

    var deptFilter = items.filter((x) =>
      finding.some(
        (y) => x.department.departmentName.toLowerCase().indexOf(y) != -1
      )
    );
    deptFilter.forEach((item) => filtered.add(item));

    var requestorFilter = items.filter((x) =>
      finding.some(
        (y) => x.requestedBy.firstName.toLowerCase().indexOf(y) != -1
      )
    );
    requestorFilter.forEach((item) => filtered.add(item));
    setFilteredRequests(Array.from(filtered));

    //    setFilteredRequests(
    //          items.filter((item) => {
    //            return searchParam.some((newItem) => {
    //              return (
    //                item[newItem]
    //                  .toString()
    //                  .toLowerCase()
    //                  .indexOf(value.toLowerCase()) > -1
    //              );
    //            });
    //          })
    //        );
  }

  return (
    <div className="">
      <Navbar />
      <div className="py-5"></div>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center space-x-4">
          <div className="sm:flex-auto">
            {/* <h1 className="text-xl font-semibold text-gray-900">Job Requests</h1> */}
            <Tabs tabs={tabs} />
          </div>
          <div className="w-full max-w-lg lg:max-w-xs">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                id="search"
                name="search"
                className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                placeholder="Search"
                type="search"
                onChange={(e) => {
                  search(e, requests);
                }}
              />
            </div>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              onClick={() => history.push("/hiring/newjobrequest")}
            >
              New Job Request
            </button>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Department
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Request Date
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Last Edited Date
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Requestor
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Status
                      </th>
                      {/* <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Edit</span>
                      </th> */}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {filteredRequests.map((request) => (
                      <tr key={request.requestId}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-6">
                          {request.jobTitle}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">
                          {request.department.departmentName}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">
                          {request.requestDate}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">
                          {request.lastEditedDate}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">
                          {request.requestedBy.firstName}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">
                          {request.status}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <RequestOption
                            request={request}
                            refreshKeyHandler={() =>
                              setRefreshKey((oldKey) => oldKey + 1)
                            }
                          />
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
  );
}
