import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ArrowUpTrayIcon, ArrowDownTrayIcon, PlusIcon } from "@heroicons/react/24/outline";
import api from "../../utils/api.js";
import { getUserId } from "../../utils/Common.js";

export default function Offer({ open, setOpen, uId, postingId }) {
  const cancelButtonRef = useRef(null)
  const [availableDate, setAvailableDate] = useState(new Date());
  const [salary, setSalary] = useState();

  function offer(){
    var date = availableDate.getDate()
    if (availableDate.getDate() < 10) {
      date = "0" + date;
    }
    var month = availableDate.getMonth() + 1;
    if (month < 10) {
      month = "0" + (month);
    }
    var helpStartDate = (availableDate.getYear() + 1900) + "-" + month + "-" + date;
    api.offerApplicant(uId,postingId,helpStartDate.trim(),salary)
    .then(() => {alert("Successfully offer.")});
    setOpen(false)
  }

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
                      Offer
                    </Dialog.Title>
                    <div className='py-3' />
                    <div className="mt-2 flex space-x-4">
                      <label className="block text-sm font-medium text-gray-900">
                        Start Date
                      </label>
                      <div className="mt-1">
                        <DatePicker selected={availableDate} onChange={(date) => setAvailableDate(date)}
                          className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                      </div>
                    </div>
                    <div className='py-10' />
                    <div className="mt-2 flex space-x-4">
                      <label className="block text-sm font-medium text-gray-900">
                        Salary
                      </label>
                      <div className="relative mt-1 rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="text"
                          name="price"
                          id="price"
                          className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="0.00"
                          value = {salary}
                          onChange = {e => setSalary(e.target.value)}
                          aria-describedby="price-currency"
                        />
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <span className="text-gray-500 sm:text-sm" id="price-currency">
                            SGD
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='py-6' />
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                    onClick={()=>offer()}
                  >
                    Submit
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
