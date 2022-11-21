import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  AcademicCapIcon,
  BriefcaseIcon, UserIcon, StarIcon, ArrowLeftOnRectangleIcon

} from '@heroicons/react/24/outline'
import { deleteUser, getUserId } from "../utils/Common";
import logo from '..//assets/libro-transparent-logo.png'
import { useHistory } from "react-router-dom";


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Sidebar() {
  const navigation = [
    { name: 'Jobs', href: '/jobposting', icon: BriefcaseIcon, current: false },
    { name: 'My Applications', href: '/myapplication', icon: AcademicCapIcon, current: false },
    { name: 'My Favourites', href: '/myfavourite', icon: StarIcon, current: false },
    { name: 'Profile', href: '/profile', icon: UserIcon, current: false },
  ]
  const history = useHistory();
  function logout() {
    deleteUser();
    history.push("/")
  }

  return (
    <>
      <div>


        {/* Static sidebar for desktop */}
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
          <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pt-5">
            <div className="flex flex-shrink-0 items-center px-4">
              <img
                className="h-8 w-auto"
                src={logo}
                alt="Libro"
              />
            </div>
            <div className="mt-5 flex flex-grow flex-col">
              <nav className="flex-1 space-y-1 px-2 pb-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                      'group rounded-md py-2 px-2 flex items-center text-sm font-medium'
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                        'mr-3 flex-shrink-0 h-6 w-6'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
          <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
            <button className='inline-flex items-center'
              onClick={() => logout()}>
              <ArrowLeftOnRectangleIcon className="md:-ml-0.5 md:mr-2 h-4 w-4" aria-hidden="true" />
                <span className="hidden md:block"> Log out</span>
            </button>
          </div>
        </div>


      </div>
    </>
  )
}
