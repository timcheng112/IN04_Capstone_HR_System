import Navbar from "../../../components/Navbar.js";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../utils/api";
import axios from "axios";
import AddOutletModal from "./addOutletModal.js";
//import AddTeamModal from "./addTeamModal.js";
import ChangeDeptHeadModal from "./changeDeptHeadModal.js";
// TODO: @SHIHAN PLEASE HELP TO CHECK THIS

/* This example requires Tailwind CSS v2.0+ */

export default function ViewDepartment() {
  const [dept, setDept] = useState([]);
  const [deptHead, setDeptHead] = useState([]);
  const [teams, setTeams] = useState([]);
  const [deptId, setDeptId] = useState([]);
  const history = useHistory();
  const [openAdd, setOpenAdd] = useState(false);
  const [openAddTeam, setOpenAddTeam] = useState(false);
  const [openChange, setOpenChange] = useState(false);

  //   function getURL(){
  //     const url = window.location.href;
  //     const deptId = url.slice(-1);
  //     console.log(url);
  // }

  useEffect(() => {
    const url = window.location.href;
    const tempDeptId = url.substring(31);

    // console.log(url);
    // console.log(url.substring(url.length -1));
    setDeptId(url.substring(31));

    //console.log(url.substring(31));
    // api.getDept(deptId).then((response) => {
    //   setDept(response.data);
    //   setDeptHead(response.data.departmentHead);
    //   setTeams(response.data.teams);
    // });
    // axios.get(`http://localhost:9191/api/department/${url.slice(-1)}`).then((response) => {
    api.getDept(tempDeptId).then((response) => {
      setDept(response.data);
      setDeptHead(response.data.departmentHead);
      console.log(response.data.departmentHead.firstName);
      setTeams(response.data.teams);
      console.log(response.data.departmentHead);
    });

    // console.log(dept);
  }, [dept]);

  return (
    dept &&
    deptId &&
    teams && (
      <>
        <Navbar />
        <AddOutletModal
          open={openAdd}
          onClose={() => setOpenAdd(false)}
          deptId={deptId}
        />
        {/* <AddTeamModal
          open={openAddTeam}
          onClose={() => setOpenAddTeam(false)}
          deptId={deptId}
        /> */}

        <ChangeDeptHeadModal
          deptId={deptId}
          open={openChange}
          onClose={() => setOpenChange(false)}
        />

        <div className="bg-[#13AEBD] rounded-xl p-10 m-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <a href="/viewOrg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="border-2 rounded-full border-black w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                />
              </svg>
            </a>

            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-xl font-semibold text-gray-900">
                  Sales Department
                </h1>
                <p className="mt-2 text-sm text-gray-700">
                  A list of all the teams in the Department including their
                  name, outlet and supervisor.
                </p>
              </div>

              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <button
                  onClick={() => setOpenAdd(true)}
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                >
                  Add Outlet
                </button>
              </div>

              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                  onClick={() => setOpenAddTeam(true)}
                >
                  Add Team
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
                            Department Head
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Position
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                          >
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        <tr key={deptHead.email}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={""}
                                  alt=""
                                />
                              </div>
                              <div className="">
                                <div className="font-medium text-gray-900">
                                  {deptHead.firstName} {deptHead.lastName}
                                </div>
                                <div className="text-gray-500">
                                  {deptHead.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap py-4 text-sm text-gray-500">
                            <div className="text-gray-900">
                              {deptHead.userRole}
                            </div>
                            <div className="text-gray-500">
                              {deptHead.department}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                              Active
                            </span>
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <button
                              onClick={() => {
                                setOpenChange(true);
                              }}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Change
                              <span className="sr-only">, {deptHead.name}</span>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
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
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                          >
                            Team Name
                          </th>
                          {/* <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Outlet
                          </th> */}
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Team Leader
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Department
                          </th>
                          <th
                            scope="col"
                            className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                          >
                            <span className="sr-only">Edit</span>
                          </th>
                          <th
                            scope="col"
                            className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                          >
                            <span className="sr-only">Disable</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {teams.map((team, teamIdx) => (
                          <tr
                            key={team.teamId}
                            className={
                              teamIdx % 2 === 0 ? undefined : "bg-gray-50"
                            }
                          >
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {team.teamName}
                            </td>
                            {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {team.outlet}
                            </td> */}
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {team.teamHead}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {team.department}
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <button
                                className="text-indigo-600 hover:text-indigo-900"
                                onClick={() =>
                                  history.push("/viewTeam/" + team.teamId)
                                }
                              >
                                View
                                <span className="sr-only">, {dept.name}</span>
                              </button>
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <a
                                href="https://www.google.com"
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                Delete
                                <span className="sr-only">, {team.name}</span>
                              </a>
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
      </>
    )
  );
}
