import { Fragment, useEffect, useState } from "react";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import AddShiftForm from "./AddShiftForm";
import {
  add,
  differenceInCalendarDays,
  format,
  getDate,
  getDay,
  getDaysInMonth,
  getMonth,
  getYear,
  isSameMonth,
  nextDay,
  set,
} from "date-fns";
import SelectMenuPosition from "./SelectMenuPosition";
import api from "../../utils/api";
import EmployeesCheckbox from "./EmployeesCheckbox";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function GenerateFixedShiftsModal({
  open,
  onClose,
  //   person,
  date = new Date(),
  addShiftHandler,
  checkIfThereExistsShiftOnSameDay,
  rosterId,
  team,
}) {
  //   const [duplicateEndDateValue, setDuplicateEndDateValue] = useState(null);
  //   const [salesmanQuotaValue, setSalesmanQuotaValue] = useState("");
  //   const [cashierQuotaValue, setCashierQuotaValue] = useState("");
  //   const [storemanagerQuotaValue, setStoremanagerQuotaValue] = useState("");
  //   const [isPhEvent, setIsPhEvent] = useState(false);
  //   const [posType, setPosType] = useState({ id: 1, name: "SALESMAN" });
  //   const [showEmployees, setShowEmployees] = useState(false);
  //   const [selectedEmployees, setSelectedEmployees] = useState([
  //     { ...person, posType: "SALESMAN" },
  //   ]);
  // let selectedEmployees = [];

  const [shiftTitleValue, setShiftTitleValue] = useState("");
  const [startTimeValue, setStartTimeValue] = useState(null);
  const [endTimeValue, setEndTimeValue] = useState(null);
  const [shiftRemarksValue, setShiftRemarksValue] = useState("");
  const [duplicateEndMonthValue, setDuplicateEndMonthValue] = useState("-");

  const months = [
    getMonth(date),
    (getMonth(date) + 1) % 12,
    (getMonth(date) + 2) % 12,
    (getMonth(date) + 3) % 12,
    (getMonth(date) + 4) % 12,
    (getMonth(date) + 5) % 12,
    (getMonth(date) + 6) % 12,
  ];
  useEffect(() => {
    setDuplicateEndMonthValue("-");
    setShiftTitleValue("");
    setStartTimeValue(null);
    setEndTimeValue(null);
    setShiftRemarksValue("");
  }, [open]);

  const createShiftHandler = () => {
    console.log("Shift Title: " + shiftTitleValue);
    console.log("Start Time: " + startTimeValue);
    console.log("End Time: " + endTimeValue);
    // Check for empty fields
    if (
      shiftTitleValue !== "" &&
      startTimeValue !== null &&
      endTimeValue !== null
    ) {
      // Check for invalid start time & end time (end time cannot be before start time)
      if (startTimeValue < endTimeValue) {
        let numOfDays = 0;
        if (duplicateEndMonthValue !== "-") {
          let year = getYear(date);
          if (getMonth(date) > duplicateEndMonthValue) {
            year += 1;
          }
          const endDate = new Date(
            year,
            duplicateEndMonthValue,
            getDaysInMonth(new Date(year, duplicateEndMonthValue))
          );
          numOfDays = differenceInCalendarDays(endDate, date);
        } else {
          const nextBDay = add(date, {
            days: 1,
          });
          console.log("nextBday: " + nextBDay);
          let year = getYear(date);
          if (!isSameMonth(date, nextBDay)) {
            if (getMonth(nextBDay) < getMonth(date)) {
              year += 1;
            }
          }
          const endDate = new Date(
            year,
            getMonth(nextBDay),
            getDaysInMonth(new Date(year, getMonth(nextBDay)))
          );
          numOfDays = differenceInCalendarDays(endDate, date);
        }
        let arr = [];
        console.log(numOfDays);
        for (let i = 1; i <= numOfDays; i++) {
          let currDate = add(date, {
            days: i,
          });
          // for (let i = 0; i <= selectedEmployees.length; i++) {
          let shiftToBeAdded = {
            // userId:
            //   i === selectedEmployees.length
            //     ? person.userId
            //     : selectedEmployees[i].userId,
            userId: [
              ...team.users.map((employee) => employee.userId),
              // person.userId,
            ],
            isPhEvent: false,
            positionType: [...team.users.map((employee) => "OFFICEWORKER")],
            // posType,
            shift: {
              shiftTitle: shiftTitleValue,
              startTime: new Date(
                getYear(currDate),
                getMonth(currDate),
                getDate(currDate),
                startTimeValue.substring(0, 2),
                startTimeValue.substring(3, 5),
                0,
                0
              ),
              endTime: new Date(
                getYear(currDate),
                getMonth(currDate),
                getDate(currDate),
                endTimeValue.substring(0, 2),
                endTimeValue.substring(3, 5),
                0,
                0
              ),
              //   minQuota: [
              //     salesmanQuotaValue,
              //     cashierQuotaValue,
              //     storemanagerQuotaValue,
              //   ],
              remarks: shiftRemarksValue,
              isTemplateShift: false,
            },
          };
          if (checkIfThereExistsShiftOnSameDay(shiftToBeAdded)) {
            //dont do anytg
            console.log(
              "shift is on the same day: " + shiftToBeAdded.shift.startTime
            );
          } else {
            team.users.map((employee) => {
              api
                .getShiftListItemByDateAndUserId(
                  format(shiftToBeAdded.shift.startTime, "yyyy-MM-dd"),
                  employee.userId
                )
                .then(() =>
                  console.log("THERE EXISTS A PERSISTED SHIFT ON THE SAME DAY")
                )
                .catch(() => {
                  arr.push(shiftToBeAdded);
                  addShiftHandler(arr);
                });
            });
          }
        }
        // }
        // console.log("ARRAY: " + arr);
        // addShiftHandler(arr);
        onClose();
      } else {
        alert("End time must be after start time!");
      }
    } else {
      alert("Invalid fields!");
    }
  };

  const getMonthName = (index) => {
    let year = getYear(date);
    if (index < date.getMonth()) {
      year += 1;
    }
    if (index === 0) {
      return "January " + year;
    } else if (index === 1) {
      return "February " + year;
    } else if (index === 2) {
      return "March " + year;
    } else if (index === 3) {
      return "April " + year;
    } else if (index === 4) {
      return "May " + year;
    } else if (index === 5) {
      return "June " + year;
    } else if (index === 6) {
      return "July " + year;
    } else if (index === 7) {
      return "August " + year;
    } else if (index === 8) {
      return "September " + year;
    } else if (index === 9) {
      return "October " + year;
    } else if (index === 10) {
      return "November " + year;
    } else {
      return "December " + year;
    }
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

        {/* <div className="fixed inset-0 z-10 overflow-y-auto"> */}
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
              <Dialog.Panel className="relative transform h-[600px] overflow-scroll rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div className="mt-3 sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-bold leading-6 text-gray-900"
                  >
                    Generate Fixed Shifts
                  </Dialog.Title>
                  <div className="space-y-6 sm:space-y-5">
                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                      <label
                        htmlFor="employee-name"
                        className="block text-sm font-medium text-gray-700 mt-2"
                      >
                        Team
                      </label>
                      <div className="col-span-2">
                        <p
                          id="employee-name"
                          name="employee-name"
                          className="mt-1 p-2 block w-full text-gray-900 bg-gray-50 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                          {team && team.teamName}
                        </p>
                      </div>
                    </div>
                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                      <label
                        htmlFor="start-date"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                      >
                        Start Month
                      </label>
                      <div className="mt-1 sm:col-span-2 sm:mt-0">
                        <input
                          type="text"
                          name="start-date"
                          id="start-date"
                          className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                          placeholder={getMonthName(months[0])}
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
                        <select
                          id="location"
                          name="location"
                          className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          value={duplicateEndMonthValue}
                          onChange={(e) =>
                            setDuplicateEndMonthValue(e.target.value)
                          }
                        >
                          <option>-</option>
                          {months.map(
                            (month) =>
                              month !== months[0] && (
                                <option value={month}>
                                  {getMonthName(month)}
                                </option>
                              )
                          )}
                        </select>
                      </div>
                    </div>
                    <AddShiftForm
                      setShiftTitle={(value) => setShiftTitleValue(value)}
                      setStartTime={(value) => setStartTimeValue(value)}
                      setEndTime={(value) => setEndTimeValue(value)}
                      setShiftRemarks={(value) => setShiftRemarksValue(value)}
                      isOffice={team && team.isOffice}
                    />
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 flex">
                  <button
                    type="button"
                    className="mr-2 mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                    onClick={createShiftHandler}
                  >
                    Add Shift
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
