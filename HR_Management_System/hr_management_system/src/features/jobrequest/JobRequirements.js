import Select from 'react-select';
import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import api from "../../utils/api";
import AddSkillSet from '../jobrequest/AddSkillSet';

// const skillSet = [ 
//   { value:"Java", label: "Java"},
//   { value:"Python", label: "Python"},
//   { value:"SQL", label: "SQL"},]

export default function JobRequirements({selectedSkills, setSelectedSkills}) {

  const cancelButtonRef = useRef(null)
  // const checkbox = useRef()
  // const [checked, setChecked] = useState(false)
  // const [selectedSkill, setSelectedSkill] = useState([])
  const [open, setOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [skillSet, setSkillSet] = useState([]);
  //var [selectedSkills, setSelectedSkills] = useState([]);
  const [error, setError] = useState(null);
  const divStyle = {
    display: 'flex',
    alignItems: 'center'
  };

  useEffect(() => {
    api
      .getAllSkillsets()
      .then((response) => {
        setSkillSet(response.data);
        console.log(response.data);
      })
      .catch((error) => setError(error));
  }, [refreshKey]);

  const options = skillSet.map(skill => ({
    "value" : skill.skillsetId,
    "label" : skill.skillsetName
  }))

  // const handleSelect = function (selectedItems) {
  //   const skills = [];
  //   for (let i = 0; i < selectedItems.length; i++) {
  //     skills.push(selectedItems[i].value);
  //   }
  //   setSelectedSkills(skills);
  // }
  const handleSelect = (e) => {
    console.log(e);
    let sk = [];
    e.map((y) => sk.push(y.value));
    console.log(sk);
    setSelectedSkills(sk);
    // setSelectedSkills=(e.map(x => x.value));
    // console.log(selectedSkills);
    // console.log(options);
  }

  return (
    <div style={divStyle}>
        <Select 
          isMulti 
          //value={options.filter(obj => selectedSkills.includes(obj))} 
          options={options}
          className="basic-multi-select"
          //onChange={(e)=> {handleSelect(Array.from(e.options))}}
          onChange = {handleSelect}
          >
        </Select>
      <button
        type="button"
        className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={() => setOpen(true)}
      >
        Add Skill Set
      </button>
      <AddSkillSet open={open} setOpen={() => setOpen(false)} refreshKeyHandler={() => setRefreshKey((oldKey) => oldKey + 1)} />
    </div>


  )

  // // function onClickHandler(skillSet) {
  // //   setSkillSet(
  // //     skillSet.filter((item) => item.name !== skillSet.name)
  // //   );
  // // }
  // function classNames(...classes) {
  //   return classes.filter(Boolean).join(' ')
  // }


  // return (
  //   <Transition.Root show={open} as={Fragment}>
  //     <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
  //       <Transition.Child
  //         as={Fragment}
  //         enter="ease-out duration-300"
  //         enterFrom="opacity-0"
  //         enterTo="opacity-100"
  //         leave="ease-in duration-200"
  //         leaveFrom="opacity-100"
  //         leaveTo="opacity-0"
  //       >
  //         <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
  //       </Transition.Child>

  //       <div className="fixed inset-0 z-10 overflow-y-auto">
  //         <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
  //           <Transition.Child
  //             as={Fragment}
  //             enter="ease-out duration-300"
  //             enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
  //             enterTo="opacity-100 translate-y-0 sm:scale-100"
  //             leave="ease-in duration-200"
  //             leaveFrom="opacity-100 translate-y-0 sm:scale-100"
  //             leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
  //           >
  //             <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
  //               <div>
  //                 <div className="mt-3 text-center sm:mt-5">
  //                   <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
  //                     Skill Requirements
  //                   </Dialog.Title>
  //                 </div>
  //               </div>
  //               <div>
  //                 <div>
  //                   <label htmlFor="skillSet" className="ml-px block pl-4 text-sm font-medium text-gray-700">
  //                     Add New Skill Set
  //                   </label>
  //                   <div className="mt-1">
  //                     <input
  //                       type="text"
  //                       name="name"
  //                       id="name"
  //                       className="block w-full rounded-full border-gray-300 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
  //                       placeholder="Type the name of skill"
  //                       value={name}
  //                       onChange={(e) => setName(e.target.value)}
  //                     />
  //                   </div>
  //                   <button
  //                     type="submit"
  //                     // className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
  //                     onClick = {create()}
  //                   >
  //                     Add
  //                   </button>
  //                 </div>
  //                 <table className="min-w-full table-fixed divide-y divide-gray-300">
  //                   <thead className="bg-gray-50">
  //                     <tr>
  //                       <th />
  //                       <th
  //                         scope="col"
  //                         colSpan={1}
  //                         className="py-4 pr-3 text-left text-sm font-semibold text-gray-900"
  //                       >
  //                         Skill
  //                       </th>
  //                       <th />
  //                     </tr>
  //                   </thead>
  //                   <tbody className="divide-y divide-gray-200 bg-white">
  //                     {skillSet.map((skill) => (
  //                       <tr
  //                         key={skill.name}
  //                         className={
  //                           selectedSkill.includes(skill) ? "bg-gray-50" : undefined
  //                         }
  //                       >
  //                         <td className="relative w-12 px-6 sm:w-16 sm:px-8">
  //                           {selectedSkill.includes(skill) && (
  //                             <div className="absolute inset-y-0 left-0 w-0.5 bg-gray-600" />
  //                           )}
  //                           <input
  //                             type="checkbox"
  //                             className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
  //                             value={skill.name}
  //                             checked={selectedSkill.includes(skill)}
  //                             onChange={(e) => {
  //                               e.target.checked && !selectedSkill.includes(skill)
  //                                 ? setSelectedSkill([...selectedSkill, skill])
  //                                 : console.log("Skill already checked");
  //                             }}
  //                           />
  //                         </td>
  //                         <td
  //                           className={classNames(
  //                             "whitespace-nowrap py-4 pr-3 text-sm font-medium text-left",
  //                             selectedSkill.includes(skill)
  //                               ? "text-gray-900 line-through"
  //                               : "text-gray-900"
  //                           )}
  //                         >
  //                           {skill.name}
  //                         </td>
  //                       </tr>
  //                     ))}
  //                   </tbody>
  //                 </table>
  //               </div>
  //               <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
  //                 <button
  //                   type="submit"
  //                   className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
  //                   onClick={setOpen}
  //                 >
  //                   Submit
  //                 </button>
  //                 <button
  //                   type="button"
  //                   className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
  //                   onClick={setOpen}
  //                   ref={cancelButtonRef}
  //                 >
  //                   Cancel
  //                 </button>
  //               </div>
  //             </Dialog.Panel>
  //           </Transition.Child>
  //         </div>
  //       </div>
  //     </Dialog>
  //   </Transition.Root>

}

