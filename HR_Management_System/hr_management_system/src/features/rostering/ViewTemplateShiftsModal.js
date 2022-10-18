import { Dialog, Transition } from "@headlessui/react";
import {
  add,
  differenceInCalendarDays,
  format,
  getDate,
  getDay,
  getMonth,
  getYear,
  nextDay,
} from "date-fns";
import React, { Fragment, useEffect, useState } from "react";
import ShiftBlock from "./ShiftBlock";
import TemplateShiftRadioGroup from "./TemplateShiftRadioGroup";

const shifts = [
  {
    id: "1",
    shiftTitle: "6H Morning Shift",
    startTime: "08:00",
    endTime: "14:00",
    minQuota: [2, 2, 1, 0],
    remarks:
      "Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.",
  },
  {
    id: "2",
    shiftTitle: "6H Afternoon Shift",
    startTime: "14:00",
    endTime: "20:00",
    minQuota: [3, 3, 0, 1],
    remarks:
      "Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.",
  },
  {
    id: "3",
    shiftTitle: "8H Morning Shift",
    startTime: "06:00",
    endTime: "14:00",
    minQuota: [2, 2, 0, 0],
    remarks:
      "Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.",
  },
  {
    id: "4",
    shiftTitle: "8H Afternoon Shift",
    startTime: "14:00",
    endTime: "22:00",
    minQuota: [1, 3, 1, 0],
    remarks:
      "Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ViewTemplateShiftsModal = ({
  open,
  onClose,
  person,
  date,
  addShiftHandler,
}) => {
  const [selectedShift, setSelectedShift] = useState();
  const [duplicateEndDateValue, setDuplicateEndDateValue] = useState(null);
  const [isPhEvent, setIsPhEvent] = useState(false);

  useEffect(() => {
    setSelectedShift();
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
        userId: person.userId,
        isPhEvent: isPhEvent,
        shift: {
          shiftTitle: selectedShift.shiftTitle,
          startDate: new Date(
            getYear(currDate),
            getMonth(currDate),
            getDate(currDate),
            selectedShift.startTime.substring(0, 2),
            selectedShift.startTime.substring(3, 5),
            0,
            0
          ),
          endDate: new Date(
            getYear(currDate),
            getMonth(currDate),
            getDate(currDate),
            selectedShift.endTime.substring(0, 2),
            selectedShift.endTime.substring(3, 5),
            0,
            0
          ),
          minQuota: selectedShift.minQuota,
          remarks: selectedShift.remarks,
        },
      };
      arr.push(shiftToBeAdded);
    }
    addShiftHandler(arr);
    onClose();
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
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
                          {person && person.name}
                        </text>
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
                    <div className="flex items-center sm:border-t sm:border-gray-200 sm:pt-5">
                      <input
                        id="isPhEvent"
                        name="isPhEvent"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        onChange={(e) => setIsPhEvent(e.target.value)}
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
                            shifts={shifts}
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
                                      {selectedShift.startTime}
                                    </dd>
                                  </div>
                                  <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500">
                                      End Time
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900">
                                      {selectedShift.endTime}
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
