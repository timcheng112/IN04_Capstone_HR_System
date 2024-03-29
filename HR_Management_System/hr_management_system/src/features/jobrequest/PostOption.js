import {
  EyeIcon,
  ChevronRightIcon,
  XMarkIcon
} from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import api from "../../utils/api";
import { getUserId } from "../../utils/Common";
import CloseDialog from "../jobrequest/CloseDialog";
import { useHistory  } from 'react-router-dom';

export default function PostOption({post, refreshKeyHandler}) {
  const history = useHistory();
  const [trash, setTrash] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    api
      .getUser(getUserId())
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch((error) => setError(error));
  }, []);

  function closePost() {
    api.closeJobPost(post.postingId).then(() => {
      alert("Successfully closed!");
      refreshKeyHandler();
    })
      .catch((error) => setError(error));
  }
  return (
    <div>
      <div className="space-x-4">
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => history.push({pathname: "/hiring/jobpost/details" , state: {post: post}})}
        >
          <EyeIcon
            className="md:-ml-0.5 md:mr-2 h-4 w-4"
            aria-hidden="true"
          />
          <span className="hidden md:block">Detail</span>
        </button>
         {post.status !== "CLOSED" && <button
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          onClick={() => setTrash(true)}
        >
          <XMarkIcon
            className="md:-ml-0.5 md:mr-2 h-4 w-4"
            aria-hidden="true"
          />
          <span className="hidden md:block">Close</span>
        </button>}
        {post.status === 'CREATED' && <button
          type="button"
          onClick={() =>  history.push({ pathname: "/hiring/allapplicants", state: { job: post }})}
        >
          <ChevronRightIcon
            className="h-5 w-5 text-gray-400 group-hover:text-gray-700"
            aria-hidden="true"
          />
        </button>}
      </div>
      <CloseDialog
        title="Job Post"
        item="Job Post"
        open={trash}
        setOpen={() => setTrash(false)}
        onClose={() => setTrash(false)}
        onConfirm={closePost}
      />
    </div>
  )

}