import React, { Fragment } from "react";
import CategoryOptions from "../../pages/Offboarding/CategoryOption";
import TaskOptions from "../../pages/Offboarding/TaskOption";
import { useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function TasklistTable({ categories, setCategories, refreshKeyHandler }) {
  console.log("categories: " + categories);
  console.log("categories length: " + categories.length);
  return (
    <div className="mt-8 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
            {categories.length === undefined || categories.length === 0 ? (
              <div className="p-4">
                <img
                  src={require("../../assets/shiba-cant-find-documents.png")}
                  alt="shiba"
                  className="object-contain h-16 w-full"
                />
                <span className="p-1 text-xl font-semibold text-gray-900">
                  No categories found
                </span>
              </div>
            ) : (
              <table className="min-w-full">
                <thead className="bg-white">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      colSpan={2}
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      colSpan={4}
                    >
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {categories.map((category) => (
                    <Fragment key={category.name}>
                      <tr className="border-t border-gray-200 bg-gray-50">
                        <th
                          colSpan={2}
                          scope="col"
                          className=" px-4 py-2 text-left text-sm font-semibold text-gray-900 sm:px-6"
                        >
                          {category.name}
                        </th>
                        <th colSpan={2} />
                        <th className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 ">
                          <CategoryOptions
                            category={category}
                            refreshKeyHandler={refreshKeyHandler}
                            // setCategory={setCategory}
                          />
                        </th>
                      </tr>
                      {category.tasks.map((task, taskIdx) => {
                        if (!task.isOnboarding) {
                          return (
                            <tr
                              key={task.name}
                              className={classNames(
                                taskIdx === 0
                                  ? "border-gray-300"
                                  : "border-grays-200",
                                "border-t"
                              )}
                            >
                              <td
                                colSpan={2}
                                className="whitespace-nowrap text-left py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                              >
                                {task.name}
                              </td>
                              <td
                                colSpan={2}
                                className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500"
                              >
                                {task.description}
                              </td>
                              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                <TaskOptions
                                  task={task}
                                  refreshKeyHandler={refreshKeyHandler}
                                  //   setTask={setTask}
                                />
                              </td>
                            </tr>
                          );
                        }
                      })}
                    </Fragment>
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

export default TasklistTable;
