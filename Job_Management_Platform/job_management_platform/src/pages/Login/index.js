import { useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../../utils/api";
import { setUserSession } from "../../utils/Common";
import logo from "../../assets/libro-transparent-logo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    login();
  };

  function login() {
    api
      .login(email, password)
      .then((response) => {
        if (response.data) setUserSession(response.data, email);
      })
      .then(() => history.push("/home"))
      .catch((error) => {
        var message = error.request.response;
        //console.log(message);
        if (message.includes("User account is not an applicant")) {
          alert("The password is not linked to a valid applicant account");
        } else if (message.includes("User password does not match the record.")) {
          alert("The password you entered was incorrect");
        } else if (
          message.includes(
            "User account is not accessible, please request to be reactivated"
          )
        ) {
          history.push("/reactivation");
        } else if (
          message.includes(
            "User account is not activated yet, please check your email or request to be activated"
          )
        ) {
          api
            .getUserIdByEmail(email)
            .then((response) => sessionStorage.setItem("userEmail", email))
            .finally(() => history.push("/verify"));
        }
      });
  }

  function forgot() {
    if (email.length <= 0) {
      alert("Please enter your email");
    } else {
      api
        .forgotCheckEmail(email)
        .then((response) => {
          //sessionStorage.setItem("userId", response.data);
          console.log(email);
          sessionStorage.setItem("userEmail", email);
        })
        .then(() => history.push("/forgot"))
        .catch(error => {
          var message = error.request.response;
          console.log(error.message)
          if (message.includes("User does not exist")) {
            alert("The email " + email + " is not registered with an account with us")
          } else if (message.includes("Email is not linked to a Job Applicant")) {
            alert("The email " + email + " is not registered as a Job Applicant account with us")
          }
        });
    }
  }

  return (
    <>
      <div className="flex min-h-full">
        <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img className="mx-auto h-12 w-auto" src={logo} alt="Libro" />
              <h2 className="mt-6 text-xl font-bold tracking-tight text-indigo-600">
                Job Management Platform
              </h2>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
                Sign In
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Or{" "}
                <a
                  href="/register"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  register a new account
                </a>
              </p>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        value={password}
                        onChange={(p) => setPassword(p.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    {/* <div className="text-sm">
                      <a
                        href="/"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot your password?
                      </a>
                    </div> */}
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-3 py-2 text-sm font-medium leading-4 text-indigo-700 hover:bg-indigo-200"
                      onClick={forgot}
                    >
                      Forgot your password?
                    </button>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            alt=""
          />
        </div> */}
      </div>
    </>
  );
}
