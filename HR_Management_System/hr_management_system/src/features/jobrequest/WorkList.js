
import ViewWork from "./ViewWork";
import { Fragment, useState } from 'react'
import { CalendarIcon, ChevronRightIcon, EyeIcon } from '@heroicons/react/20/solid'

export default function WorkList({
  templateWorks
}) {
  const [openView, setOpenView] = useState(false)
  

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md max-w-lg">
      <ul role="list" className="divide-y divide-gray-200">
        {templateWorks.map((position) => (
          <li key={position.workId}>
            <a href="#" className="block hover:bg-gray-50">
              <div className="flex items-center px-4 py-4 sm:px-6">
                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                  <div className="truncate">
                    <div className="flex text-sm">
                      <p className="truncate font-medium text-indigo-600">{position.positionName}</p>
                      <p className="ml-1 flex-shrink-0 font-normal text-gray-500">in {position.companyName}</p>
                    </div>
                    <div className="mt-2 flex">
                      <div className="flex items-center text-sm text-gray-500">
                        <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                        <p>
                          From {position.startDate} to {position.endDate}
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
                <ViewWork open ={openView} setOpen={() => setOpenView(false)} work = {position}/>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
    
  );
}
