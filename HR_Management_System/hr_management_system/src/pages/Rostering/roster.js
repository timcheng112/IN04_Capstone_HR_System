import Navbar from "../../components/Navbar.js";
import { useState, useEffect } from "react";
import api from "../../utils/api.js";
import AddShiftModal from "../../features/rostering/AddShiftModal.js";
import ViewTemplateShiftsSlideover from "../../features/rostering/ViewTemplateShiftsSlideover.js";
import ComboBox from "../../components/ComboBox/ComboBox.js";
import Calendar from "../../features/rostering/Calendar/Calendar.js";
import ShiftBlock from "../../features/rostering/ShiftBlock.js";
import InfoPanel from "../../components/rostering/InfoPanel.js";
import { isWeekend } from "date-fns";
import { getUserId } from "../../utils/Common.js";

const people = [
  {
    userId: 1,
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    userId: 2,
    name: "James Walton",
    title: "Front-end Developer",
    email: "James.walton@example.com",
    role: "Member",
  },
  {
    userId: 3,
    name: "Mo Salah",
    title: "Back-end Developer",
    email: "mo.salah@example.com",
    role: "Member",
  },
  {
    userId: 4,
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
  const [selectedTeam, setSelectedTeam] = useState();
  const [teams, setTeams] = useState();
  const [error, setError] = useState(false);
  const [user, setUser] = useState(null);
  const [infoPanelDate, setInfoPanelDate] = useState(new Date());

  useEffect(() => {
    console.log(shiftsToBeAdded);
  }, [shiftsToBeAdded]);

  // SHOW WARNING PROMPT ON REFRESH IF EDITS EXIST
  if (shiftsToBeAdded.length !== 0) {
    window.onbeforeunload = function () {
      return "Changes made will be lost if you leave the page, are you sure?";
    };
  }

  useEffect(() => {
    api
      .getUser(getUserId())
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => setError(error));
  }, []);

  useEffect(() => {
    api
      .getAllTeams()
      .then((response) => setTeams(response.data))
      .catch((error) => console.log(error.response.data.message));
  }, []);

  useEffect(() => {
    if (user !== null && !user.hrEmployee) {
      setSelectedTeam(user.teams[0]);
      console.log("SELECTED TEAM: " + selectedTeam);
    }
  }, [teams, user]);

  function publishHandler() {
    for (let i = 0; i < shiftsToBeAdded.length; i++) {
      api
        .addNewShift(shiftsToBeAdded[i].shift, selectedTeam.roster.rosterId)
        .then((response) =>
          addNewShiftListItemHandler(shiftsToBeAdded[i], response.data)
        )
        .catch((error) => {
          console.log(error.response.data.message);
          setError(true);
        });
    }
    if (error) {
      alert("Encountered errors during publish!");
      setError(false);
    } else {
      alert("Successfully published!");
      setShiftsToBeAdded([]);
    }
  }

  function addNewShiftListItemHandler(shift, shiftId) {
    const shiftListItem = {
      isWeekend: isWeekend(shift.shift.startDate),
      isPhEvent: shift.shift.isPhEvent,
    };
    api
      .addNewShiftListItem(shiftListItem, shiftId, shift.userId)
      .then(() =>
        console.log("Shift List Item created for User with ID: " + shift.userId)
      )
      .catch((error) => {
        console.log(error.response.data.message);
        setError(true);
      });
  }

  return (
    <>
      <Navbar />

      <div className="px-4 sm:px-6 lg:px-8 mt-3">
        <div className="sm:flex sm:items-center">
          <div className="isolate inline-flex -space-x-px rounded-md shadow-sm mx-4">
            <ComboBox items={teams} searchParam={["name"]} />
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
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto ml-2 disabled:opacity-75 disabled:hover:bg-indigo-600"
              onClick={() => console.log("published")}
              disabled={shiftsToBeAdded.length === 0}
            >
              Publish
            </button>
          </div>
        </div>

        {/*The table and stuff below it*/}
        <InfoPanel
          selectedDate={infoPanelDate}
          addShiftHandler={(shiftToBeAdded) =>
            setShiftsToBeAdded(shiftsToBeAdded.concat(shiftToBeAdded))
          }
        />
        <Calendar
          people={people}
          addShiftHandler={(shiftToBeAdded) =>
            setShiftsToBeAdded(shiftsToBeAdded.concat(shiftToBeAdded))
          }
          removeShiftHandler={(shiftToBeRemoved) => {
            setShiftsToBeAdded(
              shiftsToBeAdded.filter(
                (shift) => shift.shift !== shiftToBeRemoved
              )
            );
          }}
          shiftsToBeAdded={shiftsToBeAdded}
          setInfoPanelDate={(value) => setInfoPanelDate(value)}
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
