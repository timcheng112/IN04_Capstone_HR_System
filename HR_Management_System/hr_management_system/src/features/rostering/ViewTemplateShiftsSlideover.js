import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ShiftBlock from "./ShiftBlock";
import AddTemplateShiftModal from "./AddTemplateShiftModal";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const shifts = [
  {
    id: "1",
    shiftTitle: "Morning Shift",
    startTime: "08:00",
    endTime: "14:00",
  },
  {
    id: "2",
    shiftTitle: "Afternoon Shift",
    startTime: "14:00",
    endTime: "20:00",
  },
  {
    id: "3",
    shiftTitle: "Morning Shift",
    startTime: "06:00",
    endTime: "14:00",
  },
  {
    id: "4",
    shiftTitle: "Afternoon Shift",
    startTime: "14:00",
    endTime: "22:00",
  },
];

export default function ViewTemplateShiftsSlideover({ open, onClose }) {
  const [openAddTemplateShift, setOpenAddTemplateShift] = useState(false);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        {/* MODAL FOR ADDING A TEMPLATE SHIFT */}
        <AddTemplateShiftModal
          open={openAddTemplateShift}
          onClose={() => setOpenAddTemplateShift(false)}
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between pb-2">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Template Shifts
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={onClose}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      {/* BUTTON FOR ADDING TEMPLATE SHIFT */}
                      <button
                        type="button"
                        className="inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-3 py-2 text-sm font-medium leading-4 text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={() => setOpenAddTemplateShift(true)}
                      >
                        Add Template Shift
                      </button>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      <div className="absolute inset-0 px-4 sm:px-6">
                        <div
                          className="h-full border-2 border-dashed border-gray-200"
                          aria-hidden="true"
                        >
                          <ul>
                            {shifts.map((shift, index) => {
                              return (
                                <li className="pb-2">
                                  {/* RENDERING EACH TEMPLATE SHIFT */}
                                  <ShiftBlock shift={shift} />
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
