import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TemplateShiftRadioGroup({
  selected,
  setSelected,
  shifts,
}) {
  return (
    <RadioGroup value={selected} onChange={setSelected} className="p-2">
      <RadioGroup.Label className="sr-only"> Server size </RadioGroup.Label>
      <div className="space-y-4">
        {shifts.map((shift) => (
          <RadioGroup.Option
            key={shift.id}
            value={shift}
            className={({ checked, active }) =>
              classNames(
                checked
                  ? "border-indigo-500 ring-2 ring-indigo-500"
                  : "border-gray-300",
                active ? "border-indigo-500 ring-2 ring-indigo-500" : "",
                "relative block cursor-pointer rounded-lg border bg-white px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between"
              )
            }
          >
            {({ checked }) => (
              <>
                <span className="flex items-center">
                  <span className="flex flex-col text-sm">
                    <RadioGroup.Label
                      as="span"
                      className="font-medium text-gray-900"
                    >
                      {shift.shiftTitle}
                    </RadioGroup.Label>
                    <RadioGroup.Description as="span" className="text-gray-500">
                      {shift.startTime} - {shift.endTime}
                    </RadioGroup.Description>
                  </span>
                </span>
                <div className="flex items-center">
                  <CheckCircleIcon
                    className={classNames(
                      !checked ? "invisible" : "",
                      "h-6 w-6 text-indigo-600"
                    )}
                    aria-hidden="true"
                  />
                </div>
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}
