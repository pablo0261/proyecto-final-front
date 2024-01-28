import axios from "axios";

import {
  ACCESS_BACK_SAVE_DATA,
  LOG_OUT_DELETE_DATA,
  GET_INFO_USER,
  POST_NEW_INFO_USER,
  SET_ERROR_BACK,
  EDIT_INFO_USER,
  CONTRAT_SERVICE_USER,
  FILTER_CARDS,
  GET_HOME_PROVIDER,
 } from "./action-types";
import StoreItem from "../../Helpers/LocalStorage";

const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;

//AccessAccount//
const logInDataBase = (userLoggedData) => {
  return async (dispatch) => {
    try {
      const data = await axios.get(
        `${REACT_APP_API_URL}/people?email=${userLoggedData.email}`
      );
      if (data.status === 200) {
        localStorage.setItem(StoreItem.emailUserLogged, userLoggedData.email);
        return dispatch({
          type: ACCESS_BACK_SAVE_DATA,
          payload: data.data.people.data[0].people,
        });
      } else {
        throw new Error(data.error, "error from back");
      }
    } catch (error) {
      window.alert(error);
    }
  };
};

const signInDataBase = (userSingedData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `${REACT_APP_API_URL}/people`,
        userSingedData
      );
      localStorage.setItem(StoreItem.emailUserLogged, userSingedData.email);
      return dispatch({
        type: ACCESS_BACK_SAVE_DATA,
        payload: data.result,
      });
    } catch (error) {
      window.alert(error);
    }
  };
};

const logOutDeleteData = () => {
  return async (dispatch) => {
    localStorage.clear();
    return dispatch({
      type: LOG_OUT_DELETE_DATA,
    });
    /* try {
      const { data } = await axios.get(`${REACT_APP_API_URL}/people?email=${userLoggedData.email}`)
      return dispatch({
        type : LOG_OUT_DELETE_DATA,
        payload : data.result
      })
    } catch (error) {
      window.alert(error)
    }  */
  };
};

const recoverUserLoggedData = (emailUserData) => {
  return async (dispatch) => {
    try {
      const data = await axios.get(
        `${REACT_APP_API_URL}/people?email=${emailUserData}`
      );
      if (data.status === 200) {
        return dispatch({
          type: ACCESS_BACK_SAVE_DATA,
          payload: data.data.people.data[0].people,
        });
      } else {
        throw new Error(data.error, "error from back");
      }
    } catch (error) {
      window.alert(error);
    }
  };
};

//*---GET GENERALES---//

const infoDetailProveedor = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${REACT_APP_API_URL}/people/${id}`);
      dispatch({
        type: GET_INFO_USER,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const handleContratService = (item) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/people/${item}`);
      dispatch({
        type: CONTRAT_SERVICE_USER,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

  const allPeopleProvider = (item) => {
    return async (dispatch) => {
      try {
        const response = await axios.get(`${REACT_APP_API_URL}/people/${item}`);
        dispatch({
          type: GET_HOME_PROVIDER,
          payload: response.data,
        });
      } catch (error) {
        console.log(error);
      }
    };
  };


//*---POST_NEW_INFO_USER---//
const postUserData = (userData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/people`, userData );
      console.log(response.data);
      dispatch({
        type: POST_NEW_INFO_USER,
        payload: response.data,
      });
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch({
          type: SET_ERROR_BACK,
          payload: error.response.data,
        });
        console.log(error.response.data);
        throw error.response.data;
      }
    }
  };
};

const handleEditProfile = (formData) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: EDIT_INFO_USER,
        payload: formData,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const filter = (selectedServices, selectedGender)=>{
    return async (dispatch) => {
      try {
        dispatch({
          type: FILTER_CARDS,
          payload: selectedServices, selectedGender
        });
      } catch (error) {
        console.error(error);
      }
    };
  }


  export {
    logInDataBase,
    signInDataBase,
    logOutDeleteData,
    recoverUserLoggedData,
    infoDetailProveedor,
    handleContratService,
    postUserData,
    handleEditProfile,
    filter,
    allPeopleProvider,
  }
