import * as React from "react";
import data from "./data.json";
import "./orgChart.css"

const Card = (props) => {
  return (
    <>
      {props.data.map((item) => (
        <>
          <li className="card">
            {item.name}
            {item.children?.length && <Card data={item.children} />}
          </li>
        </>
      ))}
    </>
  );
};
const EmployeeChart = (props) => {
  return (
    <div className="org-tree">
      Employee Chart
      <Card data={data} />
    </div>
  );
};
export default EmployeeChart;