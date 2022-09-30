import React, { Fragment } from "react";
import randomcolor from "randomcolor";
import data from "./data.json";
function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}
const Card = (props) => {
  const levelColor = randomcolor();

  return (
    <ul>
      {props.data.map((item,index) => (
        <Fragment key={item.name}>
          <li>
            <div className="card">
              <div className="image">
                <img
                  src={"https://randomuser.me/api/portraits/men/"+randomIntFromInterval(1,100)+".jpg"}
                  alt="Profile"
                  style={{ borderColor: levelColor }}
                />
              </div>
              <div className="card-body">
                <h4>{item.name}</h4>
                <p>{item.jobtitle}</p>
              </div>
              <div className="card-footer" style={{ background: levelColor }}>
              temp
              </div>
              <div></div>
            </div>
            {item.children?.length && <Card data={item.children} />}
          </li>
        </Fragment>
      ))}
    </ul>
  );
};

const EmployeeChart = () => {
  return (
    <div className="org-tree">
      <Card data={data} />
    </div>
  );
};

export default EmployeeChart;