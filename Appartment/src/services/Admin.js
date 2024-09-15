import Api from './index';
import {endPoints, requestType} from '../constants/Variables';

// ADMIN LOGIN
export const loginAppartmentAdmin = params => {
  return Api(
    `${endPoints.loginAppartmentAdmin}`,
    params,
    requestType.POST,
    null,
  );
};
// USER SIGNUP
export const registerAppartmentAdmin = params => {
  return Api(
    `${endPoints.registerAppartmentAdmin}`,
    params,
    requestType.POST,
    null,
  );
};
// SEND OTP

export const sendCodeAdmin = params => {
  return Api(`${endPoints.sendCodeAdmin}`, params, requestType.POST, null);
};
export const sendCodeAdminForget = params => {
  return Api(`${endPoints.sendCodeAdminForget}`, params, requestType.POST, null);
};

export const resetPasswordAdmin = params => {
    return Api(`${endPoints.resetPasswordAdmin}`, params, requestType.POST, null);
  };
export const getComplaintsByAdmin = id => {
  return Api(
    `${endPoints.getComplaintsByAdmin}/${id}`,
    null,
    requestType.GET,
    null,
  );
};

export const addNotication = params => {
  return Api(`${endPoints.addNotication}`, params, requestType.POST, null);
};
export const addPaymentDetails = params => {
  return Api(`${endPoints.addPaymentDetails}`, params, requestType.POST, null);
};

export const getPendingComplaintsByAdmin = id => {
  return Api(
    `${endPoints.getPendingComplaintsByAdmin}/${id}`,
    null,
    requestType.GET,
    null,
  );
};
export const getSolvedComplaintsByAdmin = id => {
  return Api(
    `${endPoints.getSolvedComplaintsByAdmin}/${id}`,
    null,
    requestType.GET,
    null,
  );
};
export const getInprogressComplaintsByAdmin = id => {
  return Api(
    `${endPoints.getInprogressComplaintsByAdmin}/${id}`,
    null,
    requestType.GET,
    null,
  );
};
export const updateComplaintStatus = (id, params) => {
  return Api(
    `${endPoints.updateComplaintStatus}/${id}`,
    params,
    requestType.PUT,
    null,
  );
};
export const updatePaymentDetail = (id, params) => {
  return Api(
    `${endPoints.updatePaymentDetail}/${id}`,
    params,
    requestType.PUT,
    null,
  );
};
export const getUtilitiesByAdmin = id => {
  return Api(
    `${endPoints.getUtilitiesByAdmin}/${id}`,
    null,
    requestType.GET,
    null,
  );
};
export const getAllNotifications = id => {
  return Api(
    `${endPoints.getAllNotifications}/${id}`,
    null,
    requestType.GET,
    null,
  );
};
export const getAllPaymentDetails = id => {
  return Api(
    `${endPoints.getAllPaymentDetails}/${id}`,
    null,
    requestType.GET,
    null,
  );
};
export const getAllPendingUsers = () => {
  return Api(`${endPoints.getAllPendingUsers}`, null, requestType.GET, null);
};
export const getAllUsers = () => {
  return Api(`${endPoints.getAllUsers}`, null, requestType.GET, null);
};
export const updateUserStatus = (id, params) => {
  return Api(
    `${endPoints.updateUserStatus}/${id}`,
    params,
    requestType.PUT,
    null,
  );
};

export const changePasswordAdmin = params => {
  return Api(
    `${endPoints.changePasswordAdmin}`,
    params,
    requestType.POST,
    null,
  );
};
