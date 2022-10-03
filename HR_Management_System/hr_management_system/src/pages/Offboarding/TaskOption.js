import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useHistory } from "react-router";
import { DotsVerticalIcon, PencilIcon } from "@heroicons/react/solid";
import EditTaskModal from "../../features/onboarding/EditTaskModal";
import api from "../../utils/api";
import ConfirmDialog from "../../components/ConfirmDialog";
import {
  DocumentMinusIcon,
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import AddTaskModal from "../../features/onboarding/AddTaskModal";
import ViewTaskModal from "../../features/onboarding/ViewTaskModal";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TaskOptions({ task, refreshKeyHandler}) {
  const history = useHistory();
  const [action, setAction] = useState("");
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [error, setError] = useState(null);

  // const [unassignedEmployees] = useState([
  //   {
  //     name: "Leonard Krasner",
  //     handle: "leonardkrasner",
  //   },
  //   {
  //     name: "Floyd Miles",
  //     handle: "floydmiles",
  //   },
  //   {
  //     name: "Emily Selman",
  //     handle: "emilyselman",
  //   },
  //   {
  //     name: "Kristin Watson",
  //     handle: "kristinwatson",
  //   },
  // ]);
  // const [assignedEmployees] = useState([
  //   {
  //     name: "KongXinyue",
  //     handle: "KongXinyue",
  //   },
  // ]);

  function deleteTask() {
    api
      .deleteTask(task.taskId)
      .then(() => {
        alert("Successfully deleted!");
        refreshKeyHandler();
      })
      .catch((error) => setError(error));
  }


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
        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={() => setOpenDelete(true)}
      >
        <TrashIcon className="md:-ml-0.5 md:mr-2 h-4 w-4" aria-hidden="true" />
        <span className="hidden md:block">Delete</span>
      </button>

      <ViewTaskModal open={openView} onClose={() => setOpenView(false)} task={task}/>
      <EditTaskModal open={openEdit} onClose={() => setOpenEdit(false)} task={task} refreshKeyHandler={refreshKeyHandler}/>
      <ConfirmDialog
        title="task"
        item="task"
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        setOpen={() => setOpenDelete(false)}
        onConfirm={deleteTask}
      /> 
    </div>
  );
}