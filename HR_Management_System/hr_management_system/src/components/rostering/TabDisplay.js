import React from "react";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { format, set } from "date-fns";

//idx refers to the idx on the roles array we are grabbing
//-1 refers to all.
const TabDisplay = ({ shift }) => {
  const [shiftListItems, setShiftListItems] = useState([]);
  const [cashier, setCashier] = useState(0);
  const [salesmen, setSalesmen] = useState(0);
  const [manager, setManager] = useState(0);

  //notdone
  // useEffect(() => {
  //   api
  //     .getShiftListItemByShiftId(shift.shiftId)
  //     .then((response) => {
  //       setShiftListItems(response.data).then(() => {
  //         for (let i = 0; i < shiftListItems.length; i++) {
  //           let posType = shiftListItems[i].posType;

  //           if (posType === "SALESMAN") {
  //             console.log("increment salesmen!");
  //             setSalesmen(salesmen + 1);
  //           } else if (posType === "CASHIER") {
  //             console.log("increment cashier!");
  //             setCashier(cashier + 1);
  //           } else {
  //             console.log("increment manager!");
  //             setManager(manager + 1);
  //           }
  //         }
  //       });
  //     })
  //     .catch((error) => console.log("error in use effect"));
  // }, [shift]);

  useEffect(() => {
    api
      .getShiftListItemByShiftId(shift.shiftId)
      .then((response) => {
        if (response.data != null) {
          console.log("got shift list items." + response.data);
          setShiftListItems(response.data);
        } else {
          console.warn("no shiftlist items..");
          setShiftListItems([]);
        }
      })
      .catch((error) => console.log("error in use effect"));
  }, [shift]);

  useEffect(() => {
    let tempSalesmen = 0;
    let tempCashier = 0;
    let tempManager = 0;
    for (let i = 0; i < shiftListItems.length; i++) {
      let posType = shiftListItems[i].positionType;

      if (posType === "SALESMAN") {
        console.log("increment salesmen!");
        tempSalesmen++;
      } else if (posType === "CASHIER") {
        console.log("increment cashier!");
        tempCashier++;
      } else {
        console.log("posType: " + posType);
        console.log("increment manager!");
        tempManager++;
      }
    }
    setSalesmen(tempSalesmen);
    setCashier(tempCashier);
    setManager(tempManager);
  }, [shiftListItems]);

  return (
    <table className="w-full">
      <tbody>
        <tr>
          <td colSpan={3}>
            <div className="px-3 py-3.5 font-semibold text-gray-900">
              {shift.shiftTitle}
              <br />
              {format(new Date(shift.startTime), "h:mm aaa")} -
              {format(new Date(shift.endTime), " h:mm aaa")}
            </div>
          </td>
        </tr>
        <tr>
          <td className="border-r">
            <div className="px-3 py-3.5 font-semibold text-gray-900">
              #Cashiers <br />
              <p
                style={{
                  color: cashier >= shift.minQuota[0] ? "green" : "red",
                }}
              >
                {cashier}/{shift.minQuota[0]}
              </p>
            </div>
          </td>
          <td className="border-r">
            <div className="px-3 py-3.5 font-semibold text-gray-900">
              #Salesmen
              <br />
              <p
                style={{
                  color: salesmen >= shift.minQuota[1] ? "green" : "red",
                }}
              >
                {salesmen}/{shift.minQuota[1]}
              </p>
            </div>
          </td>
          <td>
            <div className="px-3 py-3.5 font-semibold text-gray-900">
              #Manager
              <br />
              <p
                style={{
                  color: manager >= shift.minQuota[2] ? "green" : "red",
                }}
              >
                {manager}/{shift.minQuota[2]}
              </p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default TabDisplay;
