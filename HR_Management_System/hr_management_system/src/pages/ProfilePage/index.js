import { useState } from "react";
import Navbar from '../../components/Navbar.js';
//import SideProfile from './sideprofile.js'
import { CalendarIcon, ChartBarIcon, FolderIcon, HomeIcon, InboxIcon } from '@heroicons/react/24/outline'
import { PaperClipIcon } from '@heroicons/react/20/solid'

import {
    AcademicCapIcon,
    BanknotesIcon,
    CheckBadgeIcon,
    ClockIcon,
    ReceiptRefundIcon,
    UsersIcon,
} from '@heroicons/react/24/outline'
const actions1 = [
    {
        title: 'Benefits',
        href: '#',
        icon: CheckBadgeIcon,
        iconForeground: 'text-purple-700',
        iconBackground: 'bg-purple-50',
    },
    {
        title: 'Schedule',
        href: '#',
        icon: UsersIcon,
        iconForeground: 'text-sky-700',
        iconBackground: 'bg-sky-50',
    },

]

const actions2 = [

    {
        title: 'Current Pay Info',
        href: '#',
        icon: BanknotesIcon,
        iconForeground: 'text-yellow-700',
        iconBackground: 'bg-yellow-50',
    },
    {
        title: 'Training',
        href: '#',
        icon: AcademicCapIcon,
        iconForeground: 'text-indigo-700',
        iconBackground: 'bg-indigo-50',
    },
]


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function ProfilePage() {
    const [user, setUser] = useState(null) //logged in user
    const [viewUser, setViewUser] = useState(null) //viewing other user
    //        const [tab, setTab] = useState(tabs[0])

    return (
        <>
            <div><Navbar /></div>
            <div class="grid grid-rows-3 grid-flow-col gap-1">
                <div class="grid grid-cols-3 gap-10 mx-24 pt-12">
                    {/*first col*/}
                    <div class="bg-cyan-600/70 row-start-1 row-end-4 rounded-lg">

                            <div className="flex justify-center mt-24" >
                                   <img className="flex h-24 w-24 max-w-[550px] rounded-full"
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt=""
                                    />
                            </div>

                                <span className="">
                                <div className="my-14"  >
                                    <p className="text-3xl font-medium text-gray-1500 group-hover:text-gray-900">Tom Cook</p>
                                    <p className="text-md font-medium text-gray-1200 group-hover:text-gray-700">Employee</p>
                                </div>
                                </span>



                        <div className="font-medium text-gray-1500">
                            Email <svg xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-10 w-full max-w-[550px]">
                                                 <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />

                                               </svg>
                            </div>
                        <div className="font-medium text-gray-1500"> Team <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-10 w-full max-w-[550px]">
                                                                                     <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                                   </svg>
 </div>
                        <span>
                            <button type="button" className="mt-12 rounded-md bg-blue font-medium text-red-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            > Disable Account</button>
                        </span>
                    </div>
                    {/*span 2*/}
                    <div class="col-span-2 flex items-center"></div>
                    <div class="box border border-2 rounded">
                        <h3 className="mt-5 text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and portfolio.</p>

                        <div className="mt-5 border-t border-gray-200">
                            <dl className="divide-y divide-gray-200">
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                    <dt className="text-sm font-medium text-gray-500">Full name</dt>
                                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        <span className="flex-grow"> Tom Cook</span>
                                        <span className="ml-4 flex-shrink-0">
                                            <button
                                                type="button"
                                                className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            >

                                            </button>
                                        </span>
                                    </dd>
                                </div>
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                    <dt className="text-sm font-medium text-gray-500">Position</dt>
                                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        <span className="flex-grow">Backend Developer</span>
                                        <span className="ml-4 flex-shrink-0">
                                            <button
                                                type="button"
                                                className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            >

                                            </button>
                                        </span>
                                    </dd>
                                </div>
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                    <dt className="text-sm font-medium text-gray-500">Email address</dt>
                                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        <span className="flex-grow">margotfoster@example.com</span>
                                        <span className="ml-4 flex-shrink-0">
                                            <button
                                                type="button"
                                                className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            >

                                            </button>
                                        </span>
                                    </dd>
                                </div>

                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                    <dt className="text-sm font-medium text-gray-500">Phone address</dt>
                                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        <span className="flex-grow">(65) 9888 2111</span>
                                        <span className="ml-4 flex-shrink-0">
                                            <button
                                                type="button"
                                                className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            >

                                            </button>
                                        </span>
                                    </dd>
                                </div>
                                <div class="p-10">
                                    <dd>
                                        <button type="button" className="mt-4 rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            Update Info
                                        </button>
                                        <span>   |   </span>
                                        <button type="button" className="mt-4 rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            Change Password
                                        </button>
                                    </dd>
                                </div>

                            </dl>
                        </div>
                    </div>
                    <div className="row-span-1 box-border border-2">
                        <dt className="text-lg font-medium leading-6 text-gray-900">Qualifications & Documents</dt>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Your CV.</p>
                        <p> </p>
                        <div className="flex-1 mt-5">
                            <img src="https://tse4.mm.bing.net/th?id=OIP.Hlyqks49KABGSCa0YgwPEAHaFj&pid=Api&P=0" />

                        </div>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            <ul role="list" className="divide-y divide-gray-200 rounded-md border border-gray-200">
                                <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                                    <div className="flex w-0 flex-1 items-center">
                                        <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                        <span className="ml-2 w-0 flex-1 truncate">resume_back_end_developer.pdf</span>
                                    </div>
                                    <div className="ml-4 flex flex-shrink-0 space-x-4">

                                        <button
                                            type="button"
                                            className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            Update
                                        </button>

                                    </div>
                                </li>
                                <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                                    <div className="flex w-0 flex-1 items-center">
                                        <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                        <span className="ml-2 w-0 flex-1 truncate">coverletter_back_end_developer.pdf</span>
                                    </div>
                                    <div className="ml-4 flex flex-shrink-0 space-x-4">
                                        <button
                                            type="button"
                                            className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            Update
                                        </button>

                                    </div>
                                </li>
                            </ul>
                        </dd>
                    </div>
                    <div class="row-span-2 col-start-2 col-end-3 ">
                        <div className="relative bg-white px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-2 lg:pb-28">

                            <div className="relative mx-auto max-w-7xl">
                                <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-1">

                                    <div class="flex-1">

                                        <div className="divide-y divide-gray-200 overflow-clip rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-1 sm:gap-px sm:divide-y-0 ">
                                            {actions1.map((action, actionIdx) => (
                                                <div
                                                    key={action.title}
                                                    className={classNames(
                                                        actionIdx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
                                                        actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
                                                        actionIdx === actions1.length - 2 ? 'sm:rounded-bl-lg' : '',
                                                        actionIdx === actions1.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
                                                        'relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500'
                                                    )}
                                                >
                                                    <div>
                                                        <span
                                                            className={classNames(
                                                                action.iconBackground,
                                                                action.iconForeground,
                                                                'rounded-lg inline-flex p-3 ring-4 ring-white'
                                                            )}
                                                        >
                                                            <action.icon className="h-6 w-6" aria-hidden="true" />
                                                        </span>
                                                    </div>
                                                    <div className="mt-8">
                                                        <h3 className="text-lg font-medium">
                                                            <a href={action.href} className="focus:outline-none">
                                                                {/* Extend touch target to entire panel */}
                                                                <span className="absolute inset-0" aria-hidden="true" />
                                                                {action.title}
                                                            </a>
                                                        </h3>
                                                        <p className="mt-2 text-sm text-gray-500">
                                                            Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis et
                                                            quo et molestiae.
                                                        </p>
                                                    </div>
                                                    <span
                                                        className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                                                        aria-hidden="true"
                                                    >
                                                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                                                        </svg>
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className=" stretch-1 col-span-1">

                        <div className="relative bg-white px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-2 lg:pb-28">

                            <div className="relative mx-auto max-w-7xl">
                                <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-1">

                                    <div class="flex-1">

                                        <div className="divide-y divide-gray-200 overflow-clip rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-1 sm:gap-px sm:divide-y-0 ">
                                            {actions2.map((action, actionIdx) => (
                                                <div
                                                    key={action.title}
                                                    className={classNames(
                                                        actionIdx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
                                                        actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
                                                        actionIdx === actions2.length - 2 ? 'sm:rounded-bl-lg' : '',
                                                        actionIdx === actions2.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
                                                        'relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500'
                                                    )}
                                                >
                                                    <div>
                                                        <span
                                                            className={classNames(
                                                                action.iconBackground,
                                                                action.iconForeground,
                                                                'rounded-lg inline-flex p-3 ring-4 ring-white'
                                                            )}
                                                        >
                                                            <action.icon className="h-6 w-6" aria-hidden="true" />
                                                        </span>
                                                    </div>
                                                    <div className="mt-8">
                                                        <h3 className="text-lg font-medium">
                                                            <a href={action.href} className="focus:outline-none">
                                                                {/* Extend touch target to entire panel */}
                                                                <span className="absolute inset-0" aria-hidden="true" />
                                                                {action.title}
                                                            </a>
                                                        </h3>
                                                        <p className="mt-2 text-sm text-gray-500">
                                                            Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis et
                                                            quo et molestiae.
                                                        </p>
                                                    </div>
                                                    <span
                                                        className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                                                        aria-hidden="true"
                                                    >
                                                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                                                        </svg>
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
