import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import api from "../../utils/api";
import { getUserId } from "../../utils/Common.js";
import { format } from "date-fns";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function AddNewReward({ open, setOpen, track, refreshKeyHandler }) {

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [points, setPoints] = useState(null)
  const [expiryDate, setExpiryDate] = useState(new Date())
  const [user, setUser] = useState(getUserId());
  const [error, setError] = useState();
  const [file, setFileState] = useState(null);
  const [fileName, setFileName] = useState(null);

  useEffect(() => {
    if (!open) {
      setPoints(null);
      setName('');
      setDescription('');
      setExpiryDate(new Date());
    }
    //    console.log(plan);
  }, [open])

  function add(){
    var date = expiryDate.getDate()
    if (expiryDate.getDate() < 10) {
      date = "0" + date;
    }
    var month = expiryDate.getMonth() + 1;
    if (month < 10) {
      month = "0" + (month);
    }
    var helpexpiryDate = (expiryDate.getYear() + 1900) + "-" + month + "-" + date;

    let formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    api.addNewReward(name, description, points, helpexpiryDate.trim(), track.rewardTrackId, formData)
        .then(() => {
            alert("Successfully added reward to the Reward Track");
            refreshKeyHandler();
        })
        .catch((error) => alert(error.response.data.message));
    setOpen(false);
  }

    function handleFile(e) {
    //    console.log("Handle File");
        setFileState(e.target.files[0]);
        setFileName(e.target.files[0].name);
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
                          <Dialog.Title className="text-lg font-medium text-white">Reward</Dialog.Title>
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
                              <label htmlFor="description" className="block text-sm font-medium text-gray-900">
                                Name
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  id="description"
                                  name="description"
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  value={name}
                                  required
                                  onChange={(e) => setName(e.target.value)}
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
                                  row={4}
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  value={description}
                                  required
                                  onChange={(e) => setDescription(e.target.value)}
                                />
                              </div>
                            </div>
                            <div>
                              <label htmlFor="description" className="block text-sm font-medium text-gray-900">
                                Points Required
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  name="salary"
                                  id="salary"
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  required
                                  placeholder="0.00"
                                  value={points}
                                  onChange={(e) => setPoints(e.target.value)}
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-900">
                                Expiry Date
                              </label>
                              <div className="mt-1">
                                <DatePicker selected={expiryDate} onChange={(date) => setExpiryDate(date)}
                                  className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-900">
                                Reward Image
                              </label>
                              <div className="mt-1">
                                <input
                                      id="file"
                                      type="file"
                                      name="file"
                                      onChange={(e) => handleFile(e)}
                                  />
                              </div>
                              <label className="block text-sm font-small text-gray-500">
                                  *You can only add an image to a reward once.
                                </label>
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
                        onClick={() => add()}
                        className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Add
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
