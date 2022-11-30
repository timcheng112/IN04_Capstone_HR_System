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
  const [employee, setEmployee] = useState(0);
  const [departments, setDepartments] = useState([]);
  const [teams, setTeams] = useState([]);
  const [departmentCount, setDepartmentCount] = useState([]);
  const [offers, setOffers] = useState(0);
  const history = useHistory();
  const [refreshKey, setRefreshKey] = useState(0);
  const [option1, setOption1] = useState(null);
  const [option2, setOption2] = useState(null);
  const [option3, setOption3] = useState(null);


  const tabs = [
    { name: "Talent Management", href: "#", current: true },
    {
      name: "Career Planning",
      href: "/creport",
      current: false,
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
  useEffect(() => {
    api
      .getAllEmployees()
      .then((response) => {
        setEmployee(response.data.length);
      })
      .catch((error) => setError(error));
  }, []);

  useEffect(() => {
    api
      .getJobOffersWithinAMonth()
      .then((response) => {
        setOffers(response.data.length);
      })
      .catch((error) => setError(error));
  }, []);

  useEffect(() => {
    api
      .getAllDepartments()
      .then((response) => {
        setDepartments(response.data);
        department(response.data);
        hiring();
      })
      .catch((error) => setError(error));

  }, []);

  useEffect(() => {
    api
      .getAllTeams()
      .then((response) => {
        setTeams(response.data);
        team(response.data);
      })
      .catch((error) => setError(error));

  }, []);

  function department(depts) {
    let helpList = [];
    depts.forEach((d) => {
      api.getEmployeesByDepartment(d.departmentId)
        .then((response) => {
          console.log(response.data)
          helpList.push({ "value": response.data.length, "name": d.departmentName })
        })
        .catch((error) => setError(error));
    });
    console.log(helpList);
    setDepartmentCount(helpList);
    setTimeout(() => { setter(helpList); }, 1000);
  }

  function team(teams) {
    let helpList = [];
    teams.forEach((t) => {
      api.getEmployeesByTeam(t.teamId)
        .then((response) => {
          console.log(response.data)
          helpList.push({ "value": response.data.length, "name": t.teamName })
        })
        .catch((error) => setError(error));
    });
    console.log(helpList);
    setTimeout(() => { setTeam(helpList); }, 1000);
  }

  function hiring() {
    let helpList = [];
    api.getAllPendingApplicationsWithinMonth()
      .then((response) => {
        console.log(response.data)
        helpList.push({ "value": response.data.length, "name": "Applied" })
      })
      .catch((error) => setError(error));

    api.getAllShortlistedApplicationsWithinMonth()
      .then((response) => {
        console.log(response.data)
        helpList.push({ "value": response.data.length, "name": "Shortlist" })
      })
      .catch((error) => setError(error));

    api.getJobOffersWithinAMonth()
      .then((response) => {
        console.log(response.data)
        helpList.push({ "value": response.data.length, "name": "Offer" })
      })
      .catch((error) => setError(error));


    api.getAllRejectedApplicationsWithinMonth()
      .then((response) => {
        console.log(response.data)
        helpList.push({ "value": response.data.length, "name": "Reject" })
      })
      .catch((error) => setError(error));

    setTimeout(() => { setHire(helpList); }, 1000);
  }

  function setHire(list) {
    setOption2({
      title: {
        text: 'Hiring'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}%'
      },
      toolbox: {
        feature: {
          dataView: { readOnly: false },
          saveAsImage: {}
        }
      },
      series: [
        {
          name: 'Funnel',
          type: 'funnel',
          left: '10%',
          top: 60,
          bottom: 60,
          width: '80%',
          min: 0,
          max: 100,
          minSize: '0%',
          maxSize: '100%',
          sort: 'descending',
          gap: 2,
          label: {
            show: true,
            position: 'inside'
          },
          labelLine: {
            length: 10,
            lineStyle: {
              width: 1,
              type: 'solid'
            }
          },
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1
          },
          emphasis: {
            label: {
              fontSize: 20
            }
          },
          data: list
        }
      ]
    })
  }

  function setter(list) {
    setOption1({
      title: {
        text: 'Department'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      toolbox: {
        feature: {
          dataView: { readOnly: false },
          saveAsImage: {}
        }
      },
      radius: '50%',
      series: [
        {
          name: 'Department Employees',
          type: 'pie',
          radius: ['30%', '70%'],
          roseType: 'angle',
          itemStyle: {
            borderRadius: [20, 5, 5, 10],
            borderColor: '#fff',
            borderWidth: 2
          },

          label: {
            show: false
          },
          data: list,
        }
      ],

    });

  }

  function setTeam(list) {
    setOption3({
      title: {
        text: 'Team'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      toolbox: {
        feature: {
          dataView: { readOnly: false },
          saveAsImage: {}
        }
      },
      radius: '50%',
      series: [
        {
          name: 'Team Employees',
          type: 'pie',
          radius: ['30%', '70%'],
          roseType: 'angle',
          itemStyle: {
            borderRadius: [20, 5, 5, 10],
            borderColor: '#fff',
            borderWidth: 2
          },

          label: {
            show: false
          },
          data: list,
        }
      ],

    });

  }


  return (
    option1 && option2 && option3 && <div className="">
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
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{employee}</dd>
              </div>
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">New Hires</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{offers}</dd>
              </div>
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">Monthly Salary</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">$ 5000</dd>
              </div>
            </dl>
            <div className="flex py-8 px-5 space-x-12" >
              <div style={{ width: 500, height: 300 }}>
                <ReactEcharts option={option1} />
              </div>
              <div style={{ width: 600, height: 300 }}>
                <ReactEcharts option={option3} />
              </div>
            </div>
            <ReactEcharts option={option2} />

          </div>

        </main>
      </div>
    </div>
  );
}
