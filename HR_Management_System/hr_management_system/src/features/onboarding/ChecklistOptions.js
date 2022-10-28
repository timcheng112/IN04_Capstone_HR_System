import {
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
  UserPlusIcon,
} from "@heroicons/react/20/solid";
import {React, useState} from "react";
import { useHistory } from "react-router";
import ConfirmDialog from "../../components/ConfirmDialog";
import api from "../../utils/api";

const ChecklistOptions = ({checklist,refreshKeyHandler}) => {
  const history = useHistory();
  const [openDelete, setOpenDelete] = useState(false);

  function deleteChecklist() {
    api
      .deleteChecklist(checklist.checklistId)
      .then(() => {
        alert("Successfully deleted!");
        refreshKeyHandler();
      })
      .catch((error) => alert("Unable to delete"));
  }

  return (
    <div className="space-x-2">
      <button
        type="button"
        onClick={() => history.push({pathname: "/admin/checklistdetail" , state: {checklist: checklist}})}
        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <PencilSquareIcon
          className="md:-ml-0.5 md:mr-2 h-4 w-4"
          aria-hidden="true"
        />
        <span className="hidden md:block">Details</span>
      </button>
      <button
        type="button"
        // onClick={() => setOpenAssign(true)}
        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70 disabled:hover:bg-indigo-600"
        // disabled={category.tasks.length === 0 ? true : false}
      >
        <UserPlusIcon
          className="md:-ml-0.5 md:mr-2 h-4 w-4"
          aria-hidden="true"
        />
        <span className="hidden md:block">Assign</span>
      </button>
      <button
        type="button"
        className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        onClick={() => setOpenDelete(true)}
      >
        <TrashIcon className="md:-ml-0.5 md:mr-2 h-4 w-4" aria-hidden="true" />
        <span className="hidden md:block">Delete</span>
      </button>
      
      <ConfirmDialog
        title="checklist"
        item="checklist"
        open={openDelete}
        setOpen={() => setOpenDelete(false)}
        onClose={() => setOpenDelete(false)}
        onConfirm={deleteChecklist}
      />
    </div>
  );
};

export default ChecklistOptions;
