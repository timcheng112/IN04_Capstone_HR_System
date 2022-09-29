import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useHistory } from 'react-router'
import {
    DotsVerticalIcon,
    PencilIcon,
  } from '@heroicons/react/solid'
import { PlusIcon } from '@heroicons/react/20/solid'
import { TrashIcon } from '@heroicons/react/outline'
import ConfirmDialog from '../../components/ConfirmDialog'
import AddTaskModal from '../../features/Onboarding/AddTaskModal'
import EditCategoryModal from '../../features/Onboarding/EditCategoryModal'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function CategoryOptions({ user, category, setCategory }) {
  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openCreate, setOpenCreate] = useState(false)
  const [error, setError] = useState(null);

  function deleteCategory() {

  }

  return (
    <Fragment>
      <Menu as="div" className="ml-3 relative inline-block text-left z-50">
        <div>
          <Menu.Button className="-my-2 p-2 rounded-full bg-white flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-rose-500">
            <span className="sr-only">Open options</span>
            <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
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
          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'w-full flex justify-right px-4 py-2 text-sm'
                    )}
                    onClick={() => setOpenCreate(true)}
                  >
                    <PlusIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span>Add task</span>
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'w-full flex justify-right px-4 py-2 text-sm'
                    )}
                    onClick={() => setOpenEdit(true)}
                  >
                    <PencilIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span>Edit category</span>
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                  {({ active }) => (
                    <button
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'w-full flex justify-right px-4 py-2 text-sm'
                      )}
                      onClick={() => setOpen(true)}
                    >
                      <TrashIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                      <span>Delete categpry</span>
                    </button>
                  )}
              </Menu.Item>  
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <ConfirmDialog
        title="category"
        open={open}
        setOpen={setOpen}
        item={category}
        onConfirm={deleteCategory}
      />
      <EditCategoryModal open={openEdit} setOpen={setOpenEdit} category={category} setCategory={setCategory} />
      <AddTaskModal open={openCreate} setOpen={setOpenCreate} category={category} setCategory={setCategory} />
    </Fragment>
  )
}