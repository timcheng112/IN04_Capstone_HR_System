import React, { useEffect, useState } from "react";
import api from "../../utils/api.js";
import { format } from "date-fns";
import Tabs from "./Tabs.js";
import "./InfoPanel.css";
import TabDisplay from "./TabDisplay.js";

// const dateTemp = new Date("May 15, 2022 23:15:30");
const dayArray = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const publicHolidays = [
  "1 January 2022",
  "1 February 2022",
  "2 February 2022",
  "15 April 2022",
  "1 May 2022",
  "3 May 2022",
  "15 May 2022",
  "10 July 2022",
  "9 August 2022",
  "24 October 2022",
  "25 December 2022",
  "1 January 2023",
  "22 January 2023",
  "23 January 2023",
  "7 April 2023",
  "22 April 2023",
  "1 May 2023",
  "2 June 2023",
  "29 June 2023",
  "9 August 2023",
  "12 November 2023",
  "25 December 2023",
];

//dont instantiate date here later.
const InfoPanel = ({ teamId, selectedDate }) => {
  const [shifts, setShifts] = useState();

  let day = format(selectedDate, "iiii");
  let dateString = format(selectedDate, "dd MMMM yyyy");
  let apiDateString = format(selectedDate, "yyyy-MM-dd");

  console.log("DATESTRING|||" + dateString + "||");
  console.log("IS IT A PH? " + publicHolidays.includes(dateString));

  // if (findShifts()) {
  //   console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  // } else {
  //   setShifts([]);
  // }
  // findShifts();

  function findShiftsPromise() {
    console.log("### findShifts ###");
    return new Promise(async (resolve) => {
      await api
        .getShiftByTeamAndTime(teamId, apiDateString)
        .then((res) => {
          if (res.data != null) {
            console.log("get shift by team and time: " + res.data);
            setShifts(res.data);
            resolve(true);
          } else {
            console.warn("no shifts found");
            resolve(false);
          }
        })
        .catch((error) => {
          let message = error.request.response;
          console.log(message);
          if (message.includes("Shift with team ID")) {
            alert(
              "No Shift was found for team " + teamId + " at specified time."
            );
            resolve(false);
          } else {
            // alert("Cannot find shift.");
            resolve(false);
          }
        });
    });
  }

  async function findShifts() {
    console.log("### findShifts ###");
    await api
      .getShiftByTeamAndTime(teamId, apiDateString)
      .then((res) => {
        if (res.data != null) {
          console.log("get shift by team and time: " + res.data);
          setShifts(res.data);
          return true;
        } else {
          console.warn("no shifts found");
          return false;
        }
      })
      .catch((error) => {
        let message = error.request.response;
        console.log(message);
        if (message.includes("Shift with team ID")) {
          setShifts(null);
          // alert(
          //   "No Shift was found for team " + teamId + " at specified time."
          // );
          return false;
        } else {
          // alert("Cannot find shift.");
          return false;
        }
      });
  }

  useEffect(() => {
    // findShifts();
    api
      .getShiftByTeamAndTime(teamId, apiDateString)
      .then((res) => {
        if (res.data != null) {
          console.log("get shift by team and time: " + res.data);
          setShifts(res.data);
          // return true;
        } else {
          console.warn("no shifts found");
          // return false;
        }
      })
      .catch((error) => {
        let message = error.request.response;
        console.log(message);
        if (message.includes("Shift with team ID")) {
          setShifts(null);
          // alert(
          //   "No Shift was found for team " + teamId + " at specified time."
          // );
          // return false;
        } else {
          // alert("Cannot find shift.");
          // return false;
          setShifts(null);
        }
      });
  }, [selectedDate]);

  return (
    //find shift information with cooresponding team & date.
    <div className=" overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg my-3">
      <table className="min-w-full divide-y divide-gray-300 my-4">
        <tbody>
          <tr>
            <th scope="col" colSpan={4}>
              <span className="float-left align-start inline-flex ml-10 mr-3 text-xl">
                {day}, {dateString}
              </span>
              {(day === "Sunday" || day === "Saturday") && (
                <span className="float-right mr-20 mt-1 inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                  Weekend
                </span>
              )}
              {publicHolidays.includes(dateString) && (
                <span className="float-right mr-5 mt-1 inline-flex rounded-full bg-yellow-100 px-2 text-xs font-semibold leading-5 text-yellow-800">
                  Public Holiday
                </span>
              )}
            </th>
          </tr>

          {/* <tr>
            <td colSpan={2} className="border-r">
              <div className="px-3 py-3.5 font-semibold text-gray-900">
                Day Shift
              </div>
            </td>
            <td colSpan={2}>
              <div className="px-3 py-3.5 font-semibold text-gray-900">
                Evening Shift
              </div>
            </td>
          </tr>

          <tr>
            <td>
              #Cashiers <br />
              {0}/{4}
            </td>
            <td className="border-r">
              #Salesmen
              <br />
              {0}/{4}
            </td>
            <td>
              #Cashiers
              <br />
              {0}/{4}
            </td>
            <td>
              #Salesmen
              <br />
              {0}/{4}
            </td>
          </tr> */}
        </tbody>
      </table>

      <div>
        {shifts ? (
          <>
            {/* <div>
              <h1>shiftfound</h1>
            </div> */}
            <Tabs>
              {shifts.map((shift) => (
                <div label={shift.shiftTitle}>
                  <TabDisplay shift={shift} />
                </div>
              ))}
            </Tabs>
          </>
        ) : (
          // <Tabs>
          //   <div label="All">
          //     <TabDisplay shiftId={shift.shiftId} idx="-1" />
          //   </div>
          //   <div label="Salesmen">
          //     <TabDisplay shiftId={shift.shiftId} idx="0" />
          //   </div>
          //   <div label="Cashiers">
          //     <TabDisplay shiftId={shift.shiftId} idx="1" />
          //   </div>
          //   <div label="Managers">
          //     <TabDisplay shiftId={shift.shiftId} idx="2" />
          //   </div>
          // </Tabs>
          <>
            <div>
              <div>No Shifts Assigned To This Date.</div>
            </div>
          </>
        )}
      </div>
      {/* <Tabs>
        <div label="All">
          Deez nuts on yo chin, <em>All</em>!
        </div>
        <div label="Gator">
          See ya later, <em>Alligator</em>!
        </div>
        <div label="Croc">
          After 'while, <em>Crocodile</em>!
        </div>
        <div label="All">
          <TabDisplay shiftId={shift.shiftId} idx="-1" />
        </div>
        <div label="Salesmen">
          <TabDisplay shiftId={shift.shiftId} idx="0" />
        </div>
        <div label="Cashiers">
          <TabDisplay shiftId={shift.shiftId} idx="1" />
        </div>
        <div label="Managers">
          <TabDisplay shiftId={shift.shiftId} idx="2" />
        </div>
      </Tabs> */}
    </div>
  );
};

export default InfoPanel;
