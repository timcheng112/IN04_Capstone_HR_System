import axios from "axios";

const api = {
    login(email, password) {
        return axios.get(`http://localhost:9191/api/user/loginHRMS?workEmail=${email}&password=${password}`)
    },
    register(firstName, lastName, password, phone, email, workEmail, dob, gender, role, isPartTimer, isHrEmployee, dateJoined) {
        return axios.post(
          `http://localhost:9191/api/user/registerNewAccountJMP?firstName=${firstName}&lastName=${lastName}&password=${password}&phone=${phone}&email=${email}&workEmail=${workEmail}
          &dob=${dob}&gender=${gender}&role=${role}&isPartTimer=${isPartTimer}&isHrEmployee=${isHrEmployee}&dateJoined=${dateJoined}`
        );
    },
}

export default api;