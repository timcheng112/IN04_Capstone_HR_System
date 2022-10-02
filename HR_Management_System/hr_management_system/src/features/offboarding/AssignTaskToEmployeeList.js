import React from "react";

export default function AssignTaskToEmployeeList({
  isAssigning,
  people,
  onClick,
}) {
  return (
    <div className="p-2 mr-1 pb-8">
      <div className="mt-6 flow-root">
        <ul role="list" className="-my-5 divide-y divide-gray-200">
          {people.map((person) => (
            <li key={person.handle} className="py-4">
              <div className="flex items-center space-x-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900">
                    {person.firstName + " " + person.lastName}
                  </p>
                  <p className="truncate text-sm text-gray-500">
                    {person.workEmail}
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => onClick(person)}
                    className="inline-flex items-center rounded-full border border-gray-300 bg-white px-2.5 py-0.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-gray-50"
                  >
                    {isAssigning ? "Assign" : "Remove"}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
