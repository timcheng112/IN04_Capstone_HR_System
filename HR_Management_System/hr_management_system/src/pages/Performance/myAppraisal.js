import { PaperClipIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import PerformanceSidebar from "../../components/Sidebar/Performance";
import api from "../../utils/api";

export default function MyAppraisal() {
  const appraisalId = window.location.href.substring(46);
  const [appraisal, setAppraisal] = useState(null);

  useEffect(() => {
    console.log(appraisalId);
    api.getAppraisalById(appraisalId).then((response) => {
      setAppraisal(response.data);
      console.log(response.data);
    });
  }, []);

  function showRating(rating) {
    if (rating === 1) {
      return "1 - Outstanding";
    } else if (rating === 2) {
      return "2 - Exceeds Expectations";
    } else if (rating === 3) {
      return "3 - Meets Expectations";
    } else if (rating === 4) {
      return "4 - Development Needed";
    } else if (rating === 5) {
      return "5 - Unsatisfactory";
    } else {
      return "Select";
    }
  }

  return (
    appraisal && (
      <>
        <div>
          <Navbar />
          <div className="flex">
            <div className="flex-1">
              <PerformanceSidebar
                currentPage={{
                  name: "Appraisals",
                  href: "/performance/appraisals",
                  current: true,
                }}
              />
            </div>
          </div>
        </div>
        <div className="overflow-hidden bg-white shadow sm:rounded-lg mx-32 my-10">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg text-left font-medium font-semibold font-sans leading-6 text-indigo-800">
              Appraisal by {appraisal.managerAppraising.firstName}{" "}
              {appraisal.managerAppraising.lastName}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-left text-gray-500 font-sans">
              About {appraisal.employee.firstName} {appraisal.employee.lastName}{" "}
              for the year {appraisal.appraisalYear}
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                <dt className="text-md text-left font-medium font-semibold font-sans text-gray-700">
                  Strengths
                </dt>
                <dd className="mt-1 text-md text-gray-900 font-sans sm:col-span-2 sm:mt-0">
                  {appraisal.strengths}
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                <dt className="text-md text-left font-medium font-semibold font-sans text-gray-700">
                  Weaknesses
                </dt>
                <dd className="mt-1 text-md text-gray-900 font-sans sm:col-span-2 sm:mt-0">
                  {appraisal.weaknesses}
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                <dt className="text-md text-left font-medium font-semibold font-sans text-gray-700">
                  Rating
                  <div className="text-sm text-gray-500 font-sans">
                    <div>1 - Outstanding</div>
                    <div>2 - Exceeds Expectations</div>
                    <div>3 - Meets Expectations</div>
                    <div>4 - Development Needed</div>
                    <div>5 - Unsatisfactory</div>
                  </div>
                </dt>
                <dd className="mt-1 text-md text-gray-900 font-sans sm:col-span-2 sm:mt-0">
                  {showRating(appraisal.rating)}
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                <dt className="text-md text-left font-medium font-semibold font-sans text-gray-700">
                  Recommended for promotion
                </dt>
                <dd className="mt-1 text-md text-gray-900 font-sans sm:col-span-2 sm:mt-0">
                  {appraisal.promotion ? <>Yes (View more)</> : <>No</>}
                </dd>
              </div>
              {/* <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">About</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
                incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
                consequat sint. Sit id mollit nulla mollit nostrud in ea officia
                proident. Irure nostrud pariatur mollit ad adipisicing
                reprehenderit deserunt qui eu.
              </dd>
            </div> */}
              {/* <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">Attachments</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <ul
              role="list"
              className="divide-y divide-gray-200 rounded-md border border-gray-200"
            >
              <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                <div className="flex w-0 flex-1 items-center">
                  <PaperClipIcon
                    className="h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="ml-2 w-0 flex-1 truncate">
                    resume_back_end_developer.pdf
                  </span>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Download
                  </a>
                </div>
              </li>
              <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                <div className="flex w-0 flex-1 items-center">
                  <PaperClipIcon
                    className="h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="ml-2 w-0 flex-1 truncate">
                    coverletter_back_end_developer.pdf
                  </span>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Download
                  </a>
                </div>
              </li>
            </ul>
          </dd>
        </div> */}
            </dl>
          </div>
        </div>
      </>
    )
  );
}
