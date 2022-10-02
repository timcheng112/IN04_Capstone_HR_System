import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState, useEffect } from "react";
import { useHistory } from "react-router";
// import InputText from '../../components/inputText';
// import TextArea from '../../components/textArea';
import api from '../../utils/api';

export default function ViewTaskModal({ open, onClose, task }) {
  const tabs = [
    { name: "Task Details", href: "#", current: true },
    { name: "Assigned Employees", href: "#", current: false },
  ];

  const [tabId, setTabId] = useState(0);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const [people, setPeople] = useState([]);
  useEffect(() => {
    api
      .getEmployeesWithTask(task.taskId)
      .then((response) => {
        setPeople(response.data);
        console.log(response.data);
      })
      .catch((error) => setError(error));
  }, []);


  const history = useHistory();
  const [error, setError] = useState(null);
  const cancelButtonRef = useRef(null);

  //   const handleSubmit = (evt) => {
  //     evt.preventDefault()
  //     createCategory()
  //     alert("Successfully created category.")
  //   }

  // useEffect(() => {
  //   api.getUser()
  //     .then(response => setUser(response.data))
  //     .catch((error) => setError(error))
  // }, [])

  return (
    //user && (
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                {/* Tabs */}
                <div>
                  <div className="sm:hidden">
                    {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                    <select
                      id="tabs"
                      name="tabs"
                      className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                      defaultValue={tabs.find((tab) => tab.current).name}
                    >
                      {tabs.map((tab) => (
                        <option key={tab.name}>{tab.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="hidden sm:block">
                    <nav
                      className="isolate flex divide-x divide-gray-200 rounded-lg shadow"
                      aria-label="Tabs"
                    >
                      {tabs.map((tab, tabIdx) => (
                        <button
                          key={tab.name}
                          onClick={() => setTabId(tabIdx)}
                          className={classNames(
                            tabIdx === tabId
                              ? "text-gray-900"
                              : "text-gray-500 hover:text-gray-700",
                            tabIdx === 0 ? "rounded-l-lg" : "",
                            tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
                            "group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10"
                          )}
                          aria-current={tab.current ? "page" : undefined}
                        >
                          <span>{tab.name}</span>
                          <span
                            aria-hidden="true"
                            className={classNames(
                              tabIdx === tabId
                                ? "bg-indigo-500"
                                : "bg-transparent",
                              "absolute inset-x-0 bottom-0 h-0.5"
                            )}
                          />
                        </button>
                      ))}
                    </nav>
                  </div>
                </div>
                {/* End of Tabs */}
                {/*If TabId === 0, then show the Task Details Page */}
                {tabId === 0 && (
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                      <div className="mt-2">
                        <form action="#" method="POST">
                          <label
                            htmlFor="task-name"
                            className="block text-sm font-medium text-gray-700 mt-2"
                          >
                            Task Name
                          </label>
                          <div className="mt-1">
                            <text
                              id="task-name"
                              name="task-name"
                              className="mt-1 p-2 block w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            >
                              {task.name}
                            </text>
                          </div>
                          <label
                            htmlFor="task-description"
                            className="block text-sm font-medium text-gray-700 mt-2"
                          >
                            Task Name
                          </label>
                          <div className="mt-1">
                            <text
                              id="task-description"
                              name="task-description"
                              className="mt-1 p-2 block w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            >
                              {task.description}
                            </text>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                )}
                {/* End of Task Details Page */}
                {/*If TabId === 1, then show the Assigned Employees Page */}
                {tabId === 1 && (
                  <div className="flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-y-scroll h-96 shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                          <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                              <tr>
                                <th
                                  scope="col"
                                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                >
                                  Name
                                </th>
                                <th
                                  scope="col"
                                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                >
                                  Email
                                </th>
                                <th
                                  scope="col"
                                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                >
                                  Status
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                              {people.map((person) => (
                                <tr key={person.email}>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                    <div className="flex items-center">
                                      <div className="ml-4">
                                        <div className="font-medium text-gray-900">
                                          {person.firstName + " " + person.lastName}
                                        </div>
                                    
                                      </div>
                                    </div>
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    <div className="text-gray-500">
                                      {person.workEmail}
                                    </div>
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    
                                      <span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
                                        Not Done
                                      </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/* End of Assigned Employees Page */}
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={onClose}
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
  );
}
