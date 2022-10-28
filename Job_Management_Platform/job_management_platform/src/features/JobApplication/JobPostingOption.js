import {
  EyeIcon,
  BookmarkIcon,
  XMarkIcon
} from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";

export default function JobPostingOption({job}) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const history = useHistory();
  
  return (
    <div>
      <div className="space-x-4">
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <EyeIcon
            className="md:-ml-0.5 md:mr-2 h-4 w-4"
            aria-hidden="true"
            onClick={() => history.push("/jobDetail")}
          />
          <span className="hidden md:block">Detail</span>
        </button>
         {!job.isBookMarked && <button
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          <BookmarkIcon
            className="md:-ml-0.5 md:mr-2 h-4 w-4"
            aria-hidden="true"
          />
          <span className="hidden md:block">Bookmark</span>
        </button>}
      </div>
    </div>
  )

}