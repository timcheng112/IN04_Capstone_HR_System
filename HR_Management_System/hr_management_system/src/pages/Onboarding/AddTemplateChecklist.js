import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import Navbar from "../../components/Navbar";
import AddTemplateChecklistTasksModal from "../../features/onboarding/AddTemplateChecklistTasksModal";
import AddTemplateChecklistUsersModal from "../../features/onboarding/AddTemplateChecklistUsersModal";
import TaskGridList from "../../features/onboarding/TaskGridList";
import UserGridList from "../../features/onboarding/UserGridList";
import api from "../../utils/api";

const AddTemplateChecklist = () => {
  const [open, setOpen] = useState(false);
  const [openUsers, setOpenUsers] = useState(false);
  const [categories, setCategories] = useState();
  const [users, setUsers] = useState();
  const [departments, setDepartments] = useState();
  const [teams, setTeams] = useState();
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const history = useHistory();
  const location = useLocation();

  console.log("SELECTED USERS: " + selectedUsers);

  useEffect(() => {
    api
      .getCategories()
      .then((response) => {
        console.log(response.data);
        if (location.state.isOnboarding) {
          let tempArr = response.data;
          for (let i = 0; i < tempArr.length; i++) {
            let tempTasks = tempArr[i].tasks;
            tempArr[i].tasks = tempTasks.filter((task) =>
              selectedTasks.length > 0
                ? selectedTasks.every(
                    (selectedTask) => selectedTask.taskId !== task.taskId
                  ) && task.isOnboarding === true
                : task.isOnboarding === true
            );
          }
          setCategories(tempArr);
        } else {
          let tempArr = response.data;
          for (let i = 0; i < tempArr.length; i++) {
            let tempTasks = tempArr[i].tasks;
            tempArr[i].tasks = tempTasks.filter((task) =>
              selectedTasks.length > 0
                ? selectedTasks.every(
                    (selectedTask) => selectedTask.taskId !== task.taskId
                  ) && task.isOnboarding === false
                : task.isOnboarding === false
            );
          }
          setCategories(tempArr);
        }
      })
      .catch((error) => console.log(error.response.data.message));
  }, [open]);

  useEffect(() => {
    api
      .getAllEmployees()
      .then((response) => setUsers(response.data))
      .catch((error) => console.log(error.response.data.message));
  }, []);

  useEffect(() => {
    api
      .getAllDepartments()
      .then((response) => setDepartments(response.data))
      .catch((error) => console.log(error.response.data.message));
  }, []);

  useEffect(() => {
    api
      .getAllTeams()
      .then((response) => setTeams(response.data))
      .catch((error) => console.log(error.response.data.message));
  }, []);

  return (
    <div className="">
      <Navbar />
      {categories !== undefined && (
        <AddTemplateChecklistTasksModal
          open={open}
          onClose={() => setOpen(false)}
          categories={categories}
          setSelectedTasks={(tasks) =>
            setSelectedTasks([...selectedTasks, ...tasks])
          }
        />
      )}
      {users !== undefined &&
        teams !== undefined &&
        departments !== undefined && (
          <AddTemplateChecklistUsersModal
            open={openUsers}
            onClose={() => setOpenUsers(false)}
            users={users}
            teams={teams}
            departments={departments}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
          />
        )}
      <div className="py-5"></div>
      <form
        className="space-y-8 divide-y divide-gray-200"
        onSubmit={console.log()}
      >
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div className="space-y-6 sm:space-y-5">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                New {location.state.isOnboarding && "Onboarding"} Template
                Checklist
              </h3>
            </div>
            <div className="space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Name
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <div className="flex max-w-lg rounded-md shadow-sm">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      //   value={title}
                      className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      //   onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Description
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <textarea
                    id="description"
                    name="description"
                    rows={5}
                    required
                    // value={description}
                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    // onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="add-task"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  {location.state.isOnboarding && "Onboarding"} Tasks
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <TaskGridList
                    onOpen={() => setOpen(true)}
                    templateTasks={selectedTasks}
                    removeTaskHandler={(task) =>
                      setSelectedTasks(
                        selectedTasks.filter(
                          (selectedTask) => task.taskId !== selectedTask.taskId
                        )
                      )
                    }
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="add-users"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Assigned Users
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <UserGridList
                    onOpen={() => setOpenUsers(true)}
                    selectedUsers={selectedUsers}
                    removeUserHandler={(user) =>
                      setSelectedUsers(
                        selectedUsers.filter(
                          (selectedUser) => selectedUser.userId !== user.userId
                        )
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-5">
          <div className="flex justify-end">
            <button
              type="button"
              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => history.push("/admin/viewtemplatechecklists")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              //   onClick={() => (useState.button = 2)}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTemplateChecklist;
