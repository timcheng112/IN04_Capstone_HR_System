import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import PerformanceSidebar from "../../components/Sidebar/Performance";
import api from "../../utils/api";
import { Switch } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Appraisal() {
  const appraisalId = window.location.href.substring(44);
  const [appraisal, setAppraisal] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [year, setYear] = useState("");
  const [strengths, setStrengths] = useState("");
  const [weaknesses, setWeaknesses] = useState("");
  const [rating, setRating] = useState("Select");
  const [promote, setPromote] = useState(false);
  const [justification, setJustification] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    //console.log(appraisalId);
    api.getAppraisalById(appraisalId).then((response) => {
      setAppraisal(response.data);
      setEmployee(response.data.employee);
      //console.log(response.data);
      setStrengths(response.data.strengths);
      setWeaknesses(response.data.weaknesses);
      setRatingSelect(response.data.rating);
      setPromote(response.data.promotion);
      setJustification(response.data.promotionJustification);
      setSubmitted(response.data.submitted);
    });
  }, []);

  function setRatingSelect(rating) {
    if (rating === 1) {
      setRating("1 - Outstanding");
    } else if (rating === 2) {
      setRating("2 - Exceeds Expectations");
    } else if (rating === 3) {
      setRating("3 - Meets Expectations");
    } else if (rating === 4) {
      setRating("4 - Development Needed");
    } else if (rating === 5) {
      setRating("5 - Unsatisfactory");
    } else {
      setRating("Select");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (strengths && weaknesses && rating && promote && justification) {
      api
        .submitAppraisal(
          appraisalId,
          strengths,
          weaknesses,
          parseInt(rating.substring(0, 1)),
          promote,
          justification
        )
        .then((response) => {
          alert(response.data);
          setSubmitted(true);
        });
    } else {
      alert("Please ensure all fields are not empty before submitting");
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    //console.log(parseInt(rating.substring(0, 1)));

    var rate = 0;
    if (rating !== "Select") {
      rate = parseInt(rating.substring(0, 1));
    }

    var promotion = promote;
    if (!promote) {
      promotion = false;
    }

    api
      .saveAppraisal(
        appraisalId,
        strengths,
        weaknesses,
        rate,
        promotion,
        justification
      )
      .then((response) => alert(response.data));
  };

  return (
    appraisal &&
    employee && (
      <div className="">
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
        <div>
          <div className="mt-10 mx-16 md:gap-6">
            <div className="md:col-span-1">
              <div className="mt-2 px-4 sm:px-0">
                <h2 className="text-lg font-medium leading-6 text-gray-900">
                  Appraisal for
                </h2>
                <h2 className="text-lg font-semibold leading-6 text-gray-900">
                  {employee.firstName} {employee.lastName}
                </h2>
                <h3 className="mt-1 text-md text-gray-600">
                  Appraisal period {appraisal.appraisalYear}
                </h3>
                {submitted && (
                  <span className="inline-flex items-center rounded-full bg-green-100 px-3 mt-1 py-0.5 text-sm font-medium text-green-800">
                    Submitted
                  </span>
                )}
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form onSubmit={handleSubmit}>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  {!submitted && (
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                  )}
                </div>
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                  <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                    <div className="">
                      <div className="">
                        <label
                          htmlFor="strengths"
                          className="block text-md text-left font-sans font-medium text-gray-900"
                        >
                          Strengths
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="strengths"
                            name="strengths"
                            rows={3}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder=""
                            value={strengths}
                            onChange={(s) => setStrengths(s.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="weaknesses"
                        className="block text-md text-left font-sans font-medium text-gray-900"
                      >
                        Weaknesses
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="weaknesses"
                          name="weaknesses"
                          rows={3}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder=""
                          value={weaknesses}
                          onChange={(w) => setWeaknesses(w.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-md mb-2 text-left font-medium font-sans text-gray-900">
                        Rating
                      </label>
                      <div className="sm:col-span-2 sm:mt-0">
                        <select
                          id="country"
                          name="country"
                          autoComplete="country-name"
                          className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                          value={rating}
                          onChange={(r) => setRating(r.target.value)}
                        >
                          <option>Select</option>
                          <option>1 - Outstanding</option>
                          <option>2 - Exceeds Expectations</option>
                          <option>3 - Meets Expectations</option>
                          <option>4 - Development Needed</option>
                          <option>5 - Unsatisfactory</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-md text-left font-medium font-sans text-gray-900">
                        Promotion
                      </label>
                      <Switch.Group
                        as="div"
                        className="flex items-center justify-between"
                      >
                        <span className="flex flex-grow flex-col">
                          <Switch.Description
                            as="span"
                            className="text-sm text-left text-gray-500"
                          >
                            You will be required to complete a promotion request by recommending this employee for promotion
                          </Switch.Description>
                        </span>
                        <Switch
                          checked={promote}
                          onChange={setPromote}
                          className={classNames(
                            promote ? "bg-indigo-600" : "bg-gray-200",
                            "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={classNames(
                              promote ? "translate-x-5" : "translate-x-0",
                              "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                            )}
                          />
                        </Switch>
                      </Switch.Group>
                    </div>

                    <div>
                      {promote ? (
                        <>
                          {" "}
                          <label
                            htmlFor="justification"
                            className="block text-md text-left font-sans font-medium text-gray-900"
                          >
                            Promotion Justification
                          </label>
                          <div className="mt-1">
                            <textarea
                              id="justification"
                              name="justification"
                              rows={3}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              placeholder=""
                              value={justification}
                              onChange={(j) => setJustification(j.target.value)}
                            />
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    {!submitted && (
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 mx-2 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
