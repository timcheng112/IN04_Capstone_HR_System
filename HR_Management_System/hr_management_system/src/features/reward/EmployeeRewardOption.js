import {
  EyeIcon,
  BoltIcon,
  NoSymbolIcon,
} from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import api from "../../utils/api";
import { getUserId } from "../../utils/Common";
import { useHistory } from 'react-router-dom';

export default function EmployeeRewardOption({ reward }) {
  const history = useHistory();
  const [trash, setTrash] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .getUser(getUserId())
      .then((response) => {
        setUser(response.data);
        //        console.log(response.data);
      })
      .catch((error) => setError(error));
  }, []);

  // function terminate(){
  //   api.deleteRewardTrack(track.rewardTrackId)
  //   .then(() => {alert("Successfully delete.");})
  //   .catch((error) => setError(error));
  // }

  return (
    <div>
      <div className="space-x-4">
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          onClick
        >
          <BoltIcon
            className="md:-ml-0.5 md:mr-2 h-4 w-4"
            aria-hidden="true"
          />
          <span className="hidden md:block">Redeem</span>
        </button>
      </div>
      
    </div>
  )

}