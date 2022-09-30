///* This example requires Tailwind CSS v2.0+ */
//import { useState } from "react";
//import TasklistTable from "../../features/Onboarding/TasklistTable";
//import AddCategoryModal from "../../features/Onboarding/AddCategoryModal";
//import ConfirmDialog from "../../components/ConfirmDialog";
//
//function classNames(...classes) {
//  return classes.filter(Boolean).join(" ");
//}
//
//export default function OnboardingHR() {
//  const [user, setUser] = useState(null);
//  const [categories, setCategories] = useState(null);
//  const [openCreate, setOpenCreate] = useState(false);
//  //const [tasks, setTasks] = useState(null)
//
//  // useEffect(() => {
//  //     api.getUser()
//  //         .then(response => setUser(response.data))
//  //         .catch((error) => (
//  //             setError(error)
//  //         ))
//  // }, [])
//
//  // useEffect(() => {
//  //     api.getCategories()
//  //         .then(response => setCategories(response.data))
//  //         .catch((error) => (
//  //             setError(error)
//  //         ))
//  // }, [])
//
//  return (
//    // (user && category) &&
//    <div className="px-4 sm:px-6 lg:px-8">
//      <div className="sm:flex sm:items-center">
//        <div className="sm:flex-auto">
//          <h1 className="text-xl font-semibold text-gray-900">Onboarding</h1>
//        </div>
//        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
//          <button
//            type="button"
//            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
//            onClick={() => setOpenCreate(true)}
//          >
//            New Category
//          </button>
//        </div>
//      </div>
//      <TasklistTable />
//      <AddCategoryModal
//        open={openCreate}
//        onClose={() => setOpenCreate(false)}
//        // category={category}
//        // setCategory={setCategory}
//      />
//    </div>
//  );
//}
