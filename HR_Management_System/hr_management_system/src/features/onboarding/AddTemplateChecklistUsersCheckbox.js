export default function AddTemplateChecklistUsersCheckbox({ user }) {
  return (
    <fieldset className="border-t border-b border-gray-200">
      {/* <legend className="sr-only">Notifications</legend> */}
      <div className="divide-y divide-gray-200">
        <div className="relative flex-col items-start py-4">
          <div className="relative flex items-start py-4">
            <div className="min-w-0 flex-1 text-sm">
              <label htmlFor="user-name" className="font-medium text-gray-700">
                {user.name}
              </label>
              <p id="user-email" className="text-gray-500">
                {user.email}
              </p>
              <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                {user.role}
              </span>
            </div>
            <div className="ml-3 flex h-5 items-center">
              <input
                id="user-name"
                aria-describedby="user-email"
                name="user"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>
    </fieldset>
  );
}
