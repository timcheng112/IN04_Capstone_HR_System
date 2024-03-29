import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import EditTaskModal from "../../features/onboarding/EditTaskModal";
import api from "../../utils/api";
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  UserPlusIcon,
} from "@heroicons/react/20/solid";

import ViewTaskModal from "../../features/onboarding/ViewTaskModal";
import ConfirmDialog from "../../components/ConfirmDialog";
import AssignTaskModal from "../../features/onboarding/AssignTaskModal";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TaskOptions({ task, refreshKeyHandler }) {
  const history = useHistory();
  const [action, setAction] = useState("");
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAssign, setOpenAssign] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [error, setError] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [teams, setTeams] = useState([]);

  function deleteTask() {
    api
      .deleteTask(task.taskId)
      .then(() => {
        alert("Successfully deleted!");
        refreshKeyHandler();
      })
      .catch((error) => setError(error));
  }

  useEffect(() => {
    api
      .getAllDepartments()
      .then((response) => setDepartments(response.data))
      .catch((error) => console.log(error.response.data.message));
  }, []);

  useEffect(() => {
    api
      .getAllTeams()
      .then((response) => setTeams(response.data))
      .catch((error) => console.log(error.response.data.message));
  }, []);

  return (
    <div className="space-x-2">
      <button
        type="button"
        onClick={() => setOpenView(true)}
        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <EyeIcon className="md:-ml-0.5 md:mr-2 h-4 w-4" aria-hidden="true" />
        <span className="hidden md:block">View</span>
      </button>
      <button
        type="button"
        onClick={() => setOpenEdit(true)}
        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <PencilSquareIcon
          className="md:-ml-0.5 md:mr-2 h-4 w-4"
          aria-hidden="true"
        />
        <span className="hidden md:block">Edit</span>
      </button>
      <button
        type="button"
        onClick={() => setOpenAssign(true)}
        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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

      <ViewTaskModal
        open={openView}
        onClose={() => setOpenView(false)}
        task={task}
      />
      <EditTaskModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        task={task}
        refreshKeyHandler={refreshKeyHandler}
      />
      {departments.length > 0 && teams.length > 0 && (
        <AssignTaskModal
          open={openAssign}
          onClose={() => setOpenAssign(false)}
          task={task}
          departments={departments}
          teams={teams}
        />
      )}
      <ConfirmDialog
        title="task"
        item="task"
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        setOpen={() => setOpenDelete(false)}
        onConfirm={deleteTask}
        hasTaskListItems={task.taskListItems.length === 0 ? false : true}
      />
    </div>
  );
}
