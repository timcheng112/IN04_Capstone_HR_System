import { React, useRef } from "react";
import Navbar from "../../components/Navbar";
import Tab from "../../features/jobrequest/Tab";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { getUserId, setUserSession } from "../../utils/Common";
import { useHistory } from "react-router-dom";
import ReactEcharts from "echarts-for-react";

export default function Report() {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [plans, setPlans] = useState([]);
  const [claim, setClaim] = useState(false);
  const [overdueGoals, setOverdueGoals] = useState(null);
  const [addingGoals, setAddingGoals] = useState(null);
  const [appraisals, setAppraisals] = useState(null);
  const [allGoals, setAllGoals] = useState(0);
  const [currentGoals, setCurrentGoals] = useState(0);
  const [achievements, setAchievements] = useState(0);
  const [achievementsNow, setAchievementsNow] = useState(0);
  const history = useHistory();

  const option1 = {
    toolbox: {
      feature: {
        dataView: { readOnly: false },
        saveAsImage: {},
      },
    },
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        type: "pie",
        data: [
          {
            value: 335,
            name: "Department 1",
          },
          {
            value: 234,
            name: "Department 2",
          },
          {
            value: 1548,
            name: "Department 3",
          },
        ],
      },
    ],
  };

  const option2 = {
    xAxis: {
      data: ["Week 1", "Week 2", "Week 3", "Week 4"],
    },
    yAxis: {},
    series: [
      {
        data: [10, 22, 28, 23],
        type: "line",
        label: {
          show: true,
          position: "bottom",
          textStyle: {
            fontSize: 20,
          },
        },
      },
    ],
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
    const year = new Date().getFullYear();
    api
      .getUser(getUserId())
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => setError(error));

    api.getAllGoalsByYear(year).then((response) => {
      //console.log(response.data);
      setCurrentGoals(response.data.length);
    });
    api.getAllGoals().then((response) => {
      setAllGoals(response.data.length);
    });

    api.getOverdueGoals().then((response) => {
      const overdueFinancial = response.data[0];
      const overdueBusiness = response.data[1];
      const notFinancial = response.data[2];
      const notBusiness = response.data[3];
      console.log(notFinancial);

      const goals = [
        {
          value: overdueFinancial,
          name: "Overdue Financial",
        },
        {
          value: overdueBusiness,
          name: "Overdue Business",
        },
        {
          value: notFinancial,
          name: "Financial",
        },
        {
          value: notBusiness,
          name: "Business",
        },
      ];
      createOverdueGoals(goals);
    });

    api.getGoalPeriodRange(year).then((response) => {
      const range = response.data;
      //console.log(response.data);
      api.getGoalCount(year).then((response) => {
        //console.log(response.data);
        createAddingGoals(range, response.data);
      });
    });

    api.getAllAppraisalsByYear(year).then((response) => {
      console.log(response.data);
      const incomplete = response.data.filter(
        (s) => s.status === "Incomplete"
      ).length;
      const inprogress = response.data.filter(
        (s) => s.status === "In Progress"
      ).length;
      const completed = response.data.filter(
        (s) => s.status === "Completed"
      ).length;

      const statuses = [];
      statuses.push({ value: incomplete, name: "Incomplete" });
      statuses.push({ value: inprogress, name: "In Progress" });
      statuses.push({ value: completed, name: "Completed" });
      createAppraisals(statuses);
    });

    api.getAllAchievements().then((response) => {
      setAchievements(response.data.length);
    });

    api.getAchievementsByYear(year).then((response) => {
      setAchievementsNow(response.data.length);
    });
  }, []);

  function createOverdueGoals(data) {
    setOverdueGoals({
      title: {
        text: "Overdue Goals",
      },
      toolbox: {
        feature: {
          dataView: { readOnly: false },
          saveAsImage: {},
        },
      },
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          type: "pie",
          data: data,
        },
      ],
    });
  }

  function createAddingGoals(x, y) {
    setAddingGoals({
      title: {
        text: "Number of goals added over goal period",
      },
      toolbox: {
        feature: {
          dataView: { readOnly: false },
          saveAsImage: {},
        },
      },
      tooltip: {
        trigger: "item",
      },
      xAxis: {
        data: x,
      },
      yAxis: {},
      series: [
        {
          type: "bar",
          data: y,
        },
      ],
    });
  }

  function createAppraisals(data) {
    setAppraisals({
      title: {
        text: "Appraisal Status",
      },
      tooltip: {
        trigger: "item",
      },
      toolbox: {
        feature: {
          dataView: { readOnly: false },
          saveAsImage: {},
        },
      },
      legend: {
        orient: "horizontal",
        x: "left",
        y: "bottom",
        data: ["Incomplete", "In Progress", "Completed"],
      },
      series: [
        {
          type: "pie",
          radius: ["50%", "70%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center",
          },
          labelLine: {
            show: false,
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "30",
              fontWeight: "bold",
            },
          },
          data: data,
        },
      ],
    });
  }

  return (
    overdueGoals &&
    addingGoals &&
    appraisals &&
    achievements &&
    achievementsNow && (
      <div className="">
        <Navbar />
        <div className="py-10">
          <main className="flex-1">
            <div className="sm:flex-auto px-6">
              <Tab tabs={tabs} />
            </div>
            <div className="py-3"></div>
            <div className="px-6">
              <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-4">
                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                  <dt className="truncate text-sm font-medium text-gray-500">
                    Total Goals
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                    {allGoals}
                  </dd>
                </div>
                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                  <dt className="truncate text-sm font-medium text-gray-500">
                    Total Goals in {new Date().getFullYear()}
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                    {currentGoals}
                  </dd>
                </div>
                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                  <dt className="truncate text-sm font-medium text-gray-500">
                    Total Achievements
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                    {achievements}
                  </dd>
                </div>
                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                  <dt className="truncate text-sm font-medium text-gray-500">
                    Total Achievements in {new Date().getFullYear()}
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                    {achievementsNow}
                  </dd>
                </div>
              </dl>

              <h3 className="mt-5 text-lg font-sans font-medium text-center leading-6 text-gray-900">
                Goals for {new Date().getFullYear()}
              </h3>

              <div className="flex flex-row items-stretch justify-center">
                <div style={{ width: 500, height: 300 }} className="mx-20">
                  <ReactEcharts option={overdueGoals} />
                </div>
                <div style={{ width: 600, height: 300 }}>
                  <ReactEcharts option={addingGoals} />
                </div>
              </div>

              <h3 className="mt-5 text-lg font-sans font-medium text-center leading-6 text-gray-900">
                Appraisals for {new Date().getFullYear()}
              </h3>
              <div className="flex flex-row items-stretch justify-center">
                <div style={{ width: 500, height: 300 }} className="mx-20">
                  <ReactEcharts option={appraisals} />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  );
}
