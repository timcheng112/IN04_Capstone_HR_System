export default function ByRolesCheckbox({ role, handleOnChange, checked }) {
  return (
    <fieldset className="border-t border-b border-gray-200">
      {/* <legend className="sr-only">Notifications</legend> */}
      <div className="divide-y divide-gray-200">
        <div className="relative flex-col items-start py-4">
          <div className="relative flex items-start py-4">
            <div className="min-w-0 flex-1 text-sm">
              <label htmlFor="role-name" className="font-medium text-gray-700">
                {role.roleName}
              </label>
            </div>
            <div className="ml-3 flex h-5 items-center">
              <input
                id="role-name"
                name="role"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                onChange={handleOnChange}
                checked={checked}
              />
            </div>
          </div>
        </div>
      </div>
    </fieldset>
  );
}
