/*
  This example requires Tailwind CSS v3.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { useLayoutEffect, useRef, useState } from "react";

const taskListItem = [
  {
    name: "Task 1",
    description: "This is Task 1.",
  },
  {
    name: "Task 2",
    description: "This is Task 2.",
  },
  {
    name: "Task 3",
    description: "This is Task 3.",
  },
  // More people...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Onboarding() {
  const checkbox = useRef();
  const [checked, setChecked] = useState(false);
  //   const [indeterminate, setIndeterminate] = useState(false);
  const [selectedTask, setSelectedTask] = useState([]);

  //   useLayoutEffect(() => {
  //     const isIndeterminate =
  //       selectedTask.length > 0 && selectedTask.length < people.length;
  //     setChecked(selectedTask.length === people.length);
  //     setIndeterminate(isIndeterminate);
  //     checkbox.current.indeterminate = isIndeterminate;
  //   }, [selectedTask]);

  function toggleAll() {
    setSelectedTask(checked);
    setChecked(!checked);
    //setIndeterminate(false);
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Onboarding</h1>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full table-fixed divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th />
                    <th
                      scope="colgroup"
                      className="min-w-[12rem] py-4 pr-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {taskListItem.map((task) => (
                    <tr
                      key={task.name}
                      className={
                        selectedTask.includes(task) ? "bg-gray-50" : undefined
                      }
                    >
                      <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                        {selectedTask.includes(task) && (
                          <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
                        )}
                        <input
                          type="checkbox"
                          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                          value={task.name}
                          checked={selectedTask.includes(task)}
                          onChange={(e) =>
                            setSelectedTask(
                              e.target.checked
                                ? [...selectedTask, task]
                                : selectedTask.filter((p) => p !== task)
                            )
                          }
                        />
                      </td>
                      <td
                        className={classNames(
                          "whitespace-nowrap py-4 pr-3 text-sm font-medium text-left",
                          selectedTask.includes(task)
                            ? "text-indigo-600"
                            : "text-gray-900"
                        )}
                      >
                        {task.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left">
                        {task.description}
                      </td>
                      <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button className="text-indigo-600 hover:text-indigo-900">
                          Delete <span className="sr-only">, {task.name}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
