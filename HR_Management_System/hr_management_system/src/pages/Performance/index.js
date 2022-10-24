import { Fragment, React } from "react";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { getUserId } from "../../utils/Common";
import { useHistory } from "react-router-dom";
import PerformanceSidebar from "../../components/Sidebar/Performance";
import {
  CheckCircleIcon,
  ChevronRightIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

const people = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  // More people...
];

const locations = [
  {
    name: "Earn 20% profit more than last year",
    people: [
      {
        name: "Lindsay Walton",
        title: "Front-end Developer",
        email: "lindsay.walton@example.com",
        role: "Member",
      },
      {
        name: "Courtney Henry",
        title: "Designer",
        email: "courtney.henry@example.com",
        role: "Admin",
      },
    ],
  },
  // More people...
];

const applications = [
  {
    applicant: {
      name: "Ricardo Cooper",
      email: "ricardo.cooper@example.com",
      imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    date: "2020-01-07",
    dateFull: "January 7, 2020",
    stage: "Completed phone screening",
    href: "#",
  },
  {
    applicant: {
      name: "Kristen Ramos",
      email: "kristen.ramos@example.com",
      imageUrl:
        "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    date: "2020-01-07",
    dateFull: "January 7, 2020",
    stage: "Completed phone screening",
    href: "#",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Performance() {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const history = useHistory();
  const date = new Date();

  useEffect(() => {
    api
      .getUser(getUserId())
      .then((response) => {
        setUser(response.data);
        console.log(user);
      })
      .catch((error) => setError(error));
  }, []);

  if (error) return `Error`;

  return (
    <div className="">
      <Navbar />
      <div className="flex">
        <div className="flex-1">
          <PerformanceSidebar
            currentPage={{
              name: "Current",
              href: "/performance",
              current: true,
            }}
          />
        </div>
      </div>
      <div className="py-10">
        <main className="flex-1">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-10">
              Current Performance goalPeriod(start date - end date)
            </h1>
          </div>
          <div>
            <div className="px-4 sm:px-6 lg:px-8 mb-5">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-xl font-semibold text-center">Goals</h1>
                </div>
              </div>
              <div className="px-4 sm:px-6 lg:px-8 mx-20">
                <div className="sm:flex sm:items-center">
                  <h2 className="text-l font-semibold text-left ml-5">
                    Financial ({people.length})
                  </h2>
                  <div className="sm:flex-auto"></div>
                  <div className="sm:mt-0 sm:ml-16 sm:flex-none">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                    >
                      Add
                    </button>
                  </div>
                </div>
                <div className="mt-8 flex flex-col">
                  <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table className="min-w-full">
                          <thead className="bg-white">
                            <tr>
                              <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                              >
                                Achievement
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                Created
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                Last Modified
                              </th>
                              <th
                                scope="col"
                                className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                              >
                                <span className="sr-only">Edit</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white">
                            {locations.map((location) => (
                              <Fragment key={location.name}>
                                <tr className="border-t border-gray-200">
                                  <th
                                    colSpan={5}
                                    scope="colgroup"
                                    className="bg-gray-50 px-4 py-2 text-left text-sm font-semibold text-gray-900 sm:px-6"
                                  >
                                    {location.name}
                                  </th>
                                </tr>
                                {location.people.map((person, personIdx) => (
                                  <tr
                                    key={person.email}
                                    className={classNames(
                                      personIdx === 0
                                        ? "border-gray-300"
                                        : "border-gray-200",
                                      "border-t"
                                    )}
                                  >
                                    <td className="whitespace-nowrap text-left py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                      {person.name}
                                    </td>
                                    <td className="whitespace-nowrap text-left px-3 py-4 text-sm text-gray-500">
                                      {person.title}
                                    </td>
                                    <td className="whitespace-nowrap text-left px-3 py-4 text-sm text-gray-500">
                                      {person.email}
                                    </td>
                                    <td className="relative whitespace-nowrap text-left py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                      <a
                                        href="#"
                                        className="text-indigo-600 font-semibold hover:text-indigo-900"
                                      >
                                        Edit
                                        <span className="sr-only">
                                          , {person.name}
                                        </span>
                                      </a>
                                    </td>
                                  </tr>
                                ))}
                              </Fragment>
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
          <div>
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto"></div>
              </div>
              <div className="px-4 sm:px-6 lg:px-8 mx-20">
                <div className="sm:flex sm:items-center">
                  <h2 className="text-l font-semibold text-left ml-5">
                    Business ({people.length})
                  </h2>
                  <div className="sm:flex-auto"></div>
                  <div className="sm:mt-0 sm:ml-16 sm:flex-none">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                    >
                      Add
                    </button>
                  </div>
                </div>
                <div className="mt-8 flex flex-col">
                  <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table className="min-w-full">
                          <thead className="bg-white">
                            <tr>
                              <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                              >
                                Achievement
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                Created
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                Last Modified
                              </th>
                              <th
                                scope="col"
                                className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                              >
                                <span className="sr-only">Edit</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white">
                            {locations.map((location) => (
                              <Fragment key={location.name}>
                                <tr className="border-t border-gray-200">
                                  <th
                                    colSpan={5}
                                    scope="colgroup"
                                    className="bg-gray-50 px-4 py-2 text-left text-sm font-semibold text-gray-900 sm:px-6"
                                  >
                                    {location.name}
                                  </th>
                                </tr>
                                {location.people.map((person, personIdx) => (
                                  <tr
                                    key={person.email}
                                    className={classNames(
                                      personIdx === 0
                                        ? "border-gray-300"
                                        : "border-gray-200",
                                      "border-t"
                                    )}
                                  >
                                    <td className="whitespace-nowrap text-left py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                      {person.name}
                                    </td>
                                    <td className="whitespace-nowrap text-left px-3 py-4 text-sm text-gray-500">
                                      {person.title}
                                    </td>
                                    <td className="whitespace-nowrap text-left px-3 py-4 text-sm text-gray-500">
                                      {person.email}
                                    </td>
                                    <td className="relative whitespace-nowrap text-left py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                      <a
                                        href="#"
                                        className="text-indigo-600 font-semibold hover:text-indigo-900"
                                      >
                                        Edit
                                        <span className="sr-only">
                                          , {person.name}
                                        </span>
                                      </a>
                                    </td>
                                  </tr>
                                ))}
                              </Fragment>
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
          <div>
            <div className="px-4 sm:px-6 lg:px-8 mt-10 mx-10">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-xl font-semibold text-center">
                    Appraisals
                  </h1>
                </div>
              </div>
              <div className="overflow-hidden bg-white shadow sm:rounded-md mt-5 mx-20">
                <ul role="list" className="divide-y divide-gray-200">
                  {applications.map((application) => (
                    <li key={application.applicant.email}>
                      <a
                        href={application.href}
                        className="block hover:bg-gray-50"
                      >
                        <div className="flex items-center px-4 py-4 sm:px-6">
                          <div className="flex min-w-0 flex-1 items-center">
                            <div className="flex-shrink-0">
                              <img
                                className="h-12 w-12 rounded-full"
                                src={application.applicant.imageUrl}
                                alt=""
                              />
                            </div>
                            <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                              <div>
                                <p className="truncate text-sm text-left font-medium text-indigo-600">
                                  {application.applicant.name}
                                </p>
                                <p className="mt-2 flex items-center text-sm text-gray-500">
                                  <EnvelopeIcon
                                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                    aria-hidden="true"
                                  />
                                  <span className="truncate">
                                    {application.applicant.email}
                                  </span>
                                </p>
                              </div>
                              <div className="hidden md:block">
                                <div>
                                  <p className="text-sm text-gray-900 text-left">
                                    <time dateTime={application.date}>
                                      {application.dateFull}
                                    </time>
                                  </p>
                                  <p className="mt-2 flex items-center text-sm text-gray-500">
                                    <CheckCircleIcon
                                      className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                                      aria-hidden="true"
                                    />
                                    {application.stage}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <ChevronRightIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </div>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div>
            <div className="px-4 sm:px-6 lg:px-8 mt-10 mx-10">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-xl font-semibold text-center">
                    Manager Reviews
                  </h1>
                </div>
              </div>
              <div className="overflow-hidden bg-white shadow sm:rounded-md mt-5 mx-20">
                <ul role="list" className="divide-y divide-gray-200">
                  {applications.map((application) => (
                    <li key={application.applicant.email}>
                      <a
                        href={application.href}
                        className="block hover:bg-gray-50"
                      >
                        <div className="flex items-center px-4 py-4 sm:px-6">
                          <div className="flex min-w-0 flex-1 items-center">
                            <div className="flex-shrink-0">
                              <img
                                className="h-12 w-12 rounded-full"
                                src={application.applicant.imageUrl}
                                alt=""
                              />
                            </div>
                            <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                              <div>
                                <p className="truncate text-sm text-left font-medium text-indigo-600">
                                  {application.applicant.name}
                                </p>
                                <p className="mt-2 flex items-center text-sm text-gray-500">
                                  <EnvelopeIcon
                                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                    aria-hidden="true"
                                  />
                                  <span className="truncate">
                                    {application.applicant.email}
                                  </span>
                                </p>
                              </div>
                              <div className="hidden md:block">
                                <div>
                                  <p className="text-sm text-gray-900 text-left">
                                    <time dateTime={application.date}>
                                      {application.dateFull}
                                    </time>
                                  </p>
                                  <p className="mt-2 flex items-center text-sm text-gray-500">
                                    <CheckCircleIcon
                                      className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                                      aria-hidden="true"
                                    />
                                    {application.stage}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <ChevronRightIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </div>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
