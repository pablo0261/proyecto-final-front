import {
  ACCESS_BACK_SAVE_DATA,
  LOG_OUT_DELETE_DATA,
  GET_INFO_USER,
  POST_NEW_INFO_USER,
  SET_ERROR_BACK,
  EDIT_INFO_USER,
  // CONTRAT_SERVICE_USER
} from "../actions/action-types";


let initialState = {
  //*GENERALES//
  infoUserLog: {
      idPeople: '038b359a-ad7a-4bb4-8945-15cfd42b38b3',
      fullName: 'lepore diego',
      address: 'domicilio',
      idLocation: null,
      geoposition: null,
      birthDate: '1999-10-05',
      age: 24,
      idGenre: null,
      state: 'Active',
      aboutMe: null,
      dateOfAdmission: '2024-01-24',
      typeOfPerson: 'provider',
      email: 'diegolepore@gmail.com',
      externalLogin: null,
      weekCalendar: null,
      averageRating: '0.00',
      countRating: 0,
      logged: false,
      categories: [
        {
          idCategorie: 1,
          description: 'Servicios',
          isGenre: null,
          isEducation: null,
          isSkill: null,
          isService: true,
          isInterest: null,
          isExperience: null,
          isExtra: null,
          includeCustomer: null,
          includeProvider: true,
          categories_options: [
            {
              idOption: 1,
              description: 'Cuidado',
              people_options: [
                {
                  idOption: '5ce19fac-72d6-45ac-b6ac-e67f072d85fd',
                  description: null,
                  price: '10.00',
                  date: null,
                  year: null,
                  institution: null,
                  comment: null
                }
              ]
            },
            {
              idOption: 2,
              description: 'Cuidado y Alimento',
              people_options: [
                {
                  idOption: '19e8cd37-8d40-4780-8493-d5d50aa0da0d',
                  description: null,
                  price: '15.00',
                  date: null,
                  year: null,
                  institution: null,
                  comment: null
                }
              ]
            }
          ]
        },
        {
          idCategorie: 2,
          description: 'Educacion',
          isGenre: null,
          isEducation: null,
          isSkill: true,
          isService: null,
          isInterest: null,
          isExperience: null,
          isExtra: null,
          includeCustomer: null,
          includeProvider: true,
          categories_options: [
            {
              idOption: 4,
              description: 'Primaria',
              people_options: [
                {
                  idOption: 'c3ef3e19-b0b6-48cf-9133-2099fa4896fe',
                  description: 'coelgio',
                  price: '0.00',
                  date: null,
                  year: null,
                  institution: null,
                  comment: null
                }
              ]
            }
          ]
        },
        {
          idCategorie: 3,
          description: 'Habilidades',
          isGenre: null,
          isEducation: true,
          isSkill: null,
          isService: null,
          isInterest: null,
          isExperience: null,
          isExtra: null,
          includeCustomer: null,
          includeProvider: true,
          categories_options: [
            {
              idOption: 6,
              description: 'Ajedrez',
              people_options: [
                {
                  idOption: 'd2a14cac-18d1-4347-a046-1aceda2376f7',
                  description: 'nivel avanzado',
                  price: '0.00',
                  date: null,
                  year: null,
                  institution: null,
                  comment: null
                }
              ]
            }
          ]
        }
      ]

  },
  
  //*POST//
  postUserData: [],
  //*ERRORES//
  errorsBack: {},
  //*ESTAMOS PARA MANEJO DEL FORM//
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
    ScheduleProviderCard: { },
    MapProviderCard: {},
    ReviewProviderCard: {},
    ConectionProviderCard: {},
  },
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    //*---GET GENERALES---//
    case GET_INFO_USER:
      return {
        ...state,
        infoUserLog: payload,
      };

    //*---POST---//
    case POST_NEW_INFO_USER:
      return {
        ...state,
        postUserData: [...state.postUserData, payload],
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

    default:
      return state;
  }
};

export default rootReducer;
