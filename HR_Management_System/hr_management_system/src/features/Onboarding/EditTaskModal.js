// import { useEffect, useState } from 'react';
// import { useHistory } from 'react-router';
// import { Fragment, useRef } from "react";
// import { Dialog, Transition } from "@headlessui/react";
// import { Tab } from '@headlessui/react'
// // import InputText from '../../components/inputText';
// // import TextArea from '../../components/textArea';
// //import api from '../../util/api';

// export default function EditTaskModal({open, onClose,categoryName}) {
//   const history = useHistory()
//   const [user, setUser] = useState(null)
//   const [name, setName] = useState("")
//   const [description, setDescription] = useState("")
//   const [employees, setEmployees] = useState([])
//   const [searchInput, setSearchInput] = useState("")
//   const [error, setError] = useState(null);

// //   const handleSubmit = (evt) => {
// //     evt.preventDefault()
// //     createCategory()
// //     alert("Successfully created category.")
// //   }

//   function createTask() {
//     api.createTask({ // api change
//         name: name,
//         description: description,
//         employees: employees
//     })
//       .then(() => history.goBack())
//       .catch(error => setError(error))
//   }

//   useEffect(() => {
//     api.getUser()
//       .then(response => setUser(response.data))
//       .catch((error) => setError(error))
//   }, [])

//   return (
//     user &&
//     <form action="#">
//       <Tab.Group>
//         {({ selectedIndex }) => (
//           <>
//             <Tab.List className="flex items-center">
//               <Tab
//                 className={({ selected }) =>
//                   classNames(
//                     selected
//                       ? 'text-gray-900 bg-gray-100 hover:bg-gray-200'
//                       : 'text-gray-500 hover:text-gray-900 bg-white hover:bg-gray-100',
//                     'rounded-md border border-transparent px-3 py-1.5 text-sm font-medium'
//                   )
//                 }
//               >
//                 Information
//               </Tab>
//               <Tab
//                 className={({ selected }) =>
//                   classNames(
//                     selected
//                       ? 'text-gray-900 bg-gray-100 hover:bg-gray-200'
//                       : 'text-gray-500 hover:text-gray-900 bg-white hover:bg-gray-100',
//                     'ml-2 rounded-md border border-transparent px-3 py-1.5 text-sm font-medium'
//                   )
//                 }
//               >
//                 AssignedTo
//               </Tab>
//             </Tab.List>
//             <Tab.Panels className="mt-2">
//               <Tab.Panel className="-m-0.5 rounded-lg p-0.5">
//                 <label
//                     htmlFor="task-title"
//                     className="block text-sm font-medium text-gray-700"
//                 >
//                     Task Title
//                 </label>
//                 <input
//                     type="text"
//                     name="task-title"
//                     id="task-title"
//                     placeholder="This is the Task Title"
//                     required
//                     className="mt-1 p-2 block w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm"
//                  />
//                 <label
//                     htmlFor="task-description"
//                     className="block text-sm font-medium text-gray-700 mt-2"
//                 >
//                   Task Description
//                 </label>
//                 <div className="mt-1">
//                     <textarea
//                         id="task-description"
//                         name="task-description"
//                         rows={3}
//                         className="mt-1 p-2 block w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                         placeholder="Brief description for your task."
//                         defaultValue={""}
//                         required
//                     />
//                 </div>
//               </Tab.Panel>
//               <Tab.Panel className="-m-0.5 rounded-lg p-0.5">
                
//                 {/* needs to implement */}
                
//               </Tab.Panel>
//             </Tab.Panels>
//           </>
//         )}
//       </Tab.Group>
//       <div className="mt-2 flex justify-end">
//         <button
//           type="submit"
//           className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//         >
//           Post
//         </button>
//       </div>
//     </form>
//   )
// }

   