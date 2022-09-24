import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function CreateTaskSlideover({ open, onClose, categoryName }) {
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
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={onClose}
                      >
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        Create a Task under {categoryName}
                      </Dialog.Title>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      <form action="#" method="POST">
                        <label
                          htmlFor="task-title"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Task Title
                        </label>
                        <input
                          type="text"
                          name="task-title"
                          id="task-title"
                          placeholder="This is the Task Title"
                          required
                          className="mt-1 p-2 block w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm"
                        />
                        <label
                          htmlFor="task-description"
                          className="block text-sm font-medium text-gray-700 mt-2"
                        >
                          Task Description
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="task-description"
                            name="task-description"
                            rows={3}
                            className="mt-1 p-2 block w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Brief description for your task."
                            defaultValue={""}
                            required
                          />
                        </div>
                        <label
                          htmlFor="assigned-employees"
                          className="block text-sm font-medium text-gray-700 mt-2"
                        >
                          Assigned Employees
                        </label>
                        <div className="border h-52">
                          <label
                            for="default-search"
                            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
                          >
                            Search
                          </label>
                          <div class="relative">
                            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-6 h-6"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                />
                              </svg>
                            </div>
                            <input
                              type="search"
                              id="default-search"
                              class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-b-lg border border-gray-300"
                              placeholder="Search for employees"
                              required
                            ></input>
                            <button
                              type="submit"
                              class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                            >
                              Search
                            </button>
                          </div>
                        </div>
                        <button
                          type="submit"
                          class="text-white absolute right-2.5 bottom-2.5 bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-500 font-medium rounded-lg text-sm px-4 py-2"
                        >
                          Create Task
                        </button>
                      </form>
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
