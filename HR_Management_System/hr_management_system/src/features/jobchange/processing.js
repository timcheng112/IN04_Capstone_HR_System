import { Listbox, Switch, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router";
import AddTeamModal from "../../pages/OrgChart/ViewDepartment/addTeamModal";
import AddDepartmentModal from "../../pages/OrgChart/ViewOrganisation/addDeptModal";
import api from "../../utils/api";
import { getUserId } from "../../utils/Common";
import PromotionAddTeam from "./promotionAddTeam";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Processing({ request }) {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [payInformation, setPayInformation] = useState(null);
  const [newPay, setNewPay] = useState(null);
  const [effectiveFrom, setEffectiveFrom] = useState("");
  const [toReject, setToReject] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [isTeam, setIsTeam] = useState(false);
  const [newDepartment, setNewDepartment] = useState(null);
  const [groups, setGroups] = useState([]);

  //new team
  const [teamName, setTeamName] = useState("");
  const [departmentId, setDepartmentId] = useState(0);
  const [outlet, setOutletId] = useState("");
  const [inOffice, setInOffice] = useState(false);
  const [outlets, setOutlets] = useState([]);
  const [selectedOutlet, setSelectedOutlet] = useState({
    outletName: "Select",
  });

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

    api.getPositionGroup(request.newPosition.positionId).then((response) => {
      //console.log(response.data);
      if (response.data === "Team") {
        setIsTeam(true);
      }
    });

    api.getAllOutlets().then((response) => {
      console.log(response.data);
      setOutlets(response.data);
    });

    api.getDepartmentByEmployeeId(request.employee.userId).then((response) => {
      console.log(response.data.departmentId);
      setDepartmentId(response.data.departmentId);
    });
  }, []);

  function handleSubmit() {
    var basicSalary = payInformation.basicSalary;
    if (!payInformation.basicSalary) {
      basicSalary = "";
    }

    console.log();

    api
      .processPromotionRequest(
        request.promotionId,
        effectiveFrom,
        rejectRemarks,
        basicSalary,
        payInformation.basicHourlyPay,
        payInformation.weekendHourlyPay,
        payInformation.eventPhHourlyPay,
        getUserId(),
        teamName,
        selectedOutlet.outletId,
        inOffice,
        departmentId
      )
      .then((response) => {
        alert(response.data);
      })
      .finally(() => {
        history.push("/promotion");
      });
  }

  return (
    currentPosition &&
    payInformation &&
    newPay && (
      <>
        <div className="bg-white mx-10">
          <form className="mt-10 p-10 space-y-8 divide-y divide-gray-200">
            <div className="space-y-8 divide-y divide-gray-200">
              <div>
                <div>
                  <h3 className="text-lg font-sans font-medium leading-6 text-gray-900">
                    Promotion Request for {request.employee.firstName}{" "}
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

                  {isTeam ? (
                    <>
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="department"
                          className="block text-md mb-2 text-left font-sans font-medium text-gray-900"
                        >
                          New Team
                        </label>

                        <label
                          htmlFor="salary-amount"
                          className="block text-sm font-bold text-gray-700 text-start"
                        >
                          Team Name
                        </label>
                        <input
                          type="text"
                          name="salary-amount"
                          id="salary-amount"
                          autoComplete="family-name"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-600 disabled:bg-gray-100"
                          value={teamName}
                          onChange={(e) => setTeamName(e.target.value)}
                        />
                      </div>
                      <div className="sm:col-span-6">
                        <Listbox
                          value={selectedOutlet}
                          onChange={setSelectedOutlet}
                        >
                          {({ open }) => (
                            <>
                              <Listbox.Label className="block text-sm font-bold text-gray-700 text-start">
                                New Outlet
                              </Listbox.Label>
                              <div className="relative mt-1">
                                <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                                  <span className="block truncate">
                                    {selectedOutlet.outletName}
                                  </span>
                                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronUpDownIcon
                                      className="h-5 w-5 text-gray-400"
                                      aria-hidden="true"
                                    />
                                  </span>
                                </Listbox.Button>

                                <Transition
                                  show={open}
                                  as={Fragment}
                                  leave="transition ease-in duration-100"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {outlets.map((person) => (
                                      <Listbox.Option
                                        key={person.outletId}
                                        className={({ active }) =>
                                          classNames(
                                            active
                                              ? "text-white bg-indigo-600"
                                              : "text-gray-900",
                                            "relative cursor-default select-none py-2 pl-3 pr-9"
                                          )
                                        }
                                        value={person}
                                      >
                                        {({ selected, active }) => (
                                          <>
                                            <span
                                              className={classNames(
                                                selected
                                                  ? "font-semibold"
                                                  : "font-normal",
                                                "block truncate"
                                              )}
                                            >
                                              {person.outletName}
                                            </span>

                                            {selected ? (
                                              <span
                                                className={classNames(
                                                  active
                                                    ? "text-white"
                                                    : "text-indigo-600",
                                                  "absolute inset-y-0 right-0 flex items-center pr-4"
                                                )}
                                              >
                                                <CheckIcon
                                                  className="h-5 w-5"
                                                  aria-hidden="true"
                                                />
                                              </span>
                                            ) : null}
                                          </>
                                        )}
                                      </Listbox.Option>
                                    ))}
                                  </Listbox.Options>
                                </Transition>
                              </div>
                            </>
                          )}
                        </Listbox>
                      </div>
                      <div className="sm:col-span-6">
                        <label
                          htmlFor="salary-amount"
                          className="block text-sm font-bold text-gray-700 text-start"
                        >
                          In Office
                        </label>
                        <Switch.Group
                          as="div"
                          className="flex items-center justify-start"
                        >
                          <Switch
                            checked={inOffice}
                            onChange={setInOffice}
                            className={classNames(
                              inOffice ? "bg-indigo-600" : "bg-gray-200",
                              "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            )}
                          >
                            <span
                              aria-hidden="true"
                              className={classNames(
                                inOffice ? "translate-x-5" : "translate-x-0",
                                "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                              )}
                            />
                          </Switch>
                        </Switch.Group>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="department"
                          className="block text-md text-left font-sans font-medium text-gray-900"
                        >
                          New Department
                        </label>

                        <>
                          {newDepartment && (
                            <div className="mt-1">
                              <input
                                type="text"
                                name="department"
                                id="department"
                                disabled
                                className="block w-full text-center min-w-0 flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-800 "
                                defaultValue={newDepartment.departmentName}
                              />
                            </div>
                          )}
                        </>
                      </div>
                    </>
                  )}

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

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="effectiveFrom"
                      className="block text-md text-left font-sans font-medium text-gray-700"
                    >
                      Effective From
                    </label>
                    <div className="mt-1">
                      <input
                        type="date"
                        name="effectiveFrom"
                        id="effectiveFrom"
                        className="block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={effectiveFrom}
                        onChange={(e) => setEffectiveFrom(e.target.value)}
                      />
                    </div>
                  </div>

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
                          promotion.
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
                      className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => handleSubmit()}
                    >
                      Confirm
                    </button>
                    <button
                      type="button"
                      className="ml-3 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => setToReject(!toReject)}
                    >
                      Cancel
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
