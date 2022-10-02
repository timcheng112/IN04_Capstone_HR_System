import axios from "axios";

const api = {
    login(email, password) {
        return axios.get(
          `http://localhost:9191/api/user/login/loginHRMS?workEmail=${email}&password=${password}`
        );
      },
}

export default api;
