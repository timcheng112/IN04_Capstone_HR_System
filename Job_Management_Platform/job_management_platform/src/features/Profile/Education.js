import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Education() {
  const [level, setLevel] = useState("")
  const [school, setSchool] = useState("")
  const [year, setYear] = useState()
  return (
    <div>

      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 ">
        <select
          id="level"
          name="level"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm bg-white"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option value="O LEVEL">O Level</option>
          <option value="N LEVEL">N Level</option>
          <option value="A LEVEL">A Level</option>
          <option value="DIPLOMA">Diploma</option>
          <option value="BACHELOR">Bachelor</option>
          <option value="MASTER">Master</option>
          <option value="PHD">Phd</option>
        </select>
      </div>
      <div className='py-4' />
      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 ">
        <div className="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
          <label
            htmlFor="name"
            className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900"
          >
            School Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="block w-60 border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
          />
        </div>
      </div>
      <div className='py-4' />
      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 ">

        <div className="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
          <label
            htmlFor="name"
            className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900"
          >
            Graduate Year
          </label>
          <input
            type="number"
            name="name"
            id="name"
            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
            placeholder="YYYY"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
