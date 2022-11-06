import { RadioGroup } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/20/solid";
import {
  compareAsc,
  format,
  isAfter,
  isBefore,
  isToday,
  parseISO,
  startOfToday,
} from "date-fns";
import React, { useEffect, useState } from "react";
import api from "../../../utils/api";
import AddShiftModal from "../AddShiftModal";
import ChoiceModal from "../ChoiceModal";
import DeleteShiftModal from "../DeleteShiftModal";
import PublishSuccessModal from "../PublishSuccessModal";
import ShiftBlock from "../ShiftBlock";
import SuccessfullyAddedTemplateModal from "../SuccessfullyAddedTemplateModal";
import ViewCurrentShiftsModal from "../ViewCurrentShiftsModal";
import ViewTemplateShiftsModal from "../ViewTemplateShiftsModal";
import { Blocks } from "react-loader-spinner";

const Cell = ({
  className,
  date,
  children,
  changeWeekHandler,
  dateToday,
  person,
  addShiftHandler,
  removeShiftHandler,
  checkIfThereExistsShiftOnSameDay,
  shift,
  setInfoPanelDate,
  teamShift,
  refreshKey,
  openPublish,
  closePublish,
  rosterId,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [open, setOpen] = useState(false);
  const [openChoice, setOpenChoice] = useState(false);
  const [openTemplate, setOpenTemplate] = useState(false);
  const [openCurrent, setOpenCurrent] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [shiftListItem, setShiftListItem] = useState(null);
  const [isLoading, setIsLoading] = useState(shift ? false : true);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const onClickHandler = () => {
    if (date) {
      if (compareAsc(date, dateToday) === -1 && !isToday(date)) {
      }
    } else if (changeWeekHandler) {
      changeWeekHandler();
    } else if (setInfoPanelDate) {
      setInfoPanelDate();
    }
  };

  const getShiftListItemByUserId = () => {
    for (let i = 0; i < teamShift.shiftListItems.length; i++) {
      if (teamShift.shiftListItems[i].user.userId === person.userId) {
        return teamShift.shiftListItems[i];
      }
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (date !== undefined) {
      setShiftListItem(null);
      api
        .getShiftListItemByDateAndUserId(
          format(date, "yyyy-MM-dd"),
          person.userId
        )
        .then((response) => {
          console.log("Shift List Item found! " + response.data);
          let tempData = response.data;
          tempData.shift.startTime = parseISO(response.data.shift.startTime);
          tempData.shift.endTime = parseISO(response.data.shift.endTime);
          setShiftListItem(tempData);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          // console.log(error.response.data.message)
        });
    }
  }, [date, person, refreshKey, openDelete, openPublish, openSuccess]);

  const removeShiftAndShiftListItemHandler = (shiftListItem) => {
    api
      .deleteShiftListItem(shiftListItem.shiftListItemId)
      .then(() => {
        api
          .deleteShift(shiftListItem.shift.shiftId)
          .then(() => {
            alert("Successfully deleted!");
            setOpenDelete(false);
          })
          .catch((error) => alert(error.response.data.message));
      })
      .catch((error) => alert(error.response.data.message));
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
      {openPublish && (
        <PublishSuccessModal open={openPublish} onClose={closePublish} />
      )}
      {openSuccess && (
        <SuccessfullyAddedTemplateModal
          open={openSuccess}
          onClose={() => setOpenSuccess(false)}
        />
      )}
      <DeleteShiftModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        deleteShiftHandler={() =>
          removeShiftAndShiftListItemHandler(shiftListItem)
        }
      />
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
        assignCurrentShiftButtonHandler={() => {
          setOpenCurrent(true);
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
        checkIfThereExistsShiftOnSameDay={checkIfThereExistsShiftOnSameDay}
        rosterId={rosterId}
      />
      <ViewTemplateShiftsModal
        open={openTemplate}
        onClose={() => {
          setOpenTemplate(false);
        }}
        person={person}
        date={date}
        addShiftHandler={addShiftHandler}
        checkIfThereExistsShiftOnSameDay={checkIfThereExistsShiftOnSameDay}
        rosterId={rosterId}
      />
      <ViewCurrentShiftsModal
        open={openCurrent}
        onClose={() => {
          setOpenCurrent(false);
        }}
        person={person}
        date={date}
        addShiftHandler={addShiftHandler}
        checkIfThereExistsShiftOnSameDay={checkIfThereExistsShiftOnSameDay}
        rosterId={rosterId}
      />
      {children}
      {(shift && shift !== null) || shiftListItem !== null ? (
        <div>
          {shiftListItem !== null && (
            <ShiftBlock
              shift={shiftListItem.shift}
              shiftListItem={shiftListItem}
              className="m-auto mb-2"
              removeShiftHandler={() => setOpenDelete(true)}
              willBePersisted={true}
              openSuccess={() => setOpenSuccess(true)}
              person={person}
            />
          )}
          {shift && shift !== null && (
            <ShiftBlock
              shift={shift.shift}
              shiftListItem={shift}
              className="m-auto mb-2 border-green-600 border-2"
              removeShiftHandler={removeShiftHandler}
              willBePersisted={false}
              person={person}
            />
          )}
        </div>
      ) : !isLoading && date && isHovering && isAfter(date, startOfToday()) ? (
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
      ) : (
        date &&
        isLoading && (
          <Blocks
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
          />
        )
      )}
    </div>
  );
};

export default Cell;
