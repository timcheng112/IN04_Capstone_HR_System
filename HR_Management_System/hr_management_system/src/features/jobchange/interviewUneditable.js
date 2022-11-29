import { useEffect, useState } from "react";
import api from "../../utils/api";

export default function InterviewUneditable({ request }) {
  const [currentPosition, setCurrentPosition] = useState(null);

  useEffect(() => {
    api.getUserCurrentPosition(request.employee.userId).then((response) => {
      console.log(response.data);
      setCurrentPosition(response.data);
    });
  }, []);

  return (
    currentPosition && (
      <>
        <div className="bg-white mx-10">
          <form className="mt-10 p-10 space-y-8 divide-y divide-gray-200">
            <div className="space-y-8 divide-y divide-gray-200">
              <div>
                <div>
                  <h3 className="text-lg font-sans font-medium leading-6 text-gray-900">
                    Interview Details for {request.employee.firstName}{" "}
                    {request.employee.lastName}'s Promotion
                  </h3>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <label
                      htmlFor="interviewer"
                      className="block text-md text-left font-sans font-medium text-gray-700"
                    >
                      Interviewer
                    </label>
                    <div className="mt-1 flex shadow-sm">
                      <input
                        type="text"
                        name="interviewer"
                        id="interviewer"
                        disabled
                        className="block w-full min-w-0 flex-1 rounded-md border-gray-300 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 focus:border-gray-300 focus:ring-gray-300 sm:text-sm"
                        value={
                          request.interviewer.firstName +
                          " " +
                          request.interviewer.lastName
                        }
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="scheduled"
                      className="block text-md text-left font-sans font-medium text-gray-700"
                    >
                      Scheduled On
                    </label>
                    <div className="mt-1">
                      <input
                        type="date"
                        name="scheduled"
                        id="scheduled"
                        disabled
                        className="block w-full min-w-0 flex-1 rounded-md border-gray-300 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        defaultValue={request.interviewDate}
                      />
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
                        className="block w-full min-w-0 flex-1 p-3 rounded-md border-gray-300 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                        className="block w-full min-w-0 flex-1 p-3 rounded-md border-gray-300 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="comments"
                      className="block text-md text-left font-sans font-medium text-gray-700"
                    >
                      Comments
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="comments"
                        name="comments"
                        rows={3}
                        disabled
                        className="block w-full rounded-md border-gray-300 shadow-sm disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        defaultValue={request.interviewRemarks}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="outcome"
                      className="block text-md text-left font-sans font-medium text-gray-700"
                    >
                      Outcome
                    </label>
                    <div className="mt-1">
                      {request.status === "Failed" ? (
                        <h1 className="font-sans font-semibold text-left font-medium text-gray-700">
                          Failed
                        </h1>
                      ) : (
                        <h1 className="font-sans text-left text-gray-700">
                          Passed
                        </h1>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </>
    )
  );
}
