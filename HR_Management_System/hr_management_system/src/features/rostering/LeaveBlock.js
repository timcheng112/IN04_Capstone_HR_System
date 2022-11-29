import React, { useEffect, useState } from "react";

const LeaveBlock = ({ leave }) => {
  const [isDesktop, setDesktop] = useState(window.innerWidth >= 1280);

  const updateMedia = () => {
    setDesktop(window.innerWidth >= 1280);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  return (
    <div
      className={
        "col-span-1 flex rounded-md shadow-md h-44 w-16 sm:h-40 md:h-36 lg:h-32 xl:h-28 2xl:h-24 sm:w-20 md:w-24 lg:w-28 xl:w-32 2xl:w-44"
      }
    >
      <div className="flex-shrink-0 flex items-center justify-center w-2 text-white text-sm font-medium rounded-l-md bg-pink-600" />
      <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-t border-r border-b border-gray-200 bg-white">
        <div
          className="flex-1 truncate px-2 text-sm hover:bg-gray-100 text-left"
          //   onClick={() => setOpen(true)}
        >
          <p href="#" className="font-medium text-gray-900 hover:text-gray-600">
            Leave
          </p>
          <p href="#" className="text-gray-500 text-xs">
            {leave.leaveType}
          </p>
          <p href="#" className="text-gray-500 text-xs">
            {leave.status}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeaveBlock;
