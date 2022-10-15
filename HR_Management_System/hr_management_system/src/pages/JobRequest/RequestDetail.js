import Navbar from "../../components/Navbar";
import Department from "../../components/ComboBox/Department";
import Team from "../../components/ComboBox/Team";
import JobType from "../../components/ComboBox/JobType";
import JobRole from "../../components/ComboBox/Role";
import JobRequirements from "../../features/jobrequest/JobRequirements";
import { useState, useEffect } from "react";
import { useParams } from 'react-router';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useHistory, useLocation } from 'react-router-dom';
import api from "../../utils/api";
import { getUserId } from "../../utils/Common";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function RequestDetail() {
  const [startDate, setStartDate] = useState();//needs to change to default value
  const history = useHistory();
  const [request, setRequest] = useState();
  const [requestId, setRequestId] = useState();
  const [department, setDepartment] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [justification, setJustification] = useState();
  const [salary, setSalary] = useState();
  const [jobType, setJobType] = useState();
  const [jobRole, setJobRole] = useState();
  const [requirements, setRequirements] = useState();
  const [team, setTeam] = useState();
  const [status, setStatus] = useState();
  const location = useLocation();

  const jobTypesLib = [
    { id: 1, name: 'Full Time' },
    { id: 2, name: 'Part Time' },
    { id: 3, name: 'Contract' },
    { id: 4, name: 'Intern' },
  ]

  const rolesLib = [
    { id: 1, name: 'Employee' },
    { id: 2, name: 'Manager' },
  ]

  useEffect(() => {
    console.log(location.state.request.jobType)
    console.log(location.state.request);
    setRequest(location.state.request)
    setTitle(location.state.request.jobTitle)
    setDescription(location.state.request.jobDescription)
    setJustification(location.state.request.justification)
    setSalary(location.state.request.salary)
    setStatus(location.state.request.status)
    // reset JobType into JSON Object from String
    var jobT;
    if (location.state.request.jobType == "FULLTIME") {
      jobT = jobTypesLib[0];
    } else if (location.state.request.jobType == "PARTTIME") {
      jobT = jobTypesLib[1];
    } else if (location.state.request.jobType == "CONTRACT") {
      jobT = jobTypesLib[2];
    } else {
      jobT = jobTypesLib[3];
    }
    setJobType(jobT)

    // reset JobRole
    var roleT;
    if (location.state.request.jobRole == "EMPLOYEE") {
      roleT = rolesLib[0];
    } else {
      roleT = rolesLib[1];
    }
    setJobRole(roleT)

    let yyyy = location.state.request.preferredStartDate.slice(0, 4)
    let mm = location.state.request.preferredStartDate.slice(5, 7)
    let dd = location.state.request.preferredStartDate.slice(8, 10)
    // console.log(yyyy + " " + mm + " " + dd)
    console.log(new Date(parseInt(yyyy), parseInt(mm), parseInt(dd)))
    setStartDate(new Date(parseInt(yyyy), parseInt(mm), parseInt(dd)))

    // reset requirements
    console.log(location.state.request);
    const userOptions = location.state.request.jobPostRequirements.map(skill => ({
      "value": skill.skillsetId,
      "label": skill.skillsetName
    }))
    console.log("USER'S REQUIREMENTS")
    console.log(userOptions)
    setRequirements(userOptions)

    setTeam(location.state.request.team)
  }, [location]);

  useEffect(() => {
    api
      .getUser(getUserId())
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch((error) => setError(error));
  }, []);


  useEffect(() => {
    api
      .getDepartmentByEmployeeId(getUserId())
      .then((response) => {
        setDepartment(response.data);
      })
      .catch((error) => setError(error));
  }, []);

  function saveRequest() {
    let arr = []
    arr = requirements.map(x => x.value)
    var teamId = team == null ? 0 : team.teamId;
    var date = startDate.getDate()
    if (startDate.getDate() < 10) {
      date = "0" + date;
    }
    var month = startDate.getMonth() + 1;
    if (month < 10) {
      month = "0" + (month);
    }

    var preferredStartDate = (startDate.getYear() + 1900) + "-" + month + "-" + date;

    if (jobType == null) {
      alert("Please select a Job Type");
      return 1
    } else if (jobRole == null) {
      alert("Please select a Job Role");
      return 1;
    }

    //    console.log(title);
    api
      .saveJobRequest(title, description, justification, preferredStartDate.trim(), jobType.name.toUpperCase(), jobRole.name.toUpperCase(), salary, arr, 0, teamId, getUserId(), request.requestId)
      .then(() => alert("Successfully saved Job Request."))
      .catch((error) => {
        var message = error.request.response;
        if (message.includes("jobTitle is missing") || message.includes("jobDescription is missing") || message.includes("justification is missing") || message.includes("salary is missing")) {
          alert("Job Title, Description, Justification and Salary cannot be blank");
        } else if (message.includes("preferredStartDate is missing") || message.includes("preferredStartDate is invalid")) {
          alert("Preferred Start Date provided is invalid");
        } else if (message.includes("jobTypeEnum is missing")) {
          alert("Please select a Job Type");
        } else if (message.includes("roleEnum is missing")) {
          alert("Please select a Job Role");
        } else if (message.includes("salary is invalid")) {
          alert("Please input a valid salary amount");
        } else {
          setError(error);
        }
        console.log("returning 1")
      });
    return 0;
    // .catch((error) => setError(error));
  }

  function submitRequest() {
    let arr = []
    arr = requirements.map(x => x.value)
    var teamId = team == null ? 0 : team.teamId;
    var date = startDate.getDate()
    if (startDate.getDate() < 10) {
      date = "0" + date;
    }
    var month = startDate.getMonth() + 1;
    if (month < 10) {
      month = "0" + (month);
    }

    var preferredStartDate = (startDate.getYear() + 1900) + "-" + month + "-" + date;

    if (jobType == null) {
      alert("Please select a Job Type");
      return 1
    } else if (jobRole == null) {
      alert("Please select a Job Role");
      return 1;
    }

    api
      .submitJobRequest(title, description, justification, preferredStartDate.trim(), jobType.name.toUpperCase(), jobRole.name.toUpperCase(), salary, arr, 0, teamId, getUserId(), request.requestId)
      .then(() => alert("Successfully submitted Job Request."))
      .catch((error) => {
        var message = error.request.response;
        if (message.includes("jobTitle is missing") || message.includes("jobDescription is missing") || message.includes("justification is missing") || message.includes("salary is missing")) {
          alert("Job Title, Description, Justification and Salary cannot be blank");
        } else if (message.includes("preferredStartDate is missing") || message.includes("preferredStartDate is invalid")) {
          alert("Preferred Start Date provided is invalid");
        } else if (message.includes("jobTypeEnum is missing")) {
          alert("Please select a Job Type");
        } else if (message.includes("roleEnum is missing")) {
          alert("Please select a Job Role");
        } else if (message.includes("salary is invalid")) {
          alert("Please input a valid salary amount");
        } else {
          setError(error);
        }
        console.log("returning 1")
      });
    return 0;
    // .catch((error) => setError(error));
  }


  function approveRequest() {
    api.approveJobRequestById(request.requestId, getUserId())
      .then(() => alert("Job Request approved, Job Posting successfully created"))
      .catch((error) => console.log(error));
    user !== null && user.hrEmployee ? (history.push("/hiring/jobrequesthr")) : (history.push("/hiring/jobrequest"))
  }

  function rejectRequest() {
    api.rejectJobRequestById(request.requestId, getUserId())
      .then(() => alert("Job Request rejected"))
      .catch((error) => console.log(error));
    user !== null && user.hrEmployee ? (history.push("/hiring/jobrequesthr")) : (history.push("/hiring/jobrequest"))
  }

  function getJobType() {
    return jobType;
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    var result = 0;
    if (useState.button === 1) {
      result = saveRequest();
    }
    if (useState.button === 2) {
      result = submitRequest();
    }
    if (result === 0) {
      user !== null && user.hrEmployee ? (history.push("/hiring/jobrequesthr")) : (history.push("/hiring/jobrequest"))
    }
  };


  return (
    <div className="">
      <Navbar />
      <div className="py-5"></div>
      <form className="space-y-8 divide-y divide-gray-200" onSubmit={handleSubmit}>
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div className="space-y-6 sm:space-y-5">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Job Request Details</h3>
            </div>
            <div className="space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Title
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <div className="flex max-w-lg rounded-md shadow-sm">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      required
                      disabled={status === 'PENDING' ? false : true}
                      value={title}
                      className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Description
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <textarea
                    id="description"
                    name="description"
                    rows={5}
                    required
                    disabled={status === 'PENDING' ? false : true}
                    value={description}
                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="justification" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Justification
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <textarea
                    id="justification"
                    name="justification"
                    rows={5}
                    required
                    disabled={status === 'PENDING' ? false : true}
                    value={justification}
                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    onChange={(e) => setJustification(e.target.value)}
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Job Type
                </label>
                {status === 'PENDING' ? <JobType selectedJobType={jobType} setSelectedJobType={setJobType} />
                  : <input
                    type="text"
                    name="type"
                    id="type"
                    disabled
                    value = {location.state.request.jobType.toUpperCase()}
                    className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                }

              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Job Role
                </label>
                {status === 'PENDING' ? <JobRole selectedRole={jobRole} setSelectedRole={setJobRole} />
                  : <input
                    type="text"
                    name="role"
                    id="role"
                    disabled
                    value={location.state.request.jobRole.toUpperCase()}
                    className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                }
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Requirements
                </label>
                <JobRequirements selectedSkills={requirements} setSelectedSkills={setRequirements} status={status}/>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="salary" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Salary
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="float"
                    name="salary"
                    id="salary"
                    className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="0.00"
                    aria-describedby="salary-currency"
                    required
                    disabled={status === 'PENDING' ? false : true}
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-gray-500 sm:text-sm" id="salary-currency">
                      SGD
                    </span>
                  </div>
                </div>
              </div>

              {/* <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Department
                </label>
                <Department />
              </div> */}
              {/* show only when user is HR */}

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Team
                </label>
                {department !== null && <Team department={department} selectedTeam={team} setSelectedTeam={setTeam} />}
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Start Date
                </label>
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}
                  className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="button"
              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={ () => user !== null && user.hrEmployee ? (history.push("/hiring/jobrequesthr")) : (history.push("/hiring/jobrequest"))}
            >
              Cancel
            </button>
            {user !== null && user.hrEmployee && request.status === "PENDING" &&
              <button
                type="submit"
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => (useState.button = 1)}
              >
                Save
              </button>}
            {user !== null && user.hrEmployee && request.status == "CREATED" && request.status != "REJECTED" && request.status != "APPROVED" &&
              <button
                type="button"
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={approveRequest}
              >
                Approve
              </button>}
            {user !== null && user.hrEmployee && request.status == "CREATED" && request.status != "REJECTED" && request.status != "APPROVED" &&
              <button
                type="button"
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={rejectRequest}
              >
                Reject
              </button>}
            {user !== null && request.status === "PENDING" &&
              <button
                type="submit"
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => (useState.button = 2)}
              >
                Submit
              </button>}
          </div>
        </div>

      </form>
    </div>
  )
}
