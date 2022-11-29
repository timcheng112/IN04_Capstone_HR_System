import { useEffect, useState } from "react";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import api from "../../utils/api";
import { useHistory } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verified, setVerified] = useState(false);
  const [token, setToken] = useState("");
  const history = useHistory();

  useEffect(() => {
    var url = window.location.href;
    const tokenFromUrl = url.substring(29);
    if (tokenFromUrl.length > 0 && !verified) {
      setToken(tokenFromUrl);
      setVerified(true);

    }
  }, []);

  useEffect(() => {
    var userEmail = sessionStorage.getItem("userEmail");
    if (userEmail !== null && userEmail.length > 0) {
      setEmail(userEmail);
    }
  }, [verified]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    confirm();
  };

  function confirm() {
    if (password === confirmPassword) {
      console.log(token);
      api.getEmployeeByToken(token).then((response) =>
        api
          .changePassword(response.data, password)
          .then((response) => {
            console.log(response.data);
            alert(response.data);
            api
                .confirmToken(token)
                .then((response) => console.log(response.data));
          })
          .finally(() => history.push("/"))
      );
    } else {
      alert("Passwords do not match");
    }
  }

  function sendEmail() {
    if (email !== null && email.length > 0) {
      api
        .forgotPassword(email)
        .then((response) =>
          alert("Please check your email to reset your password.")
        );
    }
  }

  return (
    <>
      {verified ? (
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div>
              <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                  Change password
                </h2>
                <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      New password
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
                  <div>
                    <label
                      htmlFor="confirm-password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Confirm password
                    </label>
                    <div className="mt-1">
                      <input
                        id="confirm-password"
                        name="confirm-password"
                        type="password"
                        autoComplete="confirm-password"
                        required
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        value={confirmPassword}
                        onChange={(p) => setConfirmPassword(p.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Confirm
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            {/* <img
      className="mx-auto h-12 w-auto"
      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
      alt="Your Company"
    /> */}
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Click to send an email to change your password. Check your email
              address
            </h2>
            <div>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  id="email"
                  disabled
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm"
                  value={email}
                />
              </div>
            </div>
            <button
              type="button"
              className="mt-10 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={sendEmail}
            >
              <EnvelopeIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
