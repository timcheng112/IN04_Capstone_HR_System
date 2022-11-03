import { ArchiveBoxXMarkIcon, PencilIcon } from "@heroicons/react/20/solid";
import EmptyStateAdd from "./EmptyStateAdd";
import ViewWork from "./ViewWork";
import AddWork from "./AddWork";
import { Fragment, useState } from 'react'

export default function WorkList({
  templateWorks
}) {
  const [openView, setOpenView] = useState(false)
  const [addwork, setAddwork] = useState(false)
  return (
    <ul role="list" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-3/4">
      {templateWorks.map((work) => (
        <li
          key={work.workId}
          className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
        >
          <div className="flex-col w-full p-6">
            <div className="truncate">
              <div className="flex space-x-3">
                <h3 className="truncate text-sm font-bold text-gray-900">
                  {work.companyName}
                </h3>
                {/* <span className="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                  {work.positionName}
                </span> */}
              </div>
            </div>
            <div className="truncate">
              <div className="flex space-x-3">
                <p className="mt-1 truncate text-sm text-gray-900">
                  {work.positionName}
                </p>
              </div>
            </div>
          </div>
          <div >
            <div className="-mt-px py-6 flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                <button
                  onClick = {()=> setOpenView(true)}
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                >
                  <PencilIcon className="h-5 w-5  text-indigo-400" />
                  <span className="ml-3 text-indigo-500">Edit</span>
                </button>
                <button
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                >
                  <ArchiveBoxXMarkIcon className="h-5 w-5 text-red-400" />
                  <span className="ml-3 text-red-400">Remove</span>
                </button>
              </div>
            </div>
          </div>
          <ViewWork open ={openView} setOpen={() => setOpenView(false)} work = {work}/>
        </li>
      ))}
      <li className="col-span-1 divide-y divide-gray-200 rounded-lg shadow">
        <EmptyStateAdd onOpen={()=>setAddwork(true)} itemName="Work Experience" />
      </li>
      <AddWork open ={addwork} setOpen={() => setAddwork(false)} />
    </ul>
    
  );
}