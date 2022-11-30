import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router";
import api from "../../utils/api";
import { getUserId } from "../../utils/Common";
import GoalList from "../performance/GoalList";

const people = [
  {
    name: "Leonard Krasner",
    handle: "leonardkrasner",
    imageUrl:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Floyd Miles",
    handle: "floydmiles",
    imageUrl:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Emily Selman",
    handle: "emilyselman",
    imageUrl:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Kristin Watson",
    handle: "kristinwatson",
    imageUrl:
      "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

const steps = [
  {
    id: "01",
    name: "Nomination",
    description: "Reporting Officer provides promotion details.",
    href: "#",
    status: "current",
  },
  {
    id: "02",
    name: "Interview",
    description: "Potential Manager conducts interview.",
    href: "",
    status: "upcoming",
  },
  {
    id: "03",
    name: "Processing",
    description: "HR processes promotion request.",
    href: "",
    status: "upcoming",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Creation() {
  const [positions, setPositions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState({
    positionId: 0,
    positionName: "Select A Position",
  });
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState({
    userId: 0,
    firstName: "Select",
    lastName: "",
  });
  const [interviewDate, setInterviewDate] = useState("");
  const [newDepartment, setNewDepartment] = useState(null);
  const [newTeam, setNewTeam] = useState(null);
  const history = useHistory();

  useEffect(() => {
    api.getTransferrableEmployees(getUserId()).then((response) => {
      console.log(response.data);
      setEmployees(response.data);
    });

    api.getDepartmentByEmployeeId(getUserId()).then((response) => {
      setNewDepartment(response.data);
    });

    api.getNewTeam(getUserId()).then((response) => {
      console.log(response.data);
      setNewTeam(response.data);
    });
  }, []);

  useEffect(() => {
    if (selectedEmployee.userId !== 0) {
      api
        .getPositionsToTransfer(
          getUserId(),
          selectedEmployee.userRole,
          selectedEmployee.currentPosition.positionId
        )
        .then((response) => {
          console.log(response.data);
          setPositions(response.data);
        });
    }
  }, [selectedEmployee]);

  const submitRequest = (evt) => {
    evt.preventDefault();

    var newTeamId = 0;

    if (newTeam) {
      newTeamId = newTeam.teamId;
    }

    if (
      selectedEmployee.userId !== 0 &&
      selectedPosition.positionId !== 0 &&
      newDepartment &&
      interviewDate.length > 0
    ) {
      api
        .createTransferRequest(
          getUserId(),
          selectedEmployee.userId,
          selectedPosition.positionId,
          newDepartment.departmentId,
          newTeamId,
          interviewDate
        )
        .then((response) => {
          console.log(response.data);
          history.push(`/transfer/${response.data}`);
          alert(
            "Transfer request for " +
              selectedEmployee.firstName +
              " " +
              selectedEmployee.lastName +
              " has been submitted"
          );
        })
        .finally(() => {
          window.location.reload();
        });
    } else {
      alert("Please ensure all fields are filled before submitting");
    }
  };

  return (
    <div className="">
      <div>
        <div className="overflow-hidden bg-white mx-10 my-12 shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium font-sans leading-6 text-gray-900">
              New Transfer Request
            </h3>
            <h3 className="text-sm font-sans leading-6 text-gray-700">
              Raise a transfer request to initiate the transfer of an employee
              to your team
            </h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6"></div>
          <form className="space-y-8 mx-10" onSubmit={submitRequest}>
            <div className="space-y-8">
              <div>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <label
                      htmlFor="newPosition"
                      className="block text-sm font-medium text-gray-700"
                    ></label>
                    <Listbox
                      value={selectedEmployee}
                      onChange={setSelectedEmployee}
                    >
                      {({ open }) => (
                        <>
                          <Listbox.Label className="block text-md text-center font-sans font-medium text-gray-900">
                            Employee To Transfer
                          </Listbox.Label>
                          <div className="relative mt-1">
                            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                              <span className="block truncate text-center">
                                {selectedEmployee.firstName}{" "}
                                {selectedEmployee.lastName}
                              </span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon
                                  className="h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </span>
                            </Listbox.Button>

                            <Transition
                              show={open}
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {employees.map((person) => (
                                  <Listbox.Option
                                    key={person.userId}
                                    className={({ active }) =>
                                      classNames(
                                        active
                                          ? "text-white bg-indigo-600"
                                          : "text-gray-900",
                                        "relative cursor-default select-none py-2 pl-3 pr-9"
                                      )
                                    }
                                    value={person}
                                  >
                                    {({ selected, active }) => (
                                      <>
                                        <span
                                          className={classNames(
                                            selected
                                              ? "font-semibold"
                                              : "font-normal",
                                            "block truncate"
                                          )}
                                        >
                                          {person.firstName} {person.lastName}
                                        </span>

                                        {selected ? (
                                          <span
                                            className={classNames(
                                              active
                                                ? "text-white"
                                                : "text-indigo-600",
                                              "absolute inset-y-0 right-0 flex items-center pr-4"
                                            )}
                                          >
                                            <CheckIcon
                                              className="h-5 w-5"
                                              aria-hidden="true"
                                            />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </>
                      )}
                    </Listbox>
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="department"
                      className="block text-md text-center font-sans font-medium text-gray-900"
                    >
                      New Department
                    </label>

                    <>
                      {newDepartment && (
                        <div className="mt-1">
                          <input
                            type="text"
                            name="department"
                            id="department"
                            disabled
                            className="block w-full text-center min-w-0 flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-800 "
                            defaultValue={newDepartment.departmentName}
                          />
                        </div>
                      )}
                    </>
                  </div>

                  {newTeam && (
                    <div className="sm:col-span-6">
                      <label
                        htmlFor="team"
                        className="block text-md text-center font-sans font-medium text-gray-900"
                      >
                        New Team
                      </label>

                      <>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="team"
                            id="team"
                            disabled
                            className="block w-full text-center min-w-0 flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-800 "
                            defaultValue={newTeam.teamName}
                          />
                        </div>
                      </>
                    </div>
                  )}

                  <div className="sm:col-span-6">
                    {selectedEmployee.userId === 0 ? (
                      <>
                        <label
                          htmlFor="newPosition"
                          className="block text-md text-center font-sans font-medium text-gray-900"
                        >
                          New Position
                        </label>
                        <h1 className="font-sans">Please select an employee</h1>
                      </>
                    ) : (
                      <>
                        <Listbox
                          value={selectedPosition}
                          onChange={setSelectedPosition}
                        >
                          {({ open }) => (
                            <>
                              <Listbox.Label className="block text-md text-center font-sans font-medium text-gray-900">
                                New Position
                              </Listbox.Label>
                              <div className="relative mt-1">
                                <Listbox.Button className="relative w-full text-center cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                                  <span className="block truncate">
                                    {selectedPosition.positionName}
                                  </span>
                                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronUpDownIcon
                                      className="h-5 w-5 text-gray-400"
                                      aria-hidden="true"
                                    />
                                  </span>
                                </Listbox.Button>

                                <Transition
                                  show={open}
                                  as={Fragment}
                                  leave="transition ease-in duration-100"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {positions.map((person) => (
                                      <Listbox.Option
                                        key={person.positionId}
                                        className={({ active }) =>
                                          classNames(
                                            active
                                              ? "text-white bg-indigo-600"
                                              : "text-gray-900",
                                            "relative cursor-default select-none py-2 pl-3 pr-9"
                                          )
                                        }
                                        value={person}
                                      >
                                        {({ selected, active }) => (
                                          <>
                                            <span
                                              className={classNames(
                                                selected
                                                  ? "font-semibold"
                                                  : "font-normal",
                                                "block truncate"
                                              )}
                                            >
                                              {person.positionName}
                                            </span>

                                            {selected ? (
                                              <span
                                                className={classNames(
                                                  active
                                                    ? "text-white"
                                                    : "text-indigo-600",
                                                  "absolute inset-y-0 right-0 flex items-center pr-4"
                                                )}
                                              >
                                                <CheckIcon
                                                  className="h-5 w-5"
                                                  aria-hidden="true"
                                                />
                                              </span>
                                            ) : null}
                                          </>
                                        )}
                                      </Listbox.Option>
                                    ))}
                                  </Listbox.Options>
                                </Transition>
                              </div>
                            </>
                          )}
                        </Listbox>
                      </>
                    )}
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="scheduled"
                      className="block text-md text-center font-sans font-medium text-gray-900"
                    >
                      Interview Date
                    </label>
                    <div className="mt-1">
                      <input
                        type="date"
                        name="scheduled"
                        id="scheduled"
                        className="block w-full min-w-0 text-center flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={interviewDate}
                        onChange={(e) => setInterviewDate(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-5 py-12">
              <div className="flex justify-end">
                <button
                  type="button"
                  className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
