import { Dialog, Transition } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import {
  add,
  differenceInCalendarDays,
  format,
  getDate,
  getDay,
  getMonth,
  getYear,
  nextDay,
  parseISO,
} from "date-fns";
import React, { Fragment, useEffect, useState } from "react";
import api from "../../utils/api";
import EmployeesCheckbox from "./EmployeesCheckbox";
import SelectMenuPosition from "./SelectMenuPosition";
import ShiftBlock from "./ShiftBlock";
import TemplateShiftRadioGroup from "./TemplateShiftRadioGroup";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ViewTemplateShiftsModal = ({
  open,
  onClose,
  person,
  date,
  addShiftHandler,
  rosterId,
  checkIfThereExistsShiftOnSameDay,
}) => {
  const [selectedShift, setSelectedShift] = useState();
  const [duplicateEndDateValue, setDuplicateEndDateValue] = useState(null);
  const [isPhEvent, setIsPhEvent] = useState(false);
  const [templateShifts, setTemplateShifts] = useState([]);
  const [posType, setPosType] = useState({ id: 1, name: "SALESMAN" });
  const [showEmployees, setShowEmployees] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([
    { ...person, posType: "SALESMAN" },
  ]);

  useEffect(() => {
    setSelectedShift();
    setDuplicateEndDateValue(null);
    setIsPhEvent(null);
    setPosType({ id: 1, name: "SALESMAN" });
    setSelectedEmployees([{ ...person, posType: "SALESMAN" }]);
    setShowEmployees(false);

    if (open) {
      api
        .getEmployeesByRosterAndDate(rosterId, format(date, "yyyy-MM-dd"))
        .then((response) =>
          setEmployees(
            response.data
              .filter((employee) => employee.userId !== person.userId)
              .sort((a, b) => a.userId - b.userId)
              .map(
                (employee) => (employee = { ...employee, posType: "SALESMAN" })
              )
          )
        )
        .catch((err) => console.log(err.response.data.message));
    }
  }, [open]);

  useEffect(() => {
    api
      .getTemplateShiftsByRoster(rosterId)
      .then((response) => {
        // let dummyArr = response.data;
        // for (let i = 0; i < dummyArr.length; i++) {
        //   dummyArr.startTime
        // }
        let tempData = response.data;
        for (let i = 0; i < response.data.length; i++) {
          tempData[i].startTime = parseISO(response.data[i].startTime);
          tempData[i].endTime = parseISO(response.data[i].endTime);
        }
        setTemplateShifts(tempData);
      })
      .catch((error) => console.log(error.response.data.message));
  }, [open]);

  const createShiftHandler = () => {
    let numOfDays = 0;
    if (duplicateEndDateValue != null) {
      numOfDays = differenceInCalendarDays(
        new Date(
          duplicateEndDateValue.substring(0, 4),
          duplicateEndDateValue.substring(5, 7) - 1,
          duplicateEndDateValue.substring(8, 10)
        ),
        date
      );
    }
    let arr = [];
    for (let i = 0; i <= numOfDays; i++) {
      let currDate = add(date, {
        days: i,
      });
      let shiftToBeAdded = {
        userId: [
          ...selectedEmployees.map((employee) => employee.userId),
          // person.userId,
        ],
        isPhEvent: isPhEvent,
        positionType: [
          ...selectedEmployees.map((employee) => employee.posType),
        ],
        // posType,
        shift: {
          shiftTitle: selectedShift.shiftTitle,
          startTime: new Date(
            getYear(currDate),
            getMonth(currDate),
            getDate(currDate),
            format(selectedShift.startTime, "HH"),
            format(selectedShift.startTime, "mm"),
            // selectedShift.startTime.substring(0, 2),
            // selectedShift.startTime.substring(3, 5),
            0,
            0
          ),
          endTime: new Date(
            getYear(currDate),
            getMonth(currDate),
            getDate(currDate),
            format(selectedShift.endTime, "HH"),
            format(selectedShift.endTime, "mm"),
            0,
            0
          ),
          minQuota: selectedShift.minQuota,
          remarks: selectedShift.remarks,
          isTemplateShift: false,
        },
      };
      if (checkIfThereExistsShiftOnSameDay(shiftToBeAdded)) {
        //dont do anytg
        console.log(
          "shift is on the same day: " + shiftToBeAdded.shift.startTime
        );
      } else {
        api
          .getShiftListItemByDateAndUserId(
            format(shiftToBeAdded.shift.startTime, "yyyy-MM-dd"),
            person.userId
          )
          .then(() =>
            console.log("THERE EXISTS A PERSISTED SHIFT ON THE SAME DAY")
          )
          .catch(() => {
            arr.push(shiftToBeAdded);
            addShiftHandler(arr);
          });
      }
      // arr.push(shiftToBeAdded);
    }
    // addShiftHandler(arr);
    onClose();
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={onClose}
        // disableScrollLock
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

        <div className="fixed inset-0 z-10">
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
              <Dialog.Panel className="relative transform h-[600px] overflow-auto rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Assigning Shift
                    </Dialog.Title>
                  </div>
                  <div className="space-y-6 sm:space-y-5">
                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                      <label
                        htmlFor="employee-name"
                        className="block text-sm font-medium text-gray-700 mt-2"
                      >
                        Assigned Employee
                      </label>
                      <div className="col-span-2">
                        <text
                          id="employee-name"
                          name="employee-name"
                          className="mt-1 p-2 block w-full text-gray-900 bg-gray-50 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                          {person && person.firstName}{" "}
                          {person && person.lastName}
                        </text>
                      </div>
                      <label
                        htmlFor="employees-names"
                        className="block text-sm font-medium text-gray-700 mt-2"
                      >
                        Duplicate to
                      </label>
                      <div className="col-span-2">
                        {showEmployees ? (
                          <div>
                            <div className="block">
                              <ChevronUpIcon
                                className="h-10 ml-auto text-gray-400 hover:text-gray-900"
                                onClick={() => setShowEmployees(false)}
                              />
                            </div>
                            <EmployeesCheckbox
                              people={employees}
                              addSelectedEmployee={(employee) => {
                                // selectedEmployees.push(employee);
                                setSelectedEmployees([
                                  { ...person, posType: "SALESMAN" },
                                  ...[
                                    ...selectedEmployees.filter(
                                      (a) => a.userId !== person.userId
                                    ),
                                    employee,
                                  ].sort((a, b) => a.userId - b.userId),
                                ]);
                                // console.log(selectedEmployees);
                              }}
                              removeSelectedEmployee={(employee) => {
                                // selectedEmployees = selectedEmployees.filter(
                                //   (selectedEmployee) =>
                                //     selectedEmployee.userId !== employee.userId
                                // );
                                setSelectedEmployees([
                                  ...selectedEmployees.filter(
                                    (selectedEmployee) =>
                                      selectedEmployee.userId !==
                                      employee.userId
                                  ),
                                ]);
                                // console.log(selectedEmployees);
                              }}
                            />
                          </div>
                        ) : (
                          <div className="block">
                            <ChevronDownIcon
                              className="h-10 float-right text-gray-400 hover:text-gray-900"
                              onClick={() => setShowEmployees(true)}
                            />
                          </div>
                        )}
                        {/* <p
                          id="employee-name"
                          name="employee-name"
                          className="mt-1 p-2 block w-full text-gray-900 bg-gray-50 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                          {person && person.firstName}{" "}
                          {person && person.lastName}
                        </p> */}
                      </div>
                    </div>
                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                      <label
                        htmlFor="start-date"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                      >
                        Start Date
                      </label>
                      <div className="mt-1 sm:col-span-2 sm:mt-0">
                        <input
                          type="text"
                          name="start-date"
                          id="start-date"
                          className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                          placeholder={
                            date !== undefined ? format(date, "dd/MM/yyyy") : ""
                          }
                          disabled
                        />
                      </div>
                      <label
                        htmlFor="end-date"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                      >
                        Duplicate until
                      </label>
                      <div className="mt-1 sm:col-span-2 sm:mt-0">
                        <input
                          type="date"
                          name="end-date"
                          id="end-date"
                          className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                          min={
                            date !== undefined
                              ? format(
                                  nextDay(date, getDay(date) + 1),
                                  "yyyy-MM-dd"
                                )
                              : ""
                          }
                          onChange={(e) =>
                            setDuplicateEndDateValue(e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-6 sm:space-y-5">
                      <div className="sm:grid sm:grid-cols-2 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                        {selectedEmployees.map((selectedEmployee) => {
                          return (
                            <SelectMenuPosition
                              posType={posType}
                              setPosType={setPosType}
                              employee={selectedEmployee}
                              setSelectedEmployees={setSelectedEmployees}
                            />
                          );
                        })}
                      </div>
                    </div>
                    <div className="flex items-center sm:border-t sm:border-gray-200 sm:pt-5">
                      <input
                        id="isPhEvent"
                        name="isPhEvent"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        onChange={(e) => setIsPhEvent(e.target.checked)}
                      />
                      <label
                        htmlFor="isPhEvent"
                        className="ml-2 block text-sm text-gray-900"
                      >
                        Is Public Holiday/Event
                      </label>
                    </div>
                    <div className="sm:border-t sm:border-gray-200 sm:pt-5">
                      <label>Choose from the following template shifts:</label>
                      <div
                        className="p-2 border-2 border-dashed border-gray-200 my-2 grid grid-flow-col overflow-y-scroll"
                        aria-hidden="true"
                      >
                        <div>
                          <TemplateShiftRadioGroup
                            selected={selectedShift}
                            setSelected={setSelectedShift}
                            shifts={templateShifts}
                          />
                        </div>
                        {selectedShift && (
                          <div className="mx-2 h-96">
                            <div className="p-2 bg-gray-100 justify-center items-center flex">
                              <h1 className="font-bold">
                                {selectedShift.shiftTitle}
                              </h1>
                            </div>
                            <div className="p-2">
                              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                  <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500">
                                      Start Time
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900">
                                      {format(
                                        selectedShift.startTime,
                                        "h:mmaa"
                                      )}
                                    </dd>
                                  </div>
                                  <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500">
                                      End Time
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900">
                                      {format(selectedShift.endTime, "h:mmaa")}
                                    </dd>
                                  </div>
                                  <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500">
                                      Salesman Quota
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900">
                                      {selectedShift.minQuota[0]}
                                    </dd>
                                  </div>
                                  <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500">
                                      Cashier Quota
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900">
                                      {selectedShift.minQuota[1]}
                                    </dd>
                                  </div>
                                  <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500">
                                      Store Manager Quota
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900">
                                      {selectedShift.minQuota[2]}
                                    </dd>
                                  </div>
                                  <div className="sm:col-span-2">
                                    <dt className="text-sm font-medium text-gray-500">
                                      Remarks
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900">
                                      {selectedShift.remarks}
                                    </dd>
                                  </div>
                                </dl>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex">
                    <button
                      type="button"
                      className="mr-2 mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                      onClick={onClose}
                    >
                      Cancel
                    </button>
                    {selectedShift !== undefined && (
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                        onClick={createShiftHandler}
                      >
                        Assign Shift
                      </button>
                    )}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ViewTemplateShiftsModal;
