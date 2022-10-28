import {
  EyeIcon,
  XMarkIcon,
  CheckIcon,
  PencilIcon
} from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";

export default function MyApplicationOption({ application }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  return (
    <div>
      <div className="space-x-4">
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <EyeIcon
            className="md:-ml-0.5 md:mr-2 h-4 w-4"
            aria-hidden="true"
          />
          <span className="hidden md:block">Detail</span>
        </button>
        {application.status === 'pending' &&
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <PencilIcon
                className="md:-ml-0.5 md:mr-2 h-4 w-4"
                aria-hidden="true"
              />
              <span className="hidden md:block">Edit</span>
            </button>}
            {application.status === 'pending' &&
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              <XMarkIcon
                className="md:-ml-0.5 md:mr-2 h-4 w-4"
                aria-hidden="true"
              />
              <span className="hidden md:block">Withdraw</span>
            </button>}

          {application.status === 'offered' &&
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <CheckIcon
                className="md:-ml-0.5 md:mr-2 h-4 w-4"
                aria-hidden="true"
              />
              <span className="hidden md:block">Accept</span>
            </button>}
            {application.status === 'offered' &&
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              <XMarkIcon
                className="md:-ml-0.5 md:mr-2 h-4 w-4"
                aria-hidden="true"
              />
              <span className="hidden md:block">Reject</span>
            </button>}
      </div>
    </div>
  )

}