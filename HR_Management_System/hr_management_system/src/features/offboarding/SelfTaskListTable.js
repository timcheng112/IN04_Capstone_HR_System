import React, { useState } from "react";
import { useHistory } from "react-router";
import api from "../../utils/api";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function SelfTasklistTable({
  taskListItems,
  setTaskListItems,
  refreshKeyHandler,
}) {
  function onClickHandler(taskListItem) {
    api
      .markTaskListItemAsComplete(taskListItem.taskListItemId)
      .then(() => {
        console.log("Successfully checked!");
        refreshKeyHandler();
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }
  function deleteTaskListItem(taskListItemId) {
    api
      .deleteTaskListItem(taskListItemId)
      .then(() => {
        alert("Successfully deleted!");
        refreshKeyHandler();
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }

  return (
    <div className="mt-8 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
            {taskListItems.length === 0 ? (
              <div className="p-4">
                <img
                  src={require("../../assets/shiba-thumbs-up.png")}
                  alt="shiba"
                  className="object-contain h-16 w-full"
                />
                <span className="p-1 text-xl font-semibold text-gray-900">
                  No remaining tasks
                </span>
              </div>
            ) : (
              <table className="min-w-full table-fixed divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th />
                    <th
                      scope="col"
                      colSpan={1}
                      className="py-4 pr-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      colSpan={2}
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      colSpan={1}
                    >
                      Category
                    </th>
                    <th />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {taskListItems.map((taskListItem) => (
                    <tr
                      key={taskListItem.taskListItemId}
                      className={taskListItem.isDone && "bg-gray-50"}
                    >
                      <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                        {taskListItem.isDone && (
                          <div className="absolute inset-y-0 left-0 w-0.5 bg-gray-600" />
                        )}
                        <input
                          type="checkbox"
                          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                          value={taskListItem.taskListItemId}
                          checked={taskListItem.isDone}
                          onChange={(e) => {
                            e.target.checked && !taskListItem.isDone
                              ? onClickHandler(taskListItem)
                              : console.log("Task already checked");
                          }}
                        />
                      </td>
                      <td
                        className={classNames(
                          "whitespace-nowrap py-4 pr-3 text-sm font-medium text-left",
                          taskListItem.isDone
                            ? "text-gray-900 line-through"
                            : "text-gray-900"
                        )}
                      >
                        {taskListItem.task.name}
                      </td>
                      <td
                        className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left"
                        colSpan={2}
                      >
                        {taskListItem.task.description}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left">
                        {taskListItem.task.category.name}
                      </td>
                      <td className="whitespace-nowrap px-3 text-sm text-gray-500 text-left">
                        {taskListItem.isDone && (
                          // <button
                          //   type="button"
                          //   className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          //   onClick={() => onClickHandler(taskListItem)}
                          // >
                          //   Clear
                          // </button>
                          <button
                            type="button"
                            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() =>
                              deleteTaskListItem(taskListItem.taskListItemId)
                            }
                          >
                            Clear
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelfTasklistTable;
