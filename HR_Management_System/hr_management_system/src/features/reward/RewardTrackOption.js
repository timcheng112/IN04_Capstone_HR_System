import {
  EyeIcon,
  TrashIcon,
  NoSymbolIcon,
} from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import api from "../../utils/api";
import { getUserId } from "../../utils/Common";
import { useHistory } from 'react-router-dom';

export default function RewardTrackOption({ track }) {
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

  function terminate(){
    api.deleteRewardTrack(track.rewardTrackId)
    .then(() => {alert("Successfully delete.");})
    .catch((error) => setError(error));
  }

  return (
    <div>
      <div className="space-x-4">
      <button
          type="button"
          onClick={()=> history.push({ pathname: '/welfare/rewardtrackdetail', state: { track: track } })}
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <EyeIcon
            className="md:-ml-0.5 md:mr-2 h-4 w-4"
            aria-hidden="true"
          />
          <span className="hidden md:block">Detail</span>
        </button>
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          onClick={() => terminate()}
        >
          <TrashIcon
            className="md:-ml-0.5 md:mr-2 h-4 w-4"
            aria-hidden="true"
          />
          <span className="hidden md:block">Delete</span>
        </button>
      </div>
      
    </div>
  )

}