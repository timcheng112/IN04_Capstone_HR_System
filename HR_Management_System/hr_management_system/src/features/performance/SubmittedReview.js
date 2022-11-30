import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import api from "../../utils/api";

export default function SubmittedReview({ reviewId }) {
  const [review, setReview] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const history = useHistory();

  useEffect(() => {
    api.getReviewById(reviewId).then((response) => {
      setReview(response.data);
      api.getReviewPeriodByYear(response.data.reviewYear).then((response) => {
        setStartDate(response.data.startDate);
        setEndDate(response.data.endDate);
      });
    });
  }, []);

  function withinCurrentPeriod() {
    const now = new Date().setHours(0, 0, 0, 0);
    //console.log("now? " + startDate + " - " + endDate);
    return (
      now >= new Date(startDate).setHours(0, 0, 0, 0) &&
      now <= new Date(endDate).setHours(0, 0, 0, 0)
    );
  }

  const handleDelete = (e) => {
    e.preventDefault();

    const month = Number(new Date(endDate).getMonth()) + 1;

    const confirm = window.confirm(
      "Are you sure you want to delete this submitted review? You will have to submit another review for this employee by " +
        new Date(endDate).getDate() +
        "/" +
        month +
        "/" +
        new Date(endDate).getFullYear() +
        "."
    );

    if (confirm) {
      //delete reivew
      api
        .deleteReview(reviewId)
        .then((response) => {
          alert(response.data);
        })
        .finally(() => history.push("/performance/reviews"));
    }
  };

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
    review &&
    startDate &&
    endDate && (
      <div>
        <div className="overflow-hidden bg-white shadow sm:rounded-lg mx-32 my-10">
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                <dt className="text-md text-left font-medium font-semibold font-sans text-gray-700">
                  Strengths
                </dt>
                <dd className="mt-1 text-md text-gray-900 font-sans sm:col-span-2 sm:mt-0">
                  {review.strengths}
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                <dt className="text-md text-left font-medium font-semibold font-sans text-gray-700">
                  Weaknesses
                </dt>
                <dd className="mt-1 text-md text-gray-900 font-sans sm:col-span-2 sm:mt-0">
                  {review.weaknesses}
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
                  {showRating(review.rating)}
                </dd>
              </div>
            </dl>
          </div>
        </div>
        {withinCurrentPeriod() && (
          <>
            <button
              type="button"
              className="inline-flex justify-end rounded-md border border-transparent bg-indigo-600 mx-2 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={handleDelete}
            >
              Delete
            </button>
          </>
        )}
      </div>
    )
  );
}
