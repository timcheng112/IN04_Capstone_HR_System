import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import React from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ShiftBlock = ({ shift, className }) => {
  return (
    <div className={"col-span-1 flex rounded-md shadow-sm h-10 " + className}>
      <div className="flex-shrink-0 flex items-center justify-center w-2 text-white text-sm font-medium rounded-l-md bg-pink-600" />
      <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-t border-r border-b border-gray-200 bg-white">
        <div className="flex-1 truncate px-4 py-2 text-sm">
          <a href="#" className="font-medium text-gray-900 hover:text-gray-600">
            {shift.shiftTitle}
          </a>
          <p className="text-gray-500">
            {shift.startTime} - {shift.endTime}
          </p>
        </div>
        <div className="flex-shrink-0">
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white bg-transparent text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <span className="sr-only">Open options</span>
            <EllipsisVerticalIcon className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShiftBlock;
