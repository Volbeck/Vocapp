import axios from "axios";



axios.defaults.headers.common["Accept"] = "application/json"
axios.defaults.baseURL = "http://127.0.0.1:8000/api/auth/"
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;