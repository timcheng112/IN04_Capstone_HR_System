import {
  EyeIcon,
  BookmarkIcon,
  XMarkIcon
} from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { getUserId } from "../../utils/Common.js";
import api from "../../utils/api";

export default function JobPostingOption({job}) {
  const [user, setUser] = useState(getUserId()); 
  const [error, setError] = useState();
  const history = useHistory();
  const[jobs, setJobs]=useState([]);

  function bookmark(){
    api.addUserBookmark(user, job.postingId)
    .then(() => alert("Successfully bookmark."))
    .catch((error) => setError(error));
  }
  useEffect(() => {
    console.log(job)
    api
      .getUserBookmarks(user)
      .then((response) => {
        setJobs(response.data);
        console.log(response.data);
      })
      .catch((error) => setError(error));
  }, []);

  
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
        {!jobs.includes(job) && <button
          type="button"
          onClick={()=>bookmark()}
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