import { Listbox } from "@headlessui/react";
import { ChevronUpDownIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import GoalList from "../performance/GoalList";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NominationUneditable({ request }) {
  const [appraisals, setAppraisals] = useState([]);
  const [justification, setJustification] = useState(
    request.promotionJustification
  );
  const [withdraw, setWithdraw] = useState(false);
  const [withdrawRemarks, setWithdrawRemarks] = useState("");
  const [selectedPosition, setSelectedPosition] = useState({
    positionId: 0,
    positionName: "Select A Position",
  });
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (request) {
      console.log(request);

      if (request.status === "Withdrawn") {
        setWithdraw(true);
      }

      setWithdrawRemarks(request.withdrawRemarks);

      setSelectedPosition(request.newPosition);

      api.getAllEmployeeAppraisals(request.employee.userId).then((response) => {
        console.log(response.data);
        setAppraisals(response.data);
      });
    }
    api.getManagerReviewsByManager(request.employee.userId).then((response) => {
      console.log(response.data);
      setReviews(response.data);
    });
  }, []);

  return (
    request &&
    appraisals && (
      <div className="">
        <div>
          <div className="overflow-hidden bg-white mx-10 my-12 shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Promotion Request for {request.employee.firstName}{" "}
                {request.employee.lastName}
              </h3>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Employee's Full Name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {request.employee.firstName} {request.employee.lastName}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Submitted By
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {request.manager.firstName} {request.manager.lastName}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Employee's Email Address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {request.employee.workEmail}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Manager's Email Address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {request.manager.workEmail}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Appraisal History
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <div>
                      <div className="mt-6 flow-root">
                        <ul
                          role="list"
                          className="-my-5 divide-y divide-gray-200"
                        >
                          {appraisals.map((appraisal) => (
                            <li key={appraisal.appraisalId} className="py-4">
                              <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0"></div>
                                <div className="min-w-0 flex-1">
                                  <p className="truncate text-sm font-medium text-gray-900">
                                    {appraisal.appraisalYear}
                                  </p>
                                  <p className="truncate text-sm text-gray-500">
                                    Appraised By{" "}
                                    {appraisal.managerAppraising.firstName}{" "}
                                    {appraisal.managerAppraising.lastName}
                                  </p>
                                </div>
                                <div>
                                  <a
                                    href={`/performance/appraisal/${appraisal.appraisalId}`}
                                    className="inline-flex items-center rounded-full border border-gray-300 bg-white px-2.5 py-0.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-gray-50"
                                  >
                                    View
                                  </a>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Goal History
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <GoalList userId={request.employee.userId} />
                  </dd>
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="goals"
                    className="block text-md text-left font-sans font-medium text-gray-900"
                  >
                    Reviews
                  </label>
                  <div className="mt-5 flex flex-col">
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
                                  Employee / Reviewed By
                                </th>
                                <th
                                  scope="col"
                                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                >
                                  Manager
                                </th>
                                <th
                                  scope="col"
                                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                >
                                  View
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                              {reviews.map((review) => (
                                <tr key={review.reviewId}>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-left font-medium text-gray-900 sm:pl-6">
                                    {review.employeeReviewing.firstName}{" "}
                                    {review.employeeReviewing.lastName}
                                    <span className="mt-2 flex items-center text-sm text-gray-500">
                                      <EnvelopeIcon
                                        className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                        aria-hidden="true"
                                      />
                                      <span className="truncate">
                                        {review.employeeReviewing.workEmail}
                                      </span>
                                    </span>
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-left text-gray-900">
                                    {review.manager.firstName}{" "}
                                    {review.manager.lastName}
                                    <span className="mt-2 flex items-center text-sm text-gray-500">
                                      <EnvelopeIcon
                                        className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                        aria-hidden="true"
                                      />
                                      <span className="truncate">
                                        {review.manager.workEmail}
                                      </span>
                                    </span>
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-left text-gray-500">
                                    <a
                                      href={`/performance/review/${review.reviewId}`}
                                      className="inline-flex items-center rounded-full border border-gray-300 bg-white px-2.5 py-0.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-gray-50"
                                    >
                                      View
                                    </a>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-2"></div>
              </dl>
            </div>
            <div className="space-y-8 mx-10 my-10">
              <div className="space-y-8">
                <div>
                  <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                      <label
                        htmlFor="Justification"
                        className="block disabled text-md text-center font-sans font-medium text-gray-900"
                      >
                        Justification
                      </label>
                      <p className="mt-2 text-sm text-gray-500">
                        Explain why this employee is suited for this new
                        position.
                      </p>
                      <div className="mt-1">
                        <h1 className="block mt-5 py-3 px-3 w-full rounded-md border-gray-300 text-left shadow-sm sm:text-sm">
                          {justification}
                        </h1>
                      </div>
                    </div>

                    {withdraw ? (
                      <>
                        <div className="sm:col-span-6">
                          <label
                            htmlFor="withdrawRemarks"
                            className="block text-md text-center font-sans font-medium text-gray-900"
                          >
                            Withdraw Remarks
                          </label>
                          <p className="mt-2 text-sm text-gray-500">
                            Explain why this employee has been withdrawn after
                            being nominated for a promotion.
                          </p>
                          <div className="mt-1">
                            <textarea
                              id="withdrawRemarks"
                              name="withdrawRemarks"
                              rows={3}
                              disabled
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:cursor-not-allowed"
                              value={withdrawRemarks}
                              onChange={(e) =>
                                setWithdrawRemarks(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="sm:col-span-6">
                          <label
                            htmlFor="newPosition"
                            className="block text-sm font-medium text-gray-700"
                          ></label>
                          <Listbox
                            value={selectedPosition}
                            onChange={setSelectedPosition}
                          >
                            {({ open }) => (
                              <>
                                <Listbox.Label className="block text-md text-center font-sans font-medium text-gray-900">
                                  New Position
                                </Listbox.Label>
                                <div className="relative mt-1">
                                  <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none sm:text-sm">
                                    <span className="block truncate">
                                      {selectedPosition.positionName}
                                    </span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                      <ChevronUpDownIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  </Listbox.Button>
                                </div>
                              </>
                            )}
                          </Listbox>
                        </div>
                        <div className="sm:col-span-6">
                          <label
                            htmlFor="scheduled"
                            className="block text-md text-center font-sans font-medium text-gray-700"
                          >
                            Scheduled On
                          </label>
                          <div className="mt-1">
                            <input
                              type="date"
                              name="scheduled"
                              id="scheduled"
                              disabled
                              className="block w-full min-w-0 flex-1 rounded-md border-gray-300 disabled:cursor-not-allowed focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              defaultValue={request.interviewDate}
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
