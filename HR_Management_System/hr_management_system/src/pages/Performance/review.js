import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Navbar from "../../components/Navbar";
import PerformanceSidebar from "../../components/Sidebar/Performance";
import SubmittedReview from "../../features/performance/SubmittedReview";
import api from "../../utils/api";

export default function Review() {
  const [review, setReview] = useState(null);
  const [strengths, setStrengths] = useState("");
  const [weaknesses, setWeaknesses] = useState("");
  const [rating, setRating] = useState("Select");
  const [overdue, setOverdue] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const history = useHistory();
  const reviewId = window.location.href.substring(41);

  useEffect(() => {
    api.getReviewById(reviewId).then((response) => {
      setReview(response.data);
      console.log(response.data);

      setStrengths(response.data.strengths);
      setWeaknesses(response.data.weaknesses);
      setRatingSelect(response.data.rating);

      if (response.data.status === "Completed") {
        setSubmitted(true);
      } else if (response.data.status === "Overdue") {
        setOverdue(true);
      }
    });
  }, []);

  useEffect(() => {
    api.getReviewById(reviewId).then((response) => {
      setReview(response.data);
      console.log(response.data);

      setStrengths(response.data.strengths);
      setWeaknesses(response.data.weaknesses);
      setRatingSelect(response.data.rating);

      if (response.data.status === "Completed") {
        setSubmitted(true);
      } else if (response.data.status === "Overdue") {
        setOverdue(true);
      }
    });
  }, [refresh]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (strengths && weaknesses && rating !== "Select") {
      var confirm;
      if (overdue) {
        confirm = window.confirm(
          "Are you sure you want to submit? You will not be able to update the appraisal after submission."
        );
      } else {
        confirm = window.confirm(
          "Are you sure you want to submit? You will not be able to update the appraisal without deleting after submission."
        );
      }

      if (confirm) {
        api
          .submitReview(
            reviewId,
            strengths,
            weaknesses,
            parseInt(rating.substring(0, 1))
          )
          .then((response) => {
            alert(response.data);
            setRefresh(!refresh);
          });
      }
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

    api
      .saveReview(reviewId, strengths, weaknesses, rate)
      .then((response) => alert(response.data));
  };

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

  return (
    review && (
      <div>
        <Navbar />
        <div className="flex">
          <div className="flex-1">
            <PerformanceSidebar
              currentPage={{
                name: "Reviews",
                href: "/performance/reviews",
                current: true,
              }}
            />
          </div>
        </div>
        <div className="mt-10 mx-16 md:gap-6">
          <div className="md:col-span-1">
            <div className="mt-2 px-4 sm:px-0">
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 mb-10 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => history.goBack()}
              >
                <ArrowLeftIcon
                  className="-ml-1 mr-3 h-5 w-5"
                  aria-hidden="true"
                />
                Go Back
              </button>
              {overdue ? (
                <>
                  <h2 className="text-lg font-medium leading-6 text-red-600">
                    Review for
                  </h2>
                  <h2 className="text-lg font-semibold leading-6 text-red-600">
                    {review.manager.firstName} {review.manager.lastName}
                  </h2>
                  <h3 className="mt-1 text-md text-red-600">
                    Review period {review.reviewYear}
                  </h3>
                  <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-0.5 mt-2 text-sm font-medium text-red-800">
                    Overdue
                  </span>
                </>
              ) : (
                <>
                  <h2 className="text-lg font-medium leading-6 text-gray-900">
                    Review for
                  </h2>
                  <h2 className="text-lg font-semibold leading-6 text-gray-900">
                    {review.manager.firstName} {review.manager.lastName}
                  </h2>
                  <h3 className="mt-1 text-md text-gray-600">
                    Review period {review.reviewYear}
                  </h3>
                  {submitted && (
                    <span className="inline-flex items-center rounded-full bg-green-100 px-3 mt-1 py-0.5 text-sm font-medium text-green-800">
                      Submitted
                    </span>
                  )}
                </>
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
              {submitted ? (
                <>
                  <SubmittedReview reviewId={reviewId} />
                </>
              ) : (
                <>
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
                    </div>
                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                      {!submitted && (
                        <>
                          <button
                            type="submit"
                            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 mx-2 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Submit
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    )
  );
}
