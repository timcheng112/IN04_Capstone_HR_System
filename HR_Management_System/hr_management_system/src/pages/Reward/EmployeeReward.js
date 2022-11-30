import { React, useRef } from "react";
import Navbar from "../../components/Navbar";
import WelfareSidebar from "../../components/Sidebar/Welfare";
import Tab from "../../features/jobrequest/Tab";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { getUserId, setUserSession } from "../../utils/Common";
import { useHistory } from "react-router-dom";
import { CalendarIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import EmployeeRewardOption from "../../features/reward/EmployeeRewardOption";

export default function EmployeeReward() {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const history = useHistory();
  const [refreshKey, setRefreshKey] = useState(0);
  const [open, setOpen] = useState(false);
  const [track, setTrack] = useState(null)
  const [uId, setUId] = useState(getUserId());
  const [department, setDepartment] = useState(null)
  const [dept, setDept] = useState(null)

  useEffect(() => {
    api
      .getUser(getUserId())
      .then((response) => {
        setUser(response.data);
        console.log(uId);
      })
      .catch((error) => setError(error));
  }, []);

  useEffect(() => {
    api
      .getRewardTrackByEmployee(getUserId())
      .then((response) => {
        setTrack(response.data);
        console.log(response.data);
      })
  }, [refreshKey]);

  useEffect(() => {
    api
      .getDepartmentByEmployeeId(getUserId())
      .then((response) => {
        setDepartment(response.data);
        get(response.data.departmentId);
      })
      .catch((error) => setError(error));
  }, [refreshKey]);

  function get(deptId) {
    api.getDept(deptId)
      .then((res) => {
        setDept(res.data);
      })
  }

  return (
    user && dept && uId && <div className="">
      <Navbar />
      <div className="flex">
        <div className="flex-1">
          <WelfareSidebar currentPage={{
            name: "Rewards",
            href: "/welfare/myrewardtrack",
            current: true,
          }} />
          <div className="py-2"></div>
          {uId == dept.departmentHead.userId && <button
            type="button"
            onClick={() => history.push("/welfare/rewardtrack")}
            className="relative inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Switch Mode
          </button>}
        </div>
      </div>
      {track == null ? (
        <div className="p-4 py-20">
          <img
            src={require("../../assets/shiba-cant-find-documents.png")}
            alt="shiba"
            className="flex object-contain h-20 w-full"
          />
          <span className="p-1 text-xl font-semibold text-gray-900">
            No Active Reward Track
          </span>
        </div>
      ) : (
        <div className="py-5 px-6">
          <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
            <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
              <div className="ml-4 mt-2">
                <h3 className="text-lg font-medium leading-6 text-gray-900">{track.name}</h3>
              </div>
              <div className="ml-4 mt-2 flex-shrink-0">
                <button
                  type="button"
                  disabled
                  className="relative inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {user.rewardPoints} Reward Points
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-hidden bg-white shadow sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
              {track.rewards.map((reward) => (
                <li key={reward.rewardId}>
                  <a className="block hover:bg-gray-50">
                    <div className="flex items-center px-4 py-4 sm:px-6">
                      <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                        <div className="truncate">
                          <div className="flex text-sm">
                            <p className="truncate font-medium text-indigo-600">{reward.name}</p>
                            <p className="ml-1 flex-shrink-0 font-normal text-gray-500">{reward.description} </p>
                          </div>
                          <div className="mt-2 flex">
                            <div className="flex items-center text-sm text-gray-500">
                              <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                              <p>
                                Expired on {reward.expiryDate}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                          <div className="flex  overflow-hidden space-x-4">
                            <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-0.5 text-sm font-medium text-purple-800">
                              {reward.pointsRequired} points
                            </span>
                            <EmployeeRewardOption reward={reward} refreshKey={refreshKey} refreshKeyHandler={() => setRefreshKey((oldKey) => oldKey + 1)}/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>)}
    </div>
  );
}
