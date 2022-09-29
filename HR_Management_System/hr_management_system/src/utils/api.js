import axios from "axios";

const api = {
  login(email, password) {
    return axios.get(
      `http://localhost:9191/api/user/login/loginHRMS?workEmail=${email}&password=${password}`
    );
  },
  register(
    firstName,
    lastName,
    password,
    phone,
    email,
    workEmail,
    dob,
    gender,
    role,
    isPartTimer,
    isHrEmployee,
    dateJoined
  ) {
    return axios.post(
      `http://localhost:9191/api/user/register/registerNewAccountHRMS?firstName=${firstName}&lastName=${lastName}&password=${password}&phone=${phone}&email=${email}&workEmail=${workEmail}&dob=${dob}&gender=${gender}&userRole=${role}&isPartTimer=${isPartTimer}&isHrEmployee=${isHrEmployee}&dateJoined=${dateJoined}`
    );
  },
  confirmToken(token) {
    return axios.get(
      `http://localhost:9191/api/user/register/confirmToken?token=${token}`
    );
  },
  resendConfirmation(email) {
    return axios.get(
      `http://localhost:9191/api/user/register/resendConfirmationEmailHRMS?email=${email}`
    );
  },
  getCategories() {
    return axios.get(`http://localhost:9191/api/category`);
  },
  getCategoryById(categoryId) {
    return axios.get(`http://localhost:9191/api/category/${categoryId}`);
  },
  addNewCategory(category) {
    return axios.post(`http://localhost:9191/api/category`, category);
  },
  deleteCategory(categoryId) {
    return axios.delete(`http://localhost:9191/api/category/${categoryId}`);
  },
  editCategory(categoryId, name) {
    return axios.put(
      `http://localhost:9191/api/category/${categoryId}?categoryName=${name}`
    );
  },
  getTasks() {
    return axios.get(`http://localhost:9191/api/task`);
  },
  getTaskById(taskId) {
    return axios.get(`http://localhost:9191/api/task/${taskId}`);
  },
  addNewTask(task) {
    return axios.post(`http://localhost:9191/api/task`, task);
  },
  deleteTask(taskId) {
    return axios.delete(`http://localhost:9191/api/task/${taskId}`);
  },
  editTask(taskId, name, description, employeeIds) {
    return axios.put(
      `http://localhost:9191/api/task/${taskId}?taskName=${name}&taskDescription=${description}&employeeIds=${employeeIds}`
    );
  },
  getTaskListItems() {
    return axios.get(`http://localhost:9191/api/task_list_item`);
  },
  getTaskListItemsByTask(taskId) {
    return axios.get(
      `http://localhost:9191/api/task_list_item?taskId=${taskId}`
    );
  },
  getTaskListItemsByEmployee(employeeId) {
    return axios.get(
      `http://localhost:9191/api/task_list_item?employeeId=${employeeId}`
    );
  },
  markTaskListItemAsComplete(taskListItemId) {
    return axios.put(
      `http://localhost:9191/api/task_list_item/${taskListItemId}`
    );
  },
};

export default api;
