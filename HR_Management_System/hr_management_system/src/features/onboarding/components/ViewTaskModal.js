import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function ViewTaskModal({
  open,
  onClose,
  taskTitle,
  taskDescription,
}) {
  const cancelButtonRef = useRef(null);

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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div class="mb-1 border-b border-gray-200 dark:border-gray-700">
                  <ul
                    class="flex flex-wrap -mb-px text-sm font-medium text-center"
                    id="myTab"
                    data-tabs-toggle="#myTabContent"
                    role="tablist"
                  >
                    <li class="mr-2" role="presentation">
                      <button
                        class="inline-block p-4 rounded-t-lg border-b-2"
                        id="task-information-tab"
                        data-tabs-target="#task-information"
                        type="button"
                        role="tab"
                        aria-controls="task-information"
                        aria-selected="false"
                      >
                        Task Information
                      </button>
                    </li>
                    <li class="mr-2" role="presentation">
                      <button
                        class="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                        id="assigned-employees-tab"
                        data-tabs-target="#assigned-employees"
                        type="button"
                        role="tab"
                        aria-controls="assigned-employees"
                        aria-selected="false"
                      >
                        Assigned Employees
                      </button>
                    </li>
                  </ul>
                </div>
                <div id="myTabContent">
                  <div
                    id="task-information"
                    role="tabpanel"
                    aria-labelledby="task-information-tab"
                    className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4"
                  >
                    <div className="mt-3 text-center sm:mt-0 sm:text-left divide-y">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Viewing {taskTitle}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="mt-2">Task Title: </p>
                        <p className="bg-gray-100 rounded-sm p-2">
                          {taskTitle}
                        </p>
                        <p className="mt-2">Task Description: </p>
                        <p className="bg-gray-100 rounded-sm p-2">
                          {taskDescription}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={onClose}
                    ref={cancelButtonRef}
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
}
