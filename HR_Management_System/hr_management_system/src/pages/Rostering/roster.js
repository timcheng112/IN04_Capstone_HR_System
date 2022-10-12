import Navbar from "../../components/Navbar.js";
import { useState, useEffect } from "react";
import api from "../../utils/api.js";
import AddShiftModal from "../../features/rostering/AddShiftModal.js";
import ViewTemplateShiftsSlideover from "../../features/rostering/ViewTemplateShiftsSlideover.js";
import ComboBox from "../../components/ComboBox/ComboBox.js";

const people = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    name: "James Walton",
    title: "Front-end Developer",
    email: "James.walton@example.com",
    role: "Member",
  },
  // More people...
];

const outlets = [
  {
    id: 1,
    name: "Bishan Outlet",
  },
  {
    id: 2,
    name: "Marymount Outlet",
  },
  {
    id: 3,
    name: "Lentor Outlet",
  },
];
export default function Roster() {
  const [open, setOpen] = useState(false);
  const [openSlideover, setOpenSlideover] = useState(false);

  return (
    <>
      <Navbar />

      {/*Top Part Above the Table Need to unify the fire nation*/}
      <div className="px-4 sm:px-6 lg:px-8 mt-3">
        <div className="sm:flex sm:items-center">
          <div className="isolate inline-flex -space-x-px rounded-md shadow-sm mx-4">
            <ComboBox items={outlets} searchParam={["name"]} />
          </div>

          <div className="sm:flex sm:items-center">
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <a
                  href="#"
                  className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                >
                  Day
                </a>
                {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
                <a
                  href="#"
                  className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                >
                  Week
                </a>
              </nav>
            </div>
          </div>

          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Roster</h1>
            {/* <p className="mt-2 text-sm text-gray-700">
              We probably don't need text here.
            </p> */}
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Add user
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto ml-2"
              onClick={() => setOpenSlideover(true)}
            >
              View Template Shifts
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto ml-2"
              onClick={() => setOpen(true)}
            >
              Add a Shift (Temp button)
            </button>
          </div>
        </div>

        {/*The table and stuff below it*/}
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr className="divide-x divide-gray-200">
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Employee
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Mon
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Tue
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Wed
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Thu
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Fri
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Sat
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Sun
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {people.map((person) => (
                      <tr
                        key={person.email}
                        className="divide-x divide-gray-200"
                      >
                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                          {person.name}
                        </td>
                        <td className="whitespace-nowrap p-4 text-sm text-gray-500"></td>
                        <td className="whitespace-nowrap p-4 text-sm text-gray-500"></td>
                        <td className="whitespace-nowrap p-4 text-sm text-gray-500"></td>
                        <td className="whitespace-nowrap p-4 text-sm text-gray-500"></td>
                        <td className="whitespace-nowrap p-4 text-sm text-gray-500"></td>
                        <td className="whitespace-nowrap p-4 text-sm text-gray-500"></td>
                        <td className="whitespace-nowrap p-4 text-sm text-gray-500"></td>
                        <AddShiftModal
                          open={open}
                          onClose={() => setOpen(false)}
                        />
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <ViewTemplateShiftsSlideover
          open={openSlideover}
          onClose={() => setOpenSlideover(false)}
        />
      </div>
    </>
  );
}
