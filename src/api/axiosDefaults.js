import axios from "axios";

axios.defaults.baseURL = 'https://drf-bia-api-8cf791bcdd63.herokuapp.com/'
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.withCredentials = true