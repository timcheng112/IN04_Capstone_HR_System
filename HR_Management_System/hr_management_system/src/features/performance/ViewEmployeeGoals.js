import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import api from "../../utils/api";
import Moment from "react-moment";

export default function ViewEmployeeGoals({
  open,
  onClose,
  params = [],
  ...props
}) {
  const cancelButtonRef = useRef(null);
  const [user, setUser] = useState(null);
  const [financial, setFinancial] = useState([]);
  const [business, setBusiness] = useState([]);

  useEffect(() => {
    if (open) {
      console.log(props.uId);
      api.getUser(props.uId).then((response) => setUser(response.data));
      api
        .getUserGoals(new Date().getFullYear(), "financial", props.uId)
        .then((response) => setFinancial(response.data));
      api
        .getUserGoals(new Date().getFullYear(), "business", props.uId)
        .then((response) => setBusiness(response.data));
    }
  }, [open]);

  return (
    user && (
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6">
                  <div>
                    <div className="mx-auto flex h-6 w-12 items-center justify-center"></div>
                    <div className="text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium font-semibold font-sans leading-6 text-gray-900"
                      >
                        {user.firstName} {user.lastName}
                      </Dialog.Title>
                      <div>
                        <h2 className="text-md font-sans text-left ml-5 mt-8">
                          Financial ({financial.length})
                        </h2>
                      </div>
                      {financial.length === 0 ? (
                        <>
                          <div className="mt-5 mx-4 sm:mt-6">
                            <button
                              type="button"
                              className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                              onClick={() => {
                                console.log("send reminder business");
                              }}
                              ref={cancelButtonRef}
                            >
                              Send Reminder
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="mt-2">
                            <div className="mt-8 flex flex-col">
                              <div className="flex flex-col">
                                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                      <table className="min-w-full divide-y divide-gray-300">
                                        <thead className="bg-gray-50">
                                          <tr>
                                            <th
                                              scope="col"
                                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                            >
                                              Description
                                            </th>
                                            <th
                                              scope="col"
                                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                              Created
                                            </th>
                                            <th
                                              scope="col"
                                              className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                                            >
                                              <span className="sr-only">
                                                Edit
                                              </span>
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                          {financial.map((goal) => (
                                            <tr key={goal.goalId}>
                                              <td className="whitespace-nowrap text-left py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                {goal.description}
                                              </td>
                                              <td className="whitespace-nowrap text-left py-4 text-sm text-gray-900">
                                                <Moment
                                                  parse="YYYY-MM-DD"
                                                  className="mx-2 font-sans"
                                                  locale="Asia/Singapore"
                                                  format="DD/MM/YYYY"
                                                >
                                                  {goal.created}
                                                </Moment>
                                              </td>
                                              <td className="relative whitespace-nowrap text-left py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"></td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                      <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto"></div>
                      </div>
                      <div className="sm:flex sm:items-center mt-5">
                        <h2 className="text-md font-sans text-left ml-5 mt-8">
                          Business ({business.length})
                        </h2>
                        <div className="sm:flex-auto"></div>
                      </div>
                      {business.length === 0 ? (
                        <>
                          <div className="mt-5 mx-4 sm:mt-6">
                            <button
                              type="button"
                              className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                              onClick={() => {
                                console.log("send reminder business");
                              }}
                              ref={cancelButtonRef}
                            >
                              Send Reminder
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="mt-8 flex flex-col">
                            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                  <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-gray-50">
                                      <tr>
                                        <th
                                          scope="col"
                                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                        >
                                          Description
                                        </th>
                                        <th
                                          scope="col"
                                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                          Created
                                        </th>
                                        <th
                                          scope="col"
                                          className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                                        >
                                          <span className="sr-only">Edit</span>
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                      {business.map((goal) => (
                                        <tr key={goal.goalId}>
                                          <td className="whitespace-nowrap text-left py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                            {goal.description}
                                          </td>
                                          <td className="whitespace-nowrap text-left px-1 py-4 text-sm text-gray-500">
                                            <Moment
                                              parse="YYYY-MM-DD"
                                              className="mx-2 font-sans"
                                              locale="Asia/Singapore"
                                              format="DD/MM/YYYY"
                                            >
                                              {goal.created}
                                            </Moment>
                                          </td>
                                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"></td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                      onClick={onClose}
                      ref={cancelButtonRef}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    )
  );
}
