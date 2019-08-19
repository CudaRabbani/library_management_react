import axios from "axios";
import {getToken} from "./currentUser";

axios.interceptors.response.use(null, error=> {

    const expectedError = error.response
        && error.response.status >=400 && error.response.status < 500;

    if (!expectedError) {
        console.log("Unexpected Error");
    }
    return Promise.reject(error);
});

export function setToken() {
    axios.defaults.headers.common['x-auth-token'] = getToken();
}


export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    setToken
};