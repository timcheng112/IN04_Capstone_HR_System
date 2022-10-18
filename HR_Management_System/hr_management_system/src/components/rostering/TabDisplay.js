import React from "react";
import { useEffect, useState } from "react";
import api from "../../utils/api";

//idx refers to the idx on the roles array we are grabbing
//-1 refers to all.
const TabDisplay = (shiftId, idx) => {
  const roleArr = ["SALESMAN", "CASHIER", "STOREMANAGER"];

  const { role, setRole } = useState("INVALIDSTATE");
  //shiftlistitem entity, not userentity
  const { employees, setEmployees } = useState([]);

  //if empty return false else return true
  function getAllEmployeesInShift(shiftId) {
    var temp = api.getShiftListItemByShiftId();
    console.log(temp);
    if (temp.length == 0) {
      //probably shouldnt even display info panel for this. Maybe it just means u have a shift but no shiftListItems?
      console.log("No employees found for shift: " + shiftId);
      return false;
      // return <div>No employees assigned to shift {shiftId}</div>;
    } else {
      setEmployees(temp);
      return true;
    }
  }

  //DISPLAY HERE
  //if empty return false else return true
  function getEmployeesOfPosition(shiftId, idx) {
    var position = roleArr[idx];

    var temp = api.getShiftListItemByPosition(shiftId, position);
    console.log(temp);

    if (temp.length == 0) {
      console.log("No " + position + "s found for for shift: " + shiftId);
      return false;
      // return (
      //   <div>
      //     No {position}s found for shift {shiftId}
      //   </div>
      // );
    } else {
      setEmployees(temp);
      return true;
    }
  }

  if (idx == -1) {
    //display all employees
    if (getAllEmployeesInShift(shiftId)) {
      employees.map((employee) => {
        return (
          <div className="employee-bubble">
            {employee.user.firstName + employee.user.lastName}
          </div>
        );
      });
    } else {
      return (
        <div className="my-2">No employees assigned to shift {shiftId}</div>
      );
    }
  } else if (-1 < idx && idx < 3) {
    //display employees of specified role
    if (getEmployeesOfPosition(shiftId, idx)) {
      employees.map((employee) => {
        return (
          <div className="employee-bubble">
            {employee.user.firstName + employee.user.lastName}
          </div>
        );
      });
    } else {
      return (
        <div className="my-2">No employees assigned to shift {shiftId}</div>
      );
    }
  } else {
    console.log("invalid idx!");
    alert("invalid tab idx: " + idx);
    return (
      <div className="my-2">No employees assigned to shift! {shiftId}</div>
    );
  }
};

export default TabDisplay;
