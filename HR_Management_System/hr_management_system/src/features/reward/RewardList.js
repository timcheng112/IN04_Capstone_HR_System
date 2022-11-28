
import { Fragment, useState, useEffect } from 'react'
import RewardListOption from './RewardListOption'

const rewards = [
  {
    name: 'reward 1',
    pointsRequired: '30',
    expiryDate: '2022-12-30',
  },
  {
    name: 'reward 2',
    pointsRequired: '60',
    expiryDate: '2022-12-30',
   
  }, {
    name: 'reward 3',
    pointsRequired: '90',
    expiryDate: '2022-12-30',
   
  }, {
    name: 'reward 4',
    pointsRequired: '30',
    expiryDate: '2022-12-30',
   
  }, 
]

export default function RewardList() {
  

  return (
    <div class="scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300 h-50 w-full overflow-x-scroll">
    <ul role="list" className="flex space-x-6">
      {rewards.map((reward) => (
        <li key={reward.name} className="col-span-1 divide-x divide-gray-200 rounded-lg bg-white shadow">
          <div className="flex w-full items-center justify-between space-x-6 p-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h3 className="truncate text-sm font-medium text-gray-900">{reward.name}</h3>
                <span className="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                  {reward.pointsRequired}
                </span>
              </div>
              <p className="mt-1 truncate text-sm text-gray-500">{reward.expiryDate}</p>
            </div>
          </div>
          <RewardListOption reward={reward}/>
        </li>
      ))}
    </ul>
    </div>
  )
}