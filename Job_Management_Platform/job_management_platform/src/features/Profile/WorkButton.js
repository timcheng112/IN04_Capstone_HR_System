import ViewWork from "./ViewWork";
import { ArchiveBoxXMarkIcon, PencilIcon } from "@heroicons/react/20/solid";
import api from "../../utils/api";
import { getUserId } from "../../utils/Common.js";
import { Fragment, useState } from 'react'

export default function WorkButton({ work, refreshKeyHandler }) {
  const [openView, setOpenView] = useState(false)
  const [user, setUser] = useState(getUserId());
  const [error, setError] = useState();
  function remove(){
    api.removeUserExperience(user, work.experienceId) 
    .then(() => {alert("Successfully removed.");refreshKeyHandler();})
    .catch((error) => setError(error));
  }

  return (
    <div >
      <div className="-mt-px py-6 flex divide-x divide-gray-200">
        <div className="flex w-0 flex-1">
          <button
            type="button"
            onClick={() => setOpenView(true)}
            className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
          >
            <PencilIcon className="h-5 w-5  text-indigo-400" />
            <span className="ml-3 text-indigo-500">Edit</span>
          </button>
          <button
            type="button"
            onClick={() => remove()}
            className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
          >
            <ArchiveBoxXMarkIcon className="h-5 w-5 text-red-400" />
            <span className="ml-3 text-red-400">Remove</span>
          </button>
        </div>
      </div>
      <ViewWork open={openView} setOpen={() => setOpenView(false)} work={work} />
    </div>
  );
}