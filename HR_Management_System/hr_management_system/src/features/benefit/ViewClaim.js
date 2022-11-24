import { Fragment, useState, useEffect } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import api from "../../utils/api";
import axios from "axios";
import { getUserId } from "../../utils/Common.js";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ViewClaim({ open, setOpen, claim }) {
  const [user, setUser] = useState(getUserId());
  const [error, setError] = useState(null);
  
  useEffect(() => {
    api
      .getUser(getUserId())
      .then((response) => {
        setUser(response.data);
        console.log(user);
      })
      .catch((error) => setError(error));
  }, []);

  function approve(){
    api.approveClaim(claim.claimId)
      .then(() => {
        alert("Successfully approved.");
        setOpen(false);
        })
    .catch((error) => setError(error));
  }
  function reject(){
    api.rejectClaim(claim.claimId)
      .then(() => {
        alert("Successfully rejected.");
        setOpen(false);
        })
    .catch((error) => setError(error));
  }
  function withdraw(){
    api.withdrawClaim(claim.claimId)
      .then(() => {
        alert("Successfully withdrawn.");
        setOpen(false);
        })
    .catch((error) => setError(error));
  }

   function downloadFile() {
//     console.log(claim.supportingDocument.docId);
     api.downloadDocument(claim.supportingDocument.docId).then((response) => {
       const fileName = response.headers["content-disposition"].split("filename=")[1];
       api.getDocById(claim.supportingDocument.docId).then((response) => {
         //console.log(response.data);
         const url = window.URL.createObjectURL(response.data);

         const link = document.createElement("a");
         link.href = url;
         link.setAttribute("download", fileName);
         document.body.appendChild(link);
         link.click();
         link.parentNode.removeChild(link);
       });
     });
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
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <div className="py-2"></div>
                        <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
                          Claim Details
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
                              Benefit Plan
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                              {claim.benefitPlanInstance.benefitPlan.planName}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                              Claim Amount
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                              {claim.claimAmount}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                              Remarks
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                              {claim.remarks}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                              Claim Date
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                              {claim.claimDate}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                              Incident Date
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                              {claim.incidentDate}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                              Claim Status
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                              {claim.claimStatus}
                            </dd>
                          </div>
                          {claim.supportingDocument && (
                            <div>
                              <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                                Supporting Document
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                {claim.supportingDocument.name}
                              </dd>
                              <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                                onClick={() => downloadFile()}
                              >
                                Download Document
                              </button>
                            </div>
                          )}
                        </dl>
                      </div>
                    </div>
                    {user !== null && user.hrEmployee && claim.claimStatus === "PENDING" &&<div className="flex flex-shrink-0 justify-end px-4 py-4">
                      <button
                        type="button"
                        onClick={() => approve()}
                        className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => reject()}
                        className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Reject
                      </button>
                    </div>}
                    {user !== null && !user.hrEmployee && claim.claimStatus === "PENDING" &&<div className="flex flex-shrink-0 justify-end px-4 py-4">
                      <button
                        type="button"
                        onClick={() => withdraw()}
                        className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Withdraw
                      </button>
                    </div>}
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
