import { PlusIcon } from "@heroicons/react/24/outline";
import { Fragment, useEffect, useState } from "react";
import api from "../../utils/api";
import AddAchievementModal from "./AddAchievementModal";

export default function GoalList({ userId }) {
  const [financial, setFinancial] = useState([]);
  const [business, setBusiness] = useState([]);
  const [goals, setGoals] = useState([]);
  const [openAddAchievement, setOpenAddAchievement] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    console.log(userId);
    api.getEmployeeGoals(userId).then((response) => {
      console.log(response.data);
      setGoals(response.data);
    });
  }, []);

  useEffect(() => {}, [refresh]);

  return (
    goals && (
      <div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full">
                  <thead className="bg-white">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Achievement
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Year
                      </th>
                      {/* <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Last Modified
                      </th> */}
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {goals?.map((goal) => (
                      <Fragment key={goal.goalId}>
                        <tr className="border-t border-gray-200">
                          <th
                            colSpan={3}
                            scope="col"
                            className="bg-gray-50 px-4 py-2 text-left text-sm font-semibold text-gray-900 sm:px-6"
                          >
                            <span className="inline-flex items-center font-bold rounded-full bg-amber-600 mr-3 px-3 py-0.5 text-sm font-medium text-white">
                              {goal.type} goal
                            </span>{" "}
                            {goal.description} {""}
                          </th>
                          <th
                            colSpan={1}
                            scope="colgroup"
                            className="bg-gray-50 px-4 py-2 text-right text-sm font-semibold text-gray-900 sm:px-6"
                          >
                            {/* <button
                            type="button"
                            className="inline-flex items-center ml-5 pr-3 rounded-full border border-transparent bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() => {
                              handleAddAchievement(goal.goalId);
                            }}
                          >
                            <PlusIcon
                              className="h-5 w-5 mr-1"
                              aria-hidden="true"
                            />
                            Add Achievement
                          </button>
                          <AddAchievementModal
                            title="test"
                            open={openAddAchievement}
                            onOpen={() => setOpenAddAchievement(false)}
                            onClose={() => setOpenAddAchievement(false)}
                            onConfirm={(desc) => {
                              submitNewAchievement(desc);
                              //handleAddAchievement(goal.goalId);
                            }}
                          /> */}
                          </th>
                        </tr>
                        {goal?.achievements?.map((achievement) => (
                          <tr key={achievement.achievementId} className="">
                            <td className="whitespace-nowrap text-left py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {achievement.description}
                            </td>
                            <td className="whitespace-nowrap text-left px-3 py-4 text-sm text-gray-500">
                              {achievement.created.substring(0,4)}
                            </td>
                            {/* <td className="whitespace-nowrap text-left px-3 py-4 text-sm text-gray-500">
                              {achievement.lastModified}
                            </td> */}
                            <td className="relative whitespace-nowrap text-left py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"></td>
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
      </div>
    )
  );
}
