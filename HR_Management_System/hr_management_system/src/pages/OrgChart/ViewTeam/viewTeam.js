import Navbar from "../../../components/Navbar.js";
import { useState, useEffect } from "react";
import api from "../../../utils/api.js";
//import axios from 'axios';

export default function ViewTeam() {
  //   const [table, setTable] = useState([]);
  //   const [error, setError] = useState([]);
  //
  //    useEffect( () => {
  //           getAllDepartment()
  //       }, [])
  //
  //       function getAllDepartment(){
  //           async function fetch(){
  //           axios.get("http://localhost:9191/api/v1/department")
  //             .then((response) =>
  //               setTable(response.data)
  //             )
  //             .catch((error) => (
  //               setError(error)
  //             ))}
  //             fetch()
  //
  //         }

  //shihan 3/10/2022
  const [teamId, setTeamId] = useState(1);
  const [team, setTeam] = useState([]);

  useEffect(() => {
    api.getTeam(teamId).then((response) => {
      setTeam(response.data);
      console.log(team);
    });
  });

  return (
    <>
      {team.outlet ? (
        <>
          {/* <Navbar/> */}
          <div className="bg-[#13AEBD] rounded-xl p-10 m-10">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-xl font-semibold text-gray-900">
                    {team.teamName}
                  </h1>
                  <p className="mt-2 text-sm text-gray-700">
                    A list of all employees of the {team.teamName} including
                    their name, title, email and role.
                  </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                  >
                    Add user
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
                          <tr key={team.teamHead.firstName}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  {/* <img
                              className="h-10 w-10 rounded-full"
                              src={team.teamHead.profilePic}
                              alt=""
                            /> */}
                                </div>
                                <div className="ml-4">
                                  <div className="font-medium text-gray-900">
                                    {team.teamHead.firstName +
                                      " " +
                                      team.teamHead.lastName}
                                  </div>
                                  <div className="text-gray-500">
                                    {team.teamHead.workEmail}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {/* <div className="text-gray-900">
                            {team.teamHead.position}
                          </div> */}
                              {/* <div className="text-gray-500">
                            {team.teamHead.department}
                          </div> */}
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
                                <span className="sr-only">
                                  , {team.teamHead.firstName}
                                </span>
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
                              Name
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Role
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              {/* Position */}
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              {/* Status */}
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
                          {team.users.map((person) => (
                            <tr key={person.firstName}>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                <div className="flex items-center">
                                  <div className="h-10 w-10 flex-shrink-0">
                                    {/* <img
                                className="h-10 w-10 rounded-full"
                                src={person.profilePic}
                                alt=""
                              /> */}
                                  </div>
                                  <div className="ml-4">
                                    <div className="font-medium text-gray-900">
                                      {person.firstName + " " + person.lastName}
                                    </div>
                                    <div className="text-gray-500">
                                      {person.workEmail}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {person.userRole}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <div className="text-gray-900">
                                  {/* {person.position} */}
                                </div>
                                <div className="text-gray-500">
                                  {/* {person.department} */}
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                  {/* Active */}
                                </span>
                              </td>

                              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                <a
                                  href="#"
                                  className="text-indigo-600 hover:text-indigo-900"
                                >
                                  Move An Employee
                                  <span className="sr-only">
                                    , {person.name}
                                  </span>
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
      ) : (
        <div className="bg-cyan-300">
          <div className="font-mono absolute mx-auto text-center w-screen text-6xl mt-9">
            <h1>loading...</h1>
          </div>
          <img
            className="object-scale-down h-screen mx-auto"
            src="https://acegif.com/wp-content/uploads/gif/hamster-wheel-46.gif"
            alt="loading..."
          ></img>
        </div>
      )}
      ;
    </>
  );
}
