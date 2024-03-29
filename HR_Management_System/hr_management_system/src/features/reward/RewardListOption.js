import ViewReward from './ViewReward'
import { EyeIcon, TrashIcon } from '@heroicons/react/20/solid'
import { Fragment, useState, useEffect } from 'react'
import api from "../../utils/api";

export default function RewardListOption({ reward, refreshKeyHandler }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState();

  function delet() {
    api.deleteReward(reward.rewardId)
      .then(() => {
        alert("Successfully delete.");
        refreshKeyHandler();
      })
      .catch((error) => setError(error));
  }

  return (
    <div>
      <div className="-mt-px flex divide-x divide-gray-200">
        <div className="flex w-0 flex-1">
          <button
           type="button"
            onClick={() => setOpen(true)}
            className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
          >
            <EyeIcon className="h-4 w-4 text-indigo-400" aria-hidden="true" />
            <span className="ml-3"></span>
          </button>
          <ViewReward open={open} setOpen={setOpen} reward={reward} refreshKeyHandler={refreshKeyHandler} />
        </div>
        <div className="-ml-px flex w-0 flex-1">
          <button
            type="button"
            onClick={() =>delet()}
            className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
          >
            <TrashIcon className="h-4 w-4 text-red-400" aria-hidden="true" />
            <span className="ml-3"></span>
          </button>
        </div>
      </div>
    </div>
  );
}