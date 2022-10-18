import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ShiftBlock from "./ShiftBlock";
import AddTemplateShiftModal from "./AddTemplateShiftModal";
import EmptyStateTemplateShifts from "./EmptyStateTemplateShifts";
import api from "../../utils/api";

export default function ViewTemplateShiftsSlideover({
  open,
  onClose,
  rosterId,
}) {
  const [openAddTemplateShift, setOpenAddTemplateShift] = useState(false);
  // const [templateShifts, setTemplateShifts] = useState([
  //   {
  //     id: "1",
  //     shiftTitle: "6H Morning Shift",
  //     startDate: new Date(2022, 9, 16, 8, 0, 0, 0),
  //     endDate: new Date(2022, 9, 16, 14, 0, 0, 0),
  //     minQuota: [2, 2, 1, 0],
  //     remarks:
  //       "Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.",
  //   },
  //   {
  //     id: "2",
  //     shiftTitle: "6H Afternoon Shift",
  //     startDate: new Date(2022, 9, 16, 14, 0, 0, 0),
  //     endDate: new Date(2022, 9, 16, 20, 0, 0, 0),
  //     minQuota: [3, 3, 0, 1],
  //     remarks:
  //       "Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.",
  //   },
  //   {
  //     id: "3",
  //     shiftTitle: "8H Morning Shift",
  //     startDate: new Date(2022, 9, 16, 6, 0, 0, 0),
  //     endDate: new Date(2022, 9, 16, 14, 0, 0, 0),
  //     minQuota: [2, 2, 0, 0],
  //     remarks:
  //       "Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.",
  //   },
  //   {
  //     id: "4",
  //     shiftTitle: "8H Afternoon Shift",
  //     startDate: new Date(2022, 9, 16, 14, 0, 0, 0),
  //     endDate: new Date(2022, 9, 16, 22, 0, 0, 0),
  //     minQuota: [1, 3, 1, 0],
  //     remarks:
  //       "Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.",
  //   },
  // ]);
  const [templateShifts, setTemplateShifts] = useState([]);

  useEffect(() => {
    api
      .getTemplateShiftsByRoster(2)
      .then((response) => {
        // let dummyArr = response.data;
        // for (let i = 0; i < dummyArr.length; i++) {
        //   dummyArr.startTime
        // }
        setTemplateShifts(response.data);
      })
      .catch((error) => console.log(error.response.data.message));
  }, [open, rosterId]);

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
          addTemplateShiftHandler={(templateShiftToBeAdded) =>
            setTemplateShifts((oldTemplateShifts) => [
              ...oldTemplateShifts,
              templateShiftToBeAdded,
            ])
          }
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
                      {templateShifts.length !== 0 && (
                        <button
                          type="button"
                          className="inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-3 py-2 text-sm font-medium leading-4 text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={() => setOpenAddTemplateShift(true)}
                        >
                          Add Template Shift
                        </button>
                      )}
                    </div>
                    {templateShifts.length !== 0 ? (
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <div className="absolute inset-0 px-4 sm:px-6">
                          <div
                            className="h-full border-2 border-dashed border-gray-200 p-2"
                            aria-hidden="true"
                          >
                            <ul>
                              {templateShifts.map((shift, index) => {
                                return (
                                  <li key={shift.shiftId} className="pb-2">
                                    {/* RENDERING EACH TEMPLATE SHIFT */}
                                    <ShiftBlock shift={shift} />
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-center">
                        <EmptyStateTemplateShifts
                          openModal={() => setOpenAddTemplateShift(true)}
                        />
                      </div>
                    )}
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
