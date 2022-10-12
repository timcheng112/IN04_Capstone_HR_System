import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Switch } from "@headlessui/react";
import { getUserId } from "../../utils/Common";
import api from "../../utils/api";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [dobDay, setDobDay] = useState("");
  const [dobMonth, setDobMonth] = useState("");
  const [dobYear, setDobYear] = useState("");
  const [gender, setGender] = useState("Male");
  const [role, setRole] = useState("Employee");
  const [positionName, setPositionName] = useState("");
  const [positionDescription, setPositionDescription] = useState("");
  const [jobType, setJobType] = useState("Full-Time");
  const [isPartTimer, setIsPartTime] = useState(false);
  const [isHrEmployee, setIsHrEmployee] = useState(false);
  const [joinedDay, setJoinedDay] = useState("");
  const [joinedMonth, setJoinedMonth] = useState("");
  const [joinedYear, setJoinedYear] = useState("");
  const [isHr, setIsHr] = useState(true);

  const history = useHistory();

  useEffect(() => {
    api
      .getUser(getUserId())
      .then((response) => setIsHr(response.data.hrEmployee))
      .finally(() => {
        if (!isHr) {
          history.goBack();
        }
      }, [isHr]);
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    validateDates();
  };

  function validateDates() {
    if (dobDay.length < 2 || dobMonth.length < 2 || dobYear.length < 4) {
      alert(
        "Please ensure the date of birth dates are in the format of DD MM YYYY"
      );
    } else if (
      joinedDay.length < 2 ||
      joinedMonth.length < 2 ||
      joinedYear.length < 4
    ) {
      alert("Please ensure the joined dates are in the format of DD MM YYYY");
    } else if (dobDay > 31 || dobMonth > 12 || dobYear > 2023) {
      alert("Invalid birthday");
    } else if (joinedDay > 31 || joinedMonth > 12 || joinedYear > 2023) {
      alert("Invalid date joined");
    } else {
      register();
    }
  }

  function register() {
    var dob = dobYear + "-" + dobMonth + "-" + dobDay;
    console.log("dob = " + dob);
    var dateJoined = joinedYear + "-" + joinedMonth + "-" + joinedDay;
    console.log("joined = " + dateJoined);
    var isPartTime = (jobType == "Part-Time: ") ? true : false;
    console.log("isPartTime" + isPartTime)
    api
      .register(
        firstName.trim(),
        lastName.trim(),
        phone.trim(),
        email.trim(),
        workEmail.trim() + "@libro.com",
        dob.trim(),
        gender.toUpperCase(),
        role.toUpperCase(),
        isPartTime,
        isHrEmployee,
        dateJoined.trim(),
        positionName,
        positionDescription,
        jobType.toUpperCase().replaceAll("-", "")
      )
      .then(() =>
        alert("Account creation successful for " + firstName + " " + lastName)
      )
      .catch(error => {
        var message = error.request.response;
        console.log(error.message)
        if (message.includes("User's emails are already in use")) {
          alert("The email(s) provided are already registered with an account with us")
        }
      })
      .finally(() => history.goBack());
  }

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Register a new employee
            </h2>
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-5"
              onClick={() => history.goBack()}
            >
              <ArrowLeftIcon
                className="-ml-1 mr-3 h-5 w-5"
                aria-hidden="true"
              />
              Back
            </button>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md ">
              <div>
                <label
                  htmlFor="first-name"
                  className="block text-sm mt-5 font-medium text-gray-700"
                >
                  First name
                </label>
                <input
                  id="first-name"
                  name="firstName"
                  type="text"
                  autoComplete="text"
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(f) => setFirstName(f.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="last-name"
                  className="block text-sm mt-5 font-medium text-gray-700"
                >
                  Last name
                </label>
                <input
                  id="last-name"
                  name="lastName"
                  type="text"
                  autoComplete="text"
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(l) => setLastName(l.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="email-address"
                  className="block text-sm mt-5 font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="work-email-address"
                  className="block text-sm mt-5 font-medium text-gray-700"
                >
                  Work email address
                </label>
                {/* <input
                  id="work-email-address"
                  name="work-email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Work email address"
                  value={workEmail}
                  onChange={(e) => setWorkEmail(e.target.value)}
                /> */}
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="work-email-address"
                    id="work-email"
                    className="block w-full min-w-0 flex-1 rounded-none rounded-l-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="johntan"
                    value={workEmail}
                    onChange={(e) => {
                      setWorkEmail(e.target.value);
                    }}
                  />
                  <span className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                    @libro.com
                  </span>
                </div>
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm mt-5 font-medium text-gray-700"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  autoComplete="phone"
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Phone"
                  value={phone}
                  onChange={(p) => setPhone(p.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="birthday"
                  className="block text-sm mt-5 font-medium text-gray-700"
                >
                  Birthday
                </label>

                <div className="flex flex-direction:row">
                  <input
                    id="birthday-day"
                    name="birthday-day"
                    type="text"
                    autoComplete="birthday-day"
                    required
                    className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mr-5"
                    placeholder="DD"
                    value={dobDay}
                    onChange={(d) => setDobDay(d.target.value)}
                  />

                  <input
                    id="birthday-month"
                    name="birthday-month"
                    type="text"
                    autoComplete="birthday-month"
                    required
                    className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mr-5"
                    placeholder="MM"
                    value={dobMonth}
                    onChange={(d) => setDobMonth(d.target.value)}
                  />

                  <input
                    id="birthday-year"
                    name="birthday-year"
                    type="text"
                    autoComplete="birthday-year"
                    required
                    className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="YYYY"
                    value={dobYear}
                    onChange={(d) => setDobYear(d.target.value)}
                  />
                </div>
              </div>
              {/* <div>
                <label
                  htmlFor="gender"
                  className="block text-sm mt-5 font-medium text-gray-700"
                >
                  Gender
                </label>
                <input
                  type="text"
                  name="gender"
                  id="gender"
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Gender"
                  value={gender}
                  onChange={(g) => setGender(g.target.value)}
                />
              </div> */}
              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm mt-5 font-medium text-gray-700"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm bg-white"
                  value={gender}
                  onChange={(r) => setGender(r.target.value)}
                >
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="date-joined"
                  className="block text-sm mt-5 font-medium text-gray-700"
                >
                  Date Joined
                </label>
                <div className="flex flex-direction:row">
                  <input
                    id="date-joined-day"
                    name="date-joined-day"
                    type="text"
                    autoComplete="date-joined-day"
                    required
                    className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mr-5"
                    placeholder="DD"
                    value={joinedDay}
                    onChange={(d) => setJoinedDay(d.target.value)}
                  />

                  <input
                    id="date-joined-month"
                    name="date-joined-month"
                    type="text"
                    autoComplete="date-joined-month"
                    required
                    className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mr-5"
                    placeholder="MM"
                    value={joinedMonth}
                    onChange={(d) => setJoinedMonth(d.target.value)}
                  />

                  <input
                    id="date-joined-year"
                    name="date-joined-year"
                    type="text"
                    autoComplete="date-joined-year"
                    required
                    className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="YYYY"
                    value={joinedYear}
                    onChange={(d) => setJoinedYear(d.target.value)}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="position-name"
                  className="block text-sm mt-5 font-medium text-gray-700"
                >
                  Position Name
                </label>
                <input
                  id="position-name"
                  name="position-name"
                  type="text"
                  autoComplete="text"
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Project Manager"
                  value={positionName}
                  onChange={(f) => setPositionName(f.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="position-description"
                  className="block text-sm font-medium text-gray-700 mt-5"
                >
                  Position Description
                </label>
                <textarea
                  id="position-description"
                  name="position-description"
                  rows={3}
                  className="mt-1 p-2 block w-full text-gray-900 bg-white rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Oversees multiple teams"
                  required
                  value={positionDescription}
                  onChange={(e) => setPositionDescription(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="job-type"
                  className="block text-sm mt-5 font-medium text-gray-700"
                >
                  Job Type
                </label>
                <select
                  id="job-type"
                  name="job-type"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm bg-white"
                  value={jobType}
                  onChange={(j) => setJobType(j.target.value)}
                >
                  <option>Full-Time</option>
                  <option>Part-Time</option>
                  <option>Contract</option>
                  <option>Intern</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm mt-5 font-medium text-gray-700"
                >
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm bg-white"
                  value={role}
                  onChange={(r) => setRole(r.target.value)}
                >
                  <option>Employee</option>
                  <option>Manager</option>
                  <option>Administrator</option>
                </select>
              </div>
              {/*<div>
                <Switch.Group
                  as="div"
                  className="flex items-center justify-between mt-10"
                >
                  <span className="flex flex-grow flex-col">
                    <Switch.Label
                      as="span"
                      className="text-sm font-medium text-gray-900"
                      passive
                    >
                      Part-time
                    </Switch.Label>
                  </span>
                  <Switch
                    checked={isPartTimer}
                    onChange={setIsPartTime}
                    className={classNames(
                      isPartTimer ? "bg-indigo-600" : "bg-gray-200",
                      "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={classNames(
                        isPartTimer ? "translate-x-5" : "translate-x-0",
                        "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white ring-0 transition duration-200 ease-in-out"
                      )}
                    />
                  </Switch>
                </Switch.Group>
              </div> */}
              <div>
                <Switch.Group
                  as="div"
                  className="flex items-center justify-between mt-10"
                >
                  <span className="flex flex-grow flex-col">
                    <Switch.Label
                      as="span"
                      className="text-sm font-medium text-gray-900"
                      passive
                    >
                      HR Department
                    </Switch.Label>
                  </span>
                  <Switch
                    checked={isHrEmployee}
                    onChange={setIsHrEmployee}
                    className={classNames(
                      isHrEmployee ? "bg-indigo-600" : "bg-gray-200",
                      "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={classNames(
                        isHrEmployee ? "translate-x-5" : "translate-x-0",
                        "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white ring-0 transition duration-200 ease-in-out"
                      )}
                    />
                  </Switch>
                </Switch.Group>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
