import { React, useRef } from "react";
import Navbar from "../../components/Navbar";
import WelfareSidebar from "../../components/Sidebar/Welfare";
import Tab from "../../features/jobrequest/Tab";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { getUserId, setUserSession } from "../../utils/Common";
import { useHistory } from "react-router-dom";
import AddNewClaim from "../../features/benefit/AddNewClaim";
import {
  EyeIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";

export default function Benefits() {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [plans, setPlans] = useState([]);
  const [claim, setClaim] = useState(false);
  const history = useHistory();
  const [refreshKey, setRefreshKey] = useState(0);

  const tabs = [
    { name: "My Benefit Plans", href: "#", current: true },
    {
      name: "Claims",
      href: "/welfare/claims",
      current: false,
    },
  ];
  const hrtabs = [
    { name: "Benefit Plans", href: "/welfare/benefits", current: false },
    { name: "My Plans", href: "#", current: true },
    {
      name: "Claims",
      href: "/welfare/claims",
      current: false,
    },
  ];

  useEffect(() => {
    api
      .getUser(getUserId())
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => setError(error));
  }, []);
  useEffect(() => {
    api
      .getAllBenefitPlanInstancesByEmployeeId(getUserId())
      .then((response) => {
        setPlans(response.data);
        console.log(response.data);
      })
      .catch((error) => setError(error));
  }, []);



  return (
    <div className="">
      <Navbar />
      <div className="flex">
        <div className="flex-1">
          <WelfareSidebar currentPage={{
            name: "Benefits",
            href: "/welfare/mybenefits",
            current: true,
          }} />
        </div>
      </div>
      <div className="py-10">
        <main className="flex-1">
          <div className="sm:flex-auto px-6">
            {user !== null && !user.hrEmployee && <Tab tabs={tabs} />}
            {user !== null && user.hrEmployee && <Tab tabs={hrtabs} />}
          </div>
          <div className="py-3"></div>
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="mt-8 flex flex-col">
              <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className=" py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                            Name
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Remaining Amount
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Enroll Date
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Status
                          </th>
                          {/* <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Edit</span>
                    </th> */}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {plans.map((plan) => (
                          <tr key={plan.benefitPlanInstanceId}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-6">
                              {plan.planName}
                            </td>
                            <td className=" whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">$ {plan.remainingAmount}</td>
                            <td className=" whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">{plan.enrolDate}</td>
                            <td className=" whitespace-nowrap px-3 py-4 text-left text-sm">
                              {plan.isActive && <span className=" whitespace-nowrap inline-flex items-center rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-800">
                                Active
                              </span>}
                              {!plan.isActive && <span className="whitespace-nowrap inline-flex items-center rounded-full bg-red-100 px-3 py-0.5 text-sm font-medium text-red-800">
                                Inactive
                              </span>}
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <button
                                type="button"
                                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                onClick={() => setClaim(true)}
                              >
                                <PlusIcon
                                  className="md:-ml-0.5 md:mr-2 h-4 w-4"
                                  aria-hidden="true"
                                />
                                <span className="hidden md:block">Claim</span>
                                <AddNewClaim open={claim} setOpen={setClaim} plan={plan}/>
                              </button>
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
        </main>
      </div>
    </div>
  );
}
