import { useState } from "react";
import { useHistory } from "react-router-dom";
import { setUserSession } from "../../utils/Common";
import logo from "../../assets/libro-transparent-logo.png";
import api from "../../utils/api";

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
      .login(getWorkEmail(), password)
      .then((response) => {
        if (response.status !== 200) {
          console.log(response.data);
        } else {
          setUserSession(response.data, getWorkEmail());
        }
      })
      .then(() => {
        history.push("/home");
      })
      .catch((error) => {
        var message = error.request.response;
        console.log(getWorkEmail());
        if (message.includes("account is not activated yet")) {
          console.log("in api call " + getWorkEmail());
          api
            .getUserIdByEmail(getWorkEmail())
            .then((response) => {
              setUserSession(response.data, email);
            })
            .then(() => history.push("/verify"));
        } else if (
          message.includes("User password does not match the record")
        ) {
          alert("The password you entered was incorrect");
        }
      });
  }

  function forgot() {
    if (email.length <= 0) {
      alert("Please enter your email");
    } else {
      api
        .forgotCheckEmail(getWorkEmail())
        .then((response) => sessionStorage.setItem("userEmail", getWorkEmail()))
        .then(() => history.push("/forgot"));
    }
  }

  function getWorkEmail() {
    return email + "@libro.com";
  }

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto h-12 w-auto" src={logo} alt="Libro" />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="company-website"
                    id="company-website"
                    className="block w-full min-w-0 flex-1 rounded-none rounded-l-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="johntan"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <span className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                    @libro.com
                  </span>
                </div>
              </div>

              <div>
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

              <div className="flex items-center">
                {/* <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div> */}

                <div className="text-sm">
                  {/* <a
                    href="/forgot"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </a> */}
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-3 py-2 text-sm font-medium leading-4 text-indigo-700 hover:bg-indigo-200"
                    onClick={forgot}
                  >
                    Forgot your password?
                  </button>
                </div>
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
    </>
  );
}
