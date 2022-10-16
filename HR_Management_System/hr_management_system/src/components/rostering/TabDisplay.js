import React from "react";
import { useEffect, useState } from "react";
import api from "../../utils/api";

const roleArr = [SALESMAN, CASHIER, STOREMANAGER, ASTSTOREMANAGER];

const { role, setRole } = useState("INVALIDSTATE");
const { employees, setEmployees } = useState([]);

function getAllEmployeesInShift(shiftId) {
  temp = getShiftListItemByShiftId();
  console.log(temp);
  if (temp.length == 0) {
    console.log("No employees found for shift: " + shiftId);
    return <div>No Shifts Assigned.</div>;
  } else {
    setEmployees(temp);
  }
}

//idx refers to the idx on the roles array we are grabbing
//-1 refers to all.
const TabDisplay = (label, shiftId, idx) => {
  if (idx == -1) {
    getAllEmployeesInShift(shiftId);
  } else if (-1 < idx && idx < 4) {
    //role
    //need a
  } else {
    console.log("invalid idx!");
    alert("invalid tab idx: " + idx);
  }
  return <div>TabDisplay</div>;
};

export default TabDisplay;
