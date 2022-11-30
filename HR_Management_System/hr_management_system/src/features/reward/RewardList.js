
import { Fragment, useState, useEffect } from 'react'
import RewardListOption from './RewardListOption'
import api from "../../utils/api";

export default function RewardList({track, refreshKey, refreshKeyHandler}) {
  const [rewards, setRewards] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    api
      .getRewardTrackRewards(track.rewardTrackId)
      .then((response) => {
        setRewards(response.data);
      })
      .catch((error) => setError(error));
    }, [refreshKey]);

  return (
    <div class="scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300 h-50 w-full overflow-x-scroll">
    <ul role="list" className="flex space-x-6">
      {rewards.map((reward) => (
        <li key={reward.name} className="col-span-1 divide-x divide-gray-200 rounded-lg bg-white shadow">
          <div className="flex w-full items-center justify-between space-x-6 p-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h3 className="truncate text-sm font-medium text-gray-900">{reward.name}</h3>
                <span className="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                  {reward.pointsRequired}
                </span>
              </div>
              {!reward.name.includes("Leave") &&<p className="mt-1 truncate text-sm text-gray-500">{reward.expiryDate}</p>}
            </div>
          </div>
          <RewardListOption reward={reward} refreshKeyHandler={refreshKeyHandler}/>
        </li>
      ))}
    </ul>
    </div>
  )
}
