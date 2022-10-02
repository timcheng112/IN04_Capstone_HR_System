import Navbar from "../../../components/Navbar.js";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../utils/api";
import axios from "axios";

/* This example requires Tailwind CSS v2.0+ */
const teams = [
  {
    name: "Seng Kang Outlet",
    outlet: "Compass One",
    teamLeader: "Linsay Walton",
    position: "Manager",
  },
  {
    name: "Bishan Outlet",
    outlet: "Junction 8",
    teamLeader: "Timothy Wango",
    position: "Manager",
  },
  // More team...
];

const people = [
  {
    name: "Wong Shi Han",
    position: "Volleyball Ace",
    department: "Information Systems",
    email: "wshihan@u.nus.edu",
    role: "Ace",
    image:
      "data:image/jpeg;base64,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",
  },
];

export default function ViewDepartment() {
  const [dept, setDept] = useState([]);
  const [person, setDeptHead] = useState([]);
  const [teams, setTeams] = useState([]);
  const [deptId, setDeptId] = useState([]);

  //   function getURL(){
  //     const url = window.location.href;
  //     const deptId = url.slice(-1);
  //     console.log(url);
  // }

  useEffect(() => {
    const url = window.location.href;
    // console.log(url);
    // console.log(url.substring(url.length -1));
    setDeptId(url.slice(-1));
    // console.log(deptId);
    // api.getDept(deptId).then((response) => {
    //   setDept(response.data);
    //   setDeptHead(response.data.departmentHead);
    //   setTeams(response.data.teams);
    // });
    // axios.get(`http://localhost:9191/api/department/${url.slice(-1)}`).then((response) => {
    axios
      .get(`http://localhost:9191/api/department/${url.slice(-1)}`)
      .then((response) => {
        setDept(response.data);
        setDeptHead(response.data.departmentHead);
        console.log(response.data.departmentHead.firstName);
        setTeams(response.data.teams);
        console.log(response.data.departmentHead);
      });

    // console.log(dept);
  }, [deptId, dept, teams]);

  return (
    dept &&
    deptId && (
      <>
        {/*<Navbar/>*/}
        <div className="bg-[#13AEBD] rounded-xl p-10 m-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-xl font-semibold text-gray-900">
                  Sales Department
                </h1>
                <p className="mt-2 text-sm text-gray-700">
                  A list of all the teams in the Sales Department including
                  their name, outlet and supervisor.
                </p>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
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
                        <tr key={person.email}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={""}
                                  alt=""
                                />
                              </div>
                              <div className="ml-4">
                                <div className="font-medium text-gray-900">
                                  {person.name}
                                </div>
                                <div className="text-gray-500">
                                  {person.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <div className="text-gray-900">
                              {person.userRole}
                            </div>
                            <div className="text-gray-500">
                              {person.department}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                              Active
                            </span>
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <a
                              href="https://www.google.com"
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Change
                              <span className="sr-only">, {person.name}</span>
                            </a>
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
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Outlet
                          </th>
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
                            Position
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
                            key={team.email}
                            className={
                              teamIdx % 2 === 0 ? undefined : "bg-gray-50"
                            }
                          >
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {team.name}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {team.outlet}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {team.teamLeader}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {team.position}
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <a
                                href="https://www.google.com"
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                View
                                <span className="sr-only">, {team.name}</span>
                              </a>
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
