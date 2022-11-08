import {
  EyeIcon,
  PlusIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  ChevronRightIcon
} from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import api from "../../utils/api";
import { getUserId } from "../../utils/Common";
import ConfirmDialog from "../../components/ConfirmDialog";
import { useHistory } from 'react-router-dom';

export default function RequestOption({ request, refreshKeyHandler }) {
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

  function deleteRequest() {
    api.deleteJobRequest(request.requestId).then(() => {
      alert("Successfully deleted!");
      refreshKeyHandler();
    })
      .catch((error) => {
        var message = error.request.response;
        if (message.includes("Job Request cannot be found")) {
          alert("Unknown error has occured, please try again");
        } else if (message.includes("Job Request is already approved") || message.includes("Job Request is linked to a Job Posting")) {
          alert("This Job Request has already been approved, unable to delete. Please contact an Administrator");
        } else if (message.includes("Job Request is already cancelled")) {
          alert("This Job Request is already cancelled, cannot be deleted");
        } else if (message.includes("Job Request is already closed")) {
          alert("This Job Request is already closed, cannot be deleted");
        } else {
          setError(error);
        }
      });
  }
  return (
    <div>
      <div className="space-x-4">
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => history.push({ pathname: "/hiring/jobrequest/details", state: { request: request } })}
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
          onClick={() => setTrash(true)}
        >
          <TrashIcon
            className="md:-ml-0.5 md:mr-2 h-4 w-4"
            aria-hidden="true"
          />
          <span className="hidden md:block">Delete</span>
        </button>
        {request.status === 'APPROVED' && <button
          type="button"
          onClick={() =>  history.push({ pathname: "/hiring/allapplicants", state: { job: request }})}
        >
          <ChevronRightIcon
            className="h-5 w-5 text-gray-400 group-hover:text-gray-700"
            aria-hidden="true"
          />
        </button>}
      </div>
      <ConfirmDialog
        title="Job Request"
        item="Job Request"
        open={trash}
        setOpen={() => setTrash(false)}
        onClose={() => setTrash(false)}
        onConfirm={deleteRequest}
      />
    </div>
  )

}