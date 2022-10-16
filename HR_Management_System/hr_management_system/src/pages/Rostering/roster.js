import Navbar from "../../components/Navbar.js";
import { useState, useEffect } from "react";
import api from "../../utils/api.js";
import AddShiftModal from "../../features/rostering/AddShiftModal.js";
import ViewTemplateShiftsSlideover from "../../features/rostering/ViewTemplateShiftsSlideover.js";
import ComboBox from "../../components/ComboBox/ComboBox.js";
import Calendar from "../../features/rostering/Calendar/Calendar.js";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import ShiftBlock from "../../features/rostering/ShiftBlock.js";
import InfoPanel from "../../components/rostering/InfoPanel.js";

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
  {
    name: "Mo Salah",
    title: "Back-end Developer",
    email: "mo.salah@example.com",
    role: "Member",
  },
  {
    name: "Jurgen Klopp",
    title: "Full-stack Developer",
    email: "kloppo@example.com",
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

const shifts = [
  {
    id: "1",
    shiftTitle: "Morning Shift",
    startTime: "08:00",
    endTime: "14:00",
  },
  {
    id: "2",
    shiftTitle: "Afternoon Shift",
    startTime: "14:00",
    endTime: "20:00",
  },
  {
    id: "3",
    shiftTitle: "Morning Shift",
    startTime: "06:00",
    endTime: "14:00",
  },
  {
    id: "4",
    shiftTitle: "Afternoon Shift",
    startTime: "14:00",
    endTime: "22:00",
  },
];

export default function Roster() {
  const [open, setOpen] = useState(false);
  const [openSlideover, setOpenSlideover] = useState(false);
  const [shiftsToBeAdded, setShiftsToBeAdded] = useState([]);

  const onDragEnd = (result) => {
    const { destination, source } = result;
    // If user tries to drop in an unknown destination
    if (!destination) return;

    // if the user drags and drops back in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    console.log(destination.droppableId);
  };

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
          </div>
        </div>

        {/*The table and stuff below it*/}
        <InfoPanel />
        <Calendar
          people={people}
          addShiftHandler={(shiftToBeAdded) =>
            setShiftsToBeAdded(...shiftsToBeAdded, shiftToBeAdded)
          }
        />
        <ViewTemplateShiftsSlideover
          open={openSlideover}
          onClose={() => setOpenSlideover(false)}
        />
        <AddShiftModal open={open} onClose={() => setOpen(false)} />
      </div>
    </>
  );
}
