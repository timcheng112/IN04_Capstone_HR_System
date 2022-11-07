
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Switch } from '@headlessui/react'
import api from "../../utils/api";
import { getUserId } from "../../utils/Common.js";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function AddWork({ open, setOpen, refreshKeyHandler }) {

  const [position, setPosition] = useState("")
  const [company, setCompany] = useState("")
  const [description, setDescription] = useState("")
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [enabled, setEnabled] = useState(false)
  const [user, setUser] = useState(getUserId());
  const [error, setError] = useState();
  function add(){    
    var date = startDate.getDate()
    if (startDate.getDate() < 10) {
      date = "0" + date;
    }
    var month = startDate.getMonth() + 1;
    if (month < 10) {
      month = "0" + (month);
    }

    var helpStartDate = (startDate.getYear() + 1900) + "-" + month + "-" + date;

    var edate = endDate.getDate()
    if (endDate.getDate() < 10) {
      edate = "0" + edate;
    }
    var emonth = endDate.getMonth() + 1;
    if (emonth < 10) {
      emonth = "0" + (emonth);
    }

    var helpEndDate = (endDate.getYear() + 1900) + "-" + emonth + "-" + edate;

    api.addWorkExperience(user, position, company, helpStartDate.trim(), helpEndDate.trim(), enabled, description)
    .then(() => {alert("Successfully added.");refreshKeyHandler();})
    .catch((error) => setError(error));
  }

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
                  <form className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                    <div className="h-0 flex-1 overflow-y-auto">
                      <div className="bg-indigo-700 py-6 px-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <Dialog.Title className="text-lg font-medium text-white">Work Experience</Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="divide-y divide-gray-200 px-4 sm:px-6">
                          <div className="space-y-6 pt-6 pb-5">
                            <div>
                              <label htmlFor="company-name" className="block text-sm font-medium text-gray-900">
                                Company
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  name="company-name"
                                  id="company-name"
                                  value={company}
                                  onChange={(e) => setCompany(e.target.value)}
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                              </div>
                            </div>
                            <div>
                              <label htmlFor="project-name" className="block text-sm font-medium text-gray-900">
                                Position
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  name="project-name"
                                  id="project-name"
                                  value={position}
                                  onChange={(e) => setPosition(e.target.value)}
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                              </div>
                            </div>
                            <div>
                              <label htmlFor="description" className="block text-sm font-medium text-gray-900">
                                Description
                              </label>
                              <div className="mt-1">
                                <textarea
                                  id="description"
                                  name="description"
                                  rows={4}
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  value={description}
                                  onChange={(e) => setDescription(e.target.value)}
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-900">
                                Start Date
                              </label>
                              <div className="mt-1">
                                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}
                                  className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-900">
                                End Date
                              </label>
                              <div className="mt-1">
                                <DatePicker selected={endDate} onChange={(date) => setEndDate(date)}
                                  className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                              </div>
                            </div>
                            <div>
                              <Switch.Group as="div" className="flex items-center justify-between">
                                <span className="flex flex-grow flex-col">
                                  <Switch.Label as="span" className="text-sm font-medium text-gray-900" passive>
                                    Currently working
                                  </Switch.Label>
                                  <Switch.Description as="span" className="text-sm text-gray-500">
                                    Select if you are currently working in this company
                                  </Switch.Description>
                                </span>
                                <Switch
                                  checked={enabled}
                                  onChange={setEnabled}
                                  className={classNames(
                                    enabled ? 'bg-indigo-600' : 'bg-gray-200',
                                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                                  )}
                                >
                                  <span
                                    aria-hidden="true"
                                    className={classNames(
                                      enabled ? 'translate-x-5' : 'translate-x-0',
                                      'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                    )}
                                  />
                                </Switch>
                              </Switch.Group>
                            </div>

                          </div>

                        </div>
                      </div>
                    </div>
                    <div className="flex flex-shrink-0 justify-end px-4 py-4">
                      <button
                        type="button"
                        className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={() => setOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={()=>add()}
                        className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
