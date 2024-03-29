import { Fragment, useEffect, useState, Link } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import {
  AcademicCapIcon,
  BanknotesIcon,
  Bars3Icon,
  BellIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  CheckBadgeIcon,
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
  ClockIcon,
  PresentationChartLineIcon,
  ReceiptRefundIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import logo from "../../assets/libro-transparent-logo.png";
import shiba from "../../assets/shiba-thumbs-up.png";
import api from "../../utils/api";
import { deleteUser, getUserId } from "../../utils/Common";
import loading from "../../assets/Spinner.svg";
import { useHistory } from "react-router";
import Notification from "../../components/Notification";

// const navigation = [
//   { name: "Home", href: "#", current: true },
//   { name: "Profile", href: "#", current: false },
//   { name: "Resources", href: "#", current: false },
//   { name: "Company Directory", href: "#", current: false },
// ];
const userNavigation = [
  { name: "Your Profile", href: "/profile" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(getUserId());
  const history = useHistory();
  const [show, setShow] = useState(true);
  const [showNotification, setShowNotification] = useState(true);
  const [profilePic, setProfilePic] = useState(shiba);


  useEffect(() => {
    api
      .getUser(userId)
      .then((response) => {
        //console.log(response.data);
        setUser(response.data);
        if (response.data.profilePic !== null) {
            api.getDocById(response.data.profilePic.docId).then((response) => {
                const url = window.URL.createObjectURL(response.data);
                setProfilePic(url);
            })
        }

      })
      .catch((error) => {
        history.push("/");
        deleteUser();
      });
  }, [userId]);

  return (
    <>
      {user ? (
        <>
          <div className="min-h-full">
            <Popover
              as="header"
              className="bg-gradient-to-r from-sky-800 to-cyan-600 pb-24"
            >
              {({ open }) => (
                <>
                  <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="relative flex flex-wrap items-center justify-center lg:justify-between">
                      {/* Logo */}
                      <div className="absolute left-0 flex-shrink-0 py-5 lg:static">
                        <a href="/home">
                          <span className="sr-only">Libro</span>
                          <img className="h-8 w-auto" src={logo} alt="" />
                        </a>
                      </div>

                      <div className="hidden lg:ml-4 lg:flex lg:items-center lg:py-5 lg:pr-0.5">
                        <button
                          type="button"
                          className="flex-shrink-0 rounded-full p-1 text-cyan-200 hover:bg-white hover:bg-opacity-10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => {
                            setShowNotification(!showNotification);
                            console.log("bell pressed");
                            history.push("/AllNotifications");
                          }}
                        >
                          <span className="sr-only">View notifications</span>
                          <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button>

                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-4 flex-shrink-0">
                          <div>
                            <Menu.Button className="flex rounded-full bg-white text-sm ring-2 ring-white ring-opacity-20 focus:outline-none focus:ring-opacity-100">
                              <span className="sr-only">Open user menu</span>
                              <img
                                className="h-8 w-8 rounded-full"
                                src={profilePic}
                                alt=""
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute -right-2 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <Menu.Item key="Sign out">
                                {({ active }) => (
                                  <a
                                    href="/"
                                    onClick={() => deleteUser()}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    Log out
                                  </a>
                                )}
                              </Menu.Item>
                              {userNavigation.map((item) => (
                                <Menu.Item key={item.name}>
                                  {({ active }) => (
                                    <a
                                      href={item.href}
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      {item.name}
                                    </a>
                                  )}
                                </Menu.Item>
                              ))}
                              {user !== null &&
                                user.hrEmployee && <Menu.Item key="Sign out">
                                  {({ active }) => (
                                    <a
                                      href="/register"
                                      
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      Registration
                                    </a>
                                  )}
                                </Menu.Item>}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>

                      <div className="w-full py-5 lg:border-t lg:border-white lg:border-opacity-20">
                        <div className="lg:grid lg:grid-cols-3 lg:items-center lg:gap-8">
                          {/* Left nav */}
                          <div className="hidden lg:col-span-2 lg:block">
                            <nav className="flex space-x-4">
                              <a
                                key="Administrative"
                                href="/admin/onboarding"
                                className={classNames(
                                  "text-white text-sm font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10"
                                )}
                              >
                                Administrative
                              </a>
                              <a
                                key="Organisation Structure"
                                href="/vieworg"
                                className={classNames(
                                  "text-white text-sm font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10"
                                )}
                              >
                                Organisation
                              </a>
                              <a
                                key="Career Management"
                                href="/career/promotion"
                                className={classNames(
                                  "text-white text-sm font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10"
                                )}
                              >
                                Career
                              </a>
                              <a
                                key="Training"
                                href="/mytraining"
                                className={classNames(
                                  "text-white text-sm font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10"
                                )}
                              >
                                Training
                              </a>
                              {user.hrEmployee && (
                                <a
                                  key="Hiring"
                                  href="/hiring/jobrequesthr"
                                  className={classNames(
                                    "text-white text-sm font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10"
                                  )}
                                >
                                  Hiring
                                </a>
                              )}
                              {!user.hrEmployee && user.userRole === "MANAGER" && (
                                <a
                                  key="Hiring"
                                  href="/hiring/jobrequest"
                                  className={classNames(
                                    "text-white text-sm font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10"
                                  )}
                                >
                                  Hiring
                                </a>
                              )}
                              <a
                                key="Reports"
                                href="/report"
                                className={classNames(
                                  "text-white text-sm font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10"
                                )}
                              >
                                Reports
                              </a>
                              <a
                                key="Rostering"
                                href="/rostering"
                                className={classNames(
                                  "text-white text-sm font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10"
                                )}
                              >
                                Rostering
                              </a>
                              <a
                                key="Payroll"
                                href="/payroll"
                                className={classNames(
                                  "text-white text-sm font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10"
                                )}
                              >
                                Payroll
                              </a>
                            </nav>
                          </div>
                        </div>
                      </div>

                      {/* Menu button */}
                      <div className="absolute right-0 flex-shrink-0 lg:hidden">
                        {/* Mobile menu button */}
                        <Popover.Button className="inline-flex items-center justify-center rounded-md bg-transparent p-2 text-cyan-200 hover:bg-white hover:bg-opacity-10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
                          <span className="sr-only">Open main menu</span>
                          {open ? (
                            <XMarkIcon
                              className="block h-6 w-6"
                              aria-hidden="true"
                            />
                          ) : (
                            <Bars3Icon
                              className="block h-6 w-6"
                              aria-hidden="true"
                            />
                          )}
                        </Popover.Button>
                      </div>
                    </div>
                  </div>

                  <Transition.Root as={Fragment}>
                    <div className="lg:hidden">
                      <Transition.Child
                        as={Fragment}
                        enter="duration-150 ease-out"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="duration-150 ease-in"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Popover.Overlay className="fixed inset-0 z-20 bg-black bg-opacity-25" />
                      </Transition.Child>

                      <Transition.Child
                        as={Fragment}
                        enter="duration-150 ease-out"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="duration-150 ease-in"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                      >
                        <Popover.Panel
                          focus
                          className="absolute inset-x-0 top-0 z-30 mx-auto w-full max-w-3xl origin-top transform p-2 transition"
                        >
                          <div className="divide-y divide-gray-200 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="pt-3 pb-2">
                              <div className="flex items-center justify-between px-4">
                                <div>
                                  <a href="/home">
                                    <img
                                      className="h-8 w-auto"
                                      src={logo}
                                      alt="Your Company"
                                    />
                                  </a>
                                </div>
                                <div className="-mr-2">
                                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500">
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon
                                      className="h-6 w-6"
                                      aria-hidden="true"
                                    />
                                  </Popover.Button>
                                </div>
                              </div>
                              <div className="mt-3 space-y-1 px-2">
                                <a
                                  key="Admin"
                                  href="/home"
                                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                                >
                                  Admin
                                </a>
                                <a
                                  key="Career"
                                  href="/home"
                                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                                >
                                  Career
                                </a>
                                <a
                                  key="Welfare"
                                  href="/home"
                                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                                >
                                  Welfare
                                </a>
                                <a
                                  key="Hiring"
                                  href="/home"
                                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                                >
                                  Hiring
                                </a>
                                <a
                                  key="Reports"
                                  href="/home"
                                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                                >
                                  Reports
                                </a>
                              </div>
                              <div className="mt-3 space-y-1 px-2"></div>
                            </div>
                            <div className="pt-4 pb-2">
                              <div className="flex items-center px-5">
                                <div className="flex-shrink-0">
                                  <img
                                    className="h-10 w-10 rounded-full"
                                    src={user.profilePic}
                                    alt=""
                                  />
                                </div>
                                <div className="ml-3 min-w-0 flex-1">
                                  <div className="truncate text-base font-medium text-gray-800">
                                    {user.firstName}
                                  </div>
                                  <div className="truncate text-sm font-medium text-gray-500">
                                    {user.email}
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  className="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                                  href="/AllNotifications"
                                  onClick={() => {
                                    setShowNotification(true);
                                    history.push("/AllNotifications");
                                    console.log("bell pressed 1");
                                  }}
                                >
                                  <span className="sr-only">
                                    View notifications
                                  </span>
                                  <BellIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                    href="/AllNotifications"
                                  />
                                </button>
                              </div>
                              <div className="mt-3 space-y-1 px-2">
                                {userNavigation.map((item) => (
                                  <a
                                    key={item.name}
                                    href={item.href}
                                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                                  >
                                    {item.name}
                                  </a>
                                ))}
                              </div>
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition.Child>
                    </div>
                  </Transition.Root>
                </>
              )}
            </Popover>
            {user.notificationsUnread.length > 0 ? (
              <Notification showNotification={true} />
            ) : (
              ""
            )}
            <main className="-mt-24 pb-8">
              <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 className="sr-only">Profile</h1>
                {/* Main 3 column grid */}
                <div className="items-start gap-4 lg:grid-cols-3 lg:gap-8">
                  {/* Left column */}
                  <div className="gap-4 lg:col-span-2">
                    {/* Welcome panel */}
                    <section aria-labelledby="profile-overview-title">
                      <div className="overflow-hidden rounded-lg bg-white shadow">
                        <h2 className="sr-only" id="profile-overview-title">
                          Profile Overview
                        </h2>
                        <div className="bg-white p-6">
                          <div className="sm:flex sm:items-center sm:justify-between">
                            <div className="sm:flex sm:space-x-5">
                              <div className="flex-shrink-0">
                                <img
                                  className="mx-auto h-20 w-20 rounded-full"
                                  src={profilePic}
                                  alt=""
                                />
                              </div>
                              <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                                <p className="text-sm font-medium text-gray-600">
                                  Welcome back,
                                </p>
                                <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                                  {user.firstName} {user.lastName}
                                </p>
                                <p className="text-sm font-medium text-gray-600">
                                  {user.role}
                                </p>
                              </div>
                            </div>
                            <div className="mt-5 flex justify-center sm:mt-0">
                              <a
                                href="/profile"
                                className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                              >
                                View profile
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 divide-y divide-gray-200 border-t border-gray-200 bg-gray-50 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
                          {/* {stats.map((stat) => (
                            <div
                              key={stat.label}
                              className="px-6 py-5 text-center text-sm font-medium"
                            >
                              <span className="text-gray-900">
                                {stat.value}
                              </span>{" "}
                              <span className="text-gray-600">
                                {stat.label}
                              </span>
                            </div>
                          ))} */}
                        </div>
                      </div>
                    </section>

                    {/* Actions panel */}
                    <section
                      aria-labelledby="quick-links-title"
                      className="mt-10"
                    >
                      <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
                        <h2 className="sr-only" id="quick-links-title">
                          Quick links
                        </h2>
                        {/* {actions.map((action, actionIdx) => (
                    
                  ))} */}
                        <div
                          key="rostering"
                          className={classNames(
                            "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-500"
                          )}
                        >
                          <div>
                            <span
                              className={classNames(
                                "bg-teal-50",
                                "text-teal-700",
                                "rounded-lg inline-flex p-3 ring-4 ring-white"
                              )}
                            >
                              <CalendarDaysIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </span>
                          </div>
                          <div className="mt-8">
                            <h3 className="text-lg font-medium">
                              <a href="/rostering" className="focus:outline-none">
                                {/* Extend touch target to entire panel */}
                                <span
                                  className="absolute inset-0"
                                  aria-hidden="true"
                                />
                                Rostering
                              </a>
                            </h3>
                            <p className="mt-2 text-sm text-gray-500">
                              Doloribus dolores nostrum quia qui natus officia
                              quod et dolorem. Sit repellendus qui ut at
                              blanditiis et quo et molestiae.
                            </p>
                          </div>
                          <span
                            className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                            aria-hidden="true"
                          >
                            <svg
                              className="h-6 w-6"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                            </svg>
                          </span>
                        </div>
                        <div
                          key="Payroll"
                          className={classNames(
                            "sm:rounded-tr-lg sm:rounded-tr-none relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-500"
                          )}
                        >
                          <div>
                            <span
                              className={classNames(
                                "bg-yellow-50",
                                "text-yellow-700",
                                "rounded-lg inline-flex p-3 ring-4 ring-white"
                              )}
                            >
                              <BanknotesIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </span>
                          </div>
                          <div className="mt-8">
                            <h3 className="text-lg font-medium">
                              <a href="/payroll" className="focus:outline-none">
                                {/* Extend touch target to entire panel */}
                                <span
                                  className="absolute inset-0"
                                  aria-hidden="true"
                                />
                                Payroll
                              </a>
                            </h3>
                            <p className="mt-2 text-sm text-gray-500">
                              Doloribus dolores nostrum quia qui natus officia
                              quod et dolorem. Sit repellendus qui ut at
                              blanditiis et quo et molestiae.
                            </p>
                          </div>
                          <span
                            className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                            aria-hidden="true"
                          >
                            <svg
                              className="h-6 w-6"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                            </svg>
                          </span>
                        </div>
                        <div
                          key="onboarding"
                          className={classNames(
                            "sm:rounded-tr-none relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-500"
                          )}
                        >
                          <div>
                            <span
                              className={classNames(
                                "bg-indigo-50",
                                "text-indigo-700",
                                "rounded-lg inline-flex p-3 ring-4 ring-white"
                              )}
                            >
                              <ClipboardDocumentListIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </span>
                          </div>
                          <div className="mt-8">
                            <h3 className="text-lg font-medium">
                              <a
                                href="/onboarding"
                                className="focus:outline-none"
                              >
                                {/* Extend touch target to entire panel */}
                                <span
                                  className="absolute inset-0"
                                  aria-hidden="true"
                                />
                                Onboarding
                              </a>
                            </h3>
                            <p className="mt-2 text-sm text-gray-500">
                              Doloribus dolores nostrum quia qui natus officia
                              quod et dolorem. Sit repellendus qui ut at
                              blanditiis et quo et molestiae.
                            </p>
                          </div>
                          <span
                            className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                            aria-hidden="true"
                          >
                            <svg
                              className="h-6 w-6"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                            </svg>
                          </span>
                        </div>
                        <div
                          key="offboarding"
                          className={classNames(
                            "sm:rounded-tr-none relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-500"
                          )}
                        >
                          <div>
                            <span
                              className={classNames(
                                "bg-pink-50",
                                "text-pink-700",
                                "rounded-lg inline-flex p-3 ring-4 ring-white"
                              )}
                            >
                              <ClipboardDocumentCheckIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </span>
                          </div>
                          <div className="mt-8">
                            <h3 className="text-lg font-medium">
                              <a
                                href="/offboarding"
                                className="focus:outline-none"
                              >
                                {/* Extend touch target to entire panel */}
                                <span
                                  className="absolute inset-0"
                                  aria-hidden="true"
                                />
                                Offboarding
                              </a>
                            </h3>
                            <p className="mt-2 text-sm text-gray-500">
                              Doloribus dolores nostrum quia qui natus officia
                              quod et dolorem. Sit repellendus qui ut at
                              blanditiis et quo et molestiae.
                            </p>
                          </div>
                          <span
                            className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                            aria-hidden="true"
                          >
                            <svg
                              className="h-6 w-6"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                            </svg>
                          </span>
                        </div>
                        <div
                          key="leaves"
                          className={classNames(
                            "sm:rounded-tr-none relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-500"
                          )}
                        >
                          <div>
                            <span
                              className={classNames(
                                "bg-sky-50",
                                "text-sky-700",
                                "rounded-lg inline-flex p-3 ring-4 ring-white"
                              )}
                            >
                              <ClockIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </span>
                          </div>
                          <div className="mt-8">
                            <h3 className="text-lg font-medium">
                              <a
                                href="/admin/leaves"
                                className="focus:outline-none"
                              >
                                {/* Extend touch target to entire panel */}
                                <span
                                  className="absolute inset-0"
                                  aria-hidden="true"
                                />
                                Leaves
                              </a>
                            </h3>
                            <p className="mt-2 text-sm text-gray-500">
                              Doloribus dolores nostrum quia qui natus officia
                              quod et dolorem. Sit repellendus qui ut at
                              blanditiis et quo et molestiae.
                            </p>
                          </div>
                          <span
                            className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                            aria-hidden="true"
                          >
                            <svg
                              className="h-6 w-6"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                            </svg>
                          </span>
                        </div>
                        <div
                          key="training"
                          className={classNames(
                            "sm:rounded-tr-none relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-500"
                          )}
                        >
                          <div>
                            <span
                              className={classNames(
                                "bg-orange-50",
                                "text-orange-700",
                                "rounded-lg inline-flex p-3 ring-4 ring-white"
                              )}
                            >
                              <AcademicCapIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </span>
                          </div>
                          <div className="mt-8">
                            <h3 className="text-lg font-medium">
                              <a
                                href="/mytraining"
                                className="focus:outline-none"
                              >
                                {/* Extend touch target to entire panel */}
                                <span
                                  className="absolute inset-0"
                                  aria-hidden="true"
                                />
                                Training
                              </a>
                            </h3>
                            <p className="mt-2 text-sm text-gray-500">
                              Doloribus dolores nostrum quia qui natus officia
                              quod et dolorem. Sit repellendus qui ut at
                              blanditiis et quo et molestiae.
                            </p>
                          </div>
                          <span
                            className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                            aria-hidden="true"
                          >
                            <svg
                              className="h-6 w-6"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                            </svg>
                          </span>
                        </div>
                        <div
                          key="career-progression"
                          className={classNames(
                            "sm:rounded-tr-none relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-500"
                          )}
                        >
                          <div>
                            <span
                              className={classNames(
                                "bg-red-50",
                                "text-red-700",
                                "rounded-lg inline-flex p-3 ring-4 ring-white"
                              )}
                            >
                              <ChartBarIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </span>
                          </div>
                          <div className="mt-8">
                            <h3 className="text-lg font-medium">
                              <a
                                href="/career/promotion"
                                className="focus:outline-none"
                              >
                                <span
                                  className="absolute inset-0"
                                  aria-hidden="true"
                                />
                                Career Progression
                              </a>
                            </h3>
                            <p className="mt-2 text-sm text-gray-500">
                              Doloribus dolores nostrum quia qui natus officia
                              quod et dolorem. Sit repellendus qui ut at
                              blanditiis et quo et molestiae.
                            </p>
                          </div>
                          <span
                            className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                            aria-hidden="true"
                          >
                            <svg
                              className="h-6 w-6"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                            </svg>
                          </span>
                        </div>
                        <div
                          key="performance"
                          className={classNames(
                            "sm:rounded-tr-none relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-500"
                          )}
                        >
                          <div>
                            <span
                              className={classNames(
                                "bg-lime-50",
                                "text-lime-700",
                                "rounded-lg inline-flex p-3 ring-4 ring-white"
                              )}
                            >
                              <PresentationChartLineIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </span>
                          </div>
                          <div className="mt-8">
                            <h3 className="text-lg font-medium">
                              <a
                                href="/myperformance"
                                className="focus:outline-none"
                              >
                                {/* Extend touch target to entire panel */}
                                <span
                                  className="absolute inset-0"
                                  aria-hidden="true"
                                />
                                Performance Management
                              </a>
                            </h3>
                            <p className="mt-2 text-sm text-gray-500">
                              Doloribus dolores nostrum quia qui natus officia
                              quod et dolorem. Sit repellendus qui ut at
                              blanditiis et quo et molestiae.
                            </p>
                          </div>
                          <span
                            className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                            aria-hidden="true"
                          >
                            <svg
                              className="h-6 w-6"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </main>
            <footer>
              <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="border-t border-gray-200 py-8 text-center text-sm text-gray-500 sm:text-left">
                  <span className="block sm:inline">
                    &copy; 2022 Libro, Inc.
                  </span>{" "}
                  <span className="block sm:inline">All rights reserved.</span>
                </div>
              </div>
            </footer>
          </div>
        </>
      ) : (
        <div className="h-full px-4 py-30 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
          <img className="h-full w-auto" src={loading} alt="" />
        </div>
      )}
    </>
  );
}
