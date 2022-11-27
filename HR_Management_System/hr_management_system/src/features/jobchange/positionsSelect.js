import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { Fragment, useEffect, useState } from "react";
import api from "../../utils/api";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PositionsSelect() {
  const [positions, setPositions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState({
    positionId: 0,
    positionName: "Select A Position",
  });

  useEffect(() => {
    api.getAllPositions().then((response) => {
      setPositions(response.data);
      //console.log(response.data);
    });
  }, []);
  return (
    <>
      <div>
      <Listbox value={selectedPosition} onChange={setSelectedPosition}>
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
                                selected ? "font-semibold" : "font-normal",
                                "block truncate"
                              )}
                            >
                              {person.positionName}
                            </span>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? "text-white" : "text-indigo-600",
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
    </>
  );
}
