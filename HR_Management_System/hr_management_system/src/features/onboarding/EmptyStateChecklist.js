import { ListBulletIcon } from "@heroicons/react/20/solid";
import React from "react";
import { useHistory } from "react-router";

const EmptyStateChecklist = ({ onOpen }) => {
  const history = useHistory();

  return (
    <button
      type="button"
      className="flex flex-col items-center w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      onClick={() =>
        history.push({
          pathname: "/admin/addtemplatechecklist",
          state: { isOnboarding: true },
        })
      }
    >
      <ListBulletIcon className="h-12 w-12 text-gray-400" />
      <span className="mt-2 block text-sm font-medium text-gray-900">
        Create a new template checklist
      </span>
    </button>
  );
};

export default EmptyStateChecklist;
