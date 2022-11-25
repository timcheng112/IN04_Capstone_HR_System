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
    race,
    citizenship,
    role,
    isPartTimer,
    isHrEmployee,
    dateJoined,
    positionType,
    positionName,
    positionDescription,
    jobType
  ) {
    return axios.post(
      `http://localhost:9191/api/user/register/registerNewAccountHRMS?firstName=${firstName}&lastName=${lastName}&phone=${phone}&email=${email}&workEmail=${workEmail}&dob=${dob}&gender=${gender}&race=${race}&citizenship=${citizenship}&userRole=${role}&isPartTimer=${isPartTimer}&isHrEmployee=${isHrEmployee}&dateJoined=${dateJoined}&positionType=${positionType}&positionName=${positionName}&positionDescription=${positionDescription}&jobType=${jobType}`
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
    );
  },
  setFirstPassword(workEmail, password) {
    return axios.get(
      `http://localhost:9191/api/user/register/setFirstPassword?workEmail=${workEmail}&password=${password}`
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
  editTask(taskId, name, description, autoAssign) {
    return axios.put(
      `http://localhost:9191/api/task/${taskId}?taskName=${name}&taskDescription=${description}&autoAssign=${autoAssign}`
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
  getAllEmployeesInclLeaveQuotas() {
    return axios.get(
      `http://localhost:9191/api/user/getAllEmployeesInclLeaveQuotas`
    );
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
  assignTaskToEmployeeByCategory(userId, categoryId, isOnboarding) {
    return axios.post(
      `http://localhost:9191/api/category/assignCategoryTasks?userId=${userId}&categoryId=${categoryId}&isOnboarding=${isOnboarding}`
    );
  },
  getChecklists() {
    return axios.get(`http://localhost:9191/api/checklist`);
  },
  getOnboardingChecklists() {
    return axios.get("http://localhost:9191/api/checklist/onboardingchecklist");
  },
  getOffboardingChecklists() {
    return axios.get(
      "http://localhost:9191/api/checklist/offboardingchecklist"
    );
  },
  getChecklistById(checklistId) {
    return axios.get(`http://localhost:9191/api/checklist/${checklistId}`);
  },
  addNewChecklist(checklist, taskIds) {
    return axios.post(
      `http://localhost:9191/api/checklist?taskIds=${taskIds}`,
      checklist
    );
  },
  editChecklist(checklistId, checklistTitle, checklistDescription, taskIds) {
    return axios.put(
      `http://localhost:9191/api/checklist/${checklistId}?checklistTitle=${checklistTitle}&checklistDescription=${checklistDescription}&taskIds=${taskIds}`
    );
  },
  deleteChecklist(checklistId) {
    return axios.delete(`http://localhost:9191/api/checklist/${checklistId}`);
  },

  getOrganization() {
    return axios.get(`http://localhost:9191/api/organization/1`);
  },
  getIsOrganizationHead(userId) {
    return axios.get(`http://localhost:9191/api/organization/${userId}/isHead`);
  },
  getUserInfo(userId) {
    return axios.get(`http://localhost:9191/api/user/${userId}`);
  },
  editUserInfo(userId, gender, email, phone) {
    return axios.get(
      `http://localhost:9191/api/user/updateProfile?userId=${userId}&gender=${gender}&email=${email}&phone=${phone}`
    );
  },
  addPayInformation(userId, payInformation) {
    return axios.post(
      `http://localhost:9191/api/pay/payinfo/addPayInformation?userId=${userId}&payInformation=${payInformation}`
    );
  },
  getUser(userId) {
    return axios.get(`http://localhost:9191/api/user/${userId}`);
  },
  getUserIdByEmail(email) {
    // this mght nt work
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
    return axios.delete(`http://localhost:9191/api/team/deleteTeam/${teamId}`);
  },
  uploadFile(file) {
    return axios.post(
      `http://localhost:9191/api/docData/uploadDocument/`,
      file
    );
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
  getAllDepartments() {
    return axios.get("http://localhost:9191/api/department/getAllDepartments");
  },
  getIsDepartmentHead(userId) {
    return axios.get(`http://localhost:9191/api/department/${userId}/isHead`);
  },
  getEmployeesByDepartment(departmentId) {
    return axios.get(
      `http://localhost:9191/api/user/getEmployeesByDepartment?departmentId=${departmentId}`
    );
  },
  getEmployeesByTeam(teamId) {
    return axios.get(
      `http://localhost:9191/api/user/getEmployeesByTeam?teamId=${teamId}`
    );
  },
  getEmployeesByRosterAndDate(rosterId, date) {
    return axios.get(
      `http://localhost:9191/api/user/getEmployeesByRosterAndDate?rosterId=${rosterId}&date=${date}`
    );
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
  getIsTeamHead(userId) {
    return axios.get(`http://localhost:9191/api/team/${userId}/isHead`);
  },
  getAllModules() {
    return axios.get(`http://localhost:9191/api/module`);
  },
  getModule(moduleId) {
    return axios.get(`http://localhost:9191/api/module/${moduleId}`);
  },
  addModule(module) {
    return axios.post(`http://localhost:9191/api/module`, module);
  },
  assignModule(moduleId, employees, userId) {
    return axios.post(
      `http://localhost:9191/api/module/${moduleId}/user/${userId}`,
      employees
    );
  },
  deleteModule(moduleId) {
    return axios.delete(`http://localhost:9191/api/module/${moduleId}`);
  },
  editModule(moduleId, module) {
    return axios.put(`http://localhost:9191/api/module/${moduleId}`, module);
  },
  getUserModules(userId) {
    return axios.get(`http://localhost:9191/api/module/user/${userId}`);
  },
  getModuleFromVideo(videoId) {
    return axios.get(`http://localhost:9191/api/module/video/${videoId}`);
  },
  getEmployeesAssignedToModule(moduleId) {
    return axios.get(`http://localhost:9191/api/module/${moduleId}/user`);
  },
  getEmployeesUnassignedToModule(moduleId) {
    return axios.get(
      `http://localhost:9191/api/module/${moduleId}/unAssignedUser`
    );
  },
  getIsUserAssignedToModule(moduleId, userId) {
    return axios.get(
      `http://localhost:9191/api/module/${moduleId}/user/${userId}/assigned`
    );
  },
  getVideosInModule(moduleId) {
    return axios.get(`http://localhost:9191/api/module/${moduleId}/videos`);
  },
  addVideo(moduleId, title, description) {
    return axios.post(
      `http://localhost:9191/api/module/${moduleId}?title=${title}&description=${description}`
    );
  },
  getVideo(videoId) {
    return axios.get(`http://localhost:9191/api/video/${videoId}`);
  },
  getVideos() {
    return axios.get(`http://localhost:9191/api/video`);
  },
  editVideo(videoId, video) {
    return axios.put(`http://localhost:9191/api/video/${videoId}`, video);
  },
  deleteVideo(videoId) {
    return axios.delete(`http://localhost:9191/api/video/${videoId}`);
  },
  markVideoAsWatched(videoId, userId) {
    return axios.post(
      `http://localhost:9191/api/video/${videoId}/user/${userId}`
    );
  },
  uploadVideo(video) {
    return axios.post(`http://localhost:9191/api/video/upload`, video);
  },
  getIsVideoWatchedByEmployee(videoId, userId) {
    return axios.get(
      `http://localhost:9191/api/video/${videoId}/user/${userId}`
    );
  },
  getUserProgress(moduleId, userId) {
    return axios.get(
      `http://localhost:9191/api/module/${moduleId}/user/${userId}`
    );
  },
  getUserCompletedModules(userId) {
    return axios.get(
      `http://localhost:9191/api/module/user/${userId}/completed`
    );
  },
  // JOB REQUEST
  getAllJobRequests() {
    return axios.get(`http://localhost:9191/api/jobrequest/getAllJobRequests`);
  },
  getAllSubmittedJobRequests(hrId) {
    return axios.get(
      `http://localhost:9191/api/jobrequest/getAllSubmittedJobRequests?hrId=${hrId}`
    );
  },
  getManagerJobRequests(managerId) {
    return axios.get(
      `http://localhost:9191/api/jobrequest/getJobRequestsByRequestorId?requestorId=${managerId}`
    );
  },
  saveJobRequest(
    jobTitle,
    jobDescription,
    justification,
    preferredStartDate,
    jobType,
    jobRole,
    salaryMin,
    salaryMax,
    jobRequirements,
    departmentId,
    teamId,
    requestedById,
    jobRequestId,
    posType
  ) {
    return axios.post(
      `http://localhost:9191/api/jobrequest/saveJobRequest?jobTitle=${jobTitle}&jobDescription=${jobDescription}&justification=${justification}&preferredStartDate=${preferredStartDate}&jobType=${jobType}&jobRole=${jobRole}&salaryMin=${salaryMin}&salaryMax=${salaryMax}&jobRequirements=${jobRequirements}&departmentId=${departmentId}&teamId=${teamId}&requestedById=${requestedById}&jobRequestId=${jobRequestId}&posType=${posType}`
    );
  },
  submitJobRequest(
    jobTitle,
    jobDescription,
    justification,
    preferredStartDate,
    jobType,
    jobRole,
    salaryMin,
    salaryMax,
    jobRequirements,
    departmentId,
    teamId,
    requestedById,
    jobRequestId,
    posType
  ) {
    return axios.put(
      `http://localhost:9191/api/jobrequest/submitJobRequest?jobTitle=${jobTitle}&jobDescription=${jobDescription}&justification=${justification}&preferredStartDate=${preferredStartDate}&jobType=${jobType}&jobRole=${jobRole}&salaryMin=${salaryMin}&salaryMax=${salaryMax}&jobRequirements=${jobRequirements}&departmentId=${departmentId}&teamId=${teamId}&requestedById=${requestedById}&jobRequestId=${jobRequestId}&posType=${posType}`
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
  getDepartmentByEmployeeId(employeeId) {
    return axios.get(
      `http://localhost:9191/api/department/getDepartmentByEmployeeId?employeeId=${employeeId}`
    );
  },
  approveJobRequestById(jobRequestId, approverId) {
    return axios.put(
      `http://localhost:9191/api/jobrequest/approveJobRequestById?jobRequestId=${jobRequestId}&approverId=${approverId}`
    );
  },
  rejectJobRequestById(jobRequestId, approverId, reason) {
    return axios.put(
      `http://localhost:9191/api/jobrequest/rejectJobRequestById?jobRequestId=${jobRequestId}&approverId=${approverId}&reason=${reason}`
    );
  },
  // SKILLSET
  getAllSkillsets() {
    return axios.get(`http://localhost:9191/api/skillset/getAllSkillsets`);
  },
  addSkillSet(skillsetName) {
    return axios.post(
      `http://localhost:9191/api/skillset/addSkillSet?skillsetName=${skillsetName}`
    );
  },
  getUserSkillset(userId) {
    return axios.get(
      `http://localhost:9191/api/userskillset/getUserSkillset?userId=${userId}`
    );
  },
  addUserSkillset(userId, skillsetId, skillLevel) {
    return axios.post(
      `http://localhost:9191/api/userskillset/addUserSkillset?userId=${userId}&skillsetId=${skillsetId}&skillLevel=${skillLevel}`
    );
  },
  getAllJobPosts() {
    return axios.get(`http://localhost:9191/api/jobposting/getAllJobPosts`);
  },
  getJobPostByRequest(requestId) {
    return axios.get(
      `http://localhost:9191/api/jobposting/getJobPostByRequest?requestId=${requestId}`
    );
  },
  closeJobPost(jobPostingId) {
    return axios.put(
      `http://localhost:9191/api/jobposting/closeJobPost?jobPostingId=${jobPostingId}`
    );
  },
  editJobPost(
    jobPostId,
    jobTitle,
    jobDescription,
    preferredStartDate,
    jobType,
    jobRole,
    salaryMin,
    salaryMax,
    jobRequirements,
    posType
  ) {
    return axios.put(
      `http://localhost:9191/api/jobposting/editJobPost?jobPostingId=${jobPostId}&jobTitle=${jobTitle}&jobDescription=${jobDescription}&preferredStartDate=${preferredStartDate}&jobType=${jobType}&jobRole=${jobRole}&salaryMin=${salaryMin}&salaryMax=${salaryMax}&jobRequirements=${jobRequirements}&posType=${posType}`
    );
  },

  // Leaves
  getAllPendingLeaves() {
    return axios.get(`http://localhost:9191/api/leaves/getAllPendingLeaves`);
  },
  getAllLeaves() {
    return axios.get(`http://localhost:9191/api/leaves/getAllLeaves`);
  },
  getLeaveById(leaveId) {
    return axios.get(
      `http://localhost:9191/api/leaves/getLeaveById?leaveId=${leaveId}`
    );
  },
  createLeave(employeeId, leaveType, startDate, endDate, remark, document) {
    return axios.post(
      `http://localhost:9191/api/leaves/createLeave?employeeId=${employeeId}&leaveType=${leaveType}&startDate=${startDate}&endDate=${endDate}&remark=${remark}&document=${document}&`
    );
  },
  getEmployeeLeaves(employeeId) {
    return axios.get(
      `http://localhost:9191/api/leaves/getEmployeeLeaves?employeeId=${employeeId}`
    );
  },
  approveLeave(leaveId, approverRemarks) {
    return axios.put(
      `http://localhost:9191/api/leaves/approveLeave?leaveId=${leaveId}&approverRemarks=${approverRemarks}`
    );
  },
  rejectLeave(leaveId, approverRemarks) {
    return axios.put(
      `http://localhost:9191/api/leaves/rejectLeave?leaveId=${leaveId}&approverRemarks=${approverRemarks}`
    );
  },
  cancelLeave(leaveId) {
    return axios.put(
      `http://localhost:9191/api/leaves/cancelLeave?leaveId=${leaveId}`
    );
  },
  getDocByteArray(docId) {
    return axios.get(
      `http://localhost:9191/api/docData/getDocByteArray?id=${docId}`
    );
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

  //not tested
  getShiftListItemByShiftId(shiftId) {
    return axios.get(
      `http://localhost:9191/api/shift_list_item/getShiftListItemByShiftId?shiftId=${shiftId}`
    );
  },
  getShiftListItemByPosition(shiftId, posType) {
    return axios.get(
      `http://localhost:9191/api/shift_list_item/getShiftListItemByPosition?shiftId=${shiftId}&posType=${posType}`
    );
  },
  addNewShift(shift, rosterId) {
    return axios.post(
      `http://localhost:9191/api/shift?rosterId=${rosterId}`,
      shift
    );
  },
  addNewShiftListItem(shiftListItem, shiftId, userId) {
    return axios.post(
      `http://localhost:9191/api/shift_list_item?shiftId=${shiftId}&userId=${userId}`,
      shiftListItem
    );
  },
  getTemplateShiftsByRoster(rosterId) {
    return axios.get(
      `http://localhost:9191/api/shift/getTemplateShiftsByRoster?rosterId=${rosterId}`
    );
  },
  getShiftsByRosterAndTime(rosterId, date) {
    return axios.get(
      `http://localhost:9191/api/shift/getShiftsByRosterAndTime?rosterId=${rosterId}&dateString=${date}`
    );
  },
  getShiftListItemByDateAndUserId(date, userId) {
    return axios.get(
      `http://localhost:9191/api/shift_list_item/getShiftListItemByDateAndUserId?date=${date}&userId=${userId}`
    );
  },
  deleteShift(shiftId) {
    return axios.delete(`http://localhost:9191/api/shift/${shiftId}`);
  },
  editShift(shiftId, shift) {
    return axios.put(
      `http://localhost:9191/api/shift/editShift/${shiftId}`,
      shift
    );
  },
  getShiftsByTeam(teamId) {
    return axios.get(
      `http://localhost:9191/api/shift/getShiftsByTeam?teamId=${teamId}`
    );
  },
  getShiftListItemByDateAndUserId(date, userId) {
    return axios.get(
      `http://localhost:9191/api/shift_list_item/getShiftListItemByDateAndUserId?date=${date}&userId=${userId}`
    );
  },
  deleteShiftListItem(shiftListItemId) {
    return axios.delete(
      `http://localhost:9191/api/shift_list_item/${shiftListItemId}`
    );
  },

  getAllNotifications() {
    return axios.get(
      `http://localhost:9191/api/notification/getAllNotifications`
    );
  },
  addNotification(notificationTitle, notificationDescription, userId) {
    return axios.post(
      `http://localhost:9191/api/notification/?notificationTitle=${notificationTitle}&notificationDescription=${notificationDescription}&userId=${userId}`
    );
  },
  getAllNotificationsForUser(userId) {
    return axios.get(
      `http://localhost:9191/api/notification/getAllNotificationsForUser/${userId}`
    );
  },
  deleteAllNotifications(userId) {
    return axios.delete(
      `http://localhost:9191/api/notification/deleteNotifications?userId=${userId}`
    );
    //http://localhost:9191/api/notification/deleteNotifications?userId=5
  },
  markNotificationAsRead(notificationId, userId) {
    return axios.post(
      `http://localhost:9191/api/notification/${notificationId}/user/${userId}`
    );
  },
  deleteANotification(notificationId, userId) {
    return axios.delete(
      `http://localhost:9191/api/notification/deleteOneNotif?notificationId=${notificationId}&userId=${userId}`
    );
  },
  getUserReadNotifications(userId) {
    return axios.get(`http://localhost:9191/api/notification/read/${userId}`);
  },
  getUserUnreadNotifications(userId) {
    return axios.get(`http://localhost:9191/api/notification/unread/${userId}`);
  },
  getAllStaff() {
    return axios.get(`http://localhost:9191/api/user/getAllStaff`);
  },
  getShiftById(shiftId) {
    return axios.get(`http://localhost:9191/api/shift/${shiftId}`);
  },
  getShiftByTeamAndTime(teamId, dateString) {
    return axios.get(
      `http://localhost:9191/api/shift/getShiftByTeamAndTime?teamId=${teamId}&dateString=${dateString}`
    );
  },
  getShiftListItemByDateAndTeam(date, teamId) {
    return axios.get(
      `http://localhost:9191/api/shift_list_item/getShiftListItemByDateAndTeam?date=${date}&teamId=${teamId}`
    );
  },
  setUserStatus(email) {
    return axios.get(
      `http://localhost:9191/api/user/setUserStatus?workEmail=${email}`
    );
  },
  addCV(file, userId) {
    // http://localhost:9191/api/qualification/addCv?file=${file}&userId=${userId}
    return axios.post(
      `http://localhost:9191/api/qualification/addCv?file=&userId=${userId}`,
      file
    );
  },
  deleteCV(docId) {
    return axios.delete(`http://localhost:9191/api/docData/${docId}`);
  },
  createGoalPeriod(goalPeriod) {
    return axios.post(`http://localhost:9191/api/goalPeriod`, goalPeriod);
  },
  getAllGoalPeriods() {
    return axios.get(`http://localhost:9191/api/goalPeriod`);
  },
  getGoalPeriodByYear(year) {
    return axios.get(`http://localhost:9191/api/goalPeriod/${year}`);
  },
  deleteGoalPeriod(year) {
    return axios.delete(`http://localhost:9191/api/goalPeriod/${year}`);
  },
  getAllGoalsByYear(year) {
    return axios.get(`http://localhost:9191/api/goal/all/${year}`);
  },
  addGoal(type, description, userId) {
    return axios.post(
      `http://localhost:9191/api/goal/user/${userId}/?type=${type}&description=${description}`
    );
  },
  deleteGoal(goalId) {
    return axios.delete(`http://localhost:9191/api/goal/${goalId}`);
  },
  updateGoal(goalId, description) {
    return axios.put(
      `http://localhost:9191/api/goal/${goalId}/?description=${description}`
    );
  },
  getUserGoals(year, type, userId) {
    return axios.get(
      `http://localhost:9191/api/goal/${year}/type/${type}/user/${userId}`
    );
  },
  getEmployeeGoals(userId) {
    return axios.get(`http://localhost:9191/api/goal/employee/${userId}`)
  },
  getAllUserGoals(year) {
    return axios.get(`http://localhost:9191/api/goal/users/${year}`);
  },
  getTeamGoals(teamId, year) {
    return axios.get(`http://localhost:9191/api/goal/team/${teamId}/${year}`);
  },
  addAchievement(goalId, description) {
    return axios.post(
      `http://localhost:9191/api/goal/${goalId}/achievement?description=${description}`
    );
  },
  addAppraisalPeriod(appraisalPeriod) {
    return axios.post(
      `http://localhost:9191/api/appraisalPeriod`,
      appraisalPeriod
    );
  },
  getAppraisalPeriodByYear(year) {
    return axios.get(`http://localhost:9191/api/appraisalPeriod/${year}`);
  },
  getAllAppraisalPeriods() {
    return axios.get(`http://localhost:9191/api/appraisalPeriod`);
  },
  deleteAppraisalPeriod(year) {
    return axios.delete(`http://localhost:9191/api/appraisalPeriod/${year}`);
  },
  updateAppraisalPeriod(startDate, endDate) {
    return axios.put(
      `http://localhost:9191/api/appraisalPeriod?startDate=${startDate}&endDate=${endDate}`
    );
  },
  addAppraisal(
    appraisalYear,
    status,
    strengths,
    weaknesses,
    rating,
    promotion,
    promotionJustification,
    submitted,
    employeeId,
    managerId
  ) {
    return axios.post(
      `http://localhost:9191/api/appraisal?appraisalYear=${appraisalYear}&status=${status}&strengths=${strengths}&weaknesses=${weaknesses}&rating=${rating}&promotion=${promotion}&promotionJustification=${promotionJustification}&submitted=${submitted}&employeeId=${employeeId}&managerId=${managerId}`
    );
  },
  getAllAppraisalsByYear(year) {
    return axios.get(`http://localhost:9191/api/appraisal/year/${year}`);
  },
  getAppraisalById(appraisalId) {
    return axios.get(`http://localhost:9191/api/appraisal/${appraisalId}`);
  },
  getManagerAppraisals(year, userId) {
    return axios.get(
      `http://localhost:9191/api/appraisal/${year}/manager/${userId}`
    );
  },
  getDepartmentAppraisals(year, userId) {
    return axios.get(
      `http://localhost:9191/api/appraisal/${year}/department/${userId}`
    );
  },
  getOrganizationAppraisals(year, userId) {
    return axios.get(
      `http://localhost:9191/api/appraisal/${year}/organization/${userId}`
    );
  },
  getEmployeeAppraisals(year, userId) {
    return axios.get(
      `http://localhost:9191/api/appraisal/${year}/employee/${userId}`
    );
  },
  saveAppraisal(
    appraisalId,
    strengths,
    weaknesses,
    rating,
    promotion,
    promotionJustification
  ) {
    return axios.put(
      `http://localhost:9191/api/appraisal/${appraisalId}?strengths=${strengths}&weaknesses=${weaknesses}&rating=${rating}&promotion=${promotion}&promotionJustification=${promotionJustification}`
    );
  },
  getAllEmployeeAppraisals(userId) {
    return axios.get(`http://localhost:9191/api/appraisal/employee/${userId}`);
  },
  saveAppraisal(
    appraisalId,
    strengths,
    weaknesses,
    rating,
    promotion,
    promotionJustification
  ) {
    return axios.put(
      `http://localhost:9191/api/appraisal/${appraisalId}?strengths=${strengths}&weaknesses=${weaknesses}&rating=${rating}&promotion=${promotion}&promotionJustification=${promotionJustification}`
    );
  },
  submitAppraisal(
    appraisalId,
    strengths,
    weaknesses,
    rating,
    promotion,
    promotionJustification
  ) {
    return axios.post(
      `http://localhost:9191/api/appraisal/${appraisalId}?strengths=${strengths}&weaknesses=${weaknesses}&rating=${rating}&promotion=${promotion}&promotionJustification=${promotionJustification}`
    );
  },
  deleteAppraisal(appraisalId) {
    return axios.delete(`http://localhost:9191/api/appraisal/${appraisalId}`);
  },
  getEligibleForPromotion(userId) {
    return axios.get(`http://localhost:9191/api/appraisal/promotion/${userId}`)
  },
  // activateUser(email){
  //   return axios.get(`http://localhost:9191/api/user/activateUser/?workEmail=${email}`);
  // },
  // deactivateUser(email){
  //   return axios.get(`http://localhost:9191/api/user/deactivate/?workEmail=${email}`);
  // },
  setUserStatus(email) {
    return axios.get(
      `http://localhost:9191/api/user/setUserStatus?workEmail=${email}`
    );
  },
  updateGoalPeriod(startDate, endDate) {
    return axios.put(
      `http://localhost:9191/api/goalPeriod/start/${startDate}/end/${endDate}`
    );
  },
  changeTeamHead(teamId, newHeadId) {
    return axios.put(
      `http://localhost:9191/api/team/changeTeamHead?teamId=${teamId}&newHeadId=${newHeadId}`
    );
  },
  moveEmpToTeam(userId, teamId, newTeamId) {
    return axios.put(
      `http://localhost:9191/api/team/moveEmpToTeam?userId=${userId}&teamId=${teamId}&newTeamId=${newTeamId}`
    );
  },
  removeMemberFromTeam(userId, teamId) {
    return axios.delete(
      `http://localhost:9191/api/team/removeMemberFromTeam?userId=${userId}&teamId=${teamId}`
    );
  },

  //job Applicants
  findApplicationsByPostingId(postingId) {
    return axios.get(
      `http://localhost:9191/api/jobapplications/findApplicationsByPostingId?postingId=${postingId}`
    );
  },
  getUserQualificationInformation(userId) {
    return axios.get(
      `http://localhost:9191/api/qualification/getUserQualificationInformation?userId=${userId}`
    );
  },
  getUserRecommendations(userId) {
    return axios.get(
      `http://localhost:9191/api/qualification/getUserRecommendations?userId=${userId}`
    );
  },
  getUserExperiences(userId) {
    return axios.get(
      `http://localhost:9191/api/qualification/getUserExperiences?userId=${userId}`
    );
  },
  getPendingApplications(postingId) {
    return axios.get(
      `http://localhost:9191/api/jobapplications/getPendingApplications?postingId=${postingId}`
    );
  },
  getShortlistedApplications(postingId) {
    return axios.get(
      `http://localhost:9191/api/jobapplications/getShortlistedApplications?postingId=${postingId}`
    );
  },
  getOfferedApplications(postingId) {
    return axios.get(
      `http://localhost:9191/api/jobapplications/getOfferedApplications?postingId=${postingId}`
    );
  },
  getRejectedApplications(postingId) {
    return axios.get(
      `http://localhost:9191/api/jobapplications/getRejectedApplications?postingId=${postingId}`
    );
  },
  shortlistApplicant(userId, postingId) {
    return axios.put(
      `http://localhost:9191/api/jobapplications/shortlistApplicant?userId=${userId}&postingId=${postingId}`
    );
  },
  rejectApplicant(userId, postingId) {
    return axios.put(
      `http://localhost:9191/api/jobapplications/rejectApplicant?userId=${userId}&postingId=${postingId}`
    );
  },
  offerApplicant(userId, postingId, startDate, salaryOffered) {
    return axios.put(
      `http://localhost:9191/api/jobapplications/offerApplicant?userId=${userId}&postingId=${postingId}&startDate=${startDate}&salaryOffered=${salaryOffered}`
    );
  },
  getAllAppraisals() {
    return axios.get(`http://localhost:9191/api/appraisal)`);
  },
  getAnAppraisal(appraisalId) {
    return axios.get(`http://localhost:9191/api/appraisal/get/${appraisalId}`);
  },
  editAppraisal(appraisal) {
    return axios.put(
      `http://localhost:9191/api/appraisal/editAppraisal/${appraisal}`
    );
  },
  deleteAppraisal(appraisalId) {
    return axios.delete(`http://localhost:9191/api/appraisal/${appraisalId}`);
  },
  getAnAppraisalByDate(date) {
    return axios.get(`http://localhost:9191/api/appraisal/${date}`);
  },
  createAppraisalTemplate(appraisal) {
    return axios.post(
      `http://localhost:9191/api/appraisal/createAppraisalTemplate/${appraisal}`
    );
  },
  financeGoalsReminder(userId) {
    return axios.get(
      `http://localhost:9191/api/goal/financeReminder/${userId}`
    );
  },
  businessGoalsReminder(userId) {
    return axios.get(
      `http://localhost:9191/api/goal/businessReminder/${userId}`
    );
  },

  //payroll
  sendPayslipEmails(emails, payslipMonth) {
    return axios.post(
      `http://localhost:9191/api/user/payroll/sendPayslipEmails?emails=${emails}&payslipMonth=${payslipMonth}`
    );
  },
  editUserPayrollInformation(userId, bankName, bankAccNo, temp) {
    return axios.put(
      `http://localhost:9191/api/user/payroll/editUserPayrollInformation?userId=${userId}&bankName=${bankName}&bankAccNo=${bankAccNo}`,
      temp
    );
  },

  broadcastMessage(title, description) {
    return axios.post(
      `http://localhost:9191/api/notification/broadcastMessage?title=${title}&description=${description}`
    );
  },

  //promotion
  getAllPositions() {
    return axios.get(`http://localhost:9191/api/position`)
  },
  getUserActiveRequests(userId) {
    return axios.get(`http://localhost:9191/api/promotion/active/${userId}`)
  },
  getUserRequestHistory(userId) {
    return axios.get(`http://localhost:9191/api/promotion/history/${userId}`)
  },
  getPromotionRequest(promotionId) {
    return axios.get(`http://localhost:9191/api/promotion/${promotionId}`)
  },
  submitPromotionRequest(promotionId, promotionJustification, positionId, withdrawRemarks) {
    return axios.put(`http://localhost:9191/api/promotion/submit/${promotionId}/?promotionJustification=${promotionJustification}&positionId=${positionId}&withdrawRemarks=${withdrawRemarks}`)
  },
};

export default api;
