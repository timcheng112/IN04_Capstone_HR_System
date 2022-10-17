import { useHistory } from "react-router";

export default function AllModuleGrid({ files, currentPage }) {
  const history = useHistory();

  return (
    files && (
      <ul
        role="list"
        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-6 xl:gap-x-8"
      >
        {files.map((file) => (
          <li key={file.title} className="relative">
            <button
              onClick={() =>
                history.push(`/module/${file.moduleId}`, {
                  params: currentPage,
                })
              }
            >
              <div className="bg-white py-6 px-4 shadow sm:rounded-lg sm:px-10 group block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 hover:opacity-75">
                <img
                  src={file.thumbnail}
                  alt="Module Thumbnail"
                  className="pointer-events-none h-25 w-15 object-contain"
                />
                <h2 className="font-sans text-lg pointer-events-none mt-2 block truncate text-sm font-bold text-gray-900">
                  {file.title}
                </h2>
              </div>
            </button>
          </li>
        ))}
      </ul>
    )
  );
}
