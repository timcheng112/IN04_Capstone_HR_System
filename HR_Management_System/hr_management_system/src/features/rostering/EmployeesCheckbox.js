export default function EmployeesCheckbox({
  people,
  addSelectedEmployee,
  removeSelectedEmployee,
}) {
  return (
    <fieldset>
      <div className="divide-y divide-gray-200 border-b border-gray-200">
        {people.map((person, personIdx) => (
          <div key={personIdx} className="relative flex items-start py-2">
            <div className="min-w-0 flex-1 text-sm">
              <label
                htmlFor={`person-${person.id}`}
                className="select-none font-medium text-gray-700"
              >
                {person.firstName} {person.lastName}
              </label>
            </div>
            <div className="ml-3 flex h-5 items-center">
              <input
                id={`person-${person.id}`}
                name={`person-${person.id}`}
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                onChange={(e) => {
                  e.target.checked
                    ? addSelectedEmployee(person)
                    : removeSelectedEmployee(person);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </fieldset>
  );
}
