import axios from "axios";

import {
  ACCESS_BACK_SAVE_DATA,
  LOG_OUT_DELETE_DATA,
  GET_INFO_USER,
  POST_NEW_INFO_USER,
  SET_ERROR_BACK,
  EDIT_INFO_USER,
  CONTRAT_SERVICE_USER,
  GET_HOME_PROVIDER,
  FILTER_SERVICES,
  GET_FILTER_PROVIDER,
  FILTER_ORDER_SELECTED,
  POST_NEW_SERVICE_USER,
  SET_CHAT,
  CREATE_REPORT,
} from "./action-types";

const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;

//AccessAccount//
const addInfoUserLog = (data) => {
  return async (dispatch) => {
    return dispatch({
      type: ACCESS_BACK_SAVE_DATA,
      payload: data,
    });
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
        window.alert(data);
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
      window.alert(error);
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
      window.alert(error);
    }
  };
};

// const allPeopleProvider = () => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.get(`${REACT_APP_API_URL}/people?typeOfPerson=provider`);
//       return dispatch({
//         type: GET_HOME_PROVIDER,
//         payload:  response.data.people,
//       });
//     } catch (error) {
//       window.alert(error);
//     }
//   };
// };
const allPeopleProvider = (query) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/people?typeOfPerson=provider${query}`
      );
      return dispatch({
        type: GET_HOME_PROVIDER,
        payload: response.data.people,
      });
    } catch (error) {
      window.alert(error);
    }
  };
};

const getPeopleFilteredOrderedPagination = (
  queryConstructor,
  queryPagination
) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/people?typeOfPerson=provider&${queryConstructor}${
          queryPagination ? `${queryPagination}` : ""
        }`
      );
      return dispatch({
        type: GET_FILTER_PROVIDER,
        payload: response.data.people,
      });
    } catch (error) {
      window.alert(error);
    }
  };
};

const getFiltersOrdersDB = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/categories`);
      return dispatch({
        type: FILTER_SERVICES,
        payload: response.data.categories.data,
      });
    } catch (error) {
      window.alert(error);
    }
  };
};

const saveSelectionsGlobal = (selectedOptions) => {
  return async (dispatch) => {
    try {
      return dispatch({
        type: FILTER_ORDER_SELECTED,
        payload: selectedOptions,
      });
    } catch (error) {
      console.error(error);
    }
  };
};
const saveOrderGlobal = (orders) => {
  return async (dispatch) => {
    try {
      return dispatch({
        type: FILTER_ORDER_SELECTED,
        payload: orders,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

//*---POST_NEW_INFO_USER---// (Pablo --> Lo uso para enviar las modificaciones del perfil de los proveedores)
const postUserData = (userDataEnglish) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/people`,
        userDataEnglish
      );
      if (response.status === 200) {
        return dispatch({
          type: POST_NEW_INFO_USER,
          payload: response.result.people.data[0].people,
        });
      }
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch({
          type: SET_ERROR_BACK,
          payload: error.response.data,
        });
        window.alert(error);
        throw error.response.data;
      }
    }
  };
};

const postUserServices = (updatedUserData) => {
  //*(Pablo --> Lo uso para enviar las modificaciones de los servicios de los proveedores)
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/people/options`,
        updatedUserData
      );
      if (response.status === 200) {
        return dispatch({
          type: POST_NEW_SERVICE_USER,
          payload: response.data.result.people.data[0].people,
        });
      }
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch({
          type: SET_ERROR_BACK,
          payload: error.response.data,
        });
        window.alert(error);
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
};

const setDataChat = (id) => {
  return async (dispatch) => {
    if (id === 1) {
      const Chat = [
        {
          idPeople: 1,
          propio: true,
          message: "Hola, podrias decirme si vas a ir o no?",
          date: "Ayer",
        },
        {
          idPeople: 2,
          propio: false,
          message: "No al final, no quiero ir.",
          date: "Hoy",
        },
      ];

      dispatch({
        type: SET_CHAT,
        payload: Chat,
      });
    }

    if (id === 2) {
      const Chat = [
        {
          idPeople: 1,
          propio: true,
          message: "¿Te parece si quedamos para el Miercoles?",
          date: "Ayer",
        },
        {
          idPeople: 2,
          propio: false,
          message: "Dale dale, te agendo",
          date: "Hoy",
        },
      ];

      dispatch({
        type: SET_CHAT,
        payload: Chat,
      });
    }
  };
};

/* Create report */
const createReport = (formData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/xxxx/xxxx`, formData);
      dispatch({ type: CREATE_REPORT, payload: response.data }); 
    } catch (error) {
      console.log(error);
    }
  };
};

export {
  addInfoUserLog,
  logOutDeleteData,
  recoverUserLoggedData,
  infoDetailProveedor,
  handleContratService,
  postUserData,
  handleEditProfile,
  saveSelectionsGlobal,
  allPeopleProvider,
  getFiltersOrdersDB,
  getPeopleFilteredOrderedPagination,
  postUserServices,
  saveOrderGlobal,
  setDataChat,
  createReport,
};
