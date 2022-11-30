import { useState, useEffect} from 'react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'
import api from "../../utils/api";


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Employee({department,selectedEmployee, setSelectedEmployee}) {
  const [query, setQuery] = useState('')
  const [employees, setEmployees] = useState([])
  const [error, setError] = useState(null);

  useEffect(() => {
    // console.log(department);

    api
      .getEmployeesByDepartment(department.departmentId)
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => setError(error));
  }, []);

  const filteredEmployee =
    query === ''
      ? employees
      : employees.filter((employee) => {
          return filteredEmployee.firstName.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <div>{department !== null &&
     <Combobox as="div" value={selectedEmployee} onChange={setSelectedEmployee}>
      {/* <Combobox.Label className="block text-sm font-medium text-gray-700">Assigned to</Combobox.Label> */}
      <div className="relative mt-1">
        <Combobox.Input
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(employee) => employee?.firstName}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {filteredEmployee.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredEmployee.map((employee) => (
              <Combobox.Option
                key={employee.firstName}
                value={employee}
                className={({ active }) =>
                  classNames(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span className={classNames('block truncate', selected && 'font-semibold')}>{employee.firstName} {employee.lastName}</span>

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
    </Combobox>}
    </div>
  )
}