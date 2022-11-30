import { Fragment, useState, useEffect } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import api from "../../utils/api";
import axios from "axios";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ViewReview({ open, setOpen, review }) {

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
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
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <div className="py-2"></div>
                        <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
                          {review.employeeName}
                        </h3>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* Main */}
                    <div>
                      <div className="py-2"></div>
                      <div className="px-4 pt-5 pb-5 sm:px-0 sm:pt-0">
                        <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                          <div>
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                              Rating
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                              {review.rating}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                              Date
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                              {review.date}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                              Justification
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                              {review.justification}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                              Team
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                              {review.teamName}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                              Status
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                              {review.vetted && <span className=" whitespace-nowrap inline-flex items-center rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-800">
                                Vetted
                              </span>}
                              {!review.vetted && <span className="whitespace-nowrap inline-flex items-center rounded-full bg-red-100 px-3 py-0.5 text-sm font-medium text-red-800">
                                Unvetted
                              </span>}
                            </dd>
                          </div>

                        </dl>
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
