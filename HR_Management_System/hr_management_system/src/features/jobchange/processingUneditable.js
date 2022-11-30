import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import api from "../../utils/api";
import { getUserId } from "../../utils/Common";

export default function ProcessingUneditable({ request }) {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [payInformation, setPayInformation] = useState(null);
  const [toReject, setToReject] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const history = useHistory();

  useEffect(() => {
    api.getUserCurrentPosition(request.employee.userId).then((response) => {
      //console.log(response.data);
      setCurrentPosition(response.data);
    });

    api.getUserPayInformation(request.employee.userId).then((response) => {
      console.log(response.data);
      setPayInformation(response.data);
    });

    if (request.status === "Rejected") {
      setToReject(true);
    }
  }, []);

  function handleSubmit() {
    var basicSalary = payInformation.basicSalary;
    if (!payInformation.basicSalary) {
      console.log("sal");
      basicSalary = "";
    }

    api
      .processPromotionRequest(
        request.promotionId,
        rejectRemarks,
        basicSalary,
        payInformation.basicHourlyPay,
        payInformation.weekendHourlyPay,
        payInformation.eventPhHourlyPay,
        getUserId()
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
    payInformation && (
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
                  <div className="sm:col-span-6">
                    <label
                      htmlFor="processedBy"
                      className="block text-md text-left font-sans font-medium text-gray-700"
                    >
                      Processed By
                    </label>
                    <div className="mt-1">
                      <h1 className="text-left font-sans">{request.processedBy.firstName} {request.processedBy.lastName}</h1>
                    </div>
                  </div>

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
                        className="block w-full min-w-0 flex-1 p-3 rounded-md font-sans border-gray-300 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-700 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                        className="block w-full min-w-0 flex-1 p-3 rounded-md border-gray-300 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-700 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="comments"
                      className="block text-md text-left font-sans font-medium text-gray-700"
                    >
                      Pay Information
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
                            disabled
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
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
          </form>
        </div>
      </>
    )
  );
}
