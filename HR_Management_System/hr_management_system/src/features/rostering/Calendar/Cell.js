import { PlusIcon } from "@heroicons/react/20/solid";
import { compareAsc, format, isBefore, isToday, startOfToday } from "date-fns";
import React, { useState } from "react";
import AddShiftModal from "../AddShiftModal";
import ChoiceModal from "../ChoiceModal";
import ShiftBlock from "../ShiftBlock";
import ViewTemplateShiftsModal from "../ViewTemplateShiftsModal";

const shifts = [
  {
    id: "1",
    shiftTitle: "Morning Shift",
    startTime: "08:00",
    endTime: "14:00",
  },
  {
    id: "2",
    shiftTitle: "Afternoon Shift",
    startTime: "14:00",
    endTime: "20:00",
  },
  {
    id: "3",
    shiftTitle: "Morning Shift",
    startTime: "06:00",
    endTime: "14:00",
  },
  {
    id: "4",
    shiftTitle: "Afternoon Shift",
    startTime: "14:00",
    endTime: "22:00",
  },
];

const Cell = ({
  className,
  date,
  children,
  changeWeekHandler,
  dateToday,
  person,
  addShiftHandler,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [open, setOpen] = useState(false);
  const [openChoice, setOpenChoice] = useState(false);
  const [openTemplate, setOpenTemplate] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const onClickHandler = () => {
    if (date) {
      console.log(date);
      if (compareAsc(date, dateToday) === -1 && !isToday(date)) {
        console.log(date);
        console.log(dateToday);
        console.log("date has passed");
      }
    } else if (changeWeekHandler) {
      changeWeekHandler();
    }
  };
  return (
    <div
      className={
        "h-12 flex items-center justify-center border-b border-r " +
        className +
        (compareAsc(date, dateToday) === -1 && !isToday(date)
          ? " bg-gray-100"
          : " bg-white") +
        (isToday(date) ? " bg-sky-100" : "")
      }
      onClick={onClickHandler}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <ChoiceModal
        open={openChoice}
        onClose={() => {
          setOpenChoice(false);
        }}
        closeButtonHandler={() => {
          setIsHovering(false);
        }}
        assignNewShiftButtonHandler={() => {
          setOpen(true);
        }}
        assignTemplateShiftButtonHandler={() => {
          setOpenTemplate(true);
        }}
      />
      <AddShiftModal
        open={open}
        onClose={() => {
          setOpen(false);
          setIsHovering(false);
        }}
        person={person}
        date={date}
        addShiftHandler={addShiftHandler}
      />
      <ViewTemplateShiftsModal
        open={openTemplate}
        onClose={() => {
          setOpenTemplate(false);
        }}
        person={person}
        date={date}
        addShiftHandler={addShiftHandler}
      />
      {children}
      {date
        ? // <div>
          //   <ShiftBlock shift={shifts[0]} className="w-full m-auto mb-2" />
          // </div>
          isHovering &&
          !isBefore(date, startOfToday()) && (
            <div className="text-center">
              <p className="mt-1 text-sm text-gray-500">
                Get started by assigning a shift.
              </p>
              <div className="mt-6">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={() => setOpenChoice(true)}
                >
                  <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  Assign Shift
                </button>
              </div>
            </div>
          )
        : console.log()}
    </div>
  );
};

export default Cell;
