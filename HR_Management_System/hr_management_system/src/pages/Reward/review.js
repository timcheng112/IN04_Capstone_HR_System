import { React, useRef } from "react";
import Navbar from "../../components/Navbar";
import WelfareSidebar from "../../components/Sidebar/Welfare";
import Tab from "../../features/jobrequest/Tab";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { getUserId, setUserSession } from "../../utils/Common";
import { useHistory } from "react-router-dom";
import ReviewFormOption from "../../features/reward/ReviewFormOption";


export default function Review() {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const history = useHistory();
  const [refreshKey, setRefreshKey] = useState(0);
  const [open, setOpen] = useState(false);
  const [reviews, setReviews] = useState([])
  const tabs = [
    { name: "Reward Tracks", href: "/welfare/rewardtrack", current: false },
    {
      name: "Department Review Forms",
      href: "#",
      current: true,
    },
  ];

  

  useEffect(() => {
    api
      .getUser(getUserId())
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => setError(error));
  }, []);
  useEffect(() => {
    api
      .getReviewFormByDepartmentHead(getUserId())
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => setError(error));
  }, [refreshKey]);


  return (
    <div className="">
      <Navbar />
      <div className="flex">
        <div className="flex-1">
          <WelfareSidebar currentPage={{
            name: "Rewards",
            href: "/welfare/myrewardtrack",
            current: true,
          }} />
        </div>
      </div>
      <div className="py-10">
        <main className="flex-1">
          <div className="sm:flex-auto px-6">
            <Tab tabs={tabs} />
          </div>
          <div className="py-3"></div>
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="mt-8 flex flex-col">
              <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className=" py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                            Employee
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Rating
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Date
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Team 
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Status
                          </th>
                          {/* <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Edit</span>
                    </th> */}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {reviews.map((review) => (
                          <tr key={review.reviewFormId}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-6">
                              {review.employeeName}
                            </td>
                            <td className=" whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">{review.rating}</td>
                            <td className=" whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">{review.date}</td>
                            <td className=" whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">{review.teamName}</td>
                            <td className=" whitespace-nowrap px-3 py-4 text-left text-sm">
                              {review.vetted && <span className=" whitespace-nowrap inline-flex items-center rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-800">
                                Vetted
                              </span>}
                              {!review.vetted && <span className="whitespace-nowrap inline-flex items-center rounded-full bg-red-100 px-3 py-0.5 text-sm font-medium text-red-800">
                                Unvetted
                              </span>}
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <ReviewFormOption review={review} refreshKeyHandler={() => setRefreshKey((oldKey) => oldKey + 1)} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
