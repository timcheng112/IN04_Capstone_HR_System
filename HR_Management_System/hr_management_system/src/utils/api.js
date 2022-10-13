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
      `http://localhost:9191/api/user/register/registerNewAccountHRMS?firstName=${firstName}&lastName=${lastName}&phone=${phone}&email=${email}&workEmail=${workEmail}&dob=${dob}&gender=${gender}&userRole=${role}&isPartTimer=${isPartTimer}&isHrEmployee=${isHrEmployee}&dateJoined=${dateJoined}`
    );
  },
  confirmToken(token) {
    return axios.get(
      `http://localhost:9191/api/user/register/confirmToken?token=${token}`
    );
  },
  verifyTempPassword(workEmail, tempPassword) {
    return axios.get(
      `http://localhost:9191/api/user/register/verifyTempPassword?workEmail=${workEmail}&tempPassword=${tempPassword}`
    )
  },
  setFirstPassword(workEmail, password) {
    return axios.get(
      `http://localhost:9191/api/user/register/setFirstPassword?workEmail=${workEmail}&password=${password}`
    )
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
  getTaskByName(taskName) {
    return axios.get(
      `http://localhost:9191/api/task/get-task-by-name${taskName}`
    );
  },
  getOnboardingTasks() {
    return axios.get(`http://localhost:9191/api/task/onboarding-tasks`);
  },
  getOffboardingTasks() {
    return axios.get(`http://localhost:9191/api/task/offboarding-tasks`);
  },
  addNewTask(task, categoryId) {
    return axios.post(
      `http://localhost:9191/api/task?categoryId=${categoryId}`,
      task
    );
  },
  deleteTask(taskId) {
    return axios.delete(`http://localhost:9191/api/task/${taskId}`);
  },
  editTask(taskId, name, description) {
    return axios.put(
      `http://localhost:9191/api/task/${taskId}?taskName=${name}&taskDescription=${description}`
    );
  },
  getTaskListItems() {
    return axios.get(`http://localhost:9191/api/task_list_item`);
  },
  addNewTaskListItem(employeeId, taskId, taskListItem) {
    return axios.post(
      `http://localhost:9191/api/task_list_item?employeeId=${employeeId}&taskId=${taskId}`,
      taskListItem
    );
  },
  deleteTaskListItem(taskListItemId) {
    return axios.delete(
      `http://localhost:9191/api/task_list_item/${taskListItemId}`
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
      `http://localhost:9191/api/task_list_item/onboarding-task-list-items?employeeId=${employeeId}`
    );
  },
  getOffboardingTaskListItemsByEmployee(employeeId) {
    return axios.get(
      `http://localhost:9191/api/task_list_item/offboarding-task-list-items?employeeId=${employeeId}`
    );
  },
  markTaskListItemAsComplete(taskListItemId) {
    return axios.put(
      `http://localhost:9191/api/task_list_item/${taskListItemId}`
    );
  },
  getAllEmployees() {
    return axios.get(`http://localhost:9191/api/user/getAllEmployees`);
  },
  getEmployeesWithTask(taskId) {
    return axios.get(
      `http://localhost:9191/api/user/getAssignedEmployees?taskId=${taskId}`
    );
  },
  getEmployeesWithoutTask(taskId) {
    return axios.get(
      `http://localhost:9191/api/user/getUnassignedEmployees?taskId=${taskId}`
    );
  },

  getOrganization() {
    return axios.get(`http://localhost:9191/api/organization/1`);
  },
  getUserInfo(userId) {
    return axios.get(`http://localhost:9191/api/user/${userId}`);
  },
  editUserInfo(userId, gender, email, phone) {
    return axios.get(
      `http://localhost:9191/api/user/updateProfile?userId=${userId}&gender=${gender}&email=${email}&phone=${phone}`
    );
  },
  getUser(userId) {
    return axios.get(`http://localhost:9191/api/user/${userId}`);
  },
  getUserIdByEmail(email) { // this mght nt work
    return axios.get(
      `http://localhost:9191/api/user/login/getUserIdByWorkEmail?workEmail=${email}`
    );
  },
  getEmployeeIdByEmail(email) {
      return axios.get(
        `http://localhost:9191/api/user/login/getEmployeeIdByEmail?workEmail=${email}`
      );
    },
  getDept(deptId) {
    return axios.get(`http://localhost:9191/api/department/${deptId}`);
  },
  deleteDept(deptId) {
    return axios.delete(`http://localhost:9191/api/department/${deptId}`);
  },
  deleteTeam(teamId) {
    return axios.delete(`http://localhost:9191/api/team/${teamId}`);
  },
  uploadFile(file) {
    return axios.post(`http://localhost:9191/api/docData/uploadDocument/`, file);
  },
  addDepartment(deptName, deptHeadId) {
    return axios.post(
      `http://localhost:9191/api/department/addDepartment?deptName=${deptName}&deptHeadId=${deptHeadId}`
    );
  },
  getAvailManagers() {
    return axios.get(`http://localhost:9191/api/user/getAllAvailManagers`);
  },
  changeOrgHead(orgName, newOrgId) {
    return axios.put(
      `http://localhost:9191/api/organization/changeOrganizationHead?orgName=${orgName}&newOrgId=${newOrgId}`
    );
  },
  getTeam(teamId) {
    return axios.get(`http://localhost:9191/api/team/${teamId}`);
  },
  getAllTeams() {
    return axios.get(`http://localhost:9191/api/team/getAllTeams`);
  },
  getEmployeesNotInGivenTeam(teamId) {
    return axios.get(
      `http://localhost:9191/api/user/getEmployeesNotInGivenTeam?teamId=${teamId}`
    );
  },
  addMemberToTeam(teamId, userId) {
    return axios.put(
      `http://localhost:9191/api/team/addMemberToTeam?teamId=${teamId}&userId=${userId}`
    );
  },
  addAddress(addressName, line1, line2, postalCode, city, country) {
    return axios.post(
      `http://localhost:9191/api/address/addAddress?addressName=${addressName}&line1=${line1}&line2=${line2}&postalCode=${postalCode}&city=${city}&country=${country}`
    );
  },
  addOutlet(outletName, contactNo, openingHour, closingHour, addressId) {
    return axios.post(
      `http://localhost:9191/api/outlet/addOutlet?outletName=${outletName}&contactNo=${contactNo}&openingHour=${openingHour}&closingHour=${closingHour}&addressId=${addressId}`
    );
  },
  addTeam(teamName, teamHeadId, outletId, isOffice, deptId) {
    return axios.post(
      `http://localhost:9191/api/team/addTeam?teamHeadId=${teamHeadId}&teamName=${teamName}&outletId=${outletId}&isOffice=${isOffice}&deptId=${deptId}`
    );
  },
  getAllOutlets() {
    return axios.get(`http://localhost:9191/api/outlet/getAllOutlets`);
  },
  changeDepartmentHead(deptId, newHeadId) {
    return axios.put(
        `http://localhost:9191/api/department/changeDepartmentHead?deptId=${deptId}&newHeadId=${newHeadId}`
    );
  },
  getAllTeamsInDept(deptId) {
    return axios.get(
        `http://localhost:9191/api/team/getAllTeamsInDept/${deptId}`
    );
  },
  getAllModules() {
    return axios.get(`http://localhost:9191/api/module`)
  },
  getModule(moduleId) {
    return axios.get(`http://localhost:9191/api/module/${moduleId}`)
  },
  addModule(module) {
    return axios.post(`http://localhost:9191/api/module`, module)
  },
  assignModule(moduleId, employees) {
    return axios.post(`http://localhost:9191/api/module/user/${moduleId}`, employees)
  },
  deleteModule(moduleId) {
    return axios.delete(`http://localhost:9191/api/module/${moduleId}`)
  },
  editModule(moduleId, module) {
    return axios.put(`http://localhost:9191/api/module/${moduleId}`, module)
  },
  getUserModules(userId) {
    return axios.get(`http://localhost:9191/api/module/user/${userId}`)
  },
  getVideosInModule(moduleId) {
    return axios.get(`http://localhost:9191/api/module/${moduleId}/videos`)
  },
  addVideo(moduleId, video) {
    return axios.post(`http://localhost:9191/api/module/${moduleId}`, video)
  },
  getVideo(videoId) {
    return axios.get(`http://localhost:9191/api/video/${videoId}`)
  },
  // JOB REQUEST
  getAllJobRequests() {
      return axios.get(
          `http://localhost:9191/api/jobrequest/getAllJobRequests`
      );
  },
  getManagerJobRequests(managerId) {
        return axios.get(
            `http://localhost:9191/api/jobrequest/getJobRequestsByRequestorId?requestorId=${managerId}`
        );
  },
  saveJobRequest(jobTitle, jobDescription, justification, preferredStartDate, jobType, jobRole, salary, jobRequirementIds, departmentId, requestedById, jobRequestId) {
        return axios.post(
            `http://localhost:9191/api/jobrequest/saveJobRequest?jobTitle=${jobTitle}&jobDescription=${jobDescription}&justification=${justification}&preferredStartDate=${preferredStartDate}&jobType=${jobType}&jobRole=${jobRole}&salary=${salary}&jobRequirementsId=${jobRequirementIds}&departmentId=${departmentId}&requestedById=${requestedById}&jobRequestId=${jobRequestId}`
        );
  },
  getJobRequestById(jobRequestId) {
        return axios.get(
            `http://localhost:9191/api/jobrequest/getJobRequestById?jobRequestId=${jobRequestId}`
        );
  },
  deleteJobRequest(jobRequestId) {
        return axios.delete(
            `http://localhost:9191/api/jobrequest/deleteJobRequest?jobRequestId=${jobRequestId}`
        );
  },
};

export default api;
