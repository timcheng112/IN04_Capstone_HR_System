import { useState } from "react";
import CreateTaskSlideover from "./CreateTaskSlideover";
import DeleteCategoryModal from "./DeleteCategoryModal";
import Task from "./Task";

export default function TaskList() {
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [isDeleteCategoryOpen, setIsDeleteCategoryOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  return (
    <div>
      <h1 class="text-xl font-bold mt-2 px-20">
        <span class="underline underline-offset-8 font-mono">Category 1</span>
      </h1>
      <div class="container px-20 divide-y">
        <button
          type="button"
          onClick={() => setIsCreateTaskOpen(true)}
          class="text-gray-900 mt-2 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="mr-2 -ml-1 w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
            />
          </svg>
          Create Task
        </button>
        <button
          type="button"
          onClick={() => setIsDeleteCategoryOpen(true)}
          class="text-gray-900 mt-2 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="mr-2 -ml-1 w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 13.5H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
            />
          </svg>
          Delete Category
        </button>
        <Task
          taskTitle="Task 1"
          taskDescription="This is the description for Task 1."
        />
        <Task
          taskTitle="Task 2"
          taskDescription="This is the description for Task 2."
        />
        <Task
          taskTitle="Task 3"
          taskDescription="This is the description for Task 3."
        />
      </div>
      <h1 class="text-xl font-bold mt-2 px-20">
        <span class="underline underline-offset-8 font-mono">Category 2</span>
      </h1>
      <div class="container px-20 divide-y">
        <Task
          taskTitle="Task 4"
          taskDescription="This is the description for Task 4."
        />
        <Task
          taskTitle="Task 5"
          taskDescription="This is the description for Task 5."
        />
      </div>
      <CreateTaskSlideover
        open={isCreateTaskOpen}
        onClose={() => setIsCreateTaskOpen(false)}
      />
      <DeleteCategoryModal
        open={isDeleteCategoryOpen}
        onClose={() => setIsDeleteCategoryOpen(false)}
      />
    </div>
  );
}
