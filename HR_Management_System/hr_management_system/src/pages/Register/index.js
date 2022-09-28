import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Switch } from "@headlessui/react";
import { setUserSession } from "../../utils/Common";
import api from "../../utils/api";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [isPartTimer, setIsPartTime] = useState(false);
  const [isHrEmployee, setIsHrEmployee] = useState(false);
  const [dateJoined, setDateJoined] = useState("");

  const history = useHistory();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    register();
  };

  function register() {
    console.log('isPartTimer = ' + isPartTimer)
    if (password === confirmPassword) {
      api
        .register(
          firstName,
          lastName,
          password,
          phone,
          email,
          workEmail,
          dob,
          gender,
          role,
          isPartTimer,
          isHrEmployee,
          dateJoined
        )
        .then(() => alert('account creation successful'));
    } else {
      alert("passwords do not match");
    }
  }

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            {/* <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            /> */}
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Register a new employee
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="first-name" className="sr-only">
                  First name
                </label>
                <input
                  id="first-name"
                  name="firstName"
                  type="text"
                  autoComplete="text"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(f) => setFirstName(f.target.value)}
                />
              </div>
              <div>
                <label htmlFor="last-name" className="sr-only">
                  Last name
                </label>
                <input
                  id="last-name"
                  name="lastName"
                  type="text"
                  autoComplete="text"
                  required
                  className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(l) => setLastName(l.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="work-email-address" className="sr-only">
                  Work email address
                </label>
                <input
                  id="work-email-address"
                  name="work-email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Work email address"
                  value={workEmail}
                  onChange={(e) => setWorkEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(p) => setPassword(p.target.value)}
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="sr-only">
                  Confirm password
                </label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="confirm-password"
                  required
                  className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(p) => setConfirmPassword(p.target.value)}
                />
              </div>
              <div>
                <label htmlFor="phone" className="sr-only">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  autoComplete="phone"
                  required
                  className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Phone"
                  value={phone}
                  onChange={(p) => setPhone(p.target.value)}
                />
              </div>
              <div>
                <label htmlFor="birthday" className="sr-only">
                  Birthday
                </label>
                <input
                  id="birthday"
                  name="birthday"
                  type="text"
                  autoComplete="birthday"
                  required
                  className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Birthday"
                  value={dob}
                  onChange={(d) => setDob(d.target.value)}
                />
              </div>
              <div>
                <label htmlFor="gender" className="sr-only">
                  Gender
                </label>
                <input
                  type="text"
                  name="gender"
                  id="gender"
                  className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Gender"
                  value={gender}
                  onChange={(g) => setGender(g.target.value)}
                />
              </div>
              <div>
                <label htmlFor="date-joined" className="sr-only">
                  Date Joined
                </label>
                <input
                  type="text"
                  name="date-joined"
                  id="date-joined"
                  className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Date Joined"
                  value={dateJoined}
                  onChange={(d) => setDateJoined(d.target.value)}
                />
              </div>
              <div>
                <label htmlFor="role" className="sr-only">
                  Role
                </label>
                <input
                  type="text"
                  name="role"
                  id="role"
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Role"
                  value={role}
                  onChange={(r) => setRole(r.target.value)}
                />
              </div>

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
                        "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                      )}
                    />
                  </Switch>
                </Switch.Group>
              </div>
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
                      HR
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
                        "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
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
