import axios from "axios";

// const URL = "172.17.154.228";
const URL = "192.168.1.101";

const api = {
  login(email, password) {
    return axios.get(
      `http://localhost:9191/api/user/login/loginHRMS?workEmail=${email}&password=${password}`
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
  getAllPlaylists(){
    return axios.get(`http://${URL}:9191/api/module`);
  },
  getUserPlaylists(employeeId){
    return axios.get(`http://${URL}:9191/api/module/user/${employeeId}`);
  }
};

export default api;
