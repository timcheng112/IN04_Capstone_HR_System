import axios from "axios";

// const URL = "192.168.10.128"; // MATT
const URL = "172.31.52.96"; // XINYUE

const api = {
  login(workEmail, password) {
    return axios.get(
      `http://${URL}:9191/api/user/login/loginHRMS?workEmail=${workEmail}&password=${password}`
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
    return axios.get(`http://${URL}:9191/api/leaves/getLeaveById?leaveId=${leaveId}`);
  },
  createLeave(formDataPayload) {
    return axios.post(`http://${URL}:9191/api/leaves/createLeave`, formDataPayload, {headers: {'Content-Type': 'multipart/form-data'}});
  },
  getEmployeeLeaves(employeeId) {
    return axios.get(`http://${URL}:9191/api/leaves/getEmployeeLeaves?employeeId=${employeeId}`);
  },
  approveLeave(leaveId, approverRemarks) {
    return axios.put(`http://${URL}:9191/api/leaves/approveLeave?leaveId=${leaveId}&approverRemarks=${approverRemarks}`);
  },
  rejectLeave(leaveId, approverRemarks) {
    return axios.put(`http://${URL}:9191/api/leaves/rejectLeave?leaveId=${leaveId}&approverRemarks=${approverRemarks}`);
  },
  cancelLeave(leaveId) {
    return axios.put(`http://${URL}:9191/api/leaves/cancelLeave?leaveId=${leaveId}`)
  },
  getEmployeeInclLeaveQuotas(employeeId) {
    return axios.get(`http://${URL}:9191/api/user/getEmployeeInclLeaveQuotas?employeeId=${employeeId}`);
  },
  //training
  getAllModules(){
    return axios.get(`http://${URL}:9191/api/module`);
  },
  getUserModules(employeeId){
    return axios.get(`http://${URL}:9191/api/module/user/${employeeId}`);
  },
  getModule(moduleId) {
    return axios.get(`http://${URL}:9191/api/module/${moduleId}`);
  },
  getVideo(videoId) {
    return axios.get(`http://${URL}:9191/api/video/${videoId}`)
  },
  getIsVideoWatchedByEmployee(videoId, userId) {
    return axios.get(`http://${URL}:9191/api/video/${videoId}/user/${userId}`)
  },
  getUserProgress(moduleId, userId) {
    return axios.get(`http://${URL}:9191/api/module/${moduleId}/user/${userId}`)
  },
  getUserCompletedModules(userId) {
    return axios.get(`http://${URL}:9191/api/module/user/${userId}/completed`)
  },
  markVideoAsWatched(videoId, userId) {
    return axios.post(`http://${URL}:9191/api/video/${videoId}/user/${userId}`)
  },
  getUserCompletedModules(userId) {
    return axios.get(`http://${URL}:9191/api/module/user/${userId}/completed`)
  },
};

export default api;
