import Navbar from "../../components/Navbar.js";
import { useState, useEffect } from "react";
import api from "../../utils/api.js";
import AddShiftModal from "../../features/rostering/AddShiftModal.js";
import ViewTemplateShiftsSlideover from "../../features/rostering/ViewTemplateShiftsSlideover.js";
import ComboBox from "../../components/ComboBox/ComboBox.js";
import Calendar from "../../features/rostering/Calendar/Calendar.js";
import ShiftBlock from "../../features/rostering/ShiftBlock.js";
import InfoPanel from "../../components/rostering/InfoPanel.js";
import { format, isSameDay, isWeekend, parseISO } from "date-fns";
import { getUserId } from "../../utils/Common.js";
import EmptyStateRostering from "../../features/rostering/EmptyStateRostering.js";
import GenerateFixedShiftsModal from "../../features/rostering/GenerateFixedShiftsModal.js";

export default function Roster() {
  const [open, setOpen] = useState(false);
  const [openSlideover, setOpenSlideover] = useState(false);
  const [shiftsToBeAdded, setShiftsToBeAdded] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teams, setTeams] = useState();
  const [error, setError] = useState(false);
  const [user, setUser] = useState(null);
  const [infoPanelDate, setInfoPanelDate] = useState(new Date());
  const [teamShifts, setTeamShifts] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [openPublish, setOpenPublish] = useState(false);
  const [openGenerateShifts, setOpenGenerateShifts] = useState(false);

  console.log(shiftsToBeAdded);

  useEffect(() => {
    console.log("SHIFTS TO BE ADDED: " + shiftsToBeAdded);
  }, [shiftsToBeAdded]);

  useEffect(() => {
    if (selectedTeam !== null) {
      console.log(selectedTeam);
      console.log(selectedTeam.roster.rosterId);
    }
  }, [selectedTeam]);

  // SHOW WARNING PROMPT ON REFRESH IF EDITS EXIST
  // if (shiftsToBeAdded.length > 0) {
  //   window.onbeforeunload = function () {
  //     return "Changes made will be lost if you leave the page, are you sure?";
  //   };
  // }

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
    if (user && !user.isHrEmployee && teams) {
      let tempTeam = user.teams[0];
      for (let i = 0; i < teams.length; i++) {
        if (teams[i].teamId === tempTeam.teamId) {
          tempTeam = teams[i];
          break;
        }
      }
      console.log("TEMPTEAM: " + tempTeam);
      setSelectedTeam(tempTeam);
      console.log("SELECTED TEAM: " + selectedTeam);
    }
  }, [teams, user, selectedTeam]);

  useEffect(() => {
    if (selectedTeam !== null) {
      api
        .getShiftsByTeam(selectedTeam.teamId)
        .then((response) => {
          let tempData = response.data;
          for (let i = 0; i < response.data.length; i++) {
            tempData[i].startTime = parseISO(response.data[i].startTime);
            tempData[i].endTime = parseISO(response.data[i].endTime);
          }
          console.log(tempData);
          setTeamShifts(tempData);
        })
        .catch((error) => console.log(error.response.data.message));
    }
  }, [openPublish]);

  function publishHandler() {
    setRefreshKey((oldKey) => oldKey + 1);
    for (let i = 0; i < shiftsToBeAdded.length; i++) {
      shiftsToBeAdded[i].shift.startTime = format(
        shiftsToBeAdded[i].shift.startTime,
        "yyyy-MM-dd HH:mm:ss"
      );
      shiftsToBeAdded[i].shift.endTime = format(
        shiftsToBeAdded[i].shift.endTime,
        "yyyy-MM-dd HH:mm:ss"
      );
      if (shiftsToBeAdded[i].shiftId !== undefined) {
        addNewShiftListItemHandler(
          shiftsToBeAdded[i],
          shiftsToBeAdded[i].shiftId
        );
      } else {
        api
          .addNewShift(shiftsToBeAdded[i].shift, selectedTeam.roster.rosterId)
          .then((response) => {
            addNewShiftListItemHandler(shiftsToBeAdded[i], response.data);
          })
          .catch((error) => {
            console.log("Error creating shift for " + shiftsToBeAdded[i].shift);
            console.log(error.response.data.message);
            setError(true);
          });
      }
    }
    if (error) {
      alert("Encountered errors during publish!");
      setError(false);
    } else {
      // alert("Successfully published!");
      setShiftsToBeAdded([]);
      setOpenPublish(true);
    }
  }

  function addNewShiftListItemHandler(shift, shiftId) {
    const shiftListItem = {
      isWeekend: isWeekend(shift.shift.startDate),
      isPhEvent: shift.isPhEvent,
      positionType: shift.positionType[0],
    };
    if (Array.isArray(shift.userId)) {
      for (let i = 0; i < shift.userId.length; i++) {
        shiftListItem.positionType = shift.positionType[i];
        console.log(shift.userId[i]);
        api
          .addNewShiftListItem(shiftListItem, shiftId, shift.userId[i])
          .then(() =>
            console.log(
              "Shift List Item created for User with ID: " + shift.userId[i]
            )
          )
          .catch((error) => {
            console.log("Error creating shift list item");
            console.log(error.response.data.message);
            setError(true);
          });
      }
    } else {
      api
        .addNewShiftListItem(shiftListItem, shiftId, shift.userId)
        .then(() =>
          console.log(
            "Shift List Item created for User with ID: " + shift.userId
          )
        )
        .catch((error) => {
          console.log(error.response.data.message);
          setError(true);
        });
    }
  }

  function checkIfThereExistsShiftOnSameDay(shift) {
    console.log("Checking if shifts exist on the same day");
    for (let i = 0; i < shiftsToBeAdded.length; i++) {
      if (
        isSameDay(shiftsToBeAdded[i].shift.startTime, shift.shift.startTime) &&
        shiftsToBeAdded[i].userId === shift.userId
      ) {
        return true;
      }
    }
    return false;
  }

  return (
    <>
      <Navbar />

      <div className="px-4 sm:px-6 lg:px-8 mt-3">
        <div className="sm:flex sm:items-center">
          <div className="isolate inline-flex -space-x-px rounded-md shadow-sm mx-4">
            <ComboBox
              items={teams}
              searchParam={"teamName"}
              selectedItem={selectedTeam}
              setSelectedItem={setSelectedTeam}
              placeholder="Search for Team"
            />
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
            {user && (user.isHrEmployee || user.userRole === "MANAGER") && (
              <>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                >
                  Add user
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto ml-2 disabled:opacity-75 disabled:hover:bg-indigo-600"
                  onClick={() => setOpenSlideover(true)}
                  disabled={selectedTeam === null}
                >
                  View Template Shifts
                </button>
                {selectedTeam && selectedTeam.isOffice && (
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto ml-2 disabled:opacity-75 disabled:hover:bg-indigo-600"
                    onClick={() => setOpenGenerateShifts(true)}
                    disabled={selectedTeam === null}
                  >
                    Generate Fixed Shifts
                  </button>
                )}
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto ml-2 disabled:opacity-75 disabled:hover:bg-indigo-600"
                  onClick={() => publishHandler()}
                  disabled={shiftsToBeAdded.length === 0}
                >
                  Publish
                </button>
              </>
            )}
          </div>
        </div>

        {/*The table and stuff below it*/}
        {selectedTeam !== null ? (
          <>
            <InfoPanel
              selectedDate={infoPanelDate}
              teamId={selectedTeam.teamId}
            />
            <Calendar
              people={selectedTeam !== null && selectedTeam.users}
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
              checkIfThereExistsShiftOnSameDay={(value) =>
                checkIfThereExistsShiftOnSameDay(value)
              }
              shiftsToBeAdded={shiftsToBeAdded}
              setInfoPanelDate={(value) => setInfoPanelDate(value)}
              teamShifts={teamShifts}
              refreshKey={refreshKey}
              openPublish={openPublish}
              closePublish={() => setOpenPublish(false)}
              rosterId={selectedTeam.roster.rosterId}
            />
          </>
        ) : (
          <EmptyStateRostering />
        )}
        <ViewTemplateShiftsSlideover
          open={openSlideover}
          onClose={() => setOpenSlideover(false)}
          rosterId={selectedTeam !== null ? selectedTeam.roster.rosterId : ""}
        />
        <AddShiftModal open={open} onClose={() => setOpen(false)} />
        <GenerateFixedShiftsModal
          open={openGenerateShifts}
          onClose={() => setOpenGenerateShifts(false)}
          rosterId={selectedTeam && selectedTeam.roster.rosterId}
          team={selectedTeam}
          checkIfThereExistsShiftOnSameDay={(value) =>
            checkIfThereExistsShiftOnSameDay(value)
          }
          addShiftHandler={(shiftToBeAdded) =>
            setShiftsToBeAdded(shiftsToBeAdded.concat(shiftToBeAdded))
          }
        />
      </div>
    </>
  );
}
