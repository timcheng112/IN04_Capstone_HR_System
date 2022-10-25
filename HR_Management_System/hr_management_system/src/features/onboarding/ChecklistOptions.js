import {
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
  UserPlusIcon,
} from "@heroicons/react/20/solid";
import React from "react";

const ChecklistOptions = () => {
  return (
    <div className="space-x-2">
      <button
        type="button"
        // onClick={() => setOpenEdit(true)}
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
        // onClick={() => setOpenDelete(true)}
      >
        <TrashIcon className="md:-ml-0.5 md:mr-2 h-4 w-4" aria-hidden="true" />
        <span className="hidden md:block">Delete</span>
      </button>
      {/* 
      <AddTaskModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        category={category}
        refreshKeyHandler={refreshKeyHandler}
      />
      <EditCategoryModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        category={category}
        refreshKeyHandler={refreshKeyHandler}
      />
      <AssignCategoryTasksModal
        open={openAssign}
        onClose={() => setOpenAssign(false)}
        category={category}
        refreshKeyHandler={refreshKeyHandler}
        isOnboarding={true}
      />
      <ConfirmDialog
        title="category"
        item="category"
        open={openDelete}
        setOpen={() => setOpenDelete(false)}
        onClose={() => setOpenDelete(false)}
        onConfirm={deleteCategory}
      /> */}
    </div>
  );
};

export default ChecklistOptions;
