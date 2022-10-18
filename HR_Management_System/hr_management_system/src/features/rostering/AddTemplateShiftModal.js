import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import AddShiftForm from "./AddShiftForm";
import { format, getDate, getMonth, getYear } from "date-fns";
import api from "../../utils/api";

export default function AddTemplateShiftModal({
  open,
  onClose,
  // addTemplateShiftHandler,
  rosterId,
  refreshKeyHandler,
}) {
  const [shiftTitleValue, setShiftTitleValue] = useState("");
  const [startTimeValue, setStartTimeValue] = useState(null);
  const [endTimeValue, setEndTimeValue] = useState(null);
  const [salesmanQuotaValue, setSalesmanQuotaValue] = useState("");
  const [cashierQuotaValue, setCashierQuotaValue] = useState("");
  const [storemanagerQuotaValue, setStoremanagerQuotaValue] = useState("");
  const [shiftRemarksValue, setShiftRemarksValue] = useState("");

  const createTemplateShiftHandler = () => {
    if (
      shiftTitleValue !== "" &&
      startTimeValue !== null &&
      endTimeValue !== null &&
      salesmanQuotaValue !== "" &&
      cashierQuotaValue !== "" &&
      storemanagerQuotaValue !== ""
    ) {
      const dummyDate = new Date();
      let templateShiftToBeAdded = {
        shiftTitle: shiftTitleValue,
        startTime: format(
          new Date(
            getYear(dummyDate),
            getMonth(dummyDate),
            getDate(dummyDate),
            startTimeValue.substring(0, 2),
            startTimeValue.substring(3, 5),
            0,
            0
          ),
          "yyyy-MM-dd HH:mm:ss"
        ),
        endTime: format(
          new Date(
            getYear(dummyDate),
            getMonth(dummyDate),
            getDate(dummyDate),
            endTimeValue.substring(0, 2),
            endTimeValue.substring(3, 5),
            0,
            0
          ),
          "yyyy-MM-dd HH:mm:ss"
        ),
        minQuota: [
          salesmanQuotaValue,
          cashierQuotaValue,
          storemanagerQuotaValue,
        ],
        remarks: shiftRemarksValue,
        isTemplateShift: true,
      };
      console.log(templateShiftToBeAdded.startTime);
      addTemplateShiftHandler(templateShiftToBeAdded);
      refreshKeyHandler();
      onClose();
    } else {
      alert("Invalid fields!");
    }
  };

  function addTemplateShiftHandler(templateShiftToBeAdded) {
    api
      .addNewShift(templateShiftToBeAdded, rosterId)
      .then((response) =>
        alert(
          "Template shift with ID: " + response.data + " successfully added"
        )
      )
      .catch((error) => alert(error.response.data.message));
  }

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
                      Adding Template Shift
                    </Dialog.Title>
                    <div className="space-y-6 sm:space-y-5">
                      <AddShiftForm
                        setShiftTitle={(value) => setShiftTitleValue(value)}
                        setStartTime={(value) => setStartTimeValue(value)}
                        setEndTime={(value) => setEndTimeValue(value)}
                        setSalesmanQuota={(value) =>
                          setSalesmanQuotaValue(value)
                        }
                        setCashierQuota={(value) => setCashierQuotaValue(value)}
                        setStoremanagerQuota={(value) =>
                          setStoremanagerQuotaValue(value)
                        }
                        setShiftRemarks={(value) => setShiftRemarksValue(value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 flex">
                  <button
                    type="button"
                    className="mr-2 mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                    onClick={createTemplateShiftHandler}
                  >
                    Add Template Shift
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
