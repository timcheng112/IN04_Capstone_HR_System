import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import api from "../../../utils/api";



export default function DeleteDeptModal({ deptId , open, onClose }) {
  const cancelButtonRef = useRef(null);

  function deleteDept() {
    // console.log("adddeptfunc :" + deptName + " " + deptHeadId);
    api.deleteDept(deptId).then((response) => {
        if (response.status == 200) {
          console.log("successfully deleted dept!");
        } else {
          console.error("failed to delete dept!");
        }
      })
      .catch((error) => {
        var message = error.request.response;
        console.log(message);
        alert(
          "Something went wrong... Give it a second."
        );
       
      });
      
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    deleteDept();
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={onClose}
      >
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
                <div className="mt-10 sm:mt-0">
                  <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                      <div className="px-4 sm:px-0">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                          Delete Department
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">
                          Are you sure you want to delete this department?
                        </p>
                      </div>
                    </div>
                    <div className="mt-5 md:col-span-2 md:mt-0">
                      <form onSubmit={handleSubmit}>
                        <div className="overflow-hidden shadow sm:rounded-md">
                          <div className="bg-white px-4 py-5 sm:p-6"></div>

                          {/*this button will need the function to delete the employee*/}
                          <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                            <button
                              type="button"
                              className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                              onClick={onClose}
                              ref={cancelButtonRef}
                            >
                              Cancel
                            </button>

                            <button
                              type="button"
                              className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                              onClick={onClose}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
