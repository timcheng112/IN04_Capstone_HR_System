import axios from "axios";

const api = {
  register(firstName, lastName, password, phone, email, dob, gender) {
    return axios.post(
      `http://localhost:9191/api/user/register/registerNewAccountJMP?firstName=${firstName}&lastName=${lastName}&password=${password}&phone=${phone}&email=${email}&dob=${dob}&gender=${gender}`
    );
  },
  login(email, password) {
    return axios.get(
      `http://localhost:9191/api/user/login/loginJMP?email=${email}&password=${password}`
    );
  },
  confirmToken(token) {
    return axios.get(
      `http://localhost:9191/api/user/register/confirmToken?token=${token}`
    );
  },
  resendConfirmation(email) {
    return axios.get(
      `http://localhost:9191/api/user/register/resendConfirmationEmailJMP?email=${email}`
    );
  },
};

export default api;
