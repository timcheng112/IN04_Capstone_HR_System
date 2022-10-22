import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import api from "../../utils/api";
import { getUserId } from "../../utils/Common";

export default function ModuleGrid({ files, currentPage }) {
  const history = useHistory();
  const [modules, setModules] = useState(files);

  useEffect(() => {
    setProgress(files);
  }, [files, modules]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setModules(files);
    }, 1000);
    return () => clearTimeout(timer);
  });

  function setProgress(moduleList) {
    moduleList.forEach((e) => {
      console.log("progress " + e.moduleId);
      api.getUserProgress(e.moduleId, getUserId()).then((response) => {
        e.progress = response.data;
        console.log("? " + e.progress);
      });
    });
    //setModules(moduleList);
  }

  const findProgress = (module) => {
    return module.progress;
  };

  return (
    modules && (
      <ul
        role="list"
        className="grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
      >
        {modules.map((file) => (
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
                <p className="font-sans pointer-events-none mt-2 block truncate text-sm font-medium text-gray-700">
                  {findProgress(file)}
                </p>
              </div>
            </button>
            {/* <p className="pointer-events-none block text-sm font-medium text-gray-500">
            {file.size}
          </p> */}
          </li>
        ))}
      </ul>
    )
  );
}
