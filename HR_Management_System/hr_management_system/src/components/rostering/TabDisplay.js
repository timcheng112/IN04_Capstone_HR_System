import React from "react";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { format } from "date-fns";

//idx refers to the idx on the roles array we are grabbing
//-1 refers to all.
const TabDisplay = ({ shift }) => {
  const [shiftListItems, setShiftListItems] = useState([]);
  const [cashier, setCashier] = useState(0);
  const [salesmen, setSalesmen] = useState(0);
  const [manager, setManager] = useState(0);

  //notdone
  useEffect(() => {
    api
      .getShiftListItemByShiftId(shift.shiftId)
      .then((response) => {
        setShiftListItems(response.data).then(() => {
          for (let i = 0; i < shiftListItems.length; i++) {
            let posType = shiftListItems[i].posType;

            if (posType === "SALESMAN") {
              setSalesmen(salesmen + 1);
            } else if (posType === "CASHIER") {
              setCashier(cashier + 1);
            } else {
              setManager(manager + 1);
            }
          }
        });
      })
      .catch((error) => console.log(error.response.data.message));
  }, [shift]);

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
              {cashier}/{shift.minQuota[0]}
            </div>
          </td>
          <td className="border-r">
            <div className="px-3 py-3.5 font-semibold text-gray-900">
              #Salesmen
              <br />
              {salesmen}/{shift.minQuota[1]}
            </div>
          </td>
          <td>
            <div className="px-3 py-3.5 font-semibold text-gray-900">
              #Manager
              <br />
              {manager}/{shift.minQuota[2]}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default TabDisplay;
