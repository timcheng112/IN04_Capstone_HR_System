import { PlusCircleIcon } from "@heroicons/react/24/outline";
import React from "react";

const EmptyStateAdd = ({ onOpen, itemName }) => {
  return (
    <button
      type="button"
      className="flex flex-col items-center justify-center h-full w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      onClick={onOpen}
    >
      <PlusCircleIcon className="h-12 w-12 text-gray-400" />
      <span className="mt-2 block text-sm font-medium text-gray-900">
        Add {itemName}
      </span>
    </button>
  );
};

export default EmptyStateAdd;