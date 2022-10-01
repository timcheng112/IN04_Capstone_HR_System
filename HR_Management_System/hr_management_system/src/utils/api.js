import axios from "axios";

const api = {
  //matthew and xueqi's stuff for SR1
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
  resetPassword(email, oldPassword, newPassword) {
    return axios.put(
      `http://localhost:9191/api/user/login/resetPasswordHRMS?workEmail=${email}&oldPassword=${oldPassword}&newPassword=${newPassword}`
    );
  },
  forgotCheckEmail(email) {
    return axios.get(
      `http://localhost:9191/api/user/login/checkEmailHRMS?workEmail=${email}`
    );
  },
  forgotPassword(email) {
    return axios.get(
      `http://localhost:9191/api/user/login/forgotPasswordHRMS?workEmail=${email}`
    );
  },
  getEmployeeByToken(token) {
    return axios.get(
      `http://localhost:9191/api/user/login/getEmployeeByToken?token=${token}`
    );
  },
  changePassword(workEmail, password) {
    return axios.get(
      `http://localhost:9191/api/user/login/changePasswordHRMS?workEmail=${workEmail}&password=${password}`
    );
  },

  //timothy & xy's stuff for SR1
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
      `http://localhost:9191/api/task_list_item/task-list-items-by-task?taskId=${taskId}`
    );
  },
  getTaskListItemsByEmployee(employeeId) {
    return axios.get(
      `http://localhost:9191/api/task_list_item/task-list-items-by-employee?employeeId=${employeeId}`
    );
  },
  markTaskListItemAsComplete(taskListItemId) {
    return axios.put(
      `http://localhost:9191/api/task_list_item/${taskListItemId}`
    );
  },
  
  getOrganization() {
    return axios.get(
      `http://localhost:9191/api/organization/1`
    );
  },

  getUserInfo(userId){
    return axios.get(`http://localhost:9191/api/user/${userId}`);
  },
  editUserInfo(userId, gender, email, phone){
    return axios.get(`http://localhost:9191/api/user/updateProfile?userId=${userId}&gender=${gender}&email=${email}&phone=${phone}`);
  },
  
  getUser(userId) {
    return axios.get(
      `http://localhost:9191/api/user/${userId}`
    );
  },
  getUserIdByEmail(email) {
    return axios.get(`http://localhost:9191/api/user/login/getUserIdByWorkEmail?workEmail=${email}`);
  },
  addDepartment(deptName, deptHeadId){
    return axios.post(`http://localhost:9191/api/department/addDepartment?deptName=${deptName}&deptHeadId=${deptHeadId}`);
  },

};

export default api;
