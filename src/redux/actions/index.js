import axios from "axios";
import Swal from "sweetalert2";

import {
  ACCESS_BACK_SAVE_DATA,
  LOG_OUT_DELETE_DATA,
  GET_INFO_USER,
  POST_NEW_INFO_USER,
  SET_ERROR_BACK,
  CONTRAT_SERVICE_USER,
  GET_HOME_PROVIDER,
  FILTER_SERVICES,
  GET_FILTER_PROVIDER,
  FILTER_ORDER_SELECTED,
  POST_NEW_SERVICE_USER,
  SET_OPPORTUNITIE,
  CREATE_REPORT,
  GET_FAQS,
  GET_PEOPLE,
  GET_REPORTS,
  GET_ALL_PAYMENTS,
  GET_COMMENTS_USERS,
} from "./action-types";

const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;

//ACCESS ACCOUNT
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
        Swal.fire({
          title: `${data}`,
          icon: 'warning',
          confirmButtonText: 'Aceptar'
        });
      }
    } catch (error) {
      Swal.fire({
        title: `${error}`,
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
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
      Swal.fire({
        title: `${error}`,
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }
  };
};

const getCommentsUsers = (filter) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/stats/bestcomments${filter}`)
      if (response.status === 200) {
        return dispatch({
          type: GET_COMMENTS_USERS,
          payload: response.data.data.comentarios,
        }); 
      }
    } catch (error) {
      window.alert(error)
    }
  }
}

const handleContratService = (item) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/people/${item}`);
      dispatch({
        type: CONTRAT_SERVICE_USER,
        payload: response.data,
      });
    } catch (error) {
      Swal.fire({
        title: `${error}`,
        text: "Error al contratar el servicio",
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }
  };
};

const allPeople = (query) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/people?typeOfPerson=customer&typeOfPerson=provider&state=Inactive&state=Active&state=Deleted&state=Unverified${query}&pageSize=100`);
      return dispatch({
        type: GET_PEOPLE,
        payload: response.data.people,
      });
    } catch (error) {
      Swal.fire({
        title: `${error}`,
        text: "Error al obtener allPeople",
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }
  };
};

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
      Swal.fire({
        title: `${error}`,
        text: "Error al obtener allPeopleProvider",
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }
  };
};

const allPayments = (query) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/paidMemberships${query}`
      );
      if (response.status === 200) {
        return dispatch({
          type: GET_ALL_PAYMENTS,
          payload: response.data.data,
        });
      }
    } catch (error) {
      Swal.fire({
        title: `${error}`,
        text: "Error al obtener allPayments",
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }
  };
};

const clear = () => {
  return async (dispatch) => {
    try {
      return dispatch({
        type: GET_PEOPLE,
        payload: "",
      });
    } catch (error) {
      Swal.fire({
        title: `${error}`,
        text: "Error al limpiar: Clear",
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }
  };
};

//HOME CUSTOMER
const getPeopleFilteredOrderedPagination = (queryConstructor, queryPagination) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/people?typeOfPerson=provider${queryConstructor}${queryPagination ? `${queryPagination}` : ""}`);
      return dispatch({
        type: GET_FILTER_PROVIDER,
        payload: response.data.people,
      });
    } catch (error) {
      Swal.fire({
        title: `${error}`,
        text: "Error getPeopleFilteredOrderedPagination",
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }
  };
};

const getFiltersOrdersDB = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/categories?isDeleted=false`);
      return dispatch({
        type: FILTER_SERVICES,
        payload: response.data.categories.data,
      });
    } catch (error) {
      Swal.fire({
        title: `${error}`,
        text: "Error getFiltersOrdersDB",
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
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
      Swal.fire({
        title: `${error}`,
        text: "Error saveSelectionsGlobal",
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
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
          payload: response.data.people.data[0].people,//* Asi funciona bien para pefil provider
        });
      }
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch({
          type: SET_ERROR_BACK,
          payload: error.response.data,
        });
        Swal.fire({
          title: `${error}`,
          text: "Error postUserData",
          icon: 'warning',
          confirmButtonText: 'Aceptar'
        });
        throw error.response.data;
      }
    }
  };
};

