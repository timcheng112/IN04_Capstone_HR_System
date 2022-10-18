import React, { useEffect, useState } from "react";
import api from "../../utils/api.js";
import {
  format,
  formatISO,
  getDate,
  getDay,
  getMonth,
  getYear,
} from "date-fns";
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

const tabs = [
  { name: "My Account", href: "#", current: false },
  { name: "Company", href: "#", current: false },
  { name: "Team Members", href: "#", current: true },
  { name: "Billing", href: "#", current: false },
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
  const [shift, setShift] = useState(null);
  // const [teamId, setTeamId] = useState(-1);
  // const [date, setDate] = useState(new Date("May 15, 2022 23:15:30"));

  // const [apiDateString, setApiDateString] = useState(formatISO(selectedDate));
  const [startTimeString, setStartTimeString] = useState("00:01");
  const [endTimeString, setEndTimeString] = useState("00:02");

  // const day = dayArray[date.getDay()];
  // const isPH = publicHolidays.includes(dateString);
  // const isWeekend =
  //   dayArray[date.getDay()] == "Sunday" || dayArray[date.getDay()] == "Saturday";

  useEffect(() => {
    const temp = async () => {
      await api
        .getShiftByTeamAndTime(teamId, apiDateString)
        .then((res) => {
          console.log("get shift by team and time: " + res);
          setShift(res.data);

          updateDateInfo(teamId, selectedDate);
        })
        .catch((error) => {
          var message = error.request.response;
          console.log(message);
          if (message.includes("Shift with teamId:")) {
            alert(
              "No Shift was found for team " + teamId + " at specified time."
            );
          } else if (message.includes("More than 1 Shifts were found")) {
            alert("More than 1 shifts were found?!");
          }
        });
    };
  }, []);

  function updateDateInfo(selectedDate) {
    //make a string date in the form of i.e 27 Oct 2022
    console.log("day: " + getDay(selectedDate));

    // setDay(dayArray[getDay(selectedDate)]);
    // const dateStringArr = selectedDate.toDateString().split(" ");
    // setDateString(
    //   dateStringArr[2] + " " + dateStringArr[1] + " " + dateStringArr[3]
    // );

    // setDateString(format(selectedDate, "dd LLL yyyy"));
    // setStartTimeString(format(shift.getStartTime(), "HH:mm"));
    // setEndTimeString(format(shift.getEndTime(), "HH:mm"));

    //make a string date in the form of YYYY-MM-DD
    // var month = getMonth(selectedDate) + 1;
    // if (month < 10) {
    //   month = "0" + (getMonth(selectedDate) + 1);
    // }
    // var apiDate = format(selectedDate, "dd");
    // setApiDateString(formatISO(selectedDate));
    // setApiDateString(
    //   dateStringArr[3] +
    //     "-" +
    //     month +
    //     "-" +
    //     apiDate +
    //     "T" +
    //     startTimeString +
    //     ":00"
    // );
  }

  // updateDateInfo(teamId, selectedDate);

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
          </tr> */}

          {/* <tr>
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
      <Tabs>
        {/* <div label="All">
          Deez nuts on yo chin, <em>All</em>!
        </div>
        <div label="Gator">
          See ya later, <em>Alligator</em>!
        </div>
        <div label="Croc">
          After 'while, <em>Crocodile</em>!
        </div> */}
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
      </Tabs>
    </div>
  );
};

export default InfoPanel;
