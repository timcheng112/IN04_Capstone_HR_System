import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Navbar from "../../components/Navbar";
import AdminSidebar from "../../components/Sidebar/Admin";
import Tab from "../../features/jobrequest/Tab";
import ChecklistOptions from "../../features/onboarding/ChecklistOptions";
import EmptyStateChecklist from "../../features/onboarding/EmptyStateChecklist";
import api from "../../utils/api";
import { getUserId } from "../../utils/Common";

const tabs = [
  { name: "Tasks", href: "/admin/onboardinghr", current: false },
  {
    name: "Template Checklists",
    href: "#",
    current: true,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ViewTemplateChecklists = () => {
  const [user, setUser] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [checklists, setChecklists] = useState([]);
  const history = useHistory();
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    api
      .getUser(getUserId())
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    api
      .getChecklists()
      .then((response) => {
        setChecklists(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error.response.data.message));
  }, [refreshKey]);

  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className="flex-1">
          <AdminSidebar pageTitle="Onboarding (HR)" />
        </div>
        <div className="flex items-center">
          <div className="mt-4 ml-auto mr-6">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              onClick={() =>
                history.push({
                  pathname: "/admin/addtemplatechecklist",
                  state: { isOnboarding: true },
                })
              }
            >
              New Template Checklist
            </button>
          </div>
        </div>
      </div>
      <main className="flex-1">
        <div className="py-5" />
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Onboarding</h1>
        </div>
        <div className="py-4 px-6">
          <div className="sm:flex sm:items-center space-x-4 mb-4">
            <div className="sm:flex-auto">
              <Tab tabs={tabs} />
            </div>
            {user !== null && user.hrEmployee && (
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                onClick={() => history.push("/admin/onboarding")}
              >
                Non-HR Mode
              </button>
            )}
          </div>
          <EmptyStateChecklist
            onOpen={() => history.push("/admin/addtemplatechecklist")}
          />
          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                  {checklists.length > 0 && (
                    <table className="min-w-full">
                      <thead className="bg-white">
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 "
                            colSpan={2}
                          >
                            Title
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            colSpan={4}
                          >
                            Description
                          </th>
                          <th />
                        </tr>
                      </thead>
                      <tbody className="border-t border-gray-200 bg-gray-50">
                        {checklists.map((checklist, checklistIdx) => (
                          <tr
                            key={checklist.title}
                            className={classNames(
                              checklistIdx === 0
                                ? "border-gray-300"
                                : "border-gray-200",
                              "border-t"
                            )}
                          >
                            <td
                              colSpan={2}
                              className="whitespace-nowrap text-left py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                            >
                              {checklist.title}
                            </td>
                            <td
                              colSpan={4}
                              className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500"
                            >
                              {checklist.description}
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <ChecklistOptions checklist ={checklist} refreshKeyHandler={() => setRefreshKey((oldKey) => oldKey + 1)}/>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ViewTemplateChecklists;