const putUserData = (userData) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${REACT_APP_API_URL}/people`,
        userData
      );
      if (response.status === 200) {
        dispatch({

          type: POST_NEW_INFO_USER,
          payload: response.data.people.data[0].people,
        });
      }
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch({
          type: SET_ERROR_BACK,
          payload: error.response.data,
        });
        Swal.fire({
          title: `${error}`,
          text: "Error putUserData",
          icon: 'warning',
          confirmButtonText: 'Aceptar'
        });
        throw error.response.data;
      }
    }
  };
};

const putState = (value, auxState) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${REACT_APP_API_URL}/people`, {
        "idPeople": value,
        "state": auxState
      })

    } catch (error) {
      Swal.fire({
        title: `${error}`,
        text: "Error putState",
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    };
  }; 
};
const putStateProvider = (value, auxState) => {
  return async () => {
    try {
      const response = await axios.put(`${REACT_APP_API_URL}/people`, {
        "idPeople": value,
        "state": auxState
      })
    } catch (error) {
      Swal.fire({
        title: `${error}`,
        text: "Error putStateProvider",
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    };
  }; 
};

const postUserServices = (updatedUserData) => {
  //*(Pablo --> Lo uso para enviar las modificaciones del perfil de los proveedores)
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/people/options`,
        updatedUserData
        );
      dispatch({
        type: POST_NEW_SERVICE_USER,
        payload: response.data.people.data[0].people
      });

    } catch (error) {
      if (error.response && error.response.data) {
        dispatch({
          type: SET_ERROR_BACK,
          payload: error.response.data,
        });
        Swal.fire({
          title: `${error}`,
          text: "Error postUserServices",
          icon: 'warning',
          confirmButtonText: 'Aceptar'
        });
        throw error.response.data;
      }
    }
  };
};

const postUserInteres = (updatedUserData) => {
  //*(Pablo --> Lo uso para enviar las modificaciones del perfil de los proveedores)
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/people/options`,
        updatedUserData
      );
      dispatch({
        type: POST_NEW_SERVICE_USER,
        payload: response.data.people.data[0].people
      });

    } catch (error) {
      if (error.response && error.response.data) {
        dispatch({
          type: SET_ERROR_BACK,
          payload: error.response.data,
        });
        Swal.fire({
          title: `${error}`,
          text: "Error postUserInteres",
          icon: 'warning',
          confirmButtonText: 'Aceptar'
        });
        throw error.response.data;
      }
    }
  };
};

const deleteService = (deleteData) => {
  //*(Pablo --> Lo uso para enviar las modificaciones del perfil de los proveedores)
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `${REACT_APP_API_URL}/people/options`,
        { data: deleteData }
      );
      if (response.status === 200) {
        return dispatch({
          type: POST_NEW_INFO_USER,
          payload: response.data.people.data[0].people
        })
      }
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch({
          type: SET_ERROR_BACK,
          payload: error.response.data,
        });
        Swal.fire({
          title: `${error}`,
          text: "Error deleteService",
          icon: 'warning',
          confirmButtonText: 'Aceptar'
        });
        throw error.response.data;
      }
    }
  };
};

// OPPORTUNITIES
const getOpportunities = (filter) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/opportunities${filter}`)
      if (response.status === 200) {
        return dispatch({
          type: SET_OPPORTUNITIE,
          payload: response.data.data,
        })
      }
    } catch (error) {
      Swal.fire({
        title: `${error}`,
        text: "Error getOpportunities",
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }
  }
}

const putOpportunities = (data, filter) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${REACT_APP_API_URL}/opportunities`, data)
      if (response.status === 200) {
        dispatch(getOpportunities(filter))
      }
    } catch (error) {
      Swal.fire({
        title: `${error}`,
        text: "Error putOpportunities",
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }
  }
}

//REPORTS
const getReports = (query) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/questions?typeOfQuestion=qaa${query ? query : ""}`)
      if (response.status === 200) {
        return dispatch({
          type: GET_REPORTS,
          payload: response.data.questions.data
        })
      }
    } catch (error) {
      Swal.fire({
        title: `${error}`,
        text: "Error getReports",
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }
  }
}

/* Create report */
const createReport = (formData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/questions`, formData);
      dispatch({
        type: CREATE_REPORT,
        payload: response.data
      });
    } catch (error) {
      Swal.fire({
        title: `${error}`,
        text: "Error createReport",
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }
  };
};

/* Create FAQs */
const createFAQs = (formData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/questions`, formData);
      if (response.status === 201) {
        Swal.fire({
          title: 'Pregunta y respuesta enviadas con éxito!',
          icon: 'success',
        }) 
        return dispatch({ 
          type: GET_FAQS, 
          payload: response.data.questions.data 
        });
      }
    } catch (error) {
      Swal.fire({
        title: `${error}`,
        text: "Error createFAQs",
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }
  };
};

/* Get FAQs */
const getFAQs = () => {
  return async function (dispatch) {
    try {
      const response = await axios(`${REACT_APP_API_URL}/questions?typeOfQuestion=faq`);
      return dispatch({ 
        type: GET_FAQS, 
        payload: response.data.questions.data 
      });
    } catch (error) {
      Swal.fire({
        title: `${error}`,
        text: "Error getFAQs",
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }
  };
};

/* Put FAQs */
const putFAQs = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${REACT_APP_API_URL}/questions`, data);
      if (response.status === 200) {
        Swal.fire({
          title: 'Pregunta y respuesta editadas con éxito!',
          icon: 'success',
        })
        return dispatch({
          type: GET_FAQS,
          payload: response.data.questions.data,
        });
      }
    } catch (error) {
      Swal.fire({
        title: `${error}`,
        text: "Error putFAQs",
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }
  };
};

export {
  addInfoUserLog,
  getCommentsUsers,
  logOutDeleteData,
  recoverUserLoggedData,
  infoDetailProveedor,
  handleContratService,
  postUserData,
  saveSelectionsGlobal,
  allPeopleProvider,
  getFiltersOrdersDB,
  getPeopleFilteredOrderedPagination,
  postUserServices,
  allPeople,
  getOpportunities,
  putOpportunities,
  getReports,
  createReport,
  deleteService,
  putUserData,
  createFAQs,
  getFAQs,
  postUserInteres,
  allPayments,
  putState,
  putStateProvider,
  putFAQs,
  clear
};
