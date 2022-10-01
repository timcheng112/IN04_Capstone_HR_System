import Navbar  from '../../../components/Navbar.js';
import {useState} from 'react';
import DeactivateAccountModal from './deactivateAccountModal.js';
import ViewEmployeeModal from './viewEmployeeModal.js';

//idea: we make a simple table but u can hover for tooltip!
//https://www.w3schools.com/css/css_tooltip.asp

/* This example requires Tailwind CSS v2.0+ */
const people = [
  { name: 'Lindsay Walton', department: 'Sales', team:'Seng Kang Outlet', role: 'Employee' },
  // More people...
]

export default function EmployeeList() {

const [openDeactivate, setOpenDeactivate] = useState(false)
const [openView, setOpenView] = useState(false)
const [employee, setEmployee] = useState(null)

  return (
  <>
  <Navbar/>
  <DeactivateAccountModal open={openDeactivate} onClose={ () => setOpenDeactivate(false)}/>
  <ViewEmployeeModal open={openView} onClose={ () => setOpenView(false)} employee = {employee}/>

  <div className="bg-[#13AEBD] rounded-xl p-10 m-10">
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Users</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, department, team and role.
          </p>

        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Create User
          </button>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Department
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Team
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Role
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">View</span>
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Deactivate</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {people.map((person, personIdx) => (

                    <tr key={person.name} className={personIdx % 2 === 0 ? undefined : 'bg-gray-50'}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {person.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.department}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.team}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.role}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button onClick={() =>{setOpenView(true); setEmployee(person)} } className="text-indigo-600 hover:text-indigo-900">
                          View<span className="sr-only">, {person.name}</span>
                        </button>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button onClick={() => setOpenDeactivate(true)} className="text-indigo-600 hover:text-indigo-900" >
                          Deactivate<span className="sr-only">, {person.name}</span>
                        </button>
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
    </div>

    </>

  )
}
