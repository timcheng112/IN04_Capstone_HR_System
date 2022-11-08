import { ArchiveBoxXMarkIcon } from "@heroicons/react/20/solid";
import EmptyStateAdd from "./EmptyStateAdd";

// const people = [
//   {
//     name: "Jane Cooper",
//     title: "Regional Paradigm Technician",
//     role: "Admin",
//     email: "janecooper@example.com",
//     telephone: "+1-202-555-0170",
//     imageUrl:
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
//   },
//   // More people...
// ];

export default function UserGridList({
  onOpen,
  selectedUsers,
  removeUserHandler,
}) {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 w-3/4"
    >
      {selectedUsers.map((person) => (
        <li
          key={person.email}
          className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
        >
          <div className="flex flex-1 flex-col p-8">
            {/* <img
              className="mx-auto h-14 w-14 flex-shrink-0 rounded-full"
              src={person.imageUrl}
              alt=""
            /> */}
            <div className="mx-auto h-14 w-14 flex-shrink-0 rounded-full border flex items-center justify-center">
              <span>
                {person.firstName[0]}
                {person.lastName[0]}
              </span>
            </div>
            <h3 className="mt-6 text-sm font-medium text-gray-900">
              {person.firstName} {person.lastName}
            </h3>
            <dl className="mt-1 flex flex-grow flex-col justify-between">
              <dt className="sr-only">Email</dt>
              <dd className="text-sm text-gray-500">{person.email}</dd>
              <dt className="sr-only">Role</dt>
              <dd className="mt-3">
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                  {person.userRole}
                </span>
              </dd>
            </dl>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                <button
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                  onClick={() => removeUserHandler(person)}
                >
                  <ArchiveBoxXMarkIcon className="h-5 w-5" />
                  <span className="ml-3">Remove</span>
                </button>
              </div>
            </div>
          </div>
        </li>
      ))}
      <li className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg text-center shadow">
        <EmptyStateAdd onOpen={onOpen} itemName="User" />
      </li>
    </ul>
  );
}
