import axios from "axios";
import { 
  ACCESS_BACK_SAVE_DATA,
  LOG_OUT_DELETE_DATA,
  GET_ALL,
 } from "./action-types";

//AccessAccount//
const accessDataBase = (userLoggedData) => {
  return async (dispatch) => {
    return dispatch({
      type : ACCESS_BACK_SAVE_DATA,
      payload : userLoggedData
    })
    /* try {
      const { data } = await axios.post('/people', userLoggedData)
      return dispatch({
        type : ACCESS_BACK_SAVE_DATA,
        payload : data
      })
    } catch (error) {
      window.alert(error)
    } */
  }
}

const logOutDeleteData = (idPeople) => {
  return async (dispatch) => {
    return dispatch({
      type : LOG_OUT_DELETE_DATA
    })
    /* try {
      const { data } = await axios.post('/people', idPeople)
      return dispatch({
        type : ACCESS_BACK_SAVE_DATA,
        payload : data
      })
    } catch (error) {
      window.alert(error)
    } */
  }
}

//*---GET GENERALES---//

const infoDetailProveedor = (id) => {
    return async (dispatch) => {
      try {
        const { data } = await axios.get(`/people/${id}`);
        return dispatch({
          type: GET_ALL,
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

  export {
    accessDataBase,
    logOutDeleteData,
    infoDetailProveedor,
    handleContratService,
  }