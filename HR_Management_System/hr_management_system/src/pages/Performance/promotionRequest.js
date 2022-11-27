import { CheckIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import PerformanceSidebar from "../../components/Sidebar/Performance";
import Interview from "../../features/jobchange/interview";
import Nomination from "../../features/jobchange/nomination";
import NominationUneditable from "../../features/jobchange/nominationUneditable";
import api from "../../utils/api";

const steps = [
  {
    id: "01",
    name: "Nomination",
    description: "Reporting Officer provides promotion details.",
    href: "#",
    status: "current",
  },
  {
    id: "02",
    name: "Interview",
    description: "Potential Manager conducts interview.",
    href: "",
    status: "upcoming",
  },
  {
    id: "03",
    name: "Processing",
    description: "HR processes promotion request.",
    href: "",
    status: "upcoming",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PromotionRequest() {
  const [request, setRequest] = useState(null);
  const [selectedStep, setSelectedStep] = useState(steps[0]);
  const requestId = window.location.href.substring(32);

  useEffect(() => {
    //console.log(requestId);
    api.getPromotionRequest(requestId).then((response) => {
      setRequest(response.data);

      renderSelectedStep(response.data.status);

      console.log(response.data);
    });
  }, []);

  function renderSelectedStep(status) {
    //console.log(status);
    if (status === "Created" || status === "Withdrawn") {
      setSelectedStep(steps[0]);
    } else if (status === "Submitted") {
      steps.map((s) => (s.status = "upcoming"));
      steps
        .filter((s) => s.id === "01")
        .map((step) => (step.status = "complete"));
      steps
        .filter((s) => s.id === "02")
        .map((step) => (step.status = "current"));
      setSelectedStep(steps[1]);
    } else if (status === "Passed" || status === "Failed") {
      steps.map((s) => (s.status = "upcoming"));
      steps
        .filter((s) => s.id === "01")
        .map((step) => (step.status = "complete"));
      steps
        .filter((s) => s.id === "02")
        .map((step) => (step.status = "complete"));
      steps
        .filter((s) => s.id === "03")
        .map((step) => (step.status = "current"));
      setSelectedStep(steps[2]);
    }
  }

  function renderStep() {
    if (selectedStep.id === "01") {
      if (request.status === "Created") {
        return <Nomination request={request} />;
      } else {
        return <NominationUneditable request={request} />;
      }
    } else if (selectedStep.id === "02") {
      if (request.status === "Submitted") {
        return <Interview request={request} />
      } else if (request.status === "Passed" || request.status === "Failed") {

      }
    } else if (selectedStep.id === "03") {
    } else {
      return <h1>Error</h1>;
    }

    // if (request.status === "Created") {
    //   return <Nomination request={request} />;
    // } else if (request.status === "Withdrawn") {
    //   return <NominationUneditable request={request} />;
    // } else if (request.status === "Submitted") {
    //   return <Interview request={request} />;
    // }
  }

  function changeStep(step) {
    setSelectedStep(step);
    console.log("complete click " + step.id + " selected " + selectedStep.id);
  }

  return (
    request && (
      <div>
        <Navbar />
        <div className="flex">
          <div className="flex-1">
            <PerformanceSidebar
              currentPage={{
                name: "Promotion",
                href: "/promotion",
                current: true,
              }}
            />
          </div>
        </div>
        <nav
          className="mx-auto max-w-7xl border-b px-4 sm:px-6 lg:px-8"
          aria-label="Progress"
        >
          <ol
            role="list"
            className="overflow-hidden rounded-md lg:flex lg:rounded-none lg:border-l lg:border-r lg:border-gray-200"
          >
            {steps.map((step, stepIdx) => (
              <li key={step.id} className="relative overflow-hidden lg:flex-1">
                <div
                  className={classNames(
                    stepIdx === 0 ? "border-b-0 rounded-t-md" : "",
                    stepIdx === steps.length - 1
                      ? "border-t-0 rounded-b-md"
                      : "",
                    "border border-gray-200 overflow-hidden lg:border-0"
                  )}
                >
                  {step.status === "complete" ? (
                    <button
                      onClick={() => {
                        changeStep(step);
                      }}
                      className="group"
                    >
                      <span
                        className={classNames(
                          selectedStep.id === step.id ? "bg-indigo-600" : "",
                          "absolute top-0 left-0 h-full w-1 group-hover:bg-gray-200 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
                        )}
                        aria-hidden="true"
                      />
                      <span
                        className={classNames(
                          stepIdx !== 0 ? "lg:pl-9" : "",
                          "px-6 py-5 flex items-start text-sm font-medium"
                        )}
                      >
                        <span className="flex-shrink-0">
                          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600">
                            <CheckIcon
                              className="h-6 w-6 text-white"
                              aria-hidden="true"
                            />
                          </span>
                        </span>
                        <span className="mt-0.5 ml-4 flex min-w-0 flex-col">
                          <span className="text-sm font-medium">
                            {step.name}
                          </span>
                          <span className="text-sm font-medium text-gray-500">
                            {step.description}
                          </span>
                        </span>
                      </span>
                    </button>
                  ) : step.status === "current" ? (
                    <button
                      onClick={() => {
                        changeStep(step);
                      }}
                      aria-current="step"
                    >
                      <span
                        className={classNames(
                          selectedStep.id === step.id ? "bg-indigo-600" : "",
                          "absolute top-0 left-0 h-full w-1 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
                        )}
                        aria-hidden="true"
                      />
                      <span
                        className={classNames(
                          stepIdx !== 0 ? "lg:pl-9" : "",
                          "px-6 py-5 flex items-start text-sm font-medium"
                        )}
                      >
                        <span className="flex-shrink-0">
                          <span
                            className={
                              "flex h-10 w-10 items-center justify-center rounded-full border-2 border-indigo-600"
                            }
                          >
                            <span className="text-indigo-600">{step.id}</span>
                          </span>
                        </span>
                        <span className="mt-0.5 ml-4 flex min-w-0 flex-col">
                          <span className="text-sm font-medium text-indigo-600">
                            {step.name}
                          </span>
                          <span className="text-sm font-medium text-gray-500">
                            {step.description}
                          </span>
                        </span>
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        console.log(step.id);
                      }}
                      className="group"
                    >
                      <span
                        className="absolute top-0 left-0 h-full w-1 bg-transparent lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
                        aria-hidden="true"
                      />
                      <span
                        className={classNames(
                          stepIdx !== 0 ? "lg:pl-9" : "",
                          "px-6 py-5 flex items-start text-sm font-medium"
                        )}
                      >
                        <span className="flex-shrink-0">
                          <span
                            className={
                              "flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300"
                            }
                          >
                            <span className="text-gray-500">{step.id}</span>
                          </span>
                        </span>
                        <span className="mt-0.5 ml-4 flex min-w-0 flex-col">
                          <span className="text-sm font-medium text-gray-500">
                            {step.name}
                          </span>
                          <span className="text-sm font-medium text-gray-500">
                            {step.description}
                          </span>
                        </span>
                      </span>
                    </button>
                  )}

                  {stepIdx !== 0 ? (
                    <>
                      {/* Separator */}
                      <div
                        className="absolute inset-0 top-0 left-0 hidden w-3 lg:block"
                        aria-hidden="true"
                      >
                        <svg
                          className="h-full w-full text-gray-300"
                          viewBox="0 0 12 82"
                          fill="none"
                          preserveAspectRatio="none"
                        >
                          <path
                            d="M0.5 0V31L10.5 41L0.5 51V82"
                            stroke="currentcolor"
                            vectorEffect="non-scaling-stroke"
                          />
                        </svg>
                      </div>
                    </>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </nav>
        <div>
          <main>{renderStep()}</main>
        </div>
      </div>
    )
  );
}
