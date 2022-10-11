import { useHistory } from "react-router";

export default function ModuleGrid({ files }) {
  
  const history = useHistory()

  return (
    <ul
      role="list"
      className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-6 xl:gap-x-8"
    >
      {files.map((file) => (
        <li key={file.title} className="relative">
          <button onClick={() => history.push(`traininghr/module/${file.moduleId}`)}>
          <div className="bg-white py-6 px-4 shadow sm:rounded-lg sm:px-10 group block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 hover:opacity-75">
            <img
              src={file.thumbnail}
              alt="Module Thumbnail"
              className="pointer-events-none h-25 w-15 object-contain"
            />
            {/* <button
              type="button"
              className="absolute inset-0 focus:outline-none"
            >
              <span className="sr-only">View details for {file.title}</span>
            </button> */}
            <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
              {file.title}
            </p>
          </div>
          </button>
          {/* <p className="pointer-events-none block text-sm font-medium text-gray-500">
            {file.size}
          </p> */}
        </li>
      ))}
    </ul>
  );
}
