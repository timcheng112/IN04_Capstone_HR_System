import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Navbar from "../../components/Navbar";
import PerformanceSidebar from "../../components/Sidebar/Performance";
import ActiveTransfers from "../../features/progression/activeTransfers";
import ApproveTransfers from "../../features/progression/approveTransfers";
import InterviewTransfers from "../../features/progression/interviewTransfers";
import TransferHistory from "../../features/progression/transferHistory";
import api from "../../utils/api";
import { getUserId } from "../../utils/Common";

const tabs = [
  { name: "My Active Requests", href: "#", current: true },
  { name: "To Interview", href: "#", current: false },
  { name: "To Approve", href: "#", current: false },
  { name: "My Request History", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Transfer() {
  const [refresh, setRefresh] = useState(false);
  const [currentTab, setCurrentTab] = useState("My Active Requests");
  const [tabList, setTabList] = useState(tabs);
  const history = useHistory();

  useEffect(() => {
    api.getUser(getUserId()).then((response) => {
      if (!response.data.isHrEmployee) {
        const nonHRtabs = tabs.filter((t) => t.name !== "To Approve");
        setTabList(nonHRtabs);
      }
    });
  }, []);

  useEffect(() => {
    console.log("refresh");
  }, [refresh]);

  function changeTab(tabName) {
    //console.log("tab name " + tabName);
    tabs.map((t) => (t.current = false));
    tabs.filter((t) => t.name === tabName).map((t) => (t.current = true));
    //console.log(tabs);
    setCurrentTab(tabName);
    setRefresh(!refresh);
  }

  function renderTab() {
    //console.log(currentTab)
    if (currentTab === "My Active Requests") {
      return (
        <div className="mt-10">
          <ActiveTransfers />
        </div>
      );
    } else if (currentTab === "To Interview") {
      return (
        <div className="mt-10">
          <InterviewTransfers />
        </div>
      );
    } else if (currentTab === "To Approve") {
      return (
        <div className="mt-10">
          <ApproveTransfers />
        </div>
      );
    } else if (currentTab === "My Request History") {
      return (
        <div>
          <TransferHistory />
        </div>
      );
    }
  }

  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className="flex-1">
          <PerformanceSidebar
            currentPage={{
              name: "Transfer",
              href: "/transfer",
              current: true,
            }}
          />
        </div>
      </div>
      <div className="mt-10 mx-16 md:gap-6">
        <div className="md:col-span-1">
          <div className="mt-2 px-4 sm:px-0">
            <h2 className="text-2xl mb-5 font-sans font-medium leading-6 text-gray-900">
              Transfer Requests
            </h2>
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => history.push('/transfer/0')}
            >
              <PlusCircleIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              New 
            </button>
            <div>
              <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                  Select a tab
                </label>
                <select
                  id="tabs"
                  name="tabs"
                  className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  defaultValue={tabs.find((tab) => tab.current).name}
                >
                  {tabs.map((tab) => (
                    <option key={tab.name}>{tab.name}</option>
                  ))}
                </select>
              </div>
              <div className="hidden sm:block">
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex justify-center" aria-label="Tabs">
                    {tabList.map((tab) => (
                      <button
                        key={tab.name}
                        href={tab.href}
                        className={classNames(
                          tab.current
                            ? "border-indigo-500 text-indigo-600 text-lg font-semibold font-sans"
                            : "border-transparent text-gray-500 font-sans hover:text-gray-700 hover:border-gray-300",
                          "w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm"
                        )}
                        aria-current={tab.current ? "page" : undefined}
                        onClick={() => {
                          //console.log("name " + tab.name);
                          changeTab(tab.name);
                        }}
                      >
                        {tab.name}
                      </button>
                    ))}
                  </nav>
                </div>
                <div>{renderTab()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
