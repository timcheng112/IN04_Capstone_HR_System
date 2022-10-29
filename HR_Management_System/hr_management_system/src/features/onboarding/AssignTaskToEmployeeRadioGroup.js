import { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import AddTemplateChecklistUsersCheckbox from "./AddTemplateChecklistUsersCheckbox";
import ByDepartmentCheckbox from "./ByDepartmentCheckbox";
import ByTeamsCheckbox from "./ByTeamsCheckbox";
import ByRolesCheckbox from "./ByRolesCheckbox";
import api from "../../utils/api";
import AssignTaskToEmployeeList from "./AssignTaskToEmployeeList";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AssignTaskToEmployeeRadioGroup({
  teams,
  departments,
  options,
  selected,
  setSelected,
  checkedState,
  setCheckedState,
  roles,
  filteredUnassignedEmployees,
  assignEmployeeToTask,
  setAssignedEmployees,
  resetInitialState,
  search,
  unassignedEmployees,
  assignedEmployees,
  filteredAssignedEmployees,
  removeEmployeeFromTask,
}) {
  //   const resetInitialState = () => {
  //     console.log("resetting");
  //     let tempCheckedState = checkedState;
  //     for (let i = 0; i < options.length; i++) {
  //       if (i === 1) {
  //         tempCheckedState[i] = {
  //           indexChecked: new Array(departments.length).fill(false),
  //         };
  //       } else if (i === 2) {
  //         tempCheckedState[i] = {
  //           indexChecked: new Array(teams.length).fill(false),
  //         };
  //       } else if (i === 3) {
  //         tempCheckedState[i] = {
  //           indexChecked: new Array(roles.length).fill(false),
  //         };
  //       }
  //       }
  //       setUnassignedEmployees(
  //         [...unassignedEmployees, ...assignedEmployees].sort(
  //           (a, b) => a.userId - b.userId
  //         )
  //       );
  //       setAssignedEmployees([]);
  //   };

  const handleOnChange = (position) => {
    console.log(checkedState);
    console.log(
      "SLICED: " +
        [
          ...checkedState[selected.id].indexChecked.slice(0, position),
          !checkedState[selected.id].indexChecked[position],
          ...checkedState[selected.id].indexChecked.slice(
            position + 1,
            checkedState[selected.id].indexChecked.length
          ),
        ]
    );
    const updatedCheckedState = [
      ...checkedState.slice(0, selected.id),
      {
        indexChecked: [
          ...checkedState[selected.id].indexChecked.slice(0, position),
          !checkedState[selected.id].indexChecked[position],
          ...checkedState[selected.id].indexChecked.slice(
            position + 1,
            checkedState[selected.id].indexChecked.length
          ),
        ],
      },
      ...checkedState.slice(selected.id + 1, checkedState.length),
    ];
    setCheckedState(updatedCheckedState);
    console.log(
      "After setting (updated): " +
        updatedCheckedState[selected.id].indexChecked
    );
    console.log("After setting: " + checkedState);
  };

  const handleSelectedOnChange = (e) => {
    console.log(e);
    setSelected(e);
    resetInitialState();
  };

  return (
    <RadioGroup value={selected} onChange={(e) => handleSelectedOnChange(e)}>
      {/* <RadioGroup.Label className="sr-only">  </RadioGroup.Label> */}
      <div className="space-y-4">
        {options.map((option, index) => (
          <div>
            <RadioGroup.Option
              key={option.name}
              value={option}
              className={({ checked, active }) =>
                classNames(
                  checked ? "border-transparent" : "border-gray-300",
                  active ? "border-indigo-500 ring-2 ring-indigo-500" : "",
                  "relative block cursor-pointer rounded-lg border bg-white px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between"
                )
              }
            >
              {({ active, checked }) => (
                <>
                  <span className="flex items-center">
                    <span className="flex flex-col text-sm">
                      <RadioGroup.Label
                        as="span"
                        className="font-medium text-gray-900"
                      >
                        {option.name}
                      </RadioGroup.Label>
                    </span>
                  </span>
                  <span
                    className={classNames(
                      checked
                        ? "bg-indigo-600 border-transparent"
                        : "bg-white border-gray-300",
                      active ? "ring-2 ring-offset-2 ring-indigo-500" : "",
                      "mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-full border flex items-center justify-center"
                    )}
                    aria-hidden="true"
                  >
                    <span className="rounded-full bg-white w-1.5 h-1.5" />
                  </span>
                  <span
                    className={classNames(
                      active ? "border" : "border-2",
                      checked ? "border-indigo-500" : "border-transparent",
                      "pointer-events-none absolute -inset-px rounded-lg"
                    )}
                    aria-hidden="true"
                  />
                </>
              )}
            </RadioGroup.Option>
            {index === 1 &&
              selected === options[1] &&
              departments.map((department, position) => (
                <ByDepartmentCheckbox
                  key={department.departmentId}
                  department={department}
                  handleOnChange={() => handleOnChange(position)}
                  checked={checkedState[1].indexChecked[position]}
                />
              ))}
            {index === 2 &&
              selected === options[2] &&
              teams.map((team, position) => (
                <ByTeamsCheckbox
                  key={team.teamId}
                  team={team}
                  handleOnChange={() => handleOnChange(position)}
                  checked={checkedState[2].indexChecked[position]}
                />
              ))}
            {index === 3 &&
              selected === options[3] &&
              roles.map((role, position) => (
                <ByRolesCheckbox
                  key={role.roleName}
                  role={role}
                  handleOnChange={() => handleOnChange(position)}
                  checked={checkedState[3].indexChecked[position]}
                />
              ))}
            {index === 4 && selected === options[4] && (
              <div className="flex space-x-4 w-full justify-between mt-6">
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
        ))}
      </div>
    </RadioGroup>
  );
}
