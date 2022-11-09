import { CalendarIcon, EnvelopeIcon, EyeIcon } from '@heroicons/react/20/solid'
import ViewRecommendation from "./ViewRecommendation";
import { Fragment, useState } from 'react'

export default function RecommendationList({
  templateRecommendations
}) {
  const [openView, setOpenView] = useState(false)

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md max-w-lg">
      <ul role="list" className="divide-y divide-gray-200">
        {templateRecommendations.map((position) => (
          <li key={position.recommendationId}>
            <a href="#" className="block hover:bg-gray-50">
              <div className="flex items-center px-4 py-4 sm:px-6">
                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                  <div className="truncate">
                    <div className="flex text-sm">
                      <p className="truncate font-medium text-indigo-600">{position.name}</p>
                    </div>
                    <div className="mt-2 flex">
                      <div className="flex items-center text-sm text-gray-500">
                        <EnvelopeIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                        <p>
                          Email  {position.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ml-5 flex-shrink-0">
                <button
                    type="button"
                    onClick = {()=> setOpenView(true)}
                  >
                  <EyeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </button>
                </div>
                <ViewRecommendation open ={openView} setOpen={() => setOpenView(false)} recommendation = {position}/>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
    
  );
}
