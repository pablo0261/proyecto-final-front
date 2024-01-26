import axios from "axios";
export const GET_INFO_USER = "GET_INFO_USER";
export const POST_NEW_INFO_USER = "POST_NEW_INFO_USER";
export const SET_ERROR_BACK = "SET_ERROR_BACK";

import { 
  ACCESS_BACK_SAVE_DATA,
  LOG_OUT_DELETE_DATA,
 } from "./action-types";
import StoreItem from "../../Helpers/LocalStorage";

//AccessAccount//
const logInDataBase = (userLoggedData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`http://localhost:3001/people?email=${userLoggedData.email}`)
      localStorage.setItem(StoreItem.emailUserLogged, userLoggedData.email)
      return dispatch({
        type : ACCESS_BACK_SAVE_DATA,
        payload : data.people.data[0].people
      })
    } catch (error) {
      window.alert(error)
    }    
  }
}

const signInDataBase = (userSingedData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('http://localhost:3001/people', userSingedData)
      localStorage.setItem(StoreItem.emailUserLogged, userSingedData.email)
      return dispatch({
        type : ACCESS_BACK_SAVE_DATA,
        payload : data.result
      })
    } catch (error) {
      window.alert(error)
    }    
  }
}

const logOutDeleteData = () => {
  return async (dispatch) => {
    localStorage.clear()
    return dispatch({
      type : LOG_OUT_DELETE_DATA
    })
    /* try {
      const { data } = await axios.get(`http://localhost:3001/people?email=${userLoggedData.email}`)
      return dispatch({
        type : LOG_OUT_DELETE_DATA,
        payload : data.result
      })
    } catch (error) {
      window.alert(error)
    }  */
  }
}

const recoverUserLoggedData = (emailUserData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`http://localhost:3001/people?email=${emailUserData}`)
      return dispatch({
        type : ACCESS_BACK_SAVE_DATA,
        payload : data.people.data[0].people
      })
    } catch (error) {
      window.alert(error)
    }    
  }
}

//*---GET GENERALES---//

const infoDetailProveedor = (id) => {
    return async (dispatch) => {
      try {
        const { data } = await axios.get(`/people/${id}`);
        return dispatch({
          type: GET_INFO_USER,
          payload: data,
        });
      } catch (error) {
        console.log(error);
      }
    };
  };

const handleContratService = (item) => {
    return async () => {
      try {
        await axios.post(`/people/${item}`);//*Verificar si el post iria a la misma ruta
        
      } catch (error) {
        console.log(error);
      }
    };
  };

  //*---POST_NEW_INFO_USER---//
const postUserData = (userData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/XXXXXX", userData);//*Verificar a que ruta enviar el post para que modifique el objeto person del back
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
        throw error.response.data;
      }
    }
  };
};

  export {
    logInDataBase,
    signInDataBase,
    logOutDeleteData,
    recoverUserLoggedData,
    infoDetailProveedor,
    handleContratService,
    postUserData,
  }