import axios from "axios";

axios.defaults.baseURL = 'https://bia-code-institute-00aa55848eed.herokuapp.com/'
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.withCredentials = true