import { format, parseISO } from "date-fns";
import React, { useState } from "react";

const AddShiftForm = ({
  setShiftTitle,
  setStartTime,
  setEndTime,
  setSalesmanQuota,
  setCashierQuota,
  setStoremanagerQuota,
  setShiftRemarks,
  shift,
}) => {
  return (
    <div className="space-y-6 sm:space-y-5">
      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
        <label
          htmlFor="shift-title"
          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          Shift Title
        </label>
        <div className="mt-1 sm:col-span-2 sm:mt-0">
          <input
            type="text"
            name="shift-title"
            id="shift-title"
            className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
            onChange={(e) => setShiftTitle(e.target.value)}
            placeholder={shift && shift.shiftTitle}
            defaultValue={shift && shift.shiftTitle}
          />
        </div>
      </div>

      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
        <label
          htmlFor="start-time"
          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          Start Time
        </label>
        <div className="mt-1 sm:col-span-2 sm:mt-0">
          <input
            type="time"
            name="start-time"
            id="start-time"
            className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
            onChange={(e) => {
              setStartTime(e.target.value);
            }}
            value={shift && format(parseISO(shift.startTime), "HH:mm")}
          />
        </div>
      </div>
      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
        <label
          htmlFor="end-time"
          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          End Time
        </label>
        <div className="mt-1 sm:col-span-2 sm:mt-0">
          <input
            type="time"
            name="end-time"
            id="end-time"
            className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
            onChange={(e) => {
              setEndTime(e.target.value);
            }}
            value={shift && format(parseISO(shift.endTime), "HH:mm")}
          />
        </div>
      </div>
      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
        <label
          htmlFor="salesman-quota"
          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 sm:col-span-2"
        >
          Salesman Quota
        </label>
        <div className="mt-1 sm:mt-0">
          <select
            id="salesman-quota"
            name="salesman-quota"
            className="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            onChange={(e) => setSalesmanQuota(e.target.value)}
            value={shift && shift.minQuota[0]}
          >
            <option value=""></option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
          </select>
        </div>
        <label
          htmlFor="cashier-quota"
          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 sm:col-span-2"
        >
          Cashier Quota
        </label>
        <div className="mt-1 sm:mt-0">
          <select
            id="cashier-quota"
            name="cashier-quota"
            className="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            onChange={(e) => setCashierQuota(e.target.value)}
            value={shift && shift.minQuota[1]}
          >
            <option value=""></option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
          </select>
        </div>
        <label
          htmlFor="storemanager-quota"
          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 sm:col-span-2"
        >
          Store Manager Quota
        </label>
        <div className="mt-1 sm:mt-0">
          <select
            id="storemanager-quota"
            name="storemanager-quota"
            className="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            onChange={(e) => setStoremanagerQuota(e.target.value)}
            value={shift && shift.minQuota[2]}
          >
            <option value=""></option>
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
          </select>
        </div>
      </div>
      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
        <label
          htmlFor="shift-remarks"
          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          Shift Remarks
        </label>
        <div className="mt-1 sm:col-span-2 sm:mt-0">
          <textarea
            type="textarea"
            name="shift-remarks"
            id="shift-remarks"
            className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
            onChange={(e) => setShiftRemarks(e.target.value)}
            value={shift && shift.remarks}
          />
        </div>
      </div>
    </div>
  );
};

export default AddShiftForm;
