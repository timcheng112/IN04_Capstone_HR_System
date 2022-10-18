import { Fragment, useState, useEffect } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import api from '../../utils/api';
import axios from "axios";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ViewModal({ open, setOpen, leave }) {
  //const [open, setOpen] = useState(true)

  useEffect(() => {
      console.log("view modal use effect");
      console.log(leave);

    }, []);

  function base64ToArrayBuffer(data) {
//    const binaryString = window.atob(base64); // Comment this if not using base64
    const bytes = new Uint8Array(data);
    return bytes.map((byte, i) => data.charCodeAt(i));
  }

  function createAndDownloadBlobFile(body, filename) {
    const strArr = leave.supportingDocument.type.split("/");
    console.log(strArr[1]);
    const extension = strArr[1];

    var blob = new Blob([body], {type: leave.supportingDocument.type});
//    const blob = new Blob([body]);
    const fileName = `${filename}.${extension}`;
    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, fileName);
    } else {
      const link = document.createElement('a');
      // Browsers that support HTML5 download attribute
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', fileName);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

  function downloadFile() {
    api.downloadDocument(Number(leave.leaveId)).then((response) => {
        console.log("help");
        console.log(response.data);
        const filename =  response.headers['content-disposition'].split('filename=')[1];

        const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', filename);
          document.body.appendChild(link);
          link.click();
    });

//    api.downloadDocument(Number(leave.leaveId))
//        .then(response => {
//            console.log(response);
//            console.log(response.headers['content-disposition']);
//            const filename =  response.headers['content-disposition'].split('filename=')[1];
//            console.log(filename)
//
//            const blob = new Blob([response.data])
//
//            let url = window.URL.createObjectURL(blob);
//            let a = document.createElement('a');
//            a.href = url;
//            a.download = filename;
//            a.click();
//
//        })
//      api.getDocByteArray(Number(leave.leaveId))
//        .then(response => {
//            console.log("response");
//            console.log(response.data);
//            const data = response.data;
//            const arrayBuffer = base64ToArrayBuffer(data);
//
//            const name = leave.supportingDocument.name.split(".");
//            createAndDownloadBlobFile(arrayBuffer, name[0]);
//        })

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
                      <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">{leave.employee.firstName}</h3>
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
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">Leave type</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{leave.leaveType}</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">Begin From</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{leave.startDate}</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">End On</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{leave.endDate}</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">Application Remark</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{leave.applicationRemarks}</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">Applied Date</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{leave.applicationDate}</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">Status</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{leave.status}</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">HR Remarks</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{leave.approverRemarks}</dd>
                          </div>
                          {leave.supportingDocument && <div>
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">Supporting Document</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{leave.supportingDocument.name}</dd>
                            <button
                                  type="button"
                                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                                  onClick={() => downloadFile()}
                                >
                                  Download Document
                                </button>
                          </div>}
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
  )
}
