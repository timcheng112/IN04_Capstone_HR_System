/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3BottomLeftIcon,
  ChartBarSquareIcon,
  ChartPieIcon,
  DocumentTextIcon,
  FolderIcon,
  InboxStackIcon,
  PresentationChartLineIcon,
  UserGroupIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Fragment, useState, useEffect } from "react";
import { getUserId } from "../../utils/Common";
import api from "../../utils/api";
import PerformanceBreadcrumb from "../Breadcrumb/PerformanceBreadcrumb";

const navigationhr = [
  {
    name: "Current",
    href: "/myperformance",
    icon: ChartBarSquareIcon,
    current: false,
  },
  {
    name: "Goals",
    href: "/performance/goals",
    icon: ChartPieIcon,
    current: false,
  },
  {
    name: "Appraisals",
    href: "/performance/appraisals",
    icon: UserGroupIcon,
    current: false,
  },
  {
    name: "Reviews",
    href: "/performance/reviews",
    icon: DocumentTextIcon,
    current: false,
  },
  {
    name: "Promotions",
    href: "/promotion",
    icon: PresentationChartLineIcon,
    current: false,
  },
  {
    name: "Transfers",
    href: "/transfer",
    icon: InboxStackIcon,
    current: false,
  },
];
const navigation = [
  {
    name: "Current",
    href: "/myperformance",
    icon: ChartBarSquareIcon,
    current: false,
  },
  {
    name: "Goals",
    href: "/performance/goals",
    icon: ChartPieIcon,
    current: false,
  },
  {
    name: "Appraisals",
    href: "/performance/appraisals",
    icon: UserGroupIcon,
    current: false,
  },
  {
    name: "Reviews",
    href: "/performance/reviews",
    icon: DocumentTextIcon,
    current: false,
  },
  {
    name: "Promotions",
    href: "/promotion",
    icon: PresentationChartLineIcon,
    current: false,
  },
  {
    name: "Transfers",
    href: "/transfer",
    icon: InboxStackIcon,
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PerformanceSidebar({ currentPage }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
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
    <div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40 " onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex flex-shrink-0 items-center px-4">
                  <img
                    className="h-8 w-auto"
                    src={require("../../assets/libro-transparent-logo.png")}
                    alt="Libro"
                  />
                </div>
                <div className="mt-5 h-0 flex-1 overflow-y-auto">
                  <nav className="space-y-1 px-2">
                    {user !== null &&
                      user.hrEmployee &&
                      navigationhr.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                            "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-gray-500"
                                : "text-gray-400 group-hover:text-gray-500",
                              "mr-4 flex-shrink-0 h-6 w-6"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      ))}
                    {user !== null &&
                      !user.hrEmployee &&
                      navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                            "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-gray-500"
                                : "text-gray-400 group-hover:text-gray-500",
                              "mr-4 flex-shrink-0 h-6 w-6"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      ))}
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <div className="w-14 flex-shrink-0" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="flex flex-1 flex-col px-6">
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow rounded-lg mt-4">
          <button
            type="button"
            className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex flex-1 justify-between px-4">
            <div className="ml-4 flex items-center md:ml-6">
              {/* <button
                type="button"
                className="p-1 text-xl font-semibold text-gray-900"
              >
                <span>{pageTitle}</span>
              </button> */}
              <PerformanceBreadcrumb currentPage={currentPage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
