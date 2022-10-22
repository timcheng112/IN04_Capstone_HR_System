import axios from "axios";

const URL = "192.168.50.165";


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
