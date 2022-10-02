import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import api from '../../utils/api';

export default function AddCategoryModal({ open, onClose }) {
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const cancelButtonRef = useRef(null);
  const [error, setError] = useState(null);

    const handleSubmit = (evt) => {
      evt.preventDefault()
      createCategory()
      alert("Successfully created category.")
    }

  function createCategory() {
    api.addNewCategory({ // api change
      name: name,
    })
      .then(() => history.goBack())
      .catch(error => setError(error))
  }

  // useEffect(() => {
  //   api.getUser()
  //     .then(response => setUser(response.data))
  //     .catch((error) => setError(error))
  // }, [])

  return (
    //user &&
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
              <form onSubmit={handleSubmit}>
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Add Category
                    </Dialog.Title>
                    <div className="mt-2">
                      <form action="#" method="POST">
                        <label
                          htmlFor="category-name"
                          className="block text-sm font-medium text-gray-700 mt-2"
                        >
                          Category Name
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="category-name"
                            name="category-name"
                            rows={3}
                            className="mt-1 p-2 block w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            defaultValue={""}
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
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
  );
}
