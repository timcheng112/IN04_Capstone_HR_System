import {
  EyeIcon,
  BookmarkIcon,
  XMarkIcon
} from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { getUserId } from "../../utils/Common.js";
import api from "../../utils/api";

export default function MyFavouriteOption({job, refreshKeyHandler}) {
  const [user, setUser] = useState(getUserId());
  const [error, setError] = useState(null);
  const history = useHistory();

  function remove(){
    api.removeUserBookmark(user, job.postingId)
    .then(() => {alert("Successfully removed."); refreshKeyHandler();})
    .catch((error) => setError(error));
  }
  
  return (
    <div>
      <div className="space-x-4">
        <button
          type="button"
          onClick={() => history.push({pathname:"/jobdetail", state: {job: job}})}
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
          onClick={()=>remove()}
          className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          <XMarkIcon
            className="md:-ml-0.5 md:mr-2 h-4 w-4"
            aria-hidden="true"
          />
          <span className="hidden md:block">Remove</span>
        </button>
      </div>
    </div>
  )

}