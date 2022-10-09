import { useState } from "react";
import { useHistory } from "react-router-dom";
import { setUserSession } from "../../utils/Common";
import api from "../../utils/api";
import logo from "../../assets/libro-transparent-logo.png";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dobDay, setDobDay] = useState("");
  const [dobMonth, setDobMonth] = useState("");
  const [dobYear, setDobYear] = useState("");
  const [gender, setGender] = useState("Male");

  const history = useHistory();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    register();
  };

  function register() {
    var dob = dobYear + "-" + dobMonth + "-" + dobDay;
    console.log("dob = " + dob);
    if (password === confirmPassword) {
      api
        .register(firstName, lastName, password, phone, email, dob, gender.toUpperCase())
        .then(() => {
          api
            .getUserIdByEmail(email)
            .then((response) => sessionStorage.setItem("userEmail", email))
            .finally(() => history.push("/verify"));
        })
        .catch(error => {
          var message = error.request.response;
          console.log(error.message)
          if (message.includes("User's email is already in use")) {
            alert("The email " + email + " already has an account with us")
          }
        });
    } else {
      alert("passwords do not match");
    }
  }

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img className="mx-auto h-12 w-auto" src={logo} alt="Libro" />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Register for Job Management Platform
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <a
                href="/"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Log in here
              </a>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
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
                  placeholder="Xiao"
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
                  placeholder="Ming"
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
                  placeholder="xiaoming@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm mt-5 font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(p) => setPassword(p.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm mt-5 font-medium text-gray-700"
                >
                  Confirm password
                </label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="confirm-password"
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(p) => setConfirmPassword(p.target.value)}
                />
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
                  placeholder="91234567"
                  value={phone}
                  onChange={(p) => setPhone(p.target.value)}
                />
              </div>
              <div className="grid grid-cols-1">
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
