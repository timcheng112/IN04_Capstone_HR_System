import Navbar from "../../components/Navbar";
import Department from "../../components/ComboBox/Department";
import Team from "../../components/ComboBox/Team";
import JobType from "../../components/ComboBox/JobType";
import JobRole from "../../components/ComboBox/Role";
import JobRequirements from "../../features/jobrequest/JobRequirements";
import { useState, useEffect } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from 'react-router-dom';
import api from "../../utils/api";
import { getUserId } from "../../utils/Common";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NewRequest() {
  const [startDate, setStartDate] = useState(new Date());
  const history = useHistory();
  const [department, setDepartment] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [justification, setJustification] = useState("");
  const [salary, setSalary] = useState(0);
  const [jobType, setJobType] = useState();
  const [jobRole, setJobRole] = useState();
  const [requirements, setRequirements] = useState([]);
  const [team, setTeam] = useState();

  useEffect(() => {
    api
      .getUser(getUserId())
      .then((response) => {
        setUser(response.data);
        //        console.log(response.data);
        //console.log(user);
      })
      .catch((error) => setError(error));
  }, []);

  useEffect(() => {
    api
      .getDepartmentByEmployeeId(getUserId())
      .then((response) => {
        setDepartment(response.data);
        //        console.log(response.data);
        //console.log(department);
      })
      .catch((error) => setError(error));
  }, []);

  function saveRequest() {
    //    console.log("SAVE REQUEST")
    //    console.log("REQUIREMENTS")
    //    console.log(requirements);
    let arr = []
    arr = requirements.map(x => x.value)
    //    let arr = Array.of(requirements);
    //    console.log("ARRR")
    //    console.log(arr);
    //    console.log(team);
    var teamId = team == null ? 0 : team.teamId;
    //    console.log(teamId);
    //    console.log(salary);
    //    console.log(jobRole);
    //    console.log(startDate);
    //    console.log(startDate.getDate())
    //    console.log(startDate.getMonth())
    //    console.log(startDate.getYear()+1900)
    var date = startDate.getDate()
    if (startDate.getDate() < 10) {
      date = "0" + date;
    }
    var month = startDate.getMonth() + 1;
    if (month < 10) {
      month = "0" + (month);
    }

    var preferredStartDate = (startDate.getYear() + 1900) + "-" + month + "-" + date;
    //    console.log(title);

    if (jobType == null) {
      alert("Please select a Job Type");
      return 1
    } else if (jobRole == null) {
      alert("Please select a Job Role");
      return 1;
    }

    api
      .saveJobRequest(title, description, justification, preferredStartDate.trim(), jobType.name.toUpperCase(), jobRole.name.toUpperCase(), salary, arr, 0, teamId, getUserId(), 0)
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
        //          console.log("returning 1")
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
      .submitJobRequest(title, description, justification, preferredStartDate.trim(), jobType.name.toUpperCase(), jobRole.name.toUpperCase(), salary, arr, 0, teamId, getUserId(), 0)
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
        //            console.log("returning 1")
      });
    return 0;
    // .catch((error) => setError(error));
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
              <h3 className="text-lg font-medium leading-6 text-gray-900">New Job Request</h3>
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
                <JobType selectedJobType={jobType} setSelectedJobType={setJobType} />
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Job Role
                </label>
                <JobRole selectedRole={jobRole} setSelectedRole={setJobRole} />
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Requirements
                </label>
                <JobRequirements selectedSkills={requirements} setSelectedSkills={setRequirements} status="PENDING" />

              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="salary" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Salary
                </label>
                <div className="flex space-x-3 relative mt-1 rounded-md shadow-sm">
                  <div>
                    min
                    <input
                      type="float"
                      name="salary"
                      id="salary"
                      className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="min"
                      aria-describedby="salary-currency"
                      required
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                    />
                    
                  </div>
                  <div>
                    max
                    <input
                      type="float"
                      name="salary"
                      id="salary"
                      className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="max"
                      aria-describedby="salary-currency"
                      required
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                    />
                    
                  </div>
                </div>
              </div>

              {/* <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Department
                </label>
                <Department />
              </div>} */}


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
              onClick={() => user !== null && user.hrEmployee ? (history.push("/hiring/jobrequesthr")) : (history.push("/hiring/jobrequest"))}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => (useState.button = 1)}
            >
              Save
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => (useState.button = 2)}
            >
              Submit
            </button>
          </div>
        </div>

      </form>
    </div>
  )
}
