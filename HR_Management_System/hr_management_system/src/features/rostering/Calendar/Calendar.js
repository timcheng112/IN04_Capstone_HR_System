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
  checkIfThereExistsShiftOnSameDay,
  people,
  shiftsToBeAdded,
  setInfoPanelDate,
  teamShifts,
  refreshKey,
  openPublish,
  closePublish,
  rosterId,
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
        isSameDay(shiftsToBeAdded[i].shift.startTime, weekArr[dayIndex])
      ) {
        return shiftsToBeAdded[i];
      }
    }
    return null;
  };

  const teamShiftHandler = (person, dayIndex) => {
    for (let i = 0; i < teamShifts.length; i++) {
      for (let j = 0; j < teamShifts[i].shiftListItems.length; j++) {
        if (
          teamShifts[i].shiftListItems[j].userId === person.userId &&
          isSameDay(teamShifts[i].shift.startTime, weekArr[dayIndex])
        ) {
          return teamShifts[i];
        }
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
        <Cell
          setInfoPanelDate={() => setInfoPanelDate(weekArr[0])}
          className="hover:bg-sky-200"
        >
          {daysOfWeek[0]} ({format(weekArr[0], "dd/LL")})
        </Cell>
        <Cell
          setInfoPanelDate={() => setInfoPanelDate(weekArr[1])}
          className="hover:bg-sky-200"
        >
          {daysOfWeek[1]} ({format(weekArr[1], "dd/LL")})
        </Cell>
        <Cell
          setInfoPanelDate={() => setInfoPanelDate(weekArr[2])}
          className="hover:bg-sky-200"
        >
          {daysOfWeek[2]} ({format(weekArr[2], "dd/LL")})
        </Cell>
        <Cell
          setInfoPanelDate={() => setInfoPanelDate(weekArr[3])}
          className="hover:bg-sky-200"
        >
          {daysOfWeek[3]} ({format(weekArr[3], "dd/LL")})
        </Cell>
        <Cell
          setInfoPanelDate={() => setInfoPanelDate(weekArr[4])}
          className="hover:bg-sky-200"
        >
          {daysOfWeek[4]} ({format(weekArr[4], "dd/LL")})
        </Cell>
        <Cell
          setInfoPanelDate={() => setInfoPanelDate(weekArr[5])}
          className="hover:bg-sky-200"
        >
          {daysOfWeek[5]} ({format(weekArr[5], "dd/LL")})
        </Cell>
        <Cell
          setInfoPanelDate={() => setInfoPanelDate(weekArr[6])}
          className="hover:bg-sky-200"
        >
          {daysOfWeek[6]} ({format(weekArr[6], "dd/LL")})
        </Cell>
        {people.map((person) => (
          <>
            <Cell className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6 h-32">
              {person.firstName} {person.lastName}
            </Cell>
            <Cell
              date={weekArr[0]}
              dateToday={value}
              className="h-32"
              person={person}
              addShiftHandler={addShiftHandler}
              removeShiftHandler={removeShiftHandler}
              checkIfThereExistsShiftOnSameDay={
                checkIfThereExistsShiftOnSameDay
              }
              shift={shiftHandler(person, 0)}
              // teamShift={teamShiftHandler(person, 0)}
              refreshKey={refreshKey}
              openPublish={openPublish}
              closePublish={closePublish}
              rosterId={rosterId}
            />
            <Cell
              date={weekArr[1]}
              dateToday={value}
              className="h-32"
              person={person}
              addShiftHandler={addShiftHandler}
              removeShiftHandler={removeShiftHandler}
              checkIfThereExistsShiftOnSameDay={
                checkIfThereExistsShiftOnSameDay
              }
              shift={shiftHandler(person, 1)}
              // teamShift={teamShiftHandler(person, 1)}
              refreshKey={refreshKey}
              openPublish={openPublish}
              closePublish={closePublish}
              rosterId={rosterId}
            />
            <Cell
              date={weekArr[2]}
              dateToday={value}
              className="h-32"
              person={person}
              addShiftHandler={addShiftHandler}
              removeShiftHandler={removeShiftHandler}
              checkIfThereExistsShiftOnSameDay={
                checkIfThereExistsShiftOnSameDay
              }
              shift={shiftHandler(person, 2)}
              // // teamShift={teamShiftHandler(person, 2)}
              refreshKey={refreshKey}
              openPublish={openPublish}
              closePublish={closePublish}
              rosterId={rosterId}
            />
            <Cell
              date={weekArr[3]}
              dateToday={value}
              className="h-32"
              person={person}
              addShiftHandler={addShiftHandler}
              removeShiftHandler={removeShiftHandler}
              checkIfThereExistsShiftOnSameDay={
                checkIfThereExistsShiftOnSameDay
              }
              shift={shiftHandler(person, 3)}
              // // teamShift={teamShiftHandler(person, 3)}
              refreshKey={refreshKey}
              openPublish={openPublish}
              closePublish={closePublish}
              rosterId={rosterId}
            />
            <Cell
              date={weekArr[4]}
              dateToday={value}
              className="h-32"
              person={person}
              addShiftHandler={addShiftHandler}
              removeShiftHandler={removeShiftHandler}
              checkIfThereExistsShiftOnSameDay={
                checkIfThereExistsShiftOnSameDay
              }
              shift={shiftHandler(person, 4)}
              // // teamShift={teamShiftHandler(person, 4)}
              refreshKey={refreshKey}
              openPublish={openPublish}
              closePublish={closePublish}
              rosterId={rosterId}
            />
            <Cell
              date={weekArr[5]}
              dateToday={value}
              className="h-32"
              person={person}
              addShiftHandler={addShiftHandler}
              removeShiftHandler={removeShiftHandler}
              checkIfThereExistsShiftOnSameDay={
                checkIfThereExistsShiftOnSameDay
              }
              shift={shiftHandler(person, 5)}
              // // teamShift={teamShiftHandler(person, 5)}
              refreshKey={refreshKey}
              openPublish={openPublish}
              closePublish={closePublish}
              rosterId={rosterId}
            />
            <Cell
              date={weekArr[6]}
              dateToday={value}
              className="h-32"
              person={person}
              addShiftHandler={addShiftHandler}
              removeShiftHandler={removeShiftHandler}
              checkIfThereExistsShiftOnSameDay={
                checkIfThereExistsShiftOnSameDay
              }
              shift={shiftHandler(person, 6)}
              // // teamShift={teamShiftHandler(person, 6)}
              refreshKey={refreshKey}
              openPublish={openPublish}
              closePublish={closePublish}
              rosterId={rosterId}
            />
          </>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
