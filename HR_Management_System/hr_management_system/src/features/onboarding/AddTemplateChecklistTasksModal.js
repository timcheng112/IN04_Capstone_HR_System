import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import React, { Fragment, useEffect, useState } from "react";
import api from "../../utils/api";
import AddTemplateChecklistTasksCheckbox from "./AddTemplateChecklistTasksCheckbox";
import AddTemplateChecklistUsersCheckbox from "./AddTemplateChecklistUsersCheckbox";
import AssignTaskToEmployeeList from "./AssignTaskToEmployeeList";

const AddTemplateChecklistTasksModal = ({
  open,
  onClose,
  categories,
  setSelectedTasks,
}) => {
  const [checkedState, setCheckedState] = useState(
    new Array(categories.length).fill({
      categoryChecked: false,
      tasksChecked: [],
    })
  );

  const resetInitialState = () => {
    setCheckedState(
      new Array(categories.length).fill({
        categoryChecked: false,
        tasksChecked: [],
      })
    );
  };

  useEffect(() => {
    setCheckedState(
      new Array(categories.length).fill({
        categoryChecked: false,
        tasksChecked: [],
      })
    );
    let tempCheckedState = checkedState;
    for (let i = 0; i < categories.length; i++) {
      tempCheckedState[i] = {
        ...tempCheckedState[i],
        tasksChecked: new Array(categories[i].tasks.length).fill(false),
      };
      // const tempCheckedState = checkedState.map((obj, index) => {
      //   if (index === i) {
      //     return {
      //       ...obj,
      //       tasksChecked: new Array(categories[i].tasks.length).fill(false),
      //     };
      //   }
      //   return obj;
      // });
      // setCheckedState(tempCheckedState);
    }
    setCheckedState(tempCheckedState);
    console.log(checkedState);
  }, [open]);

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((obj, index) => {
      if (position === index) {
        return {
          ...obj,
          categoryChecked: !obj.categoryChecked,
        };
      }
      return obj;
    });

    setCheckedState(updatedCheckedState);
    console.log(checkedState);
  };

  const handleTaskCheckboxOnChange = (position1, position2) => {
    const updatedCheckedState = checkedState.map((obj, index) => {
      if (position1 === index) {
        return {
          ...obj,
          tasksChecked: [
            ...obj.tasksChecked.slice(0, position2),
            !obj.tasksChecked[position2],
            ...obj.tasksChecked.slice(position2 + 1, obj.tasksChecked.length),
          ],
        };
      }
      return obj;
    });

    setCheckedState(updatedCheckedState);
    console.log(checkedState);
  };

  const handleSubmit = () => {
    const tempSelectedTasks = [];
    for (let i = 0; i < categories.length; i++) {
      if (checkedState[i].categoryChecked) {
        for (let j = 0; j < categories[i].tasks.length; j++) {
          const tempTask = {
            ...categories[i].tasks[j],
            category: categories[i],
          };
          tempSelectedTasks.push(tempTask);
        }
      } else {
        for (let j = 0; j < categories[i].tasks.length; j++) {
          if (checkedState[i].tasksChecked[j]) {
            const tempTask = {
              ...categories[i].tasks[j],
              category: categories[i],
            };
            tempSelectedTasks.push(tempTask);
          }
        }
      }
    }
    setSelectedTasks(tempSelectedTasks);
    console.log(tempSelectedTasks);
    onClose();
    resetInitialState();
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          onClose();
          resetInitialState();
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="flex-col w-full h-96 overflow-y-scroll px-6">
                  {categories !== undefined &&
                    categories.map((category, index1) => (
                      <div key={index1}>
                        {category.tasks.length > 0 && (
                          <div className="relative flex items-start py-4">
                            <div className="min-w-0 flex-1 text-sm">
                              <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                                {category.name}
                              </span>
                            </div>
                            <div className="ml-3 flex h-5 items-center">
                              <input
                                id="category-name"
                                name="category"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                checked={checkedState[index1].categoryChecked}
                                // onClick={(e) => {
                                //   let newArr = [...checked];
                                //   newArr[index] = e.target.checked;
                                //   setChecked(newArr);
                                //   console.log(checked[index]);
                                // }}
                                onChange={() => handleOnChange(index1)}
                              />
                            </div>
                          </div>
                        )}
                        {!checkedState[index1].categoryChecked &&
                          category.tasks.map((task, index2) => (
                            <div key={index2}>
                              <AddTemplateChecklistTasksCheckbox
                                task={task}
                                checked={
                                  checkedState[index1].tasksChecked[index2]
                                }
                                onChangeHandler={() =>
                                  handleTaskCheckboxOnChange(index1, index2)
                                }
                              />
                            </div>
                          ))}
                      </div>
                    ))}
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                    onClick={handleSubmit}
                  >
                    Confirm
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                    onClick={() => {
                      onClose();
                      resetInitialState();
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default AddTemplateChecklistTasksModal;
