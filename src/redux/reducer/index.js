import {
  GET_INFO_USER,
  POST_NEW_INFO_USER,
  SET_ERROR_BACK,
  EDIT_INFO_USER,
} from "../actions/index";

import {
  ACCESS_BACK_SAVE_DATA,
  LOG_OUT_DELETE_DATA,
} from "../actions/action-types";

let initialState = {
  //*GENERALES//
  infoUserLog: {
    //*ESTO NO LO USE
    idLocation: 1,

    dateOfBirth: "1990-01-01T02:00:00.000Z",
    idGenre: 1,
    noShow: false,
    dateOfAdmission: "2022-01-01",
    typeOfPerson: "administrator",
    email: "terrybogard.doe@email.com",
    password: "haaashed_password",
    externalLogin: null,
    weekCalendar: [false, true, false, true, true, false, true],

    //*ESTO SI LO USE
    aboutMe:
      "Passionate about crafting innovative solutions, my approach as a software engineer is to turn ideas into functional code. A challenge enthusiast, I constantly seek to learn and enhance my skills to drive projects to success.",
    state: "Active",
    area: "Rio de Janeiro",
    idPeople: "00000001-e89b-12d3-a456-426614444001",
    name: "Terry Bogard",
    address: "123 Main Street",
    imageId: "utils/Imagenpersona.jpeg",
    valoracion: "4,5",
    age: "28",
    country: "Brasil",
    profesion: "software engineer",
    phone: "219998655541",
    service: [
      { name: "care", value: 30 },
      { name: "cleaning", value: 20 },
      { name: "cooking", value: 30 },
      { name: "walking", value: 10 },
    ],
    skills: [
      {
        education: [
          {
            title: "Specialization",
            institution: "Harvard",
            startDate: "2001-01-01",
            endDate: "2002-12-31",
            description: "Productive year with valuable learning experiences.",
          },
          {
            title: "Master",
            institution: "Harvard",
            startDate: "2003-01-01",
            endDate: "2006-12-31",
            description: "Challenging years of dedicated study.",
          },
        ],
      },
      {
        workExperience: [
          {
            title: "Software Engineer Intern",
            institution: "Google",
            startDate: "2003-01-01",
            endDate: "2006-12-31",
            description:
              "Contributed to the development of Google's search engine.",
          },
          {
            title: "Cook",
            institution: "KitchenBoys",
            startDate: "2008-01-01",
            endDate: "2013-12-31",
            description:
              "Managed culinary responsibilities, demonstrating proficiency in cooking techniques.",
          },
        ],
      },
    ],
    interests: [
      {
        skills: [
          "Administering Injections",
          "First Aid",
          "CPR (Cardiopulmonary Resuscitation)",
        ],
        talents: ["Reading", "Singing", "Movies", " Books"],
      },
    ],
    geoposition: "40.7128,-74.0060",
    extras: ["Driving", "Childrens", "Pets", "Smoking", "Have a Car"],
    avaliation: [
      {
        idEvaluator: "646561161561615",
        name: "Terry Bogard",
        imageId: "utils/Imagenpersona.jpeg",
        valoration: 4.5,
        area: "Rio de Janeiro",
        country: "Brasil",
        service: [{ name: "care" }, { name: "cleaning" }, { name: "walking" }],
        detail: "Buen servicio",
      },
      {
        idEvaluator: "8716171161561615",
        name: "Tito",
        imageId: "utils/Imagenpersona2.jpeg",
        valoration: 4.8,
        area: "Rio de Janeiro",
        country: "Brasil",
        service: [{ name: "care" }, { name: "cleaning" }],
        detail: "Excelente servicio",
      },
    ],
    schedule: [
      true,
      false,
      true,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      false,
    ],
  },
  //*POSTDOG//
  postUserData: [],
  //*ERRORES//
  errorsBack: {},
  //*ESTAMOS PARA MANEJO DEL FORM//
  datosPeople: {
    ProfileProvider: {
      imageId: "",
      valoracion: "",
      age: "",
      address: "",
      idLocation: "",
      state: "",
      area: "",
      country: "",
      profesion: "",
      aboutMe: "",
      phone: "",
    },
    ServicesProviderCard: {
      idPeople: "",
      fullName: "",
      address: "",
      birthDate: "",
      age: "",
    },
    EducationExperienciaProvider: {
      title: "",
      institution: "",
      startDate: "",
      endDate: "",
      description: "",
    },
    InteresProviderCard: { skills: "", talents: "" },
    SkillsProviderCard: { fullName: "", address: "", birthDate: "" },
    ScheduleProviderCard: {},
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
        errorsBack: payload,
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
