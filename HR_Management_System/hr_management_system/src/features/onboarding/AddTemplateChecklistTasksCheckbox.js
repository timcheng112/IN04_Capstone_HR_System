export default function AddTemplateChecklistTasksCheckbox({
  task,
  checked,
  onChangeHandler,
}) {
  return (
    <fieldset className="border-t border-b border-gray-200">
      {/* <legend className="sr-only">Notifications</legend> */}
      <div className="divide-y divide-gray-200">
        <div className="relative flex-col items-start py-4">
          <div className="relative flex items-start py-4">
            <div className="min-w-0 flex-1 text-sm">
              <label htmlFor="task-name" className="font-medium text-gray-700">
                {task.name}
              </label>
              <p id="task-description" className="text-gray-500">
                {task.description}
              </p>
              {/* <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                {task.category}
              </span> */}
            </div>
            <div className="ml-3 flex h-5 items-center">
              <input
                id="task-name"
                aria-describedby="task-description"
                name="task"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                checked={checked}
                onChange={onChangeHandler}
              />
            </div>
          </div>
        </div>
      </div>
    </fieldset>
  );
}
