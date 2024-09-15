import axios from "axios";
// let baseUrl = "http://10.0.2.2:5000/api/v1/"; 
let baseUrl = "https://appartment-backend.vercel.app/api/v1/"; 

const api = async (path, params, method) => {
    console.log(path,params,method,"hellllllllllllllllllllllllllllllll");
    let options;
    options = {
        headers: {
            "Content-Type": "application/json",
        }, 
        method: method,
        ...(params && { data: JSON.stringify(params)}),  
    };
    console.log(baseUrl + path);
    return axios(baseUrl + path, options) 
        .then((response) => {
            // console.log(response);
            return response; 
        })
        .catch(async (error) => {
            console.log(error);
            return error.response;
        });
};

export default api;  