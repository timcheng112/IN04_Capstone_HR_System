import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
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
  getMonth,
  getYear,
  nextDay,
  set,
} from "date-fns";
import SelectMenuPosition from "./SelectMenuPosition";
import api from "../../utils/api";
import EmployeesCheckbox from "./EmployeesCheckbox";

// const employees = [
//   { firstName: "Tim", lastName: "Cheng" },
//   { firstName: "Jack", lastName: "Bean" },
//   { firstName: "Tom", lastName: "Holland" },
//   { firstName: "Mo", lastName: "Salah" },
//   { firstName: "Sadio", lastName: "Mane" },
//   { firstName: "Bobby", lastName: "Firmino" },
// ];

export default function AddShiftModal({
  open,
  onClose,
  person,
  date,
  addShiftHandler,
  checkIfThereExistsShiftOnSameDay,
  rosterId,
}) {
  const [duplicateEndDateValue, setDuplicateEndDateValue] = useState(null);
  const [shiftTitleValue, setShiftTitleValue] = useState("");
  const [startTimeValue, setStartTimeValue] = useState(null);
  const [endTimeValue, setEndTimeValue] = useState(null);
  const [salesmanQuotaValue, setSalesmanQuotaValue] = useState("");
  const [cashierQuotaValue, setCashierQuotaValue] = useState("");
  const [storemanagerQuotaValue, setStoremanagerQuotaValue] = useState("");
  const [shiftRemarksValue, setShiftRemarksValue] = useState("");
  const [isPhEvent, setIsPhEvent] = useState(false);
  const [posType, setPosType] = useState({ id: 1, name: "SALESMAN" });
  const [showEmployees, setShowEmployees] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([
    { ...person, posType: "SALESMAN" },
  ]);
  // let selectedEmployees = [];

  useEffect(() => {
    setDuplicateEndDateValue(null);
    setShiftTitleValue("");
    setStartTimeValue(null);
    setEndTimeValue(null);
    setSalesmanQuotaValue("");
    setCashierQuotaValue("");
    setStoremanagerQuotaValue("");
    setShiftRemarksValue("");
    setIsPhEvent(false);
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
  }, [open, rosterId]);

  useEffect(() => {
    console.log(selectedEmployees);
  }, [selectedEmployees]);

  const createShiftHandler = () => {
    // Check for empty fields
    if (
      shiftTitleValue !== "" &&
      startTimeValue !== null &&
      endTimeValue !== null &&
      salesmanQuotaValue !== "" &&
      cashierQuotaValue !== "" &&
      storemanagerQuotaValue !== ""
    ) {
      // Check for invalid start time & end time (end time cannot be before start time)
      if (startTimeValue < endTimeValue) {
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
          // for (let i = 0; i <= selectedEmployees.length; i++) {
          let shiftToBeAdded = {
            // userId:
            //   i === selectedEmployees.length
            //     ? person.userId
            //     : selectedEmployees[i].userId,
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
              minQuota: [
                salesmanQuotaValue,
                cashierQuotaValue,
                storemanagerQuotaValue,
              ],
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
            selectedEmployees.forEach((employee) => {
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
                    Add New Shift To Employee
                  </Dialog.Title>
                  <div className="space-y-6 sm:space-y-5">
                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                      <label
                        htmlFor="employee-name"
                        className="block text-sm font-medium text-gray-700 mt-2"
                      >
                        Assigned Employee
                      </label>
                      <div className="col-span-2">
                        <p
                          id="employee-name"
                          name="employee-name"
                          className="mt-1 p-2 block w-full text-gray-900 bg-gray-50 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                          {person && person.firstName}{" "}
                          {person && person.lastName}
                        </p>
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
                    <AddShiftForm
                      setShiftTitle={(value) => setShiftTitleValue(value)}
                      setStartTime={(value) => setStartTimeValue(value)}
                      setEndTime={(value) => setEndTimeValue(value)}
                      setSalesmanQuota={(value) => setSalesmanQuotaValue(value)}
                      setCashierQuota={(value) => setCashierQuotaValue(value)}
                      setStoremanagerQuota={(value) =>
                        setStoremanagerQuotaValue(value)
                      }
                      setShiftRemarks={(value) => setShiftRemarksValue(value)}
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
