import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import React, { Fragment, useEffect, useState } from "react";
import api from "../../utils/api";
import AddTemplateChecklistTasksCheckbox from "./AddTemplateChecklistTasksCheckbox";
import AddTemplateChecklistUsersCheckbox from "./AddTemplateChecklistUsersCheckbox";
import AddUserByGroupingsRadioGroup from "./AddUserByGroupingsRadioGroup";
import AssignTaskToEmployeeList from "./AssignTaskToEmployeeList";

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

const AddTemplateChecklistUsersModal = ({
  open,
  onClose,
  users,
  teams,
  departments,
  selectedUsers,
  setSelectedUsers,
}) => {
  const [selected, setSelected] = useState(options[0]);
  // const [tempSelectedUsers, setTempSelectedUsers] = useState([]);
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
      } else if (i === 4) {
        tempCheckedState[i] = {
          indexChecked: new Array(users.length).fill(false),
        };
      }
    }
    console.log(tempCheckedState);
    return tempCheckedState;
  });

  const submitHandler = () => {
    let error = false;
    if (selected === options[0]) {
      setSelectedUsers(users);
    } else if (selected === options[1]) {
      const tempSelectedUsers = [];
      for (let i = 0; i < checkedState[1].indexChecked.length; i++) {
        if (checkedState[1].indexChecked[i]) {
          // api
          //   .getEmployeesByDepartment(departments[i].departmentId)
          //   .then((response) => {
          //     const result = response.data.filter((user) =>
          //       selectedUsers.every(
          //         (selectedUser) => selectedUser.userId !== user.userId
          //       )
          //     );
          //     setSelectedUsers([...selectedUsers, ...result]);
          //   })
          //   .catch((error) =>
          //     console.log("Cannot get employees by department")
          //   );
          tempSelectedUsers.push(
            ...users.filter((user) =>
              user.teams.some(
                (team) =>
                  team.department.departmentId === departments[i].departmentId
              )
            )
          );
        }
        setSelectedUsers(tempSelectedUsers);
      }
      if (
        !checkedState[1].indexChecked.some((isChecked) => isChecked === true)
      ) {
        error = true;
      }
    } else if (selected === options[2]) {
      const tempSelectedUsers = [];
      for (let i = 0; i < checkedState[2].indexChecked.length; i++) {
        if (checkedState[2].indexChecked[i]) {
          tempSelectedUsers.push(
            ...users.filter((user) =>
              user.teams.some((team) => team.teamId === teams[i].teamId)
            )
          );
        }
      }
      setSelectedUsers(tempSelectedUsers);
      if (
        !checkedState[2].indexChecked.some((isChecked) => isChecked === true)
      ) {
        error = true;
      }
    } else if (selected === options[3]) {
      if (checkedState[3].indexChecked[0] && checkedState[3].indexChecked[1]) {
        setSelectedUsers(users);
      } else if (checkedState[3].indexChecked[0]) {
        setSelectedUsers(users.filter((user) => user.userRole === "MANAGER"));
      } else if (checkedState[3].indexChecked[1]) {
        setSelectedUsers(users.filter((user) => user.userRole === "EMPLOYEE"));
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
          tempSelectedUsers.push(users[i]);
        }
      }
      setSelectedUsers(tempSelectedUsers);
      if (
        !checkedState[4].indexChecked.some((isChecked) => isChecked === true)
      ) {
        error = true;
      }
    }
    if (error) {
      alert("Invalid inputs!");
    } else {
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

  // useEffect(() => {
  //   // setCheckedState(
  //   //   new Array(options.length).fill({
  //   //     indexChecked: [],
  //   //   })
  //   // );
  //   let tempCheckedState = checkedState;
  //   for (let i = 0; i < options.length; i++) {
  //     if (i === 1) {
  //       tempCheckedState[i] = {
  //         indexChecked: new Array(departments.length).fill(false),
  //       };
  //     } else if (i === 2) {
  //       tempCheckedState[i] = {
  //         indexChecked: new Array(teams.length).fill(false),
  //       };
  //     } else if (i === 3) {
  //       tempCheckedState[i] = {
  //         indexChecked: new Array(roles.length).fill(false),
  //       };
  //     } else if (i === 4) {
  //       tempCheckedState[i] = {
  //         indexChecked: new Array(users.length).fill(false),
  //       };
  //     }
  //   }
  //   // resetInitialState();
  //   setCheckedState(tempCheckedState);
  //   console.log(checkedState);
  // }, []);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          onClose();
          resetInitialState();
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="flex-col w-full h-96 overflow-y-scroll px-6 pt-6">
                  <AddUserByGroupingsRadioGroup
                    users={users}
                    teams={teams}
                    departments={departments}
                    // setTempSelectedUsers={(checkedUsers) =>
                    //   setTempSelectedUsers(checkedUsers)
                    // }
                    options={options}
                    selected={selected}
                    setSelected={setSelected}
                    checkedState={checkedState}
                    setCheckedState={setCheckedState}
                    roles={roles}
                  />
                  {/* {users.map((user) => (
                    <AddTemplateChecklistUsersCheckbox user={user} />
                  ))} */}
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                    onClick={submitHandler}
                  >
                    Confirm
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                    onClick={() => {
                      onClose();
                      resetInitialState();
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

export default AddTemplateChecklistUsersModal;
