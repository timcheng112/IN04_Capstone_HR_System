import { Listbox, Switch, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router";
import AddTeamModal from "../../pages/OrgChart/ViewDepartment/addTeamModal";
import AddDepartmentModal from "../../pages/OrgChart/ViewOrganisation/addDeptModal";
import api from "../../utils/api";
import { getUserId } from "../../utils/Common";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TransferProcessing({ request }) {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [payInformation, setPayInformation] = useState(null);
  const [newPay, setNewPay] = useState(null);
  const [toReject, setToReject] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [user, setUser] = useState(null);

  const history = useHistory();

  useEffect(() => {
    console.log(request);

    api.getUserCurrentPosition(request.employee.userId).then((response) => {
      //console.log(response.data);
      setCurrentPosition(response.data);
    });

    api.getUserPayInformation(request.employee.userId).then((response) => {
      console.log(response.data);
      setPayInformation(response.data);
    });

    api
      .getPositionPayInformation(request.newPosition.positionId)
      .then((response) => {
        console.log(response.data);
        setNewPay(response.data);
      });

    api.getUser(request.employee.userId).then((response) => {
      console.log(response.data);
      setUser(response.data);
    });
  }, []);

  function handleSubmit() {
    var basicSalary = payInformation.basicSalary;
    if (!payInformation.basicSalary) {
      basicSalary = "";
    }

    api
      .processTransferRequest(
        request.transferId,
        rejectRemarks,
        basicSalary,
        payInformation.basicHourlyPay,
        payInformation.weekendHourlyPay,
        payInformation.eventPhHourlyPay,
        getUserId()
      )
      .then((response) => alert(response.data))
      .finally(() => {
        history.push("/transfer");
      });
  }

  return (
    currentPosition &&
    payInformation &&
    newPay &&
    request &&
    user && (
      <>
        <div className="bg-white mx-10">
          <form className="mt-10 p-10 space-y-8 divide-y divide-gray-200">
            <div className="space-y-8 divide-y divide-gray-200">
              <div>
                <div>
                  <h3 className="text-lg font-sans font-medium leading-6 text-gray-900">
                    Transfer Request for {request.employee.firstName}{" "}
                    {request.employee.lastName}
                  </h3>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="position"
                      className="block text-md text-left font-sans font-medium text-gray-700"
                    >
                      Current Position
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="position"
                        id="position"
                        defaultValue={currentPosition.positionName}
                        disabled
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-600 disabled:bg-gray-100"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="newPosition"
                      className="block text-md text-left font-sans font-medium text-gray-700"
                    >
                      New Position
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="newPosition"
                        id="newPosition"
                        defaultValue={request.newPosition.positionName}
                        disabled
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-600 disabled:bg-gray-100"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="currentTeam"
                      className="block text-md text-left font-sans font-medium text-gray-700"
                    >
                      Current Team
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="currentTeam"
                        id="currentTeam"
                        defaultValue={user.teams[0].teamName}
                        disabled
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-600 disabled:bg-gray-100"
                      />
                    </div>
                  </div>

                  {request.newTeam && (
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="newTeam"
                        className="block text-md text-left font-sans font-medium text-gray-700"
                      >
                        New Team
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="newTeam"
                          id="newTeam"
                          defaultValue={request.newTeam.teamName}
                          disabled
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-600 disabled:bg-gray-100"
                        />
                      </div>
                    </div>
                  )}

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="newDepartment"
                      className="block text-md text-left font-sans font-medium text-gray-700"
                    >
                      New Department
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="newDepartment"
                        id="newDepartment"
                        defaultValue={request.newDepartment.departmentName}
                        disabled
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-600 disabled:bg-gray-100"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="comments"
                      className="block text-md text-left font-sans font-medium text-gray-700"
                    >
                      Current Pay Information
                    </label>
                  </div>

                  {payInformation.basicSalary ? (
                    <div className="col-span-6 sm:col-span-6">
                      <label
                        htmlFor="salary-amount"
                        className="block text-sm font-bold text-gray-700 text-start"
                      >
                        Basic Salary Amount
                      </label>
                      <input
                        type="text"
                        name="salary-amount"
                        id="salary-amount"
                        autoComplete="family-name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-600 disabled:bg-gray-100"
                        defaultValue={payInformation.basicSalary.toLocaleString(
                          "en-US"
                        )}
                        disabled
                      />
                    </div>
                  ) : (
                    <>
                      <div className="col-span-6 sm:col-span-6">
                        <label
                          htmlFor="salary-amount"
                          className="block text-sm font-sans font-semibold text-gray-700 text-start"
                        >
                          Basic Hourly Pay
                        </label>
                        <input
                          type="text"
                          name="salary-amount"
                          id="salary-amount"
                          autoComplete="family-name"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-600 disabled:bg-gray-100"
                          defaultValue={payInformation.basicHourlyPay.toLocaleString(
                            "en-US"
                          )}
                          disabled
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="weekend-hourly-salary"
                          className="block text-sm font-semibold font-sans text-gray-700 text-start"
                        >
                          Weekend Hourly Salary
                        </label>
                        <input
                          type="text"
                          name="weekend-hourly-salary"
                          id="weekend-hourly-salary"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-600 disabled:bg-gray-100"
                          defaultValue={payInformation.weekendHourlyPay.toLocaleString(
                            "en-US"
                          )}
                          disabled
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="event-ph-hourly-pay"
                          className="block text-sm font-semibold font-sans text-gray-700 text-start"
                        >
                          Event or Public Holiday Hourly Salary
                        </label>
                        <input
                          type="text"
                          name="event-ph-hourly-pay"
                          id="event-ph-hourly-pay"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-600 disabled:bg-gray-100"
                          defaultValue={payInformation.eventPhHourlyPay.toLocaleString(
                            "en-US"
                          )}
                          disabled
                        />
                      </div>
                    </>
                  )}

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="comments"
                      className="block text-md text-left font-sans font-medium text-gray-700"
                    >
                      New Pay Information
                    </label>
                  </div>

                  {newPay.basicSalary ? (
                    <div className="col-span-6 sm:col-span-6">
                      <label
                        htmlFor="salary-amount"
                        className="block text-sm font-bold text-gray-700 text-start"
                      >
                        Basic Salary Amount
                      </label>
                      <input
                        type="text"
                        name="salary-amount"
                        id="salary-amount"
                        autoComplete="family-name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-600 disabled:bg-gray-100"
                        defaultValue={newPay.basicSalary.toLocaleString(
                          "en-US"
                        )}
                        disabled
                      />
                    </div>
                  ) : (
                    <>
                      <div className="col-span-6 sm:col-span-6">
                        <label
                          htmlFor="salary-amount"
                          className="block text-sm font-sans font-semibold text-gray-700 text-start"
                        >
                          Basic Hourly Pay
                        </label>
                        <input
                          type="text"
                          name="salary-amount"
                          id="salary-amount"
                          autoComplete="family-name"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-600 disabled:bg-gray-100"
                          defaultValue={newPay.basicHourlyPay.toLocaleString(
                            "en-US"
                          )}
                          disabled
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="weekend-hourly-salary"
                          className="block text-sm font-semibold font-sans text-gray-700 text-start"
                        >
                          Weekend Hourly Salary
                        </label>
                        <input
                          type="text"
                          name="weekend-hourly-salary"
                          id="weekend-hourly-salary"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-600 disabled:bg-gray-100"
                          defaultValue={newPay.weekendHourlyPay.toLocaleString(
                            "en-US"
                          )}
                          disabled
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="event-ph-hourly-pay"
                          className="block text-sm font-semibold font-sans text-gray-700 text-start"
                        >
                          Event or Public Holiday Hourly Salary
                        </label>
                        <input
                          type="text"
                          name="event-ph-hourly-pay"
                          id="event-ph-hourly-pay"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-600 disabled:bg-gray-100"
                          defaultValue={newPay.eventPhHourlyPay.toLocaleString(
                            "en-US"
                          )}
                          disabled
                        />
                      </div>
                    </>
                  )}

                  {toReject && (
                    <>
                      <div className="sm:col-span-6">
                        <label
                          htmlFor="rejectionRemarks"
                          className="block text-md text-left font-sans font-medium text-gray-900"
                        >
                          Rejection Remarks
                        </label>
                        <p className="mt-2 text-sm text-left text-gray-500">
                          Explain why this employee has been rejected for a
                          transfer.
                        </p>
                        <div className="mt-1">
                          <textarea
                            id="rejectionRemarks"
                            name="rejectionRemarks"
                            rows={3}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            value={rejectRemarks}
                            onChange={(e) => setRejectRemarks(e.target.value)}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            {toReject ? (
              <div className="pt-5">
                <div className="flex justify-end">
                  <div>
                    <button
                      type="button"
                      className="ml-3 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => setToReject(!toReject)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => handleSubmit()}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="pt-5">
                <div className="flex justify-end">
                  <div>
                    <button
                      type="button"
                      className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      onClick={() => setToReject(!toReject)}
                    >
                      Reject
                    </button>
                    <button
                      type="button"
                      className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                      onClick={() => handleSubmit()}
                    >
                      Approve
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </>
    )
  );
}
