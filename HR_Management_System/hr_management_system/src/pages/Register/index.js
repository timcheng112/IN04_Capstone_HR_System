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
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("Male");
  const [race, setRace] = useState("Chinese");
  const [citizenship, setCitizenship] = useState("Citizen");
  const [bankName, setBankName] = useState("DBS Bank");
  const [accountNumber, setAccountNumber] = useState();
  const [role, setRole] = useState("Employee");
  const [positionName, setPositionName] = useState("");
  const [positionDescription, setPositionDescription] = useState("");
  const [jobType, setJobType] = useState("Full-Time");
  const [isPartTimer, setIsPartTime] = useState(false);
  const [isHrEmployee, setIsHrEmployee] = useState(false);
  const [dateJoined, setDateJoined] = useState("");
  const [isHr, setIsHr] = useState(true);
  const [position, setPosition] = useState("SALESMAN");

  const history = useHistory();

  useEffect(() => {
    api
      .getUser(getUserId())
      .then((response) => setIsHr(response.data.hrEmployee))
      .then(() => {
        if (!isHr) {
          alert("You do not have authorization to enter this page");
          history.goBack();
        }
      });
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    validateDates();
  };

  function validateDates() {
    register();
    // if (dobDay.length < 2 || dobMonth.length < 2 || dobYear.length < 4) {
    //   alert(
    //     "Please ensure the date of birth dates are in the format of DD MM YYYY"
    //   );
    // } else if (
    //   joinedDay.length < 2 ||
    //   joinedMonth.length < 2 ||
    //   joinedYear.length < 4
    // ) {
    //   alert("Please ensure the joined dates are in the format of DD MM YYYY");
    // } else if (joinedDay > 31 || joinedMonth > 12 || joinedYear > 2023) {
    //   alert("Invalid date joined");
    // } else {
    //   register();
    // }
  }

  function register() {
    console.log("dob = " + dob);
    console.log("joined = " + dateJoined);
    var isPartTime = jobType === "Part-Time" ? true : false;
    console.log("isPartTime" + isPartTime);
    api
      // .register(
      //   firstName.trim(),
      //   lastName.trim(),
      //   phone.trim(),
      //   email.trim(),
      //   workEmail.trim() + "@libro.com",
      //   dob.trim(),
      //   gender.toUpperCase(),
      //   role.toUpperCase(),
      //   isPartTime,
      //   isHrEmployee,
      //   dateJoined.trim(),
      //   position,
      //   positionName,
      //   positionDescription,
      //   jobType.toUpperCase().replaceAll("-", "")
      // )
      .register(
        firstName.trim(),
        lastName.trim(),
        phone.trim(),
        email.trim(),
        workEmail.trim() + "@libro.com",
        dob.trim(),
        gender.toUpperCase(),
        race.toUpperCase(),
        citizenship.toUpperCase(),
        role.toUpperCase(),
        isPartTime,
        isHrEmployee,
        dateJoined.trim(),
        position,
        positionName,
        positionDescription,
        jobType.toUpperCase().replaceAll("-", "")
      )
      .then(() => {
        alert("Account creation successful for " + firstName + " " + lastName);
        history.goBack();
      })
      .catch((error) => {
        var message = error.request.response;
        console.log(error.message);
        if (message.includes("User's emails are already in use")) {
          alert(
            "The email(s) provided are already registered with an account with us"
          );
        }
      });
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
            <div className="sm:border-t sm:border-gray-200 sm:pt-5" />
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
                  Date of Birth
                </label>

                <div className="flex flex-direction:row">
                  <input
                    id="birthday"
                    name="birthday"
                    type="date"
                    autoComplete="birthday"
                    required
                    className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    onChange={(e) => {
                      setDob(e.target.value);
                      console.log(typeof e.target.value);
                    }}
                  ></input>

                  {/* <input
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
                  /> */}
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
                  htmlFor="race"
                  className="block text-sm mt-5 font-medium text-gray-700"
                >
                  Race
                </label>
                <select
                  id="race"
                  name="race"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm bg-white"
                  value={race}
                  onChange={(r) => setRace(r.target.value)}
                >
                  <option>Chinese</option>
                  <option>Malay</option>
                  <option>Indian</option>
                  <option>Eurasian</option>
                  <option>Others</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="citizenship"
                  className="block text-sm mt-5 font-medium text-gray-700"
                >
                  Citizenship
                </label>
                <select
                  id="citizenship"
                  name="citizenship"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm bg-white"
                  value={citizenship}
                  onChange={(r) => setCitizenship(r.target.value)}
                >
                  <option>Citizen</option>
                  <option>PR</option>
                  <option>Foreigner</option>
                </select>
              </div>
              <div className="sm:border-t sm:border-gray-200 sm:pt-5" />
              <hr />
              <div>
                <label
                  htmlFor="bank-name"
                  className="block text-sm mt-5 font-medium text-gray-700"
                >
                  Bank Name
                </label>
                <select
                  id="bank-name"
                  name="bank-name"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm bg-white"
                  value={bankName}
                  onChange={(r) => setBankName(r.target.value)}
                >
                  <option>DBS Bank</option>
                  <option>UOB Singapore</option>
                  <option>Citibank Singapore</option>
                  <option>Maybank Singapore</option>
                  <option>Standard Chartered Singapore</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="account-number"
                  className="block text-sm mt-5 font-medium text-gray-700"
                >
                  Bank Account Number
                </label>
                <input
                  id="account-number"
                  name="accountNumber"
                  type="text"
                  autoComplete="text"
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  // placeholder="0052312891"
                  placeholder="Account Number"
                  value={accountNumber}
                  onChange={(l) => setAccountNumber(l.target.value)}
                />
              </div>
              <div className="sm:border-t sm:border-gray-200 sm:pt-5" />
              <hr />
              <div>
                <label
                  htmlFor="date-joined"
                  className="block text-sm mt-5 font-medium text-gray-700"
                >
                  Date Joined
                </label>
                <div className="flex flex-direction:row">
                  <input
                    id="date-joined"
                    name="date-joined"
                    type="date"
                    autoComplete="date-joined"
                    required
                    className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={dateJoined}
                    onChange={(d) => setDateJoined(d.target.value)}
                  />

                  {/* <input
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
                  /> */}
                </div>
              </div>
              <div>
                <label
                  htmlFor="position"
                  className="block text-sm mt-5 font-medium text-gray-700"
                >
                  Position Type
                </label>
                <select
                  id="position"
                  name="position"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm bg-white"
                  value={position}
                  onChange={(r) => setPosition(r.target.value)}
                >
                  <option value="SALESMAN">Salesman</option>
                  <option value="CASHIER">Cashier</option>
                  <option value="STOREMANAGER">Store Manager</option>
                  <option value="OFFICEWORKER">Office Worker</option>
                  <option value="EXECUTIVE">Executive</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="position-name"
                  className="block text-sm mt-5 font-medium text-gray-700"
                >
                  Position Title
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
              <div className="sm:border-t sm:border-gray-200 sm:pt-5" />
              <hr />
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
