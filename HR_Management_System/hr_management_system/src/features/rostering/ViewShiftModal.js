import { Dialog, Transition } from "@headlessui/react";
import { format } from "date-fns";
import React, { Fragment } from "react";

const ViewShiftModal = ({ open, onClose, shift }) => {
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mt-3 sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-bold leading-6 text-gray-900"
                    >
                      Viewing Shift Details
                    </Dialog.Title>
                    <div className="space-y-6 sm:space-y-5">
                      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                        <label
                          htmlFor="employee-name"
                          className="block text-sm font-medium text-gray-700 mt-2"
                        >
                          Shift Title
                        </label>
                        <div className="col-span-2">
                          <p
                            id="employee-name"
                            name="employee-name"
                            className="p-2 block w-full text-gray-900 bg-gray-50 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          >
                            {shift.shiftTitle}
                          </p>
                        </div>
                      </div>
                      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                        <label
                          htmlFor="start-time"
                          className="block text-sm font-medium text-gray-700 mt-2"
                        >
                          Start Time
                        </label>
                        <div className="col-span-2">
                          <p
                            id="start-time"
                            name="start-time"
                            className="p-2 block w-full text-gray-900 bg-gray-50 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          >
                            {format(shift.startDate, "h:mmaaa")}
                          </p>
                        </div>
                      </div>
                      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                        <label
                          htmlFor="end-time"
                          className="block text-sm font-medium text-gray-700 mt-2"
                        >
                          End Time
                        </label>
                        <div className="col-span-2">
                          <p
                            id="end-time"
                            name="end-time"
                            className="p-2 block w-full text-gray-900 bg-gray-50 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          >
                            {format(shift.endDate, "h:mmaaa")}
                          </p>
                        </div>
                      </div>
                      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                        <label
                          htmlFor="salesman-quota"
                          className="block text-sm font-medium text-gray-700 mt-2 col-span-2"
                        >
                          Salesman Quota
                        </label>
                        <div className="col-span-1">
                          <p
                            id="salesman-quota"
                            name="salesman-quota"
                            className="p-2 block w-full text-gray-900 bg-gray-50 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          >
                            {shift.minQuota[0]}
                          </p>
                        </div>
                      </div>
                      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                        <label
                          htmlFor="cashier-quota"
                          className="block text-sm font-medium text-gray-700 mt-2 col-span-2"
                        >
                          Cashier Quota
                        </label>
                        <div className="col-span-1">
                          <p
                            id="cashier-quota"
                            name="cashier-quota"
                            className="p-2 block w-full text-gray-900 bg-gray-50 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          >
                            {shift.minQuota[1]}
                          </p>
                        </div>
                      </div>
                      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                        <label
                          htmlFor="storemanager-quota"
                          className="block text-sm font-medium text-gray-700 mt-2 col-span-2"
                        >
                          Store Manager Quota
                        </label>
                        <div className="col-span-1">
                          <p
                            id="storemanager-quota"
                            name="storemanager-quota"
                            className="p-2 block w-full text-gray-900 bg-gray-50 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          >
                            {shift.minQuota[2]}
                          </p>
                        </div>
                      </div>
                      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                        <label
                          htmlFor="asststoremanager-quota"
                          className="block text-sm font-medium text-gray-700 mt-2 col-span-2"
                        >
                          Asst Store Manager Quota
                        </label>
                        <div className="col-span-1">
                          <p
                            id="asststoremanager-quota"
                            name="asststoremanager-quota"
                            className="p-2 block w-full text-gray-900 bg-gray-50 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          >
                            {shift.minQuota[3]}
                          </p>
                        </div>
                      </div>
                      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                        <label
                          htmlFor="shift-remarks"
                          className="block text-sm font-medium text-gray-700 mt-2"
                        >
                          Shift Remarks
                        </label>
                        <div className="col-span-2">
                          <p
                            id="shift-remarks"
                            name="shift-remarks"
                            className="p-2 block w-full text-gray-900 bg-gray-50 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          >
                            {shift.remarks}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 flex">
                  <button
                    type="button"
                    className="mr-2 mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ViewShiftModal;
