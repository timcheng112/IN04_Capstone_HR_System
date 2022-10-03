import { Dialog, Transition } from "@headlessui/react";
import { useEffect, useRef } from "react";
import { Fragment, useState } from "react";
import { useHistory } from "react-router";
import AddTaskSteps from "./AddTaskSteps";
import AssignTaskToEmployeeList from "./AssignTaskToEmployeeList";
// import InputText from '../../components/inputText';
// import TextArea from '../../components/textArea';
import api from "../../utils/api";
/* global BigInt */

export default function EditTaskModal({
  open,
  onClose,
  task,
  refreshKeyHandler,
}) {
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);
  const [error, setError] = useState(null);
  const [showStepOne, setShowStepOne] = useState(true);
  const [searchParam] = useState([
    "userId",
    "firstName",
    "lastName",
    "workEmail",
  ]);
  const [refreshKeyModal, setRefreshKeyModal] = useState(0);

  const [unassignedEmployees, setUnassignedEmployees] = useState();
  const [assignedEmployees, setAssignedEmployees] = useState();

  const [filteredUnassignedEmployees, setFilteredUnassignedEmployees] =
    useState(unassignedEmployees);
  const [filteredAssignedEmployees, setFilteredAssignedEmployees] =
    useState(assignedEmployees);

  useEffect(() => {
    api
      .getEmployeesWithoutTask(BigInt(task.taskId))
      .then((response) => {
        setUnassignedEmployees(response.data);
        setFilteredUnassignedEmployees(response.data);
        console.log(response.data);
      })
      .catch((error) => setError(error));
  }, []);

  useEffect(() => {
    api
      .getEmployeesWithTask(BigInt(task.taskId))
      .then((response) => {
        setAssignedEmployees(response.data);
        setFilteredUnassignedEmployees(response.data);
        console.log(response.data);
      })
      .catch((error) => setError(error));
  }, []);

  const handleSubmit = () => {
    editTask();
    onClose();
    //createTaskListItem()
    alert("Successfully edited task.");
    refreshKeyHandler();
  };
  function editTask() {
    api
      .editTask(task.taskId, name, description, assignedEmployees)
      .then(() => {
        createTaskListItem(task.taskId);
      })
      .catch((error) => setError(error));
  }

  function createTaskListItem(taskId) {
    const taskListItem = { isDone: false };
    assignedEmployees.forEach((employee) => {
      api
        .addNewTaskListItem(employee.userId, taskId, taskListItem)
        .then(() => console.log("Task List Item created"))
        .catch((error) => setError(error));
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

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    // user && (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          onClose();
          // setRefreshKeyModal((oldKey) => oldKey + 1);
          setShowStepOne(true);
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
                    <AddTaskSteps status={showStepOne} />
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900 mb-2"
                    >
                      Edit Task 
                    </Dialog.Title>
                    {showStepOne ? (
                      <div className="mt-2">
                        <form action="#" method="POST">
                          <label
                            htmlFor="task-name"
                            className="block text-sm font-medium text-gray-700 mt-2"
                          >
                            Task Name
                          </label>
                          <div className="mt-1">
                            <textarea
                              id="task-name"
                              name="task-name"
                              rows={1}
                              className="mt-1 p-2 block w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                          <label
                            htmlFor="category-name"
                            className="block text-sm font-medium text-gray-700 mt-2"
                          >
                            Task Description
                          </label>
                          <div className="mt-1">
                            <textarea
                              id="category-description"
                              name="category-description"
                              rows={3}
                              className="mt-1 p-2 block w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              required
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            />
                          </div>
                        </form>
                      </div>
                    ) : (
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
                    )}
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={
                      showStepOne ? () => setShowStepOne(false) : handleSubmit
                    }
                  >
                    {showStepOne ? "Next Step" : "Confirm"}
                  </button>
                  {!showStepOne && (
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setShowStepOne(true)}
                    >
                      Go Back
                    </button>
                  )}
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
  // );
}
