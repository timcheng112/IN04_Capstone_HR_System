export default function Steps({completion, step}) {
    return (
      <div>
        {/* <h4 className="sr-only">Status</h4>
        <p className="text-sm font-medium text-gray-900">Promotion Application...</p> */}
        <div className="mt-6" aria-hidden="true">
          <div className="overflow-hidden rounded-full bg-gray-200">
            <div className="h-2 rounded-full bg-indigo-600" style={{ width: completion }} />
          </div>
          <div className="mt-6 hidden grid-cols-4 text-sm font-medium text-gray-600 sm:grid">
            {step > 1 ?<div className=" text-center text-indigo-600">Apply for Promotion Request</div> :<div className=" text-center">Apply for Promotion Request</div>}
            {step > 2 ?<div className=" text-center text-indigo-600">Processing Application</div> :<div className=" text-center">Processing Application</div>}
            {step > 3 ?<div className=" text-center text-indigo-600">Interview Applicant</div> : <div className="text-center">Interview Applicant</div>}
            {step > 4 ?<div className=" text-center text-indigo-600">Approval of Application</div> : <div className="text-center">Approval of Application</div>}
          </div>
        </div>
      </div>
    )
  }
  