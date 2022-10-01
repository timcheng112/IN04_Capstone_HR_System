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
  forgotCheckEmail(email) {
    return axios.get(
      `http://localhost:9191/api/user/login/checkEmailJMP?email=${email}`
    );
  },
  forgotPassword(email) {
    return axios.get(
      `http://localhost:9191/api/user/login/forgotPasswordJMP?email=${email}`
    );
  },
  changePassword(email, password) {
    return axios.get(
      `http://localhost:9191/api/user/login/changePasswordJMP?email=${email}&password=${password}`
    );
  },
  getUserFromToken(token) {
    return axios.get(
      `http://localhost:9191/api/user/login/getUserByToken?token=${token}`
    );
  },
  resetPassword(email, oldPassword, newPassword) {
    return axios.put(
      `http://localhost:9191/api/user/login/resetPasswordJMP?email=${email}&oldPassword=${oldPassword}&newPassword=${newPassword}`
    )
  },
  requestAccountReactivation(email, reason) {
    return axios.post(`http://localhost:9191/api/user/login/requestAccountReactivation?email=${email}&reason=${reason}`)
  },
  getUserInfo(userId){
    return axios.get(`http://localhost:9191/api/user/${userId}`)
  },
  editUserInfo(userId, gender, email, phone){
    return axios.get(`http://localhost:9191/api/user/updateProfile?userId=${userId}&gender=${gender}&email=${email}&phone=${phone}`);
  },
};

export default api;
