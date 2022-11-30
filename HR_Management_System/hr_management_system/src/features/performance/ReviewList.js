import {
  CheckCircleIcon,
  ChevronRightIcon,
  EnvelopeIcon,
  PlayCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

export default function ReviewList({ reviews }) {
  function renderReviewStatus(item) {
    if (item.status === "Incomplete") {
      return (
        <div className="flex row">
          <XCircleIcon
            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
            aria-hidden="true"
          />
          Incomplete
        </div>
      );
    } else if (item.status === "In Progress") {
      return (
        <div className="flex row">
          <PlayCircleIcon
            className="mr-1.5 h-5 w-5 flex-shrink-0 text-amber-400"
            aria-hidden="true"
          />
          In Progress
        </div>
      );
    } else if (item.status === "Completed") {
      return (
        <div className="flex row">
          <CheckCircleIcon
            className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
            aria-hidden="true"
          />
          Completed
        </div>
      );
    } else {
      return (
        <div className="flex row">
          <XCircleIcon
            className="mr-1.5 h-5 w-5 flex-shrink-0 text-red-400"
            aria-hidden="true"
          />
          Overdue
        </div>
      );
    }
  }

  return (
    reviews &&
    <>
      <div className="overflow-hidden bg-white shadow sm:rounded-md mt-5 ">
        <ul role="list" className="divide-y divide-gray-200">
          {reviews.map((review) => (
            <li key={review.reviewId}>
              <a
                href={`/performance/review/${review.reviewId}`}
                className="block hover:bg-gray-50"
              >
                <div className="flex items-center px-4 py-4 sm:px-6">
                  <div className="flex min-w-0 flex-1 items-center">
                    <div className="flex-shrink-0">
                      <img className="h-12 w-12 rounded-full" src="" alt="" />
                    </div>
                    <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                      <div>
                        <p className="truncate text-sm text-left font-medium text-indigo-600">
                          {review.manager.firstName} {review.manager.lastName}
                        </p>
                        <span className="mt-2 flex items-center text-sm text-gray-500">
                          <EnvelopeIcon
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          <span className="truncate">
                            {review.manager.workEmail}
                          </span>
                        </span>
                      </div>
                      <div className="hidden md:block">
                        <div>
                          <p className="text-sm text-gray-900 text-left"></p>
                          <div className="mt-2 flex items-center text-sm text-gray-500">
                            {renderReviewStatus(review)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <ChevronRightIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
