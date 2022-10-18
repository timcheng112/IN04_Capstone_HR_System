import React, { useState } from "react";
import {
  eachDayOfInterval,
  format,
  isSameDay,
  nextMonday,
  nextSunday,
  previousMonday,
  startOfWeek,
} from "date-fns";
import Cell from "./Cell";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const Calendar = ({
  value = new Date(),
  addShiftHandler,
  removeShiftHandler,
  people,
  shiftsToBeAdded,
}) => {
  const [startWeek, setStartWeek] = useState(
    startOfWeek(value, { weekStartsOn: 1 })
  );
  const weekArr = eachDayOfInterval({
    start: startWeek,
    end: nextSunday(startWeek),
  });

  const shiftHandler = (person, dayIndex) => {
    for (let i = 0; i < shiftsToBeAdded.length; i++) {
      if (
        shiftsToBeAdded[i].userId === person.userId &&
        isSameDay(shiftsToBeAdded[i].shift.startDate, weekArr[dayIndex])
      ) {
        return shiftsToBeAdded[i];
      }
    }
    return null;
  };

  return (
    <div className="mt-2 mb-4 border-t border-l">
      <div className="grid grid-cols-8 items-center justify-center text-center">
        <Cell
          className="col-span-2 bg-sky-500 hover:bg-sky-700 text-white"
          changeWeekHandler={() => setStartWeek(previousMonday(startWeek))}
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </Cell>
        <Cell className="col-span-4 font-bold px-4 py-3.5 text-xl bg-sky-500 text-white">
          {format(startWeek, "dd LLL yyyy")} -{" "}
          {format(nextSunday(startWeek), "dd LLL yyyy")}
        </Cell>
        <Cell
          className="col-span-2 bg-sky-500 hover:bg-sky-700 text-white"
          changeWeekHandler={() => setStartWeek(nextMonday(startWeek))}
        >
          <ChevronRightIcon className="h-5 w-5" />
        </Cell>
        <Cell className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">
          Employee
        </Cell>
        <Cell>
          {daysOfWeek[0]} ({format(weekArr[0], "dd/LL")})
        </Cell>
        <Cell>
          {daysOfWeek[1]} ({format(weekArr[1], "dd/LL")})
        </Cell>
        <Cell>
          {daysOfWeek[2]} ({format(weekArr[2], "dd/LL")})
        </Cell>
        <Cell>
          {daysOfWeek[3]} ({format(weekArr[3], "dd/LL")})
        </Cell>
        <Cell>
          {daysOfWeek[4]} ({format(weekArr[4], "dd/LL")})
        </Cell>
        <Cell>
          {daysOfWeek[5]} ({format(weekArr[5], "dd/LL")})
        </Cell>
        <Cell>
          {daysOfWeek[6]} ({format(weekArr[6], "dd/LL")})
        </Cell>
        {people.map((person) => (
          <>
            <Cell className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6 h-32">
              {person.name}
            </Cell>
            <Cell
              date={weekArr[0]}
              dateToday={value}
              className="h-32"
              person={person}
              addShiftHandler={addShiftHandler}
              removeShiftHandler={removeShiftHandler}
              shift={shiftHandler(person, 0)}
            />
            <Cell
              date={weekArr[1]}
              dateToday={value}
              className="h-32"
              person={person}
              addShiftHandler={addShiftHandler}
              removeShiftHandler={removeShiftHandler}
              shift={shiftHandler(person, 1)}
            />
            <Cell
              date={weekArr[2]}
              dateToday={value}
              className="h-32"
              person={person}
              addShiftHandler={addShiftHandler}
              removeShiftHandler={removeShiftHandler}
              shift={shiftHandler(person, 2)}
            />
            <Cell
              date={weekArr[3]}
              dateToday={value}
              className="h-32"
              person={person}
              addShiftHandler={addShiftHandler}
              removeShiftHandler={removeShiftHandler}
              shift={shiftHandler(person, 3)}
            />
            <Cell
              date={weekArr[4]}
              dateToday={value}
              className="h-32"
              person={person}
              addShiftHandler={addShiftHandler}
              removeShiftHandler={removeShiftHandler}
              shift={shiftHandler(person, 4)}
            />
            <Cell
              date={weekArr[5]}
              dateToday={value}
              className="h-32"
              person={person}
              addShiftHandler={addShiftHandler}
              removeShiftHandler={removeShiftHandler}
              shift={shiftHandler(person, 5)}
            />
            <Cell
              date={weekArr[6]}
              dateToday={value}
              className="h-32"
              person={person}
              addShiftHandler={addShiftHandler}
              removeShiftHandler={removeShiftHandler}
              shift={shiftHandler(person, 6)}
            />
          </>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
