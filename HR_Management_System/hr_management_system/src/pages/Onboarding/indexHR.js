/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import TaskOptions from './TaskOption';
import CategoryOptions from './CategoryOption';
import AddCategoryModal from '../../features/Onboarding/AddCategoryModal'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Onboarding() {
    const [user, setUser] = useState(null)
    const [categories, setCategories] = useState(null)
    const [openCreate, setOpenCreate] = useState(false)
    //const [tasks, setTasks] = useState(null)

    useEffect(() => {
        api.getUser()
            .then(response => setUser(response.data))
            .catch((error) => (
                setError(error)
            ))
    }, [])

    useEffect(() => {
        api.getCategories()
            .then(response => setCategories(response.data))
            .catch((error) => (
                setError(error)
            ))
    }, [])

    return (
        (user && category) &&
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Onboarding</h1>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                        onClick={() => setOpenCreate(true)}
                    >
                        New Category
                    </button>
                </div>
            </div>
            <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full">
                                <thead className="bg-white">
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                            Name
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Description
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Options
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {categories.map((category) => (
                                        <Fragment key={category.name}>
                                            <tr className="border-t border-gray-200">
                                                <th
                                                    colSpan={5}
                                                    scope="colgroup"
                                                    className="bg-gray-50 px-4 py-2 text-left text-sm font-semibold text-gray-900 sm:px-6"
                                                >
                                                    {category.name}
                                                </th>
                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                        < CategoryOptions
                                                           category = {category}
                                                           setCategory = {setCategory}
                                                        />
                                                </td>
                                            </tr>
                                            {category.tasks.map((task, taskIdx) => (
                                                <tr
                                                    key={task.name}
                                                    className={classNames(taskIdx === 0 ? 'border-gray-300' : 'border-gray-200', 'border-t')}
                                                >
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                        {task.name}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{task.description}</td>
                                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                        < TaskOptions
                                                           categoryId = {category.id}
                                                           task = {task}
                                                           setTask = {setTask}
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                        </Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <AddCategoryModal open={openCreate} setOpen={setOpenCreate} category={category} setCategory={setCategory} />
        </div>
    )
}
