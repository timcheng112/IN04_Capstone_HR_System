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
  updateUserDetails(userId, firstName, lastName, aboutMe, educationLevel, schoolName, gradYear, languages){
    return axios.put(`http://localhost:9191/api/user/updateUserDetails?userId=${userId}&firstName=${firstName}&lastName=${lastName}&aboutMe=${aboutMe}&educationLevel=${educationLevel}&schoolName=${schoolName}&gradYear=${gradYear}&languages=${languages}`);
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
  addCV(file, userId) {
    // http://localhost:9191/api/qualification/addCv?file=${file}&userId=${userId}
    return axios.post(
      `http://localhost:9191/api/qualification/addCv?file=&userId=${userId}`,
      file
    );
  },
  uploadDocument(file, userId, documentType) {
      return axios.post(
        `http://localhost:9191/api/qualification/addDocument?file=&userId=${userId}&documentType={documentType}`,
        file
      );
    },
  deleteCV(docId) {
    return axios.delete(`http://localhost:9191/api/docData/${docId}`);
  },
  getDocById(docId) {
    return axios.get(
      `http://localhost:9191/api/docData/getDocById?id=${docId}`,
      { responseType: "blob" }
    );
  },
  downloadDocument(docId) {
    return axios.get(
      `http://localhost:9191/api/docData/downloadDocument?id=${docId}`,
      { responseType: "blob" }
    );
  },

  // Profile Information
  addRecommendation(userId, name, phone, email, relationship) {
    return axios.post(`http://localhost:9191/api/qualification/addRecommendation?userId=${userId}&name=${name}&phone=${phone}&email=${email}&relationship=${relationship}`);
  },
  getUserRecommendations(userId) {
    return axios.get(`http://localhost:9191/api/qualification/getUserRecommendations?userId=${userId}`);
  },
  removeUserRecommendation(userId, recoId) {
    return axios.delete(`http://localhost:9191/api/qualification/removeUserRecommendation?userId=${userId}&recoId=${recoId}`);
  },
  editUserRecommendation(userId,recoId, name, phone, email, relationship) {
    return axios.put(`http://localhost:9191/api/qualification/editRecommendation?userId=${userId}&recoId=${recoId}&name=${name}&phone=${phone}&email=${email}&relationship=${relationship}`);
  },
  saveUserRecommendations(userId, recos) {
    return axios.put(`http://localhost:9191/api/qualification/saveUserRecommendations?userId=${userId}`
    ,recos);
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
  editUserExperience(userId, workExpId, positionName, companyName, startDate, endDate, currentlyWorking, description) {
    return axios.put(`http://localhost:9191/api/qualification/editUserExperience?userId=${userId}&workExpId=${workExpId}&positionName=${positionName}&companyName=${companyName}&startDate=${startDate}&endDate=${endDate}&currentlyWorking=${currentlyWorking}&description=${description}`);
  },
  saveWorkExperiences(userId, experiences) {
    return axios.put(`http://localhost:9191/api/qualification/saveWorkExperiences?userId=${userId}`
    ,experiences);
  },
  updateUserEducation(userId, highestEducation, schoolName, schoolGradYear) {
    return axios.post(`http://localhost:9191/api/qualification/updateUserEducation?userId=${userId}&highestEducation=${highestEducation}&schoolName=${schoolName}&schoolGradYear=${schoolGradYear}`);
  },
  getAllSkillsets() {
    return axios.get(`http://localhost:9191/api/skillset/getAllSkillsets`);
  },
  saveUserSkillsets(userId, userskills) {
    return axios.put(`http://localhost:9191/api/qualification/saveUserSkillsets?userId=${userId}`
    ,userskills);
  },

  // Job Posting
  getAllJobPosts() {
    return axios.get(`http://localhost:9191/api/jobposting/getAllJobPosts`);
  },
  getAllOpenPosts() {
    return axios.get(`http://localhost:9191/api/jobposting/getAllOpenPosts`);
  },

  // Job Application
  findApplicationsByPostingId(postingId) {
    return axios.get(`http://localhost:9191/api/jobapplications/findApplicationsByPostingId?postingId=${postingId}`);
  },
  getApplicantApplications(applicantId) {
    return axios.get(`http://localhost:9191/api/jobapplications/getApplicantApplications?applicantId=${applicantId}`);
  },
  createJobApplication(postingId, applicantId, userSkillIds, availableStartDate) {
    return axios.post(`http://localhost:9191/api/jobapplications/createJobApplication?postingId=${postingId}&applicantId=${applicantId}&userSkillIds=${userSkillIds}&availableStartDate=${availableStartDate}`);
  },
  cancelJobApplication(applicationId, applicantId) {
    return axios.delete(`http://localhost:9191/api/jobapplications/cancelJobApplication?applicationId=${applicationId}&applicantId=${applicantId}`);
  },
  editJobApplication(postingId, userSkillIds, availableStartDate) {
    return axios.put(`http://localhost:9191/api/jobapplications/editJobApplication?postingId=${postingId}&userSkillIds=${userSkillIds}&availableStartDate=${availableStartDate}`);
  },
  getUserBookmarks(userId) {
    return axios.get(`http://localhost:9191/api/qualification/getUserBookmarks?userId=${userId}`);
  },
  addUserBookmark(userId, jobPostId) {
    return axios.post(`http://localhost:9191/api/qualification/addUserBookmark?userId=${userId}&jobPostId=${jobPostId}`);
  },
  removeUserBookmark(userId, jobPostId) {
    return axios.delete(`http://localhost:9191/api/qualification/removeUserBookmark?userId=${userId}&jobPostId=${jobPostId}`);
  },
};

export default api;
