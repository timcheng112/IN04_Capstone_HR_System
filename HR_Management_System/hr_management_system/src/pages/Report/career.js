import { React, useRef } from "react";
import Navbar from "../../components/Navbar";
import Tab from "../../features/jobrequest/Tab";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { getUserId, setUserSession } from "../../utils/Common";
import { useHistory } from "react-router-dom";
import ReactEcharts from "echarts-for-react";;


export default function Report() {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [plans, setPlans] = useState([]);
  const [claim, setClaim] = useState(false);
  const history = useHistory();
  const [refreshKey, setRefreshKey] = useState(0);


  const option1 = {
    series: [
      {
        type: 'pie',
        data: [
          {
            value: 335,
            name: 'Department 1',
          },
          {
            value: 234,
            name: 'Department 2'
          },
          {
            value: 1548,
            name: 'Department 3'
          }
        ],
      }
    ]
  };

  const option2 = {
    xAxis: {
      data: ['Week 1', 'Week 2', 'Week 3', 'Week 4']
    },
    yAxis: {},
    series: [
      {
        data: [10, 22, 28, 23],
        type: 'line',
        label: {
          show: true,
          position: 'bottom',
          textStyle: {
            fontSize: 20
          }
        }
      }
    ]
  };

  const tabs = [
    { name: "Talent Management", href: "/report", current: false },
    {
      name: "Career Planning",
      href: "#",
      current: true,
    },
  ];

  useEffect(() => {
    api
      .getUser(getUserId())
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => setError(error));
  }, []);


  return (
    <div className="">
      <Navbar />
      <div className="py-10">
        <main className="flex-1">
          <div className="sm:flex-auto px-6">
            <Tab tabs={tabs} />
          </div>
          <div className="py-3"></div>
          <div className="px-6">
            <h3 className="flex text-lg font-medium leading-6 text-gray-900">Last 30 days</h3>
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">Total Employees</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">300</dd>
              </div>
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">New Hires</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">300</dd>
              </div>
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">Monthly Salary</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">$ 5000</dd>
              </div>
            </dl>
            
              <ReactEcharts option={option1} />
              <h3 className="flex text-lg font-medium leading-6 text-gray-900">Applicants</h3>
              <ReactEcharts option={option2} />
            
          </div>

        </main>
      </div>
    </div>
  );
}
