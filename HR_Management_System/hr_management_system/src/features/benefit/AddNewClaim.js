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

export default function AddNewPlan({ open, setOpen, plan }) {

  const [amount, setAmount] = useState(0)
  const [remarks, setRemarks] = useState("")
  const [incidentDate, setIncidentDate] = useState(new Date());
  const [claimDate, setClaimDate] = useState(new Date());
  const [file, setFileState] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [curFileName, setCurFileName] = useState(null);
  const [user, setUser] = useState(getUserId());
  const [error, setError] = useState();

  useEffect(() => {
    if (!open) {
      setAmount(0);
      setRemarks('');
      setIncidentDate(new Date());
      setFileName(null);
      setFileState(null);
    }
//    console.log(plan);
  }, [open])

  function add(){    
    var date = incidentDate.getDate()
    if (incidentDate.getDate() < 10) {
      date = "0" + date;
    }
    var month = incidentDate.getMonth() + 1;
    if (month < 10) {
      month = "0" + (month);
    }

    var helpincidentDate = (incidentDate.getYear() + 1900) + "-" + month + "-" + date;

    // upload file if have
    let formData = new FormData();
    if (file) {
      formData.append("file", file);
    }

    var submitDate = format(claimDate, "yyyy-MM-dd");

//    console.log(submitDate)
//    console.log(helpincidentDate)
//    console.log(remarks)
//    console.log(amount)
//    console.log(plan.benefitPlanId)

    // todo: this part needs to use benefit plan instance id instead of benefit plan id
    api.makeNewClaim(submitDate, helpincidentDate.trim(), remarks, amount, plan.benefitPlanInstanceId, formData)
      .then((response) => {
        let message = response.data;
//        console.log(message);
        if (message.includes("Partial Claim")) {
          alert("New Claim has been made with partial amount");
        } else {
          alert("New Claim Successfully made.");
        }
      })
      .catch((error) => {
//        console.log(error);
        var message = error.response.data.message;
//        console.log(message);
        if (message.includes("Benefit Plan Instance has no more remaining")) {
          alert(message);
        } else if (message.includes("Claim cannot be made as incident happened before")) {
          alert(message);
        } else if (message.includes("Benefit Plan Instance ID is not active")) {
          alert("The Benefit Plan is not active, please choose a different one")
        } else if (message.includes("Claim Date cannot be before")) {
          alert("Cannot claim for an event in the future");
        } else {
          alert("There was an error, please try again");
        }
        setError(error);
      });
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
                          <Dialog.Title className="text-lg font-medium text-white">Claim</Dialog.Title>
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
                                Claim Amount
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  name="salary"
                                  id="salary"
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  required
                                  placeholder="0.00"
                                  value={amount}
                                  onChange={(e) => setAmount(e.target.value)}
                                />
                              </div>
                            </div>
                            <div>
                              <label htmlFor="description" className="block text-sm font-medium text-gray-900">
                                Remarks
                              </label>
                              <div className="mt-1">
                                <textarea
                                  id="description"
                                  name="description"
                                  rows={4}
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  value={remarks}
                                  onChange={(e) => setRemarks(e.target.value)}
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-900">
                                Incident Date
                              </label>
                              <div className="mt-1">
                                <DatePicker selected={incidentDate} onChange={(date) => setIncidentDate(date)}
                                  className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-900">
                                Supporting Document
                              </label>
                              <div className="mt-1">
                                <input
                                      id="file"
                                      type="file"
                                      name="file"
                                      onChange={(e) => handleFile(e)}
                                  />
                              </div>
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
                        Submit
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
