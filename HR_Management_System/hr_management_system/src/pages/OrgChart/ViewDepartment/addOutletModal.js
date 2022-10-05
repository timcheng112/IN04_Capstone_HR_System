import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import api from "../../../utils/api";

export default function AddOutletModal({ open, onClose, deptId }) {
  //need this?
  //const [userId, setUserId] = useState(-1);

  //addoutlet
  const [outletName, setOutletName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [openingHour, setOpeningHour] = useState(0);
  const [closingHour, setClosingHour] = useState(0);
  const [addressId, setAddressId] = useState(-1);

  //addAddress
  const [addressName, setAddressName] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  //TODO: put the outlet on top of the address: looks better.
  //add user to team

  //add address
  //add outlet
  function addAddress() {
    console.log("addAddressFunc :" + addressName);
    console.log(
      "AddressName: " +
        addressName +
        " line1: " +
        line1 +
        " line2: " +
        line2 +
        " postalCode: " +
        postalCode +
        " city: " +
        city +
        "country: " +
        country
    );
    api
      .addAddress(addressName, line1, line2, postalCode, city, country)
      .then((response) => {
        if (response.status == 200) {
          console.log("successfully created address!");
          console.log("new addressId: " + response.data);
          alert("success!");
          setAddressId(parseInt(response.data));
        } else {
          console.error("failed to create address!");
        }
      })
      .catch((error) => {
        var message = error.request.response;
        console.log(message);
        //i left this if here even though it won't trigger in case we add more error checking later.
        if (message.includes("placeholder error")) {
          alert("placeholder error! no way you ever see this alert!");
        } else {
          alert("Error: " + message);
        }
      });
  }

  function addOutlet() {
    console.log("addOutletFunc :" + outletName);
    console.log(
      "OutletName: " +
        outletName +
        " contactNo: " +
        contactNo +
        " openingHour: " +
        openingHour +
        " closingHour: " +
        closingHour +
        " adressId: " +
        addressId
    );
    api
      .addOutlet(outletName, contactNo, openingHour, closingHour, addressId)
      .then((response) => {
        if (response.status == 200) {
          console.log("successfully created outlet!");
          alert("success!");
        } else {
          console.error("failed to create outlet!");
        }
      })
      .catch((error) => {
        var message = error.request.response;
        console.log(message);
        if (message.includes("Closing time cannot be before opening time!")) {
          alert("Closing time cannot be before opening time!");
        } else {
          alert("Error: " + message);
        }
      });
  }

  // const [options, setOptions] = useState(null);
  // useEffect(() => {
  //   const availEmployees = async () => {
  //     console.log("use effect! teamId:" + 1);
  //     const arr = [];
  //     await api.getEmployeesNotInGivenTeam(1).then((res) => {
  //       let result = res.data;
  //       result.map((employee) => {
  //         return arr.push({
  //           value: employee.userId,
  //           label: employee.firstName + " " + employee.lastName,
  //         });
  //       });
  //       setOptions(arr);
  //       console.log("fetching options...");
  //       console.log(options);
  //     });
  //   };
  //   availEmployees();
  // });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    addAddress();
    addOutlet();
  };

  const cancelButtonRef = useRef(null);

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
                  <div className="mt-5 md:col-span-2 md:mt-0">
                    <form
                      className="space-y-8 divide-y divide-gray-200"
                      onSubmit={handleSubmit}
                    >
                      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                        <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
                          <div>
                            <h3 className="text-lg font-medium leading-6 text-gray-900">
                              Add an Outlet
                            </h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                              Create a new Outlet. The below address will be
                              saved for this outlet.
                            </p>
                          </div>
                          <div className="space-y-6 sm:space-y-5">
                            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5 mb-2">
                              <label
                                htmlFor="outlet-name"
                                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                              >
                                Outlet Name
                              </label>
                              <div className="mt-1 sm:col-span-2 sm:mt-2 sm:mb-2">
                                <input
                                  onChange={(e) =>
                                    setOutletName(String(e.target.value))
                                  }
                                  type="text"
                                  name="outlet-name"
                                  id="outlet-name"
                                  className="block w-full max-w-lg rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm px-2"
                                />
                              </div>
                            </div>
                            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5 mb-2">
                              <label
                                htmlFor="contactNo"
                                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                              >
                                Contact No
                              </label>
                              <div className="mt-1 sm:col-span-2 sm:mt-2 sm:mb-2">
                                <input
                                  onChange={(e) =>
                                    setContactNo(String(e.target.value))
                                  }
                                  type="text"
                                  name="contact-no"
                                  id="contact-no"
                                  className="block w-full max-w-lg rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm px-2"
                                />
                              </div>
                            </div>
                            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5 mb-2">
                              <label
                                htmlFor="opening-hour"
                                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                              >
                                Opening Hour
                              </label>
                              <div className="mt-1 sm:col-span-2 sm:mt-2 sm:mb-2">
                                <input
                                  onChange={(e) =>
                                    setOpeningHour(e.target.value)
                                  }
                                  type="number"
                                  name="opening-hour"
                                  id="opening-hour"
                                  className="block w-full max-w-lg rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm px-2"
                                />
                              </div>
                            </div>

                            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5 mb-2">
                              <label
                                htmlFor="closing-hour"
                                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                              >
                                Closing Hour
                              </label>
                              <div className="mt-1 sm:col-span-2 sm:mt-2 sm:mb-2">
                                <input
                                  onChange={(e) =>
                                    setClosingHour(e.target.value)
                                  }
                                  type="number"
                                  name="closing-hour"
                                  id="closing-hour"
                                  className="block w-full max-w-lg rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm px-2"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                        <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
                          <div>
                            <h3 className="text-lg font-medium leading-6 text-gray-900">
                              Add an Address
                            </h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                              Enter the address of the new outlet.
                            </p>
                          </div>

                          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5 mb-2">
                            <label
                              htmlFor="last-name"
                              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                            >
                              Address Name
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-2 sm:mb-2">
                              <input
                                onChange={(e) =>
                                  setAddressName(String(e.target.value))
                                }
                                type="text"
                                name="address-name"
                                id="address-name"
                                className="block w-full max-w-lg rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm px-2"
                              />
                            </div>
                          </div>

                          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5 mb-2">
                            <label
                              htmlFor="line1"
                              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                            >
                              Address
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-2 sm:mb-2">
                              <input
                                onChange={(e) =>
                                  setLine1(String(e.target.value))
                                }
                                type="text"
                                name="line1"
                                id="line1"
                                className="block w-full max-w-lg rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm px-2"
                              />
                            </div>
                          </div>
                          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5 mb-2">
                            <label
                              htmlFor="line2"
                              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                            >
                              Unit Number
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-2 sm:mb-2">
                              <input
                                onChange={(e) => {
                                  var tempPC = e.target.value;
                                  if (tempPC.charAt(0) == "#") {
                                    tempPC = tempPC.substring(1);
                                  }
                                  setLine2(tempPC);
                                }}
                                type="text"
                                name="line2"
                                id="line2"
                                className="block w-full max-w-lg rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm px-2"
                              />
                            </div>
                          </div>

                          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5 mb-2">
                            <label
                              htmlFor="postal-code"
                              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                            >
                              Postal Code
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-2 sm:mb-2">
                              <input
                                onChange={(e) =>
                                  setPostalCode(String(e.target.value))
                                }
                                type="text"
                                name="postal-code"
                                id="postal-code"
                                className="block w-full max-w-lg rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm px-2"
                              />
                            </div>
                          </div>

                          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5 mb-2">
                            <label
                              htmlFor="city"
                              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                            >
                              City
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-2 sm:mb-2">
                              <input
                                onChange={(e) =>
                                  setCity(String(e.target.value))
                                }
                                type="text"
                                name="city"
                                id="city"
                                className="block w-full max-w-lg rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm px-2"
                              />
                            </div>
                          </div>

                          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5 mb-2">
                            <label
                              htmlFor="country"
                              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                            >
                              Country
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-2 sm:mb-2">
                              <input
                                onChange={(e) =>
                                  setCountry(String(e.target.value))
                                }
                                type="text"
                                name="country"
                                id="country"
                                className="block w-full max-w-lg rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm px-2"
                              />
                            </div>
                          </div>
                          <div className="sm:grid sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5 mb-2">
                            <div className="pt-5">
                              <div className="flex justify-end">
                                <button
                                  onClick={onClose}
                                  type="button"
                                  className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                  Cancel
                                </button>
                                <button
                                  type="submit"
                                  className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                  Add
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
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
