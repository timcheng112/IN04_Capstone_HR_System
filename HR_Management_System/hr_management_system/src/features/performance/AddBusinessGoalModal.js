import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import api from "../../utils/api";
import { getUserId } from "../../utils/Common";

export default function AddBusinessGoalModal({ open, onClose }) {
  const cancelButtonRef = useRef(null);
  const [description, setDescription] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.getUser(getUserId()).then((response) => setUser(response.data));
  }, []);

  useEffect(() => {
    if (!open) {
      console.log();
      setDescription("");
    }
  }, [open]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    api.addGoal("business", description, getUserId()).then((response) => {
      console.log(response.data);
      alert("Goal has been added");
    });
  };

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
                <form onSubmit={handleSubmit}>
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6">
                    <div>
                      <div className="mx-auto flex h-6 w-12 items-center justify-center"></div>
                      <div className="text-center sm:mt-5">
                        <div>
                          <h2 className="text-xl font-sans font-semibold text-center text-indigo-600 mb-5">
                            {new Date().getFullYear()}
                          </h2>
                        </div>
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium font-semibold font-sans leading-6 text-gray-900"
                        >
                          Add Business Goal for {user.firstName}{" "}
                          {user.lastName}{" "}
                        </Dialog.Title>

                        <div className="sm:flex sm:items-center">
                          <div className="sm:flex-auto">
                            <label
                              htmlFor="category-name"
                              className="block text-sm font-medium text-gray-700 mt-5"
                            >
                              Description
                            </label>
                            <div className="mt-1">
                              <textarea
                                id="category-name"
                                name="category-name"
                                rows={3}
                                className="mt-5 p-2 block w-full font-sans text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="sm:flex sm:items-center mt-5">
                          <h2 className="text-md font-sans text-left ml-5"></h2>
                          <div className="sm:flex-auto"></div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white sm:flex sm:flex-row justify-center sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={onClose}
                      >
                        Create
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={onClose}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </form>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    )
  );
}
