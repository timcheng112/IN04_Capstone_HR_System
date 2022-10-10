import Select from 'react-select';

export default function JobRequirements() {
  const skillSet = [ 
    { value:"Java", label: "Java"},
    { value:"Python", label: "Python"},
    { value:"SQL", label: "SQL"},]
  return(
  <Select
    isMulti
    name="skills"
    options={skillSet}
    className="basic-multi-select"
    classNamePrefix="select"
  />
  )

};