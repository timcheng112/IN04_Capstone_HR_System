import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const positions = [
  { id: 1, name: "SALESMAN" },
  { id: 2, name: "CASHIER" },
  { id: 3, name: "STOREMANAGER" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SelectMenuPosition({
  posType,
  setPosType,
  employee,
  setSelectedEmployees,
}) {
  const onChangeHandler = (posType) => {
    setSelectedEmployees((selectedEmployees) =>
      selectedEmployees.map((selectedEmployee) =>
        selectedEmployee.userId === employee.userId
          ? (selectedEmployee = { ...selectedEmployee, posType: posType })
          : selectedEmployee
      )
    );
  };

  return (
    <Listbox value={posType} onChange={(posType) => onChangeHandler(posType)}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
            Shift Position
            <br />({employee.firstName} {employee.lastName})
          </Listbox.Label>
          <div className="relative">
            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
              <span className="block truncate">{employee.posType}</span>
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
                {positions.map((position) => (
                  <Listbox.Option
                    key={position.id}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-indigo-600" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-8 pr-4"
                      )
                    }
                    value={position.name}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate"
                          )}
                        >
                          {position.name}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 left-0 flex items-center pl-1.5"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
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
  );
}
