import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ArrowUpTrayIcon,PlusIcon } from "@heroicons/react/24/outline";

export default function ApplyJob({ open, setOpen, job }) {
  const cancelButtonRef = useRef(null)
  const [availableDate, setAvailableDate] = useState(new Date());

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                      Apply for {job.jobTitle}
                    </Dialog.Title>
                    <div className='py-2' />
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-gray-300" />
                      </div>
                      <div className="relative flex justify-center">
                        <span className="bg-white px-2 text-gray-500">
                          <PlusIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                        </span>
                      </div>
                    </div>
                    <div className='py-3' />
                    <div className="mt-2 flex space-x-4">
                      <label className="block text-sm font-medium text-gray-900">
                        Available Date
                      </label>
                      <div className="mt-1">
                        <DatePicker selected={availableDate} onChange={(date) => setAvailableDate(date)}
                          className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                      </div>
                    </div>
                    <div className='py-3' />
                    <div className="mt-2 flex space-x-4">
                      <label className="block text-sm font-medium text-gray-900">
                        Upload CV
                      </label>
                      <div className="mt-1 ">
                        <button
                          type="button"
                          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          <ArrowUpTrayIcon
                            className="md:-ml-0.5 md:mr-2 h-4 w-4"
                            aria-hidden="true"
                          />
                          <span className="hidden md:block">Upload</span>
                        </button>
                      </div>
                    </div>
                    <div className='py-3' />
                    <div className="mt-2 flex space-x-4">
                      <label className="block text-sm font-medium text-gray-900">
                        Upload Transcript
                      </label>
                      <div className="mt-1 sm:col-span-2 sm:mt-0">
                        <button
                          type="button"
                          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          <ArrowUpTrayIcon
                            className="md:-ml-0.5 md:mr-2 h-4 w-4"
                            aria-hidden="true"
                          />
                          <span className="hidden md:block">Upload</span>
                        </button>
                      </div>
                    </div>
                    <div className='py-3' />
                    <div className="mt-2 flex space-x-4">
                      <label className="block text-sm font-medium text-gray-900">
                        Upload Cover Letter
                      </label>
                      <div className="mt-1 sm:col-span-2 sm:mt-0">
                        <button
                          type="button"
                          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          <ArrowUpTrayIcon
                            className="md:-ml-0.5 md:mr-2 h-4 w-4"
                            aria-hidden="true"
                          />
                          <span className="hidden md:block">Upload</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='py-3' />
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
