import { useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ComboBox({
  items,
  searchParam,
  selectedItem,
  setSelectedItem,
  placeholder,
  disabled,
}) {
  const [query, setQuery] = useState("");

  const filteredItem =
    query === ""
      ? items
      : items.filter((item) => {
          return (
            item[searchParam]
              .toString()
              .toLowerCase()
              .indexOf(query.toLowerCase()) > -1
          );
        });

  return (
    <Combobox
      as="div"
      value={selectedItem}
      onChange={setSelectedItem}
      disabled={disabled}
    >
      <div className="relative">
        <Combobox.Input
          className={classNames("w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm", disabled && "bg-gray-200")}
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(item) => (item !== null ? item[searchParam] : null)}
          placeholder={placeholder}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          {selectedItem && (
            <XMarkIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
              onClick={() => setSelectedItem(null)}
            />
          )}
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>

        {filteredItem !== undefined && filteredItem.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredItem.map((item) => (
              <Combobox.Option
                key={item.id}
                value={item}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-indigo-600 text-white" : "text-gray-900"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={classNames(
                        "block truncate",
                        selected && "font-semibold"
                      )}
                    >
                      {item[searchParam]}
                    </span>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-indigo-600"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
