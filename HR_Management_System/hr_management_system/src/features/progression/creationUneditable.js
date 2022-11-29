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

export default function CreationUneditable({ request }) {
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
    console.log(request);

    api.getTransferrableEmployees(request.manager.userId).then((response) => {
      console.log(response.data);
      setEmployees(response.data);
    });

    api.getDepartmentByEmployeeId(request.manager.userId).then((response) => {
      setNewDepartment(response.data);
    });

    api.getNewTeam(request.manager.userId).then((response) => {
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

    if (
      selectedEmployee.userId !== 0 &&
      selectedPosition.positionId !== 0 &&
      newDepartment &&
      newTeam &&
      interviewDate.length > 0
    ) {
      api
        .createTransferRequest(
          getUserId(),
          selectedEmployee.userId,
          selectedPosition.positionId,
          newDepartment.departmentId,
          newTeam.teamId,
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
        });
    } else {
      alert("Please ensure all fields are filled before submitting");
    }
  };

  return (
    request &&
    newTeam && (
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
                        htmlFor="employee"
                        className="block text-md text-center font-sans font-medium text-gray-900"
                      >
                        Employee To Transfer
                      </label>
                      <>
                        {request.employee && (
                          <div className="mt-1">
                            <input
                              type="text"
                              name="employee"
                              id="employee"
                              disabled
                              className="block w-full text-center min-w-0 flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-800 "
                              defaultValue={`${request.employee.firstName} ${request.employee.lastName}`}
                            />
                          </div>
                        )}
                      </>
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

                    <div className="sm:col-span-6">
                      <label
                        htmlFor="newPosition"
                        className="block text-md text-center font-sans font-medium text-gray-900"
                      >
                        New Position
                      </label>
                      <>
                        {request.newPosition && (
                          <div className="mt-1">
                            <input
                              type="text"
                              name="newPosition"
                              id="newPosition"
                              disabled
                              className="block w-full text-center min-w-0 flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-800 "
                              defaultValue={request.newPosition.positionName}
                            />
                          </div>
                        )}
                      </>
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
                          disabled
                          className="block w-full min-w-0 text-center flex-1 rounded-md border-gray-300 disabled:cursor-not-allowed focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          defaultValue={request.interviewDate}
                        />
                      </div>
                    </div>

                    <div className="p-5 sm:col-span-6"></div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
}
