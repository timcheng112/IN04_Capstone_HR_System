import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { Fragment, useEffect, useState } from "react";
import api from "../../utils/api";
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

export default function Nomination({ request }) {
  const [appraisals, setAppraisals] = useState([]);
  const [justification, setJustification] = useState(
    request.promotionJustification
  );
  const [withdraw, setWithdraw] = useState(false);
  const [withdrawRemarks, setWithdrawRemarks] = useState("");
  const [positions, setPositions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState({
    positionId: 0,
    positionName: "Select A Position",
  });

  useEffect(() => {
    if (request) {
      console.log(request);

      api.getAllEmployeeAppraisals(request.employee.userId).then((response) => {
        console.log(response.data);
        setAppraisals(response.data);
      });
    }
    api.getAllPositions().then((response) => {
      setPositions(response.data);
    });
  }, []);

  const submitRequest = (evt) => {
    evt.preventDefault();

    if (withdraw && withdrawRemarks.length <= 0) {
      alert(
        "You have opted to withdraw this promotion request. Please fill in the withdraw remarks."
      );
    } else {
      api
        .submitPromotionRequest(
          request.promotionId,
          justification,
          selectedPosition.positionId,
          withdrawRemarks
        )
        .then((response) => {
          console.log(response.data);
          alert(response.data);
        });
    }
  };

  return (
    request &&
    appraisals && (
      <div className="">
        <div>
          <div className="overflow-hidden bg-white mx-10 my-12 shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Promotion Request for {request.employee.firstName}{" "}
                {request.employee.lastName}
              </h3>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Employee's Full Name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {request.employee.firstName} {request.employee.lastName}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Submitted By
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {request.manager.firstName} {request.manager.lastName}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Employee's Email Address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {request.employee.workEmail}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Manager's Email Address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {request.manager.workEmail}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Appraisal History
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <div>
                      <div className="mt-6 flow-root">
                        <ul
                          role="list"
                          className="-my-5 divide-y divide-gray-200"
                        >
                          {appraisals.map((appraisal) => (
                            <li key={appraisal.appraisalId} className="py-4">
                              <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0"></div>
                                <div className="min-w-0 flex-1">
                                  <p className="truncate text-sm font-medium text-gray-900">
                                    {appraisal.appraisalYear}
                                  </p>
                                  <p className="truncate text-sm text-gray-500">
                                    Appraised By{" "}
                                    {appraisal.managerAppraising.firstName}{" "}
                                    {appraisal.managerAppraising.lastName}
                                  </p>
                                </div>
                                <div>
                                  <a
                                    href={`/performance/appraisal/${appraisal.appraisalId}`}
                                    className="inline-flex items-center rounded-full border border-gray-300 bg-white px-2.5 py-0.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-gray-50"
                                  >
                                    View
                                  </a>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Goal History
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <GoalList userId={request.employee.userId} />
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">
                    Previous Appraisals
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
                    incididunt cillum culpa consequat. Excepteur qui ipsum
                    aliquip consequat sint. Sit id mollit nulla mollit nostrud
                    in ea officia proident. Irure nostrud pariatur mollit ad
                    adipisicing reprehenderit deserunt qui eu.
                  </dd>
                </div>
              </dl>
            </div>
            <form className="space-y-8 mx-10" onSubmit={submitRequest}>
              <div className="space-y-8">
                <div>
                  <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                      <label
                        htmlFor="Justification"
                        className="block text-md text-center font-sans font-medium text-gray-900"
                      >
                        Justification
                      </label>
                      <p className="mt-2 text-sm text-gray-500">
                        Explain why this employee is suited for this new
                        position.
                      </p>
                      <div className="mt-1">
                        <textarea
                          id="Justification"
                          name="Justification"
                          rows={3}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          value={justification}
                          onChange={(e) => setJustification(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-6">
                      <label
                        htmlFor="newPosition"
                        className="block text-sm font-medium text-gray-700"
                      ></label>
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
                              <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
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
                    </div>
                    {withdraw && (
                      <div className="sm:col-span-6">
                        <label
                          htmlFor="withdrawRemarks"
                          className="block text-md text-center font-sans font-medium text-gray-900"
                        >
                          Withdraw Remarks
                        </label>
                        <p className="mt-2 text-sm text-gray-500">
                          Explain why this employee has been withdrawn after
                          being nominated for a promotion.
                        </p>
                        <div className="mt-1">
                          <textarea
                            id="withdrawRemarks"
                            name="withdrawRemarks"
                            rows={3}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            value={withdrawRemarks}
                            onChange={(e) => setWithdrawRemarks(e.target.value)}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {withdraw ? (
                <>
                  <div className="pt-5 py-12">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={() => setWithdraw(!withdraw)}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={submitRequest}
                      >
                        Withdraw
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="pt-5 py-12">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      onClick={() => setWithdraw(!withdraw)}
                    >
                      Withdraw
                    </button>
                    <button
                      type="submit"
                      className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    )
  );
}
