import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import api from "../../utils/api";
import AddUserByGroupingsRadioGroup from "./AddUserByGroupingsRadioGroup";

const options = [
  {
    id: 0,
    name: "Assign To Everyone",
  },
  {
    id: 1,
    name: "Assign By Departments",
  },
  {
    id: 2,
    name: "Assign By Teams",
  },
  {
    id: 3,
    name: "Assign By Roles",
  },
  {
    id: 4,
    name: "Assign Individually",
  },
];

const roles = [
  {
    roleName: "All Managers",
  },
  {
    roleName: "All Employees (Excluding Managers)",
  },
];

const AssignCategoryTasksModal = ({
  open,
  onClose,
  category,
  departments,
  teams,
  isOnboarding,
}) => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selected, setSelected] = useState(options[0]);
  const [checkedState, setCheckedState] = useState(() => {
    let tempCheckedState = new Array(options.length).fill({
      indexChecked: [],
    });
    for (let i = 0; i < options.length; i++) {
      if (i === 1) {
        tempCheckedState[i] = {
          indexChecked: new Array(departments.length).fill(false),
        };
      } else if (i === 2) {
        tempCheckedState[i] = {
          indexChecked: new Array(teams.length).fill(false),
        };
      } else if (i === 3) {
        tempCheckedState[i] = {
          indexChecked: new Array(roles.length).fill(false),
        };
      }
    }
    console.log(tempCheckedState);
    return tempCheckedState;
  });

  useEffect(() => {
    api
      .getAllEmployees()
      .then((response) => setUsers(response.data))
      .catch((error) => console.log(error.response.data.message));
  }, []);

  const submitHandler = () => {
    let error = false;
    while (selectedUsers.length > 0) {
      selectedUsers.pop();
    }
    if (selected === options[0]) {
      selectedUsers.push(...users);
    } else if (selected === options[1]) {
      for (let i = 0; i < checkedState[1].indexChecked.length; i++) {
        if (checkedState[1].indexChecked[i]) {
          selectedUsers.push(
            ...users.filter((user) =>
              user.teams.some(
                (team) =>
                  team.department.departmentId === departments[i].departmentId
              )
            )
          );
        }
        // setSelectedUsers(tempSelectedUsers);
      }
      if (
        !checkedState[1].indexChecked.some((isChecked) => isChecked === true)
      ) {
        error = true;
      }
    } else if (selected === options[2]) {
      for (let i = 0; i < checkedState[2].indexChecked.length; i++) {
        if (checkedState[2].indexChecked[i]) {
          selectedUsers.push(
            ...users.filter((user) =>
              user.teams.some((team) => team.teamId === teams[i].teamId)
            )
          );
        }
      }
      //   setSelectedUsers(tempSelectedUsers);
      if (
        !checkedState[2].indexChecked.some((isChecked) => isChecked === true)
      ) {
        error = true;
      }
    } else if (selected === options[3]) {
      if (checkedState[3].indexChecked[0] && checkedState[3].indexChecked[1]) {
        // setSelectedUsers(users);
        selectedUsers.push(...users);
      } else if (checkedState[3].indexChecked[0]) {
        selectedUsers.push(
          ...users.filter((user) => user.userRole === "MANAGER")
        );
      } else if (checkedState[3].indexChecked[1]) {
        selectedUsers.push(
          ...users.filter((user) => user.userRole === "EMPLOYEE")
        );
      }
      if (
        !checkedState[3].indexChecked.some((isChecked) => isChecked === true)
      ) {
        error = true;
      }
    } else if (selected === options[4]) {
      const tempSelectedUsers = [];
      for (let i = 0; i < checkedState[4].indexChecked.length; i++) {
        if (checkedState[4].indexChecked[i]) {
          selectedUsers.push(users[i]);
        }
      }
      //   setSelectedUsers(tempSelectedUsers);
      if (
        !checkedState[4].indexChecked.some((isChecked) => isChecked === true)
      ) {
        error = true;
      }
    }
    if (error) {
      alert("Invalid inputs!");
    } else {
      handleSubmit();
      resetInitialState();
      onClose();
    }
  };

  const resetInitialState = () => {
    let tempCheckedState = new Array(options.length).fill({
      indexChecked: [],
    });
    for (let i = 0; i < options.length; i++) {
      if (i === 1) {
        tempCheckedState[i] = {
          indexChecked: new Array(departments.length).fill(false),
        };
      } else if (i === 2) {
        tempCheckedState[i] = {
          indexChecked: new Array(teams.length).fill(false),
        };
      } else if (i === 3) {
        tempCheckedState[i] = {
          indexChecked: new Array(roles.length).fill(false),
        };
      } else if (i === 4) {
        tempCheckedState[i] = {
          indexChecked: new Array(users.length).fill(false),
        };
      }
    }
    setCheckedState(tempCheckedState);
    setSelected(options[0]);
  };

  function createTaskListItem(taskId, alertMsg, isLastLoop) {
    let successUsers = "";
    let failureUsers = "";
    console.log("Creating TaskListItem");
    const taskListItem = { isDone: false };
    console.log("Selected");
    selectedUsers.forEach((employee, index) => {
      api
        .addNewTaskListItem(employee.userId, taskId, taskListItem)
        .then(() => {
          console.log("Task List Item created");
          if (successUsers === "") {
            successUsers += employee.firstName + " " + employee.lastName;
          } else {
            successUsers += ", " + employee.firstName + " " + employee.lastName;
          }
          if (index === selectedUsers.length - 1) {
            alertMsg.push(
              "\nTask " + taskId + "\nSuccessfully assigned to: " + successUsers
            );
            if (isLastLoop) {
              //   alert(alertMsg);
              alert("Assigned Checklist Completed");
            }
          }
        })
        .catch((error) => {
          console.log(error.response.data.message);
          if (failureUsers === "") {
            failureUsers += employee.firstName + " " + employee.lastName;
          } else {
            failureUsers += ", " + employee.firstName + " " + employee.lastName;
          }
          console.log(error.response.data.message);
          if (index === selectedUsers.length - 1) {
            alertMsg.push(
              "\nTask " +
                taskId +
                "\nSuccessfully assigned to: " +
                successUsers +
                "\nFailed to assign to: " +
                failureUsers
            );
            if (isLastLoop) {
              //   alert(alertMsg);
              alert("Assigned Category Tasks Completed");
            }
          }
        });
    });
  }

  const handleSubmit = () => {
    if (selectedUsers.length > 0) {
      const alertMsg = [];
      const taskIds = [];
      const tasks = category.tasks.filter(
        (task) => task.isOnboarding === isOnboarding
      );
      for (let i = 0; i < tasks.length; i++) {
        taskIds.push(tasks[i].taskId);
      }
      taskIds.forEach((taskId, index) => {
        if (index === taskIds.length - 1) {
          createTaskListItem(taskId, alertMsg, true);
        } else {
          createTaskListItem(taskId, alertMsg, false);
        }
      });
    } else {
      alert("Unable to assign as selected grouping has 0 users!");
    }
  };

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
                    <AddUserByGroupingsRadioGroup
                      users={users}
                      teams={teams}
                      departments={departments}
                      options={options}
                      selected={selected}
                      setSelected={setSelected}
                      checkedState={checkedState}
                      setCheckedState={setCheckedState}
                      roles={roles}
                    />
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={submitHandler}
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
