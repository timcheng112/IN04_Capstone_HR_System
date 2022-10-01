import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment, useState } from "react";
import ConfirmDialog from "../../components/ConfirmDialog";
import AddTaskModal from "../../features/onboarding/AddTaskModal";
import EditCategoryModal from "../../features/onboarding/EditCategoryModal";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CategoryOptions({ user, category, setCategory }) {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [error, setError] = useState(null);

  function deleteCategory() {
    console.log("Delete Category");
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          Options
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm w-full text-left"
                  )}
                  onClick={() => setOpenAdd(true)}
                >
                  Add Task
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm w-full text-left"
                  )}
                  onClick={() => setOpenEdit(true)}
                >
                  Edit Category
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm w-full text-left"
                  )}
                  onClick={() => setOpenDelete(true)}
                >
                  Delete Category
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
      <AddTaskModal
        open={openAdd}
        onClose={() => {
          setOpenAdd(false);
        }}
        categoryName={category.name}
      />
      <EditCategoryModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        categoryName={"Category 1"}
        // category={category}
        // setCategory={setCategory}
      />
      {/* <ConfirmDialog
        title="category"
        item="category"
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        // onConfirm={deleteCategory}
      /> */}
    </Menu>
  );
}
