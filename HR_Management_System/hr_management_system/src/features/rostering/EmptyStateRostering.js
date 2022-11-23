import { CalendarDaysIcon, PlusIcon } from "@heroicons/react/20/solid";

export default function EmptyStateRostering() {
  return (
    <div className="flex flex-col items-center mt-20">
      <CalendarDaysIcon className="h-20 w-20" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">
        No roster selected
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Please select a team's roster using the combobox on the top-left corner.
      </p>
    </div>
  );
}
