import { Fragment } from "react";
import { Disclosure, Menu, Transition, Popover } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import logo from "../assets/libro-transparent-logo.png";
import { NavLink, useHistory, useRouteMatch } from "react-router-dom";
import api from "../utils/api";
import { deleteUser, getUserId } from "../utils/Common";
import { useState, useEffect } from "react";

const userNavigation = [
  { name: "Your Profile", href: "/profile" },
  { name: "Settings", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const navigation = [
    { name: "Dashboard", path: "/" },
    { name: "Admin", path: "/admin/onboarding" },
    { name: "Company", path: "/vieworg" },
    { name: "Career", path: "/career/promotion" },
    { name: "Welfare", path: "/register" },
    { name: "Hiring", path: "/hiring/jobrequest" },
    { name: "Reports", path: "/reports" },
    { name: "Rostering", path: "/rostering" },
    { name: "Payroll", path: "/payroll" },
  ];
  const navigationHR = [
    { name: "Dashboard", path: "/" },
    { name: "Admin", path: "/admin/onboarding" },
    { name: "Company", path: "/vieworg" },
    { name: "Career", path: "/career/promotion" },
    { name: "Training", path: "/mytraining" },
    { name: "Welfare", path: "/register" },
    { name: "Hiring", path: "/hiring/jobrequesthr" },
    { name: "Reports", path: "/reports" },
    { name: "Rostering", path: "/rostering" },
    { name: "Payroll", path: "/payroll" },
  ];
  const { url } = useRouteMatch();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    api
      .getUser(getUserId())
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch((error) => setError(error));
  }, []);

  return (
    user && (
      <Disclosure as="nav" className="bg-white shadow float-none">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between">
                <div className="flex">
                  <div className="flex flex-shrink-0 items-center">
                    <a href="/home">
                      <img
                        className="block h-8 w-auto lg:hidden"
                        src={logo}
                        alt="Libro"
                      />
                      <img
                        className="hidden h-8 w-auto lg:block"
                        src={logo}
                        alt="Libro"
                      />
                    </a>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8 items-center">
                    {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                    {user !== null &&
                      user.hrEmployee &&
                      navigationHR.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.path}
                          aria-current={item.path === url ? "page" : undefined}
                          className={classNames(
                            item.path === url
                              ? "bg-gray-100 text-gray-900"
                              : "hover:bg-gray-50",
                            "block rounded-md py-2 px-3 text-base font-medium"
                          )}
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    {user !== null &&
                      !user.hrEmployee &&
                      navigation.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.path}
                          aria-current={item.path === url ? "page" : undefined}
                          className={classNames(
                            item.path === url
                              ? "bg-gray-100 text-gray-900"
                              : "hover:bg-gray-50",
                            "block rounded-md py-2 px-3 text-base font-medium"
                          )}
                        >
                          {item.name}
                        </NavLink>
                      ))}
                  </div>
                </div>
                <div className="hidden lg:ml-4 lg:flex lg:items-center lg:py-5 lg:pr-0.5">
                  <button
                    type="button"
                    className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => history.push("/AllNotifications")}
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 lg:rounded-md lg:p-2 lg:hover:bg-gray-50">
                        <img
                          className="h-8 w-8 rounded-full"
                          src={user.profilePic}
                          alt=""
                        />
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
                      <Menu.Items className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Logout
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
            {/* <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel> */}
          </>
        )}
      </Disclosure>
    )
  );
}
