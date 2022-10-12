import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  MagnifyingGlassIcon
} from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import api from "../../utils/api";
import { getUserId } from "../../utils/Common";
import ConfirmDialog from "../../components/ConfirmDialog";
import { useHistory } from 'react-router-dom';

export default function RequestOption(request) {
  const history = useHistory();
  const [trash, setTrash] = useState(false);
  const [error, setError] = useState(null);

  function deleteRequest() {
    api.deleteJobRequest(request.requestId).then(() => {
      alert("Successfully deleted!");
      //refreshKeyHandler();
    })
      .catch((error) => setError(error));
  }

  <div>
    <div className="space-x-4">
      <button
        type="button"
        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={() => history.push("/hiring/jobrequestdetail")}
      >
        <EyeIcon
          className="md:-ml-0.5 md:mr-2 h-4 w-4"
          aria-hidden="true"
        />
        <span className="hidden md:block">Detail</span>
      </button>
      <button
        type="button"
        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={() => setTrash(true)}
      >
        <TrashIcon
          className="md:-ml-0.5 md:mr-2 h-4 w-4"
          aria-hidden="true"
        />
        <span className="hidden md:block">Delete</span>
      </button>
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

}