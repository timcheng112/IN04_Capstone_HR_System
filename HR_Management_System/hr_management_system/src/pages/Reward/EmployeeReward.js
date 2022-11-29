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

export default function EmployeeReward() {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const history = useHistory();
  const [refreshKey, setRefreshKey] = useState(0);
  const [department, setDepartment] = useState(null)
  const [open, setOpen] = useState(false);
  const [tracks, setTracks] = useState([])

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
      .getRewardTrackByEmployee(getUserId()) 
      .then((response) => {
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
          
      </div>
    </div>
  );
}
