import {
  ChevronRightIcon,
  CurrencyDollarIcon,
  EnvelopeIcon,
} from '@heroicons/react/20/solid'
import { useState, useEffect } from "react";
import { useHistory, useLocation } from 'react-router-dom';

export default function ApplicantList({candidates,job}){
  const history = useHistory();
  return(
    <ul role="list" className="mt-5 divide-y divide-gray-200 border-t border-gray-200 sm:mt-0 sm:border-t-0">
            {candidates.map((candidate) => (
              <li key={candidate.applicationId}>
                <a href="#" className="group block">
                  <div className="flex items-center py-5 px-4 sm:py-6 sm:px-0">
                    <div className="flex min-w-0 flex-1 items-center">
                      <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                        <div>
                          <p className="flex truncate text-sm font-medium text-purple-600">{candidate.applicant.firstName}  {candidate.applicant.lastName}</p>
                          <p className="mt-2 flex items-center text-sm text-gray-500">
                            <EnvelopeIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                            <span className="truncate">{candidate.applicant.email}</span>
                          </p>
                        </div>
                        <div className="hidden md:block">
                          <div>
                            <p className="text-sm text-gray-900">
                              Applied on {candidate.applyDate}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <button
                        type='button'
                        onClick={() => history.push({ pathname: "/hiring/applicantdetail", state: { applicant: candidate, job: job } })}>
                        <ChevronRightIcon
                          className="h-5 w-5 text-gray-400 group-hover:text-gray-700"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
  )
}