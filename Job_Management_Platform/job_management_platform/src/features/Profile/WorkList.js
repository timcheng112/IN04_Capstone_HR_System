import { ArchiveBoxXMarkIcon, PencilIcon } from "@heroicons/react/20/solid";
import EmptyStateAdd from "./EmptyStateAdd";
import ViewWork from "./ViewWork";
import AddWork from "./AddWork";
import WorkButton from "./WorkButton";
import { Fragment, useState } from 'react'

export default function WorkList({
  templateWorks, refreshKeyHandler
}) {
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
          <WorkButton work={work} refreshKeyHandler={refreshKeyHandler}/>
        </li>
      ))}
      <li className="col-span-1 divide-y divide-gray-200 rounded-lg shadow">
        <EmptyStateAdd onOpen={()=>setAddwork(true)} itemName="Work Experience" />
      </li>
      <AddWork open ={addwork} setOpen={() => setAddwork(false)} refreshKeyHandler={refreshKeyHandler}/>
    </ul>
    
  );
}
