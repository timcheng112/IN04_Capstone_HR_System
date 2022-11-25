import {
  CheckCircleIcon,
  ChevronRightIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import api from "../../utils/api";
import { getUserId } from "../../utils/Common";

export default function ActiveRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    api.getUserActiveRequests(getUserId()).then((response) => {
      console.log(response.data);
      setRequests(response.data);
    });
  }, []);

  return (
    requests && (
      <div>
        <div className="overflow-hidden bg-white shadow sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {requests.map((request) => (
              <li key={request.promotionId}>
                <a href={`/promotion/${request.promotionId}`} className="block hover:bg-gray-50">
                  <div className="flex items-center px-4 py-4 sm:px-6">
                    <div className="flex min-w-0 flex-1 items-center">
                      <div className="flex-shrink-0">
                        <img
                          className="h-12 w-12 rounded-full"
                          src={request.employee.profilePic}
                          alt=""
                        />
                      </div>
                      <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                        <div>
                          <p className="truncate text-sm text-left font-medium text-indigo-600">
                            {request.employee.firstName}{" "}
                            {request.employee.lastName}
                          </p>
                          <p className="mt-2 flex items-center text-sm text-gray-500">
                            <EnvelopeIcon
                              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                              aria-hidden="true"
                            />
                            <span className="truncate">
                              {request.employee.workEmail}
                            </span>
                          </p>
                        </div>
                        <div className="hidden md:block">
                          <div>
                            <p className="text-sm text-left text-gray-900">
                              Created {""}
                              <Moment
                                parse="YYYY-MM-DD"
                                className=" text-sm text-gray-500"
                                locale="Asia/Singapore"
                                format="DD/MM/YYYY"
                              >
                                {request.created}
                              </Moment>
                            </p>
                            <p className="mt-2 flex items-center text-sm text-gray-500">
                              <CheckCircleIcon
                                className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                                aria-hidden="true"
                              />
                              {request.status}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <ChevronRightIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  );
}
