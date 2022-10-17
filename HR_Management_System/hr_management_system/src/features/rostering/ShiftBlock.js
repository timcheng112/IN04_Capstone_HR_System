import {
  EllipsisVerticalIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { format } from "date-fns";
import React, { useState } from "react";
import EditShiftModal from "./EditShiftModal";
import ViewShiftModal from "./ViewShiftModal";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ShiftBlock = ({ shift, className, removeShiftHandler }) => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const deleteShiftHandler = () => {
    removeShiftHandler(shift);
  };

  return (
    <div className={"col-span-1 flex rounded-md shadow-sm h-20 " + className}>
      <ViewShiftModal
        open={open}
        onClose={() => setOpen(false)}
        shift={shift}
      />
      <EditShiftModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        shift={shift}
      />
      <div className="flex-shrink-0 flex items-center justify-center w-2 text-white text-sm font-medium rounded-l-md bg-pink-600" />
      <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-t border-r border-b border-gray-200 bg-white">
        <div
          className="flex-1 truncate px-4 py-2 text-sm hover:bg-gray-100"
          onClick={() => setOpen(true)}
        >
          <p href="#" className="font-medium text-gray-900 hover:text-gray-600">
            {shift.shiftTitle}
          </p>
          <p className="text-gray-500">
            {format(shift.startDate, "h:mmaaa")} -{" "}
            {format(shift.endDate, "h:mmaaa")}
          </p>
        </div>
        <div className="flex flex-col">
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white bg-transparent text-gray-400 hover:text-gray-500 focus:outline-none"
            onClick={() => setOpenEdit(true)}
          >
            <PencilSquareIcon className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white bg-transparent text-gray-400 hover:text-gray-500 focus:outline-none"
            onClick={() => deleteShiftHandler()}
          >
            <TrashIcon className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShiftBlock;