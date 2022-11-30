import { React, useRef } from "react";
import Navbar from "../../components/Navbar";
import WelfareSidebar from "../../components/Sidebar/Welfare";
import Tab from "../../features/jobrequest/Tab";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { getUserId, setUserSession } from "../../utils/Common";
import { useHistory } from "react-router-dom";
import RewardTrackOption from "../../features/reward/RewardTrackOption";
import AddNewRewardTrack from "../../features/reward/AddNewRewardTrack";
import {
  EyeIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";

export default function Reward() {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const history = useHistory();
  const [refreshKey, setRefreshKey] = useState(0);
  const [department, setDepartment] = useState(null)
  const [open, setOpen] = useState(false);
  const [tracks, setTracks] = useState([])
  const tabs = [
    { name: "Reward Tracks", href: "#", current: true },
    {
      name: "Review Forms",
      href: "/welfare/reviewform",
      current: false,
    },
  ];

  // const tracks =[{name:'track1', startDate:'2022-11-3',endDate:'2022-11-10',pointsRatio:'1.5',isActive:true},
  // {name:'track2', startDate:'2022-11-3',endDate:'2022-11-10',pointsRatio:'1.5',isActive:true},
  // {name:'track3', startDate:'2022-11-3',endDate:'2022-11-10',pointsRatio:'1.5',isActive:false},]

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
      .getRewardTrackByDepartmentHead(getUserId()) 
      .then((response) => {
        console.log(response.data);
        setTracks(response.data);
      })
      .catch((error) => setError(error));
    }, []);

  return (
    <div className="">
      <Navbar />
      <div className="flex">
        <div className="flex-1">
          <WelfareSidebar currentPage={{
            name: "Rewards",
            href: "/welfare/rewardtrack",
            current: true,
          }} />
        </div>
      </div>
      <div className="py-10">
        <main className="flex-1">
          <div className="sm:flex-auto px-6">
            <Tab tabs={tabs} />
          </div>
          <div className="py-3"></div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            <PlusIcon
            className="md:-ml-0.5 md:mr-2 h-4 w-4"
            aria-hidden="true"
          />
            Add New Reward Track
          </button>
          <AddNewRewardTrack open={open} setOpen={setOpen}/>
        </div>
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="mt-8 flex flex-col">
              <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className=" py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                            Name
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Start Date
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            End Date
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Points Ratio
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Status
                          </th>
                          {/* <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Edit</span>
                    </th> */}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {tracks.map((track) => (
                          <tr key={track.rewardTrackId}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-6">
                              {track.name}
                            </td>
                            <td className=" whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">{track.startDate}</td>
                            <td className=" whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">{track.endDate}</td>
                            <td className=" whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">{track.pointsRatio}</td>
                            <td className=" whitespace-nowrap px-3 py-4 text-left text-sm">
                              {track.isActive && <span className=" whitespace-nowrap inline-flex items-center rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-800">
                                Active
                              </span>}
                              {!track.isActive && <span className="whitespace-nowrap inline-flex items-center rounded-full bg-red-100 px-3 py-0.5 text-sm font-medium text-red-800">
                                Inactive
                              </span>}
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <RewardTrackOption track={track}/>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
