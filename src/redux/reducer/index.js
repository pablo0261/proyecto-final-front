import {
  ACCESS_BACK_SAVE_DATA,
  LOG_OUT_DELETE_DATA,
  GET_INFO_USER,
  POST_NEW_SERVICE_USER,
  SET_ERROR_BACK,
  EDIT_INFO_USER,
  GET_HOME_PROVIDER,
  FILTER_SERVICES,
  GET_FILTER_PROVIDER,
  FILTER_ORDER_SELECTED,
  POST_NEW_INFO_USER,
  GET_PEOPLE,
  SET_OPPORTUNITIE,
  SET_SELECTED_OPPORTUNITIE,
  GET_REPORTS,
  CREATE_REPORT,
  GET_FAQS,
  GET_ALL_PAYMENTS,
  PUT_STATE,
  DELETE_FAQS,
  GET_COMMENTS_USERS,
  // CONTRAT_SERVICE_USER
} from "../actions/action-types";


let initialState = {

  infoUserLog: {},
  comments_User: [],

  //ADMIN
  peopleForAdmin: [],
  paymentsHistory: [],

  //HOME
  getAllPeople: [],
  paginacionData: [],
  allServices: [],
  filterOrderSelected: {
    filters: [],
    orders: []
  },
  //*POST//
  postUserData: [],
  //*ERRORES//
  errorsBack: {},
  //*ESTAMOS PARA MANEJO DEL FORM// <--// dejo de utilizarlo cuando funcionene todas las rutas del back (Pablo)
  datosForm: {
    ProfileProvider: {
      Nombre: "",
      Telefono: "",
      País: "",
      Provincia: "",
      Localidad: "",
      Calle: "",
      Ocupación: "",
      "Sobre mi": "",
    },
    ServicesProviderCard: [
      "Cuidado", "Cuidado y Alimento",
      "Cuidado y Limpieza"
    ],
    EducationExperienciaProvider: {
      Titulo: "",
      Institución: "",
      "Año de Inicio": "",
      "Año de Finalización": "",
      Descripción: "",
    },
    InteresProviderCard: { Habilidades: "", Intereses: "" },
    SkillsProviderCard: { "Licencia de Conducir": "", Vehículo: "", Fumador: "", Hijos: "", Mascota: "" },
    ScheduleProviderCard: {},
    MapProviderCard: {},
    ReviewProviderCard: {},
    ConectionProviderCard: {},
  },

  //OPPORTUNITIE
  selected_opportunitie: {},
  opportunities: [],

  //REPORTS
  reports: [],

  /* Create report */
  createReport: [],

  /* FAQs */
  faqS: [],

};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    //*---GET GENERALES---//
    case GET_INFO_USER:
      return {
        ...state,
        infoUserLog: payload,
      };
    
    case GET_COMMENTS_USERS:
      return {
        ...state,
        comments_User: payload
      }

    case GET_PEOPLE:
      return {
        ...state,
        peopleForAdmin: payload,
      };

    case PUT_STATE:
      return {
        ...state,
        peopleForAdmin: payload,
      };

    case GET_ALL_PAYMENTS:
      return {
        ...state,
        paymentsHistory: payload,
      };

    case GET_HOME_PROVIDER:
      return {
        ...state,
        getAllPeople: payload,
      };

    case GET_FILTER_PROVIDER:
      return {
        ...state,
        getAllPeople: payload,
      };

    case FILTER_SERVICES:
      return {
        ...state,
        allServices: payload,
      };

    case FILTER_ORDER_SELECTED:
      return {
        ...state,
        filterOrderSelected: payload
      }

    //*---POST---//
    case POST_NEW_INFO_USER:
      return {
        ...state,
        infoUserLog: payload,
      };


    case POST_NEW_SERVICE_USER:
      return {
        ...state,
        infoUserLog: payload,
      };

    //* --- MANEJO DE ERRORES DEL BACK ---//*
    case SET_ERROR_BACK:
      return {
        ...state,
        errorsBack: payload,
      };

    //* --- EDICIONES DE PERFIL CON FORM ---//*
    case EDIT_INFO_USER:
      return {
        ...state,
        datosPeople: {
          payload,
        },
      };

    case ACCESS_BACK_SAVE_DATA:
      return {
        ...state,
        infoUserLog: payload,
      };

    case LOG_OUT_DELETE_DATA:
      return {
        ...state,
        infoUserLog: {},
      };

    // OPPORTUNITIE
    case SET_OPPORTUNITIE:
      return {
        ...state, opportunities: payload
      }

    case SET_SELECTED_OPPORTUNITIE:
      return {
        ...state,
        selected_opportunitie: payload
      }

    //REPORTS
    case GET_REPORTS:
      return {
        ...state,
        reports: payload
      }
    /* Create report */
    case CREATE_REPORT:
      return {
        ...state,
        createReport: payload,
      };

    /* GET FAQs */
    case GET_FAQS:
      return {
        ...state,
        faqS: payload,
      }

    case DELETE_FAQS:
      return {
        ...state,
        faqS: state.faqS.filter((faq) => faq.idQuestion !== payload),
      };


    default:
      return state;
  }
};

export default rootReducer;
