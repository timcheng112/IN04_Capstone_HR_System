import axios from "axios";

// const URL = "192.168.10.128"; // MATT
// const URL = "172.31.55.234"; // XINYUE
//  const URL = "192.168.10.128"; // MATT
//const URL = "10.100.1.104"; // XINYUE
//const URL = "192.168.1.35"; //XUEQI
// const URL = "192.168.1.102"; //ALI
// const URL = "172.31.54.163"
// const URL = "10.100.1.104"; // TIM
// const URL = "172.17.93.172";
//const URL = "10.249.106.71" //ALI

//const URL = "192.168.1.82"; // TIM

//const URL = "172.25.108.168";
const URL = "172.20.10.13";


const api = {
  login(workEmail, password) {
    return axios.get(
      `http://${URL}:9191/api/user/login/loginHRMS?workEmail=${workEmail}&password=${password}`
    );
  },
  getUser(userId) {
    return axios.get(`http://${URL}:9191/api/user/${userId}`);
  },
  getDocById(docId) {
    return axios.get(`http://${URL}:9191/api/docData/getDocById?id=${docId}`, {
      responseType: "blob",
    });
  },
  updateProfile(userId, email, phone, bankName, bankAcc){
    return axios.get(`http://${URL}:9191/api/user/updateProfileESS?userId=${userId}&email=${email}&phone=${phone}&bankName=${bankName}&bankAccNo=${bankAcc}`);
  },
  getEmployeesByTeam(teamId) {
    return axios.get(
      `http://${URL}:9191/api/user/getEmployeesByTeam?teamId=${teamId}`
    );
  },
  // onboarding/offboarding
  getTaskListItems() {
    return axios.get(`http://localhost:9191/api/task_list_item`);
  },
  deleteTaskListItem(taskListItemId) {
    return axios.delete(
      `http://${URL}:9191/api/task_list_item/${taskListItemId}`
    );
  },
  getTaskListItemsByTask(taskId) {
    return axios.get(
      `http://localhost:9191/api/task_list_item/task-list-items-by-task?taskId=${taskId}`
    );
  },
  getTaskListItemsByEmployee(employeeId) {
    return axios.get(
      `http://localhost:9191/api/task_list_item/task-list-items-by-employee?employeeId=${employeeId}`
    );
  },
  getOnboardingTaskListItemsByEmployee(employeeId) {
    return axios.get(
      `http://${URL}:9191/api/task_list_item/onboarding-task-list-items?employeeId=${employeeId}`
    );
  },
  getOffboardingTaskListItemsByEmployee(employeeId) {
    return axios.get(
      `http://${URL}:9191/api/task_list_item/offboarding-task-list-items?employeeId=${employeeId}`
    );
  },
  markTaskListItemAsComplete(taskListItemId) {
    return axios.put(`http://${URL}:9191/api/task_list_item/${taskListItemId}`);
  },

  // Leaves
  getAllPendingLeaves() {
    return axios.get(`http://${URL}:9191/api/leaves/getAllPendingLeaves`);
  },
  getLeaveById(leaveId) {
    return axios.get(
      `http://${URL}:9191/api/leaves/getLeaveById?leaveId=${leaveId}`
    );
  },
  createLeave(formDataPayload) {
    return axios.post(
      `http://${URL}:9191/api/leaves/createLeave`,
      formDataPayload,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
  },
  getEmployeeLeaves(employeeId) {
    return axios.get(
      `http://${URL}:9191/api/leaves/getEmployeeLeaves?employeeId=${employeeId}`
    );
  },
  approveLeave(leaveId, approverRemarks) {
    return axios.put(
      `http://${URL}:9191/api/leaves/approveLeave?leaveId=${leaveId}&approverRemarks=${approverRemarks}`
    );
  },
  rejectLeave(leaveId, approverRemarks) {
    return axios.put(
      `http://${URL}:9191/api/leaves/rejectLeave?leaveId=${leaveId}&approverRemarks=${approverRemarks}`
    );
  },
  cancelLeave(leaveId) {
    return axios.put(
      `http://${URL}:9191/api/leaves/cancelLeave?leaveId=${leaveId}`
    );
  },
  getEmployeeInclLeaveQuotas(employeeId) {
    return axios.get(
      `http://${URL}:9191/api/user/getEmployeeInclLeaveQuotas?employeeId=${employeeId}`
    );
  },
  //training
  getAllModules() {
    return axios.get(`http://${URL}:9191/api/module`);
  },
  getUserModules(employeeId) {
    return axios.get(`http://${URL}:9191/api/module/user/${employeeId}`);
  },
  getModule(moduleId) {
    return axios.get(`http://${URL}:9191/api/module/${moduleId}`);
  },
  getVideo(videoId) {
    return axios.get(`http://${URL}:9191/api/video/${videoId}`);
  },
  getIsVideoWatchedByEmployee(videoId, userId) {
    return axios.get(`http://${URL}:9191/api/video/${videoId}/user/${userId}`);
  },
  getUserProgress(moduleId, userId) {
    return axios.get(
      `http://${URL}:9191/api/module/${moduleId}/user/${userId}`
    );
  },
  getUserCompletedModules(userId) {
    return axios.get(`http://${URL}:9191/api/module/user/${userId}/completed`);
  },
  markVideoAsWatched(videoId, userId) {
    return axios.post(`http://${URL}:9191/api/video/${videoId}/user/${userId}`);
  },
  getUserCompletedModules(userId) {
    return axios.get(`http://${URL}:9191/api/module/user/${userId}/completed`);
  },
  getUserReadNotifications(userId) {
    return axios.get(`http://${URL}:9191/api/notification/read/${userId}`);
  },
  getUserUnreadNotifications(userId) {
    return axios.get(`http://${URL}:9191/api/notification/unread/${userId}`);
  },
  markNotificationAsRead(notificationId, userId) {
    return axios.post(
      `http://${URL}:9191/api/notification/${notificationId}/user/${userId}`
    );
  },
  deleteANotification(notificationId, userId) {
    return axios.delete(
      `http://${URL}:9191/api/notification/deleteOneNotif?notificationId=${notificationId}&userId=${userId}`
    );
  },
  deleteAllNotifications(userId) {
    return axios.delete(
      `http://${URL}:9191/api/notification/deleteNotifications?userId=${userId}`
    );
  },
  getShiftListItemByDateAndTeam(date, teamId) {
    return axios.get(
      `http://${URL}:9191/api/shift_list_item/getShiftListItemByDateAndTeam?date=${date}&teamId=${teamId}`
    );
  },
  getShiftListItemByTeam(teamId) {
    return axios.get(
      `http://${URL}:9191/api/shift_list_item/getShiftListItemByTeam?teamId=${teamId}`
    );
  },
  getPreferredDatesByUserId(userId) {
    return axios.get(
      `http://${URL}:9191/api/preferred_date/getPreferredDatesByUserId?userId=${userId}`
    );
  },
  addNewPreferredDates(dates, userId) {
    return axios.post(
      `http://${URL}:9191/api/preferred_date?dates=${dates}&userId=${userId}`,
      preferredDates
    );
  },
  editPreferredDates(userId, newDates) {
    return axios.put(
      `http://${URL}:9191/api/preferred_date/editPreferredDates?userId=${userId}`,
      newDates
    );
  },
  addNewSwapRequest(reason, receiverShiftListItemId, requesterShiftListItemId) {
    return axios.post(
      `http://${URL}:9191/api/swap_request?reason=${reason}&receiverShiftListItemId=${receiverShiftListItemId}&requesterShiftListItemId=${requesterShiftListItemId}`
    );
  },
  getSwapRequestsByUserId(userId) {
    return axios.get(
      `http://${URL}:9191/api/swap_request/getSwapRequestsByUserId?userId=${userId}`
    );
  },
  deleteSwapRequestById(swapRequestId) {
    return axios.delete(`http://${URL}:9191/api/swap_request/${swapRequestId}`);
  },
  getSwapRequestsByTeamId(teamId) {
    return axios.get(
      `http://${URL}:9191/api/swap_request/getSwapRequestsByTeamId?teamId=${teamId}`
    );
  },
  approveSwapRequest(swapRequestId, responseReason) {
    return axios.put(
      `http://${URL}:9191/api/swap_request/approveSwapRequest?swapRequestId=${swapRequestId}&responseReason=${responseReason}`
    );
  },
  rejectSwapRequest(swapRequestId, responseReason) {
    return axios.put(
      `http://${URL}:9191/api/swap_request/rejectSwapRequest?swapRequestId=${swapRequestId}&responseReason=${responseReason}`
    );
  },
  clearSwapRequest(swapRequestId) {
    return axios.put(
      `http://${URL}:9191/api/swap_request/clearSwapRequest?swapRequestId=${swapRequestId}`
    );
  },
  approvePendingSwapRequest(swapRequestId, responseReason) {
    return axios.put(
      `http://${URL}:9191/api/swap_request/approvePendingSwapRequest?swapRequestId=${swapRequestId}&responseReason=${responseReason}`
    );
  },
  counterProposeSwapRequest(
    reason,
    oldSwapRequestId,
    receiverShiftListItemId,
    requesterShiftListItemId
  ) {
    return axios.post(
      `http://${URL}:9191/api/swap_request/counterProposeSwapRequest?reason=${reason}&oldSwapRequestId=${oldSwapRequestId}&receiverShiftListItemId=${receiverShiftListItemId}&requesterShiftListItemId=${requesterShiftListItemId}`
    );
  },
  getNumberOfPendingIncomingSwapRequestsByUser(userId) {
    return axios.get(
      `http://${URL}:9191/api/swap_request/getNumberOfPendingIncomingSwapRequestsByUser?userId=${userId}`
    );
  },

  getAllBenefitPlanInstancesByEmployeeId(employeeId) {
    return axios.get(
      `http://${URL}:9191/api/claims/getAllBenefitPlanInstancesByEmployeeId?employeeId=${employeeId}`
    );
  },
  getEmployeeClaims(employeeId) {
    return axios.get(
      `http://${URL}:9191/api/claims/getEmployeeClaims?employeeId=${employeeId}`
    );
  },
  withdrawClaim(claimId) {
    return axios.delete(
      `http://${URL}:9191/api/claims/withdrawClaim?claimId=${claimId}`
    );
  },
  makeNewClaim(
    claimDate,
    incidentDate,
    remarks,
    claimAmount,
    benefitPlanInstanceId,
    file
  ) {
    return axios.post(
      `http://${URL}:9191/api/claims/makeNewClaim?file=&claimDate=${claimDate}&incidentDate=${incidentDate}&remarks=${remarks}&claimAmount=${claimAmount}&benefitPlanInstanceId=${benefitPlanInstanceId}`,
      file
    );
  },
  createClaim(formDataPayload) {
    return axios.post(
      `http://${URL}:9191/api/claims/makeNewClaim`,
      formDataPayload,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
  },
  getPayslipByUserId(userId) {
    return axios.get(
      `http://${URL}:9191/api/pay/payslip/getPayslipByUserId?userId=${userId}`
    );
  },
  downloadDocument(docDataId) {
    return axios.get(`
    http://${URL}:9191/api/docData/downloadDocument?id=${docDataId}`);
  },
  getDocById(docId) {
    return axios.get(`http://${URL}:9191/api/docData/getDocById?id=${docId}`, {
      responseType: "blob",
    });
  },
  checkin(userId){
    return axios.post(`http://${URL}:9191/api/user/attendance/checkIn?userId=${userId}`);
  },
  checkout(userId){
    return axios.post(`http://${URL}:9191/api/user/attendance/checkOut?userId=${userId}`);
  },
  getUserAttendedShiftsMonthly(userId){
    return axios.get(`http://${URL}:9191/api/shift_list_item/getUserAttendedShiftsMonthly?userId=${userId}`);
  },
  redeemReward(rewardId, employeeId) {
      return axios.post(
        `http://${URL}:9191/api/rewards/redeemReward?rewardId=${rewardId}&employeeId=${employeeId}`
      );
   },
   getRewardTrackByEmployee(employeeId) {
    return axios.get(
      `http://${URL}:9191/api/rewards/getRewardTrackByEmployee?employeeId=${employeeId}`
    );
  },
  getUserShiftItemsMonthly(userId){
    return axios.get(`http://${URL}:9191/api/shift_list_item/getUserShiftItemsMonthly?userId=${userId}`);
  },
  getUserPayInformation(userId) {
    return axios.get(`http://${URL}:9191/api/pay/payinfo/user/${userId}`);
  },
};

export default api;
