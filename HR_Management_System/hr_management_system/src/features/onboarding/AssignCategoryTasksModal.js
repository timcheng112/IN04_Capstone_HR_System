import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import api from "../../utils/api";
import AssignTaskToEmployeeList from "./AssignTaskToEmployeeList";

const AssignCategoryTasksModal = ({
  open,
  onClose,
  category,
  refreshKeyHandler,
}) => {
  const [searchParam] = useState([
    "userId",
    "firstName",
    "lastName",
    "workEmail",
  ]);
  const [unassignedEmployees, setUnassignedEmployees] = useState([]);
  const [assignedEmployees, setAssignedEmployees] = useState([]);
  const [filteredUnassignedEmployees, setFilteredUnassignedEmployees] =
    useState(unassignedEmployees);
  const [filteredAssignedEmployees, setFilteredAssignedEmployees] =
    useState(assignedEmployees);

  useEffect(() => {
    api
      .getAllEmployees()
      .then((response) => {
        setUnassignedEmployees(response.data);
        setFilteredUnassignedEmployees(response.data);
        setAssignedEmployees([]);
        setFilteredAssignedEmployees([]);
      })
      .catch((error) => console.log(error.response.data.message));
  }, [open]);

  const handleSubmit = () => {
    createTaskListItem(Number(category.categoryId));
    onClose();
    refreshKeyHandler();
  };

  function createTaskListItem(categoryId) {
    const successUsers = [];
    const failureUsers = [];
    assignedEmployees.forEach((employee, index, assignedEmployees) => {
      api
        .assignTaskToEmployeeByCategory(
          Number(employee.userId),
          Number(categoryId)
        )
        .then(() => {
          successUsers.push(" " + employee.firstName + " " + employee.lastName);
          if (!assignedEmployees[index + 1]) {
            alert(
              "Successfully assigned to: " +
                successUsers +
                "\nUnsuccessfully assigned to (due to users being previously assigned all tasks under " +
                category.name +
                " category): " +
                failureUsers
            );
          }
        })
        .catch((error) => {
          failureUsers.push(" " + employee.firstName + " " + employee.lastName);
          if (!assignedEmployees[index + 1]) {
            alert(
              "Successfully assigned to:" +
                successUsers +
                "\nUnsuccessfully assigned to:" +
                failureUsers
            );
          }
        });
    });
  }

  function search(e, items, isUnassigned) {
    const value = e.target.value;
    isUnassigned
      ? setFilteredUnassignedEmployees(
          items.filter((item) => {
            return searchParam.some((newItem) => {
              return (
                item[newItem]
                  .toString()
                  .toLowerCase()
                  .indexOf(value.toLowerCase()) > -1
              );
            });
          })
        )
      : setFilteredAssignedEmployees(
          items.filter((item) => {
            return searchParam.some((newItem) => {
              return (
                item[newItem]
                  .toString()
                  .toLowerCase()
                  .indexOf(value.toLowerCase()) > -1
              );
            });
          })
        );
  }

  function assignEmployeeToTask(employee) {
    setUnassignedEmployees(
      unassignedEmployees.filter(
        (unassignedEmployee) => unassignedEmployee.userId !== employee.userId
      )
    );
    setFilteredUnassignedEmployees(
      unassignedEmployees.filter(
        (unassignedEmployee) => unassignedEmployee.userId !== employee.userId
      )
    );
    setAssignedEmployees([...assignedEmployees, employee]);
    setFilteredAssignedEmployees([...assignedEmployees, employee]);
  }

  function removeEmployeeFromTask(employee) {
    setAssignedEmployees(
      assignedEmployees.filter(
        (assignedEmployee) => assignedEmployee.userId !== employee.userId
      )
    );
    setFilteredAssignedEmployees(
      assignedEmployees.filter(
        (assignedEmployee) => assignedEmployee.userId !== employee.userId
      )
    );
    setUnassignedEmployees([...unassignedEmployees, employee]);
    setFilteredUnassignedEmployees([...unassignedEmployees, employee]);
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          onClose();
          // setRefreshKeyModal((oldKey) => oldKey + 1);
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="bg-white relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900 mb-2"
                    >
                      Assign Task to Employees
                    </Dialog.Title>

                    <div className="flex space-x-4 w-full justify-between ">
                      <div className="overflow-y-scroll w-full h-96 border-2 rounded-md">
                        <label className="block text-sm text-gray-700 mt-2 ml-2 font-bold underline-offset-2 underline">
                          Unassigned:
                        </label>
                        <div>
                          <div className="relative mt-1 flex items-center px-2">
                            <input
                              type="text"
                              name="search"
                              id="search"
                              placeholder="Search..."
                              onChange={(e) => {
                                search(e, unassignedEmployees, true);
                              }}
                              className="p-2 block border-2 w-full rounded-md border-gray-300 pr-12 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                            <div className="absolute inset-y-0 right-0 flex py-1.5 pr-3">
                              <kbd className="inline-flex items-center rounded border border-gray-200 px-2 font-sans text-sm font-medium text-gray-400">
                                ⌘K
                              </kbd>
                            </div>
                          </div>
                        </div>
                        <AssignTaskToEmployeeList
                          isAssigning={true}
                          people={filteredUnassignedEmployees}
                          onClick={assignEmployeeToTask}
                        />
                      </div>
                      <div className="overflow-y-scroll w-full border-2 rounded-md">
                        <label className="block text-sm text-gray-700 mt-2 ml-2 font-bold underline-offset-2 underline">
                          Assigned:
                        </label>
                        <div>
                          <div className="relative mt-1 flex items-center px-2">
                            <input
                              type="text"
                              name="search"
                              id="search"
                              placeholder="Search..."
                              onChange={(e) => {
                                search(e, assignedEmployees, false);
                              }}
                              className="p-2 block border-2 w-full rounded-md border-gray-300 pr-12 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                            <div className="absolute inset-y-0 right-0 flex py-1.5 pr-3">
                              <kbd className="inline-flex items-center rounded border border-gray-200 px-2 font-sans text-sm font-medium text-gray-400">
                                ⌘K
                              </kbd>
                            </div>
                          </div>
                        </div>
                        <AssignTaskToEmployeeList
                          people={filteredAssignedEmployees}
                          onClick={removeEmployeeFromTask}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => handleSubmit()}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      onClose();
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default AssignCategoryTasksModal;
