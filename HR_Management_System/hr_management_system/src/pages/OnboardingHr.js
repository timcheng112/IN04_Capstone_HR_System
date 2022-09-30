// import TaskList from "../features/onboarding/components/TaskList";
// import CreateCategorySlideover from "../features/onboarding/components/CreateCategorySlideover";
// import { useState } from "react";

// function OnboardingHr() {
//   const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState(false);
//   const [isHr, setIsHr] = useState(false);

//   return (
//     <div>
//       <button onClick={() => setIsHr(!isHr)} className="bg-red-400 rounded-md">
//         Change
//       </button>
//       <div className="px-20 pt-5">
//         <h1 className="text-4xl font-bold pb-4">Onboarding</h1>
//         {isHr && (
//           <button
//             type="button"
//             onClick={() => setIsCreateCategoryOpen(true)}
//             class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke-width="1.5"
//               stroke="currentColor"
//               class="mr-2 -ml-1 w-5 h-5"
//             >
//               <path
//                 stroke-linecap="round"
//                 stroke-linejoin="round"
//                 d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
//               />
//               <path
//                 stroke-linecap="round"
//                 stroke-linejoin="round"
//                 d="M6 6h.008v.008H6V6z"
//               />
//             </svg>
//             Create Category
//           </button>
//         )}
//       </div>
//       <TaskList isHr={isHr} />
//       <CreateCategorySlideover
//         open={isCreateCategoryOpen}
//         onClose={() => setIsCreateCategoryOpen(false)}
//       />
//     </div>
//   );
// }

// export default OnboardingHr;
