import { RadioGroup } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/20/solid";
import { compareAsc, format, isBefore, isToday, startOfToday } from "date-fns";
import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
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
    minQuota: [2, 2, 1, 0],
    remarks:
      "Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.",
  },
  {
    id: "2",
    shiftTitle: "Afternoon Shift",
    startTime: "14:00",
    endTime: "20:00",
    minQuota: [3, 3, 0, 1],
    remarks:
      "Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.",
  },
  {
    id: "3",
    shiftTitle: "Morning Shift",
    startTime: "06:00",
    endTime: "14:00",
    minQuota: [2, 2, 0, 0],
    remarks:
      "Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.",
  },
  {
    id: "4",
    shiftTitle: "Afternoon Shift",
    startTime: "14:00",
    endTime: "22:00",
    minQuota: [1, 3, 1, 0],
    remarks:
      "Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.",
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
  removeShiftHandler,
  shift,
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
      {shift && shift !== null ? (
        <div>
          <ShiftBlock
            shift={shift}
            className="m-auto mb-2 border-green-600 border-2"
            removeShiftHandler={removeShiftHandler}
          />
        </div>
      ) : (
        date &&
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
      )}
    </div>
  );
};

export default Cell;
