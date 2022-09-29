import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useHistory } from 'react-router'
import {
    DotsVerticalIcon,
    PencilIcon,
  } from '@heroicons/react/solid'
import { TrashIcon } from '@heroicons/react/outline'
import EditTaskModal from '../../features/Onboarding/EditTaskModal'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function TaskOptions({ user, categoryId, task, setTask }) {
  const history = useHistory()
  const [action, setAction] = useState("")
  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [error, setError] = useState(null);

  function deleteTask() {
    api.deleteTask(categoryId, task.id)
      .then(() => history.push(`/${categoryId}/tasks`))
  }

  function updateTask(task) {
    api.editTask(categoryId, task)
      .then((response) => setTask(response.data))
      .catch(error => setError(error))
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
                    onClick={() => setOpenEdit(true)}
                  >
                    <PencilIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span>Edit task</span>
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
                      onClick={() => {
                        setAction("delete")
                        setOpen(true)
                      }}
                    >
                      <TrashIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                      <span>Delete task</span>
                    </button>
                  )}
              </Menu.Item>  
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <ConfirmDialog
        title="task"
        open={open}
        setOpen={setOpen}
        action={action}
        onConfirm={deleteTask}
      />
      <EditTaskModal open={openEdit} setOpen={setOpenEdit} categoryId={categoryId} task={task} setTask={setTask} />
    </Fragment>
  )
}