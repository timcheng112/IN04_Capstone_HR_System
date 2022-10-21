import {
  EyeIcon,
  CheckIcon,
  XMarkIcon,
  MagnifyingGlassIcon
} from "@heroicons/react/20/solid";
import ApprovalModal from "../leave/ApproveModal";
import RejectModal from "../leave/RejectModal";
import ViewModal from "../leave/ViewModal";
import { useState, useEffect } from "react";

export default function LeaveOptions({ leave, refreshKeyHandler }) {
  const [approve, setApprove] = useState(false);
  const [reject, setReject] = useState(false);
  const [view, setView] = useState(false);

  return (
    <div>
      <div className="space-x-4">
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => setView(true)}
        >
          <EyeIcon
            className="md:-ml-0.5 md:mr-2 h-4 w-4"
            aria-hidden="true"
          />
          <span className="hidden md:block">View</span>
        </button>

        {leave.status === 'PENDING' && <button
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          onClick={() => setApprove(true)}
        >
          <CheckIcon
            className="md:-ml-0.5 md:mr-2 h-4 w-4"
            aria-hidden="true"
          />
          <span className="hidden md:block">Approve</span>
        </button>}

        {leave.status === 'PENDING' && <button
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          onClick={() => setReject(true)}
        >
          <XMarkIcon
            className="md:-ml-0.5 md:mr-2 h-4 w-4"
            aria-hidden="true"
          />
          <span className="hidden md:block">Reject</span>
        </button>}
      </div>
      <ApprovalModal
        open={approve}
        setOpen={() => setApprove(false)}
        leave={leave}
        refreshKeyHandler={refreshKeyHandler} />
      <RejectModal
        open={reject}
        setOpen={() => setReject(false)}
        leave={leave}
        refreshKeyHandler={refreshKeyHandler} />
      <ViewModal
        open={view}
        setOpen={() => setView(false)}
        leave={leave} />
    </div>
  )


}