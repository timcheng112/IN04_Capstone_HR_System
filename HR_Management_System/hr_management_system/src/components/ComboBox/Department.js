import { useState, useEffect } from 'react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'
import api from "../../utils/api";


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Department({selectedDepartment, setSelectedDepartment}) {
  const [query, setQuery] = useState('')
  const [departments, setDepartments] = useState([])
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('AAA')
    api
      .getAllDepartments()
      .then((response) => {
        setDepartments(response.data);
        console.log(response.data)
      })
      .catch((error) => setError(error));
  }, []);

  const filteredDepartment =
    query === ''
      ? departments
      : departments.filter((department) => {
          return department.departmentName.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <Combobox as="div" value={selectedDepartment} onChange={setSelectedDepartment}>
      {/* <Combobox.Label className="block text-sm font-medium text-gray-700">Assigned to</Combobox.Label> */}
      <div className="relative mt-1">
        <Combobox.Input
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(department) => department?.departmentName}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {filteredDepartment.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredDepartment.map((department) => (
              <Combobox.Option
                key={department.departmentId}
                value={department}
                className={({ active }) =>
                  classNames(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span className={classNames('block truncate', selected && 'font-semibold')}>{department.departmentName}</span>

                    {selected && (
                      <span
                        className={classNames(
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                          active ? 'text-white' : 'text-indigo-600'
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  )
}