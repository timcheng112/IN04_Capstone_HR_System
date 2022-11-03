import { ArchiveBoxXMarkIcon } from "@heroicons/react/20/solid";
import EmptyStateAdd from "./EmptyStateAdd";

export default function TaskGridList({
  onOpen,
  templateTasks,
  removeTaskHandler,
}) {
  return (
    <ul role="list" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-3/4">
      {templateTasks.map((task) => (
        <li
          key={task.taskId}
          className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
        >
          <div className="flex-col w-full p-6">
            <div className="truncate">
              <div className="flex space-x-3">
                <h3 className="truncate text-sm font-bold text-gray-900">
                  {task.name}
                </h3>
                <span className="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                  {task.category.name}
                </span>
              </div>
            </div>
            <div className="truncate">
              <div className="flex space-x-3">
                <p className="mt-1 truncate text-sm text-gray-500">
                  {task.description}
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                <button
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                  onClick={() => removeTaskHandler(task)}
                >
                  <ArchiveBoxXMarkIcon className="h-5 w-5" />
                  <span className="ml-3">Remove</span>
                </button>
              </div>
            </div>
          </div>
        </li>
      ))}
      <li className="col-span-1 divide-y divide-gray-200 rounded-lg shadow">
        <EmptyStateAdd onOpen={onOpen} itemName="Task" />
      </li>
    </ul>
  );
}
