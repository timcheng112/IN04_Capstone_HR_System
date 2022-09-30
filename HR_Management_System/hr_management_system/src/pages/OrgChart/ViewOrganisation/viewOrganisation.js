import Navbar  from '../../../components/Navbar.js';
import { Link } from 'react-router-dom';

/* This example requires Tailwind CSS v2.0+ */
const department = [
  { name: 'Sales Department', teamLeader: 'Wong Shi Han', position: 'Manager' },
  { name: 'HR Department',  teamLeader: 'Bobby Trinidad', position: 'Manager' },
  // More team...
]

const people = [
  {
    name: 'Matthew Lee',
    position: 'Climbing Prez',
    department: 'Information Systems',
    email: 'mattmotion@u.nus.edu',
    role: 'Prez',
    image: 'https://media-exp1.licdn.com/dms/image/C5603AQHRYN-stxbGDA/profile-displayphoto-shrink_800_800/0/1661395610779?e=1669852800&v=beta&t=mdoPhuPya0h2b9C02o8tLBHk7hlEi8tVIVk8vAZvxKM',
  }
]

export default function ViewOrganisation() {
  return (
  <>
    <Navbar/>
    <div class="bg-[#13AEBD] rounded-xl p-10 m-10">
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Libro Private Limited</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the departments in the Libro including their name and supervisor.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add Department
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
                        Organisation Head
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Position
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Status
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {people.map((person) => (
                      <tr key={person.email}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img className="h-10 w-10 rounded-full" src={person.image} alt="" />
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">{person.name}</div>
                              <div className="text-gray-500">{person.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="text-gray-900">{person.position}</div>
                          <div className="text-gray-500">{person.department}</div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                            Active
                          </span>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <a href="https://www.google.com" className="text-indigo-600 hover:text-indigo-900">
                                Change<span className="sr-only">, {person.name}</span>
                            </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
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
                      Department Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Department Head
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Position
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {department.map((team, teamIdx) => (
                    <tr key={team.email} className={teamIdx % 2 === 0 ? undefined : 'bg-gray-50'}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {team.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{team.teamLeader}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{team.position}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a href="https://www.google.com" className="text-indigo-600 hover:text-indigo-900">
                          View<span className="sr-only">, {team.name}</span>
                        </a>
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