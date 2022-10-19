import { PlusIcon } from "@heroicons/react/20/solid";
import React from "react";

const EmptyStateTemplateShifts = ({ openModal }) => {
  return (
    <button
      type="button"
      className="w-96 flex flex-col items-center relative rounded-lg border-2 border-dashed border-gray-300 p-12 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      onClick={openModal}
    >
      <PlusIcon className="h-10 w-10" />
      <span className="mt-2 block text-sm font-medium text-gray-900">
        Create a template shift
      </span>
    </button>
  );
};

export default EmptyStateTemplateShifts;
