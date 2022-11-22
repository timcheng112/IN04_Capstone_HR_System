import BenefitPlanOption from "./BenefitPlanOption";
import AddNewPlan from "./AddNewPlan";
import { useState, useEffect } from "react";

export default function BenefitPlan({ type, plans }) {
  const [add, setAdd] = useState(false);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="flex text-xl font-semibold text-gray-900">{type}</h1>
        </div>
        {type === 'Medical' && <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={() => setAdd(true)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add new plan
          </button>
          <AddNewPlan open ={add} setOpen={setAdd}/>
        </div>}
      </div>
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
                    {/* <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Edit</span>
                    </th> */}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {plans.map((plan) => (
                    <tr key={plan.benefitPlanId}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-6">
                        {plan.planName}
                      </td>
                      <td className=" whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">$ {plan.planAmount}</td>
                      <td className=" whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">{plan.startDate}</td>
                      <td className=" whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">{plan.endDate}</td>
                      <td className=" whitespace-nowrap px-3 py-4 text-left text-sm">
                      {plan.isActive && <span className=" whitespace-nowrap inline-flex items-center rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-800">
                        Active
                      </span>}
                      {!plan.isActive && <span className="whitespace-nowrap inline-flex items-center rounded-full bg-red-100 px-3 py-0.5 text-sm font-medium text-red-800">
                        Not active
                      </span>}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <BenefitPlanOption plan ={plan} />
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
  )
}
