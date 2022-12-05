import React, { useState , useEffect} from "react";
// import { singleValueAsValue } from "react-select/dist/declarations/src/utils";
import api from "../../utils/api";

export default function ToggleNFC() {
  const [toggle, setToggle] = useState(false);
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();
  console.log(date + time);
//   const people = [
//     {
//       name: "Lindsay Walton",
//       title: "Front-end Developer",
//       email: "lindsay.walton@example.com",
//       role: "Member",
//     },
//     // More people...
//   ];
  const [SLI, setSLI] = useState([]);

  useEffect(() => {
    api
      .getShiftListItemsToday()
      .then((response) => {
        setSLI(response.data);
        console.log("SLIs today");
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function toggleAttendance(toggle) {
    api
      .toggleAttendance(toggle)
      .then((response) => {
        if (toggle) {
          alert("NFC is picking up attendance.");
        } else {
          alert("NFC is turned Off.");
        }
      })
      .catch((error) => console.log(error));
  }

  function getShiftsListItemsToday() {
    api.getShiftsListItemsToday().then("");
  }
  return (
    <>
      <div>[interface just to demo visually the toggleNFC scanning]</div>

      <div>
        {/* <div><header>{date} {time}</header></div> */}
        <button
          type="button"
          className="inline-flex items-left rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 m-4"
          onClick={() => {
            setToggle(!toggle);
            toggleAttendance(toggle);
          }}
        >
          Toggle
        </button>{" "}
      </div>

      <div>
        {!toggle ? (
          <div className="bg-grey-300">
            <div className="font-mono absolute mx-auto text-center w-screen text-6xl mt-9">
              <h1>NFC is scanning</h1>
              <h1>{date + " " + time}</h1>
            </div>

            <img
              className="object-scale-down h-screen mx-auto"
              src="https://c.tenor.com/oJjBTisFnTsAAAAC/shiba-inu-dancing-dog.gif"
              alt="loading..."
            ></img>

            <h1>Employee's attendance(s) for today</h1>
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                        >
                          Card UUID
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                        >
                          Check In-Time
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                        >
                          Check Out-Time
                        </th>
                      
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {SLI.map((sli) => (
                        <tr
                          key={sli.user.userId}
                        //   className={
                        //     personIdx % 2 === 0 ? undefined : "bg-gray-50"
                        //   }
                        >
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {sli.user.firstName} {sli.user.lastName}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {sli.user.cardUUID}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {sli.checkInTiming}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {sli.checkOutTiming}
                          </td>
                       
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-grey-300">
            <div className="font-mono absolute mx-auto text-center w-screen text-6xl mt-9">
              <h1>NFC is turned off</h1>
              <h1>{date + " " + time}</h1>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
