import React from "react";

const dateTemp = new Date("May 15, 2022 23:15:30");
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
const day = dayArray[dateTemp.getDay()];
const dateStringArr = dateTemp.toDateString().split(" ");
const dateString =
  dateStringArr[2] + " " + dateStringArr[1] + " " + dateStringArr[3];

console.log("day of datetemp = " + dateTemp.getDay());

const isPH = publicHolidays.includes(dateString);
const isWeekend = day == "Sunday" || day == "Saturday";

//replace dateTemp with date to get this to work
const InfoPanel = (teamId, date) => {
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
              {isWeekend && (
                <span className="float-right mr-20 mt-1 inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                  Weekend
                </span>
              )}
              {isPH && (
                <span className="float-right mr-5 mt-1 inline-flex rounded-full bg-yellow-100 px-2 text-xs font-semibold leading-5 text-yellow-800">
                  Public Holiday
                </span>
              )}
            </th>
          </tr>
          <tr>
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
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InfoPanel;
