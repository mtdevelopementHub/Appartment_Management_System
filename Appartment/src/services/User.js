import Api from "./index";
import { endPoints, requestType } from "../constants/Variables";


// ADMIN LOGIN
export const loginUser = (params) => {
    return Api(`${endPoints.loginUser}`, params, requestType.POST,null) 
}
// USER SIGNUP
export const registerUser = (params) => {
    return Api(`${endPoints.registerUser}`, params, requestType.POST,null) 
}
// SEND OTP
export const sendCode = (params) => {
    return Api(`${endPoints.sendCode}`, params, requestType.POST,null) 
}
export const sendCodeForget = (params) => {
    return Api(`${endPoints.sendCodeForget}`, params, requestType.POST,null) 
}
export const resetPasswordUser = (params) => {
    return Api(`${endPoints.resetPasswordUser}`, params, requestType.POST,null) 
}
export const addComplaint = (params) => {
    return Api(`${endPoints.addComplaint}`, params, requestType.POST,null) 
}
export const getComplaintsByUser = (id) => {
    return Api(`${endPoints.getComplaintsByUser}/${id}`,null, requestType.GET,null) 
}
export const getUtilitiesByUser = (id) => {
    return Api(`${endPoints.getUtilitiesByUser}/${id}`,null, requestType.GET,null) 
}
export const changePasswordUser = (params) => {
    return Api(`${endPoints.changePasswordUser}`,params, requestType.POST,null) 
}
export const addUtitlity = (params) => {
    return Api(`${endPoints.addUtitlity}`,params, requestType.POST,null) 
}



