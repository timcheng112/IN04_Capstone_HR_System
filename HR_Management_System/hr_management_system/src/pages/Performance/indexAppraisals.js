import { React, Fragment } from "react";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { getUserId } from "../../utils/Common";
import { useHistory } from "react-router-dom";
import PerformanceSidebar from "../../components/Sidebar/Performance";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Moment from "react-moment";
import AddAppraisalModal from "../../features/performance/AddAppraisalModal";


  const locations = [
    {
      name: 'Appraisal Cat 1',
      people: [
        { name: 'Cherry', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
        { name: 'corn', title: 'Designer', email: 'courtney.henry@example.com', role: 'Admin' },
      ],
      
    },
    {
      name: 'Team2',
      people: [
        { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
        { name: 'Courtney Henry', title: 'Designer', email: 'courtney.henry@example.com', role: 'Admin' },
      ],
    },

  
    // More people...
  ]
const people = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    name: "Walton Lsdfsfs",
    title: "Front-end Developer",
    email: "lindsay.walto@example.com",
    role: "Member",
  },
];
export default function Appraisals() {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [hrMode, setHrMode] = useState(false);
  const [appraisalPeriods, setAppraisalPeriods] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [currentPeriod, setCurrentPeriod] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [newStart, setNewStart] = useState("");
  const [newEnd, setNewEnd] = useState("");
  const history = useHistory();
  const [addAppraisalOpen, setAddAppraisalOpen] = useState(false);


  useEffect(() => {
    api
      .getUser(getUserId())
      .then((response) => {
        setUser(response.data);
        //console.log(user);
      })
      .catch((error) => setError(error));

    api.getAllAppraisalPeriods().then((response) => {
      setAppraisalPeriods(response.data);
      setSelectedPeriod(response.data[0]);
      //console.log(response.data[0]);
    });

    api.getAppraisalPeriodByYear(new Date().getFullYear()).then((response) => {
      setCurrentPeriod(response.data);
      setStartDate(response.data.startDate);
      setEndDate(response.data.endDate);
      console.log(response.data);
    });
  }, []);

  if (error) return `Error`;

  const handleSubmit = (evt) => {}
  const handleEdit = (evt) => {}


  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div className="">
      <Navbar />
      <AddAppraisalModal
            open={addAppraisalOpen}
            onClose={() => setAddAppraisalOpen(false)}
          />
      <div className="flex">
        <div className="flex-1">
          <PerformanceSidebar
            currentPage={{
              name: "Promotion",
              href: "/career/promotion",
              current: true,
            }}
          />
        </div>
      </div>
      <div className="py-10">
        <main className="flex-1">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Appraisal</h1>
          </div>
          <div className="flex items-center">
            <div className="mt-4 ml-auto mr-6">
              {user !== null && user.hrEmployee && (
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                  onClick={() => setHrMode(!hrMode)}
                >
                  HR Mode
                </button>
              )}
            </div>
          </div>
          {hrMode ? (
              <div>
                <div className="sm:flex-auto">
                  <h1 className="text-xl font-semibold text-indigo-800 mb-10">
                    Goals HR Mode
                  </h1>
                </div>
                {selectedPeriod ? (
                  <div>
                    <h1 className="mx-2 font-sans font-semibold text-xl mb-5">
                      Current Goal Period
                    </h1>
                    
                    {editMode ? (
                      <>
                        <form onSubmit={handleEdit}>
                          <div className="flex flex-row justify-center">
                            <div>
                              <label
                                htmlFor="start-date"
                                className="block text-sm font-sans font-medium text-gray-700"
                              >
                                Start Date
                              </label>
                              <div className="mt-1">
                                <input
                                  type="date"
                                  name="start-date"
                                  id="start-date"
                                  className="block w-full rounded-full border-gray-300 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  onChange={(s) => setStartDate(s.target.value)}
                                  value={startDate}
                                />
                              </div>
                            </div>
                            {"to"}
                            <div>
                              <label
                                htmlFor="end-date"
                                className="block text-sm font-sans font-medium text-gray-700"
                              >
                                End Date
                              </label>
                              <div className="mt-1">
                                <input
                                  type="date"
                                  name="end-date"
                                  id="end-date"
                                  className="block w-full rounded-full border-gray-300 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  onChange={(e) => setEndDate(e.target.value)}
                                  value={endDate}
                                />
                              </div>
                            </div>
                          </div>
                          <button
                            type="submit"
                            className="inline-flex items-center mt-5 px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Update
                          </button>
                          <button
                            type="button"
                            className="inline-flex items-center mt-5 ml-5 px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => setEditMode(false)}
                          >
                            Cancel
                          </button>
                        </form>
                      </>
                    ) : (
                      <>
                        <div className="flex flex-row justify-center">
                          <Moment
                            parse="YYYY-MM-DD"
                            className="mx-2 font-sans font-semibold"
                            locale="Asia/Singapore"
                            format="DD/MM/YYYY"
                          >
                            {currentPeriod.startDate}
                          </Moment>
                          <h1 className="mx-2 font-sans font-semibold">to</h1>
                          <Moment
                            parse="YYYY-MM-DD"
                            className="mx-2 font-sans font-semibold"
                            locale="Asia/Singapore"
                            format="DD/MM/YYYY"
                          >
                            {currentPeriod.endDate}
                          </Moment>
                        </div>
                        <button
                          type="button"
                          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 mt-5 px-4 py-2 text-md font-sans font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={() => {
                            setEditMode(!editMode);
                            setStartDate(currentPeriod.startDate);
                            setEndDate(currentPeriod.endDate);
                          }}
                        >
                          <PencilIcon className="h-5 w-5 mr-2" />
                          Edit
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center rounded-md ml-5 border border-transparent bg-indigo-600 mt-5 px-4 py-2 text-md font-sans font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          // onClick={handleDeleteGoalPeriod}
                        >
                          <TrashIcon className="h-5 w-5 mr-2" />
                          Delete
                        </button>
                      </>
                    )}

                    <div className="mt-8 flex flex-col mx-20">
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
                                    Work Email
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                  >
                                    Financial
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                  >
                                    Business
                                  </th>
                                  <th
                                    scope="col"
                                    className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                                  >
                                    <span className="sr-only">View</span>
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200 bg-white">
                                {people.map((person) => (
                                  <tr key={person.email}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-left text-gray-900 sm:pl-6">
                                      {person.name}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left ">
                                      {person.title}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left ">
                                      {person.email}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left ">
                                      {person.role}
                                    </td>
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm text-left font-medium sm:pr-6">
                                      <a
                                        href="/home"
                                        className="text-indigo-600 hover:text-indigo-900"
                                      >
                                        View
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
                ) : (
                  <>
                    <form onSubmit={handleSubmit}>
                      <p className="mt-2 text-sm text-gray-800 mb-5">
                        The period for goal submission has not been created for
                        this year. Please add one.
                      </p>
                      <div className="flex flex-row justify-center">
                        <div>
                          <label
                            htmlFor="start-date"
                            className="block text-sm font-sans font-medium text-gray-700"
                          >
                            Start Date
                          </label>
                          <div className="mt-1">
                            <input
                              type="date"
                              name="start-date"
                              id="start-date"
                              className="block w-full rounded-full border-gray-300 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              onChange={(s) => setNewStart(s.target.value)}
                            />
                          </div>
                        </div>
                        {"to"}
                        <div>
                          <label
                            htmlFor="end-date"
                            className="block text-sm font-sans font-medium text-gray-700"
                          >
                            End Date
                          </label>
                          <div className="mt-1">
                            <input
                              type="date"
                              name="end-date"
                              id="end-date"
                              className="block w-full rounded-full border-gray-300 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              onChange={(e) => setNewEnd(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="inline-flex items-center mt-5 px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Create
                      </button>
                    </form>
                  </>
                )}
              </div>
            ) : <div>put blank here first. supposed to toggle "No appraisal has been created"</div>    }



            {/*appraisal forms  */}
      <hr style={{height: '2px', margin:'12px'}}/>
          <div className="px-4 sm:px-6 lg:px-8 m-16">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Users</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, title, email and role.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          {/* <AddAppraisalModal
            open={addAppraisalOpen}
            onClose={() => setAddAppraisalOpen(false)}
          /> */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            onClick={() => setAddAppraisalOpen()}
          >
            Add appraisal
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
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Title
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Role
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
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
                          className={classNames(personIdx === 0 ? 'border-gray-300' : 'border-gray-200', 'border-t')}
                        >
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {person.name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.title}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.email}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.role}</td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <a href="#" className="text-indigo-600 hover:text-indigo-900">
                              Edit<span className="sr-only">, {person.name}</span>
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
            

        </main>
      </div>
    </div>
  );
}
