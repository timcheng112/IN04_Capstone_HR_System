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
    return axios.post(`http://localhost:9191/api/user/login/requestAccountReactivation?email=${email}&reason=${reason}`);
  },

  getUserInfo(userId){
    return axios.get(`http://localhost:9191/api/user/${userId}`);
  },
  editUserInfo(userId, gender, email, phone){
    return axios.get(`http://localhost:9191/api/user/updateProfile?userId=${userId}&gender=${gender}&email=${email}&phone=${phone}`);
  },
  getUser(userId) {
    return axios.get(`http://localhost:9191/api/user/${userId}`);
  },
  getUserIdByEmail(email) {
    return axios.get(`http://localhost:9191/api/user/login/getUserIdByEmail?email=${email}`)
  },
  addDepartment(deptName, deptHeadId){
    return axios.post(`http://localhost:9191/api/department/addDepartment?deptName=${deptName}&deptHeadId=${deptHeadId}`);
  },
  addNotification(notificationTitle, notificationDescription, userId){
    return axios.post(`http://localhost:9191/api/notification/?notificationTitle=${notificationTitle}&notificationDescription=${notificationDescription}&userId=${userId}`)
  },
  getAllNotificationsForUser(userId){
    return axios.get(`http://localhost:9191/api/notification/getAllNotificationsForUser/${userId}`);
  },
  deleteAllNotifications(userId){
    return axios.delete(`http://localhost:9191/api/notification/deleteNotifications?userId=${userId}`);
    //http://localhost:9191/api/notification/deleteNotifications?userId=5
  },
  markNotificationAsRead(notificationId, userId) {
    return axios.post(`http://localhost:9191/api/notification/${notificationId}/user/${userId}`)
  },
  deleteANotification(notificationId, userId){
    return axios.delete(`http://localhost:9191/api/notification/deleteOneNotif?notificationId=${notificationId}&userId=${userId}`)
  },
  getUserUnreadNotifications(userId) {
    return axios.get(`http://localhost:9191/api/notification/unread/${userId}`)
  },
  getUserReadNotifications(userId) {
    return axios.get(`http://localhost:9191/api/notification/read/${userId}`)
  },
  getAllStaff(){
    return axios.get(`http://localhost:9191/api/user/getAllStaff`);
  },
  getAllApplicants(){
    return axios.get(`http://localhost:9191/api/user/getAllApplicants`);
  },
  // Profile Documents
  getUserQualificationInformation(userId) {
    return axios.get(`http://localhost:9191/api/qualification/getUserQualificationInformation?userId=${userId}`);
  },
  addDocument(file, userId, document){
    return axios.post(`http://localhost:9191/api/qualification/addDocument?file=&userId=${userId}&document=${document}`, file);
  },
  deleteUserDocument(userId, docId){
    return axios.delete(`http://localhost:9191/api/qualification/deleteUserDocument?userId=${userId}&document=${docId}`);
  },

  // Profile Information
  addRecommendation(userId, name, phone, email, relationship) {
    return axios.post(`http://localhost:9191/api/qualification/addRecommendation?userId=${userId}&name=${name}&phone=${phone}&email=${email}&relationship=${relationship}`);
  },
  getUserRecommendations(userId) {
    return axios.get(`http://localhost:9191/api/qualification/getUserRecommendations?userId=${userId}`);
  },
  removeUserRecommendation(userId, recoId) {
    return axios.delete(`http://localhost:9191/api/qualification/getUserRecommendations?userId=${userId}&recoId=${recoId}`);
  },
  addWorkExperience(userId, positionName, companyName, startDate, endDate, currentlyWorking, description) {
    return axios.post(`http://localhost:9191/api/qualification/addWorkExperience?userId=${userId}&positionName=${positionName}&companyName=${companyName}&startDate=${startDate}&endDate=${endDate}&currentlyWorking=${currentlyWorking}&description=${description}`);
  },
  getUserExperiences(userId) {
    return axios.get(`http://localhost:9191/api/qualification/getUserExperiences?userId=${userId}`);
  },
  removeUserExperience(userId, expId) {
    return axios.delete(`http://localhost:9191/api/qualification/removeUserExperience?userId=${userId}&expId=${expId}`);
  },
  updateUserEducation(userId, highestEducation, schoolName, schoolGradYear) {
    return axios.post(`http://localhost:9191/api/qualification/updateUserEducation?userId=${userId}&highestEducation=${highestEducation}&schoolName=${schoolName}&schoolGradYear=${schoolGradYear}`);
  },
};

export default api;
