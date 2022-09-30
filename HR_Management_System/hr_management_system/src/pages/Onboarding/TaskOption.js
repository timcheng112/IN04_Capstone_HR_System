import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useHistory } from "react-router";
import { DotsVerticalIcon, PencilIcon } from "@heroicons/react/solid";
import EditTaskModal from "../../features/Onboarding/EditTaskModal";
import api from "../../utils/api";
import ConfirmDialog from "../../components/ConfirmDialog";
import {
  DocumentMinusIcon,
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import AddTaskModal from "../../features/Onboarding/AddTaskModal";
import ViewTaskModal from "../../features/Onboarding/ViewTaskModal";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TaskOptions({ user, categoryId, task, setTask }) {
  const history = useHistory();
  const [action, setAction] = useState("");
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [error, setError] = useState(null);

  function deleteTask() {
    api
      .deleteTask(categoryId, task.id)
      .then(() => history.push(`/${categoryId}/tasks`));
  }

  function updateTask(task) {
    api
      .editTask(categoryId, task)
      .then((response) => setTask(response.data))
      .catch((error) => setError(error));
  }

  return (
    <div className="space-x-2">
      <button
        type="button"
        onClick={() => setOpenView(true)}
        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <EyeIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
        View
      </button>
      <button
        type="button"
        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <PencilSquareIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
        Edit
      </button>
      <button
        type="button"
        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <TrashIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
        Delete
      </button>
      <ViewTaskModal
        open={openView}
        onClose={() => setOpenView(false)}
        task={task}
      />
    </div>
  );
}
