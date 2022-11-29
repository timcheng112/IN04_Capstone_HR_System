import {
  EllipsisVerticalIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { format, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import EditShiftModal from "./EditShiftModal";
import ViewShiftModal from "./ViewShiftModal";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ShiftBlock = ({
  shift,
  shiftListItem,
  className,
  removeShiftHandler,
  removeShiftListItemHandler,
  refreshKeyHandler,
  willBePersisted,
  openSuccess,
  person,
  isUserHrOrManager,
}) => {
  console.log(shift.startTime);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const shiftTitleArray = shift.shiftTitle.split(" ");
  const [isDesktop, setDesktop] = useState(window.innerWidth >= 1280);

  const updateMedia = () => {
    setDesktop(window.innerWidth >= 1280);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  const deleteShiftHandler = () => {
    if (removeShiftListItemHandler !== undefined) {
      if (shiftListItem.userId.length > 1) {
        removeShiftListItemHandler(shiftListItem, person.userId);
      } else {
        removeShiftHandler(shift);
      }
    } else {
      removeShiftHandler();
    }
  };

  return (
    <div
      className={
        "col-span-1 flex rounded-md shadow-md h-44 w-16 sm:h-40 md:h-36 lg:h-32 xl:h-28 2xl:h-24 sm:w-20 md:w-24 lg:w-28 xl:w-32 2xl:w-44 " +
        className
      }
    >
      <ViewShiftModal
        open={open}
        onClose={() => setOpen(false)}
        shift={shift}
        shiftListItem={shiftListItem}
        person={person}
      />
      <EditShiftModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        shift={shift}
        shiftListItem={shiftListItem}
        refreshKeyHandler={refreshKeyHandler}
        willBePersisted={willBePersisted}
        openSuccess={openSuccess}
      />
      <div className="flex-shrink-0 flex items-center justify-center w-2 text-white text-sm font-medium rounded-l-md bg-cyan-600" />
      <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-t border-r border-b border-gray-200 bg-white">
        <div
          className="flex-1 truncate px-2 text-sm hover:bg-gray-100 text-left"
          onClick={() => setOpen(true)}
        >
          {isDesktop && (
            <p
              href="#"
              className="font-medium text-gray-900 hover:text-gray-600"
            >
              {shift.shiftTitle}
            </p>
          )}
          {!isDesktop &&
            shiftTitleArray.map((word) => (
              <p className="font-medium text-gray-900 hover:text-gray-600">
                {word}
              </p>
            ))}
          {isDesktop && (
            <p className="text-gray-500 text-xs">
              {format(shift.startTime, "HH:mm")} -{" "}
              {format(shift.endTime, "HH:mm")}
            </p>
          )}
          {!isDesktop && (
            <p className="text-gray-500 text-xs">
              {format(shift.startTime, "HH:mm")} -<br />
              {format(shift.endTime, "HH:mm")}
            </p>
          )}
        </div>
        {isUserHrOrManager && (
          <div className="flex flex-col">
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white bg-transparent text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={() => setOpenEdit(true)}
            >
              <PencilSquareIcon className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white bg-transparent text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={() => deleteShiftHandler()}
            >
              <TrashIcon className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShiftBlock;
