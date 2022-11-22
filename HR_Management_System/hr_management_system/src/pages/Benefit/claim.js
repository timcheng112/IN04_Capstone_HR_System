import { React, useRef } from "react";
import Navbar from "../../components/Navbar";
import WelfareSidebar from "../../components/Sidebar/Welfare";
import ClaimOption from "../../features/benefit/ClaimOption";
import Tab from "../../features/jobrequest/Tab";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { getUserId, setUserSession } from "../../utils/Common";
import { useHistory } from "react-router-dom";

export default function Benefits() {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const history = useHistory();
  const [refreshKey, setRefreshKey] = useState(0);

  const tabs = [
    { name: "Benefit Plans", href: "/welfare/benefits", current: false },
    {
      name: "Claims",
      href: "#",
      current: true,
    },
  ];
  const claims = [{ benefitPlanId: 1, planName: 'test1', planAmount: '111', startDate: '2022-11-30', endDate: '2022-11-30', planType: 'Medical', isActive: true },
  { benefitPlanId: 2, planName: 'test2', planAmount: '111', startDate: '2022-11-30', endDate: '2022-11-30', planType: 'Medical', isActive: true },
  { benefitPlanId: 3, planName: 'test3', planAmount: '111', startDate: '2022-11-30', endDate: '2022-11-30', planType: 'Medical', isActive: false },]

  useEffect(() => {
    api
      .getUser(getUserId())
      .then((response) => {
        setUser(response.data);
        console.log(user);
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
            href: "/welfare/benefits",
            current: true,
          }} />
        </div>
      </div>
      <div className="py-10">
        <main className="flex-1">
          <div className="sm:flex-auto px-6">
            <Tab tabs={tabs} />
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
                            Amount
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Start Date
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            End Date
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {claims.map((claim) => (
                          <tr key={claim.benefitPlanId}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-6">
                              {claim.planName}
                            </td>
                            <td className=" whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">$ {claim.planAmount}</td>
                            <td className=" whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">{claim.startDate}</td>
                            <td className=" whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">{claim.endDate}</td>
                            <td className=" whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">{claim.status}</td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <ClaimOption claim ={claim}/>
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
