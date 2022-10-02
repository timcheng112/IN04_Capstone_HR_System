import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Tab } from "@headlessui/react";
import AddTaskSteps from "./AddTaskSteps";
import AssignTaskToEmployeeList from "./AssignTaskToEmployeeList";
// import InputText from '../../components/inputText';
// import TextArea from '../../components/textArea';
//import api from '../../util/api';

export default function EditTaskModal({ open, onClose, taskName, taskDescription, unassignedEmployees, assignedEmployees }) {
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [employees, setEmployees] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [error, setError] = useState(null);
  const [showStepOne, setShowStepOne] = useState(true);

  const [setUnassignedEmployees] = useState([]);
  const [setAssignedEmployees] = useState([]);

  function assignEmployeeToTask(employee) {
    setUnassignedEmployees(
      unassignedEmployees.filter(
        (unassignedEmployee) => unassignedEmployee.name !== employee.name
      )
    );
    setAssignedEmployees([...assignedEmployees, employee]);
  }

  function removeEmployeeFromTask(employee) {
    setAssignedEmployees(
      assignedEmployees.filter(
        (assignedEmployee) => assignedEmployee.name !== employee.name
      )
    );
    setUnassignedEmployees([...unassignedEmployees, employee]);
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  //   const handleSubmit = (evt) => {
  //     evt.preventDefault()
  //     createCategory()
  //     alert("Successfully created category.")
  //   }

  // function createTask() {
  //   api.addNewTask({ // api change
  //       name: name,
  //       description: description,
  //       employees: employees
  //   })
  //     .then(() => history.goBack())
  //     .catch(error => setError(error))
  // }

  // useEffect(() => {
  //   api.getUser()
  //     .then(response => setUser(response.data))
  //     .catch((error) => setError(error))
  // }, [])

  return (
    // user && (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          onClose();
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
                              defaultValue={taskName}
                              required
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
                              defaultValue={taskDescription}
                              required
                            />
                          </div>
                        </form>
                      </div>
                    ) : (
                      <div className="flex space-x-4 w-full justify-between ">
                        <div className="overflow-y-scroll w-full h-full">
                          <label className="block text-sm font-medium text-gray-700 mt-2">
                            Unassigned:{" "}
                          </label>
                          <AssignTaskToEmployeeList
                            isAssigning={true}
                            people={unassignedEmployees}
                            onClick={assignEmployeeToTask}
                          />
                        </div>
                        <div className="overflow-y-scroll w-full">
                          <label className="block text-sm font-medium text-gray-700 mt-2">
                            Assigned:{" "}
                          </label>
                          <AssignTaskToEmployeeList
                            people={assignedEmployees}
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
                      showStepOne ? () => setShowStepOne(false) : onClose
                    }
                  >
                    {showStepOne ? "Next Step" : "Add Task"}
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
                      setShowStepOne(true);
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
