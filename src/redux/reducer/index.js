import {
  ACCESS_BACK_SAVE_DATA,
  LOG_OUT_DELETE_DATA
} from "../actions/action-types";

import { GET_INFO_USER, POST_NEW_INFO_USER, SET_ERROR_BACK } from "../actions/index";

let initialState = {  //!Contiene un obj de una persona fake
  //*GENERALES//
  infoUserLog: {
    //*ESTO NO LO USE
    idLocation: 1,

    dateOfBirth: "1990-01-01T02:00:00.000Z",
    idGenre: 1,
    noShow: false,
    dateOfAdmission: "2022-01-01",
    typeOfPerson: "provider",
    email: "terrybogard.doe@email.com",
    password: "haaashed_password",
    externalLogin: null,
    weekCalendar: [false, true, false, true, true, false, true],

    //*ESTO SI LO USE
    aboutMe: "Passionate about crafting innovative solutions, my approach as a software engineer is to turn ideas into functional code. A challenge enthusiast, I constantly seek to learn and enhance my skills to drive projects to success.",
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
            title: 'Specialization',
            institution: 'Harvard',
            startDate: '2001-01-01',
            endDate: '2002-12-31',
            description: 'Productive year with valuable learning experiences.'
          },
          {
            title: 'Master',
            institution: 'Harvard',
            startDate: '2003-01-01',
            endDate: '2006-12-31',
            description: 'Challenging years of dedicated study.'
          }
        ]
      },
      {
        workExperience: [
          {
            title: 'Software Engineer Intern',
            institution: 'Google',
            startDate: '2003-01-01',
            endDate: '2006-12-31',
            description: "Contributed to the development of Google's search engine."
          },
          {
            title: 'Cook',
            institution: 'KitchenBoys',
            startDate: '2008-01-01',
            endDate: '2013-12-31',
            description: 'Managed culinary responsibilities, demonstrating proficiency in cooking techniques.'
          }
        ]
      }
    ],
    interests: [
      {
        skills: ["Administering Injections", "First Aid", "CPR (Cardiopulmonary Resuscitation)"
        ],
        talents: ["Reading", "Singing", "Movies", " Books"
        ],
        
      }
    ],
    geoposition: "40.7128,-74.0060",
    extras: ["Driving", "Childrens", "Pets", "Smoking", "Have a Car"
  ],
    avaliation: [
      {
        idEvaluator: "646561161561615",
        name: "Terry Bogard",
        imageId: "utils/Imagenpersona.jpeg",
        valoration: 4.5,
        area: "Rio de Janeiro",
        country: "Brasil",
        service: [
          { name: "care" },
          { name: "cleaning" },
          { name: "walking" },
        ],
        detail: "Buen servicio"
      },
      {
        idEvaluator: "8716171161561615",
        name: "Tito",
        imageId: "utils/Imagenpersona2.jpeg",
        valoration: 4.8,
        area: "Rio de Janeiro",
        country: "Brasil",
        service: [
          { name: "care" },
          { name: "cleaning" },
        ],
        detail: "Excelente servicio"
      }
    ],
    schedule: [true, false, true , false, true , true, true , true, true , true, true , true, true , true, true , true, true , true, true, false]
  },
  //*POSTDOG//
  postUserData: [],
  //*ERRORES//
  errorsBack: {},
};

//*JSON de Diego sin terminar
// {
// 	"people": {
// 		"count": 4,
// 		"data": [
// 			{
// 				"people": {
// 					"idPeople": "038b359a-ad7a-4bb4-8945-15cfd42b38b3",
// 					"fullName": "lepore diego",
// 					"address": "domicilio",
// 					"idLocation": null,
// 					"geoposition": null,
// 					"birthDate": "1999-10-05",
// 					"age": 24,
// 					"idGenre": null,
// 					"state": "Active",
// 					"noShow": null,
// 					"aboutMe": null,
// 					"dateOfAdmission": "2024-01-24",
// 					"typeOfPerson": "provider",
// 					"email": "diegolepore@",
// 					"externalLogin": null,
// 					"weekCalendar": null,
// 					"categories": [
// 						{
// 							"idCategorie": 1,
// 							"description": "Servicios",
// 							"isGenre": null,
// 							"isEducation": null,
// 							"isSkill": null,
// 							"isService": true,
// 							"includeCustomer": null,
// 							"includeProvider": true,
// 							"categories_options": [
// 								{
// 									"idOption": 1,
// 									"description": "Cuidado",
// 									"people_options": [
// 										{
// 											"idOption": "5ce19fac-72d6-45ac-b6ac-e67f072d85fd",
// 											"description": null,
// 											"price": "10.00",
// 											"date": null,
// 											"year": null,
// 											"institution": null,
// 											"comment": null
// 										}
// 									]
// 								},
// 								{
// 									"idOption": 2,
// 									"description": "Cuidado y Alimento",
// 									"people_options": [
// 										{
// 											"idOption": "19e8cd37-8d40-4780-8493-d5d50aa0da0d",
// 											"description": null,
// 											"price": "15.00",
// 											"date": null,
// 											"year": null,
// 											"institution": null,
// 											"comment": null
// 										}
// 									]
// 								}
// 							]
// 						},
// 						{
// 							"idCategorie": 2,
// 							"description": "Educacion",
// 							"isGenre": null,
// 							"isEducation": null,
// 							"isSkill": true,
// 							"isService": null,
// 							"includeCustomer": null,
// 							"includeProvider": true,
// 							"categories_options": [
// 								{
// 									"idOption": 4,
// 									"description": "Primaria",
// 									"people_options": [
// 										{
// 											"idOption": "c3ef3e19-b0b6-48cf-9133-2099fa4896fe",
// 											"description": "coelgio",
// 											"price": "0.00",
// 											"date": null,
// 											"year": null,
// 											"institution": null,
// 											"comment": null
// 										}
// 									]
// 								}
// 							]
// 						},
// 						{
// 							"idCategorie": 3,
// 							"description": "Habilidades",
// 							"isGenre": null,
// 							"isEducation": true,
// 							"isSkill": null,
// 							"isService": null,
// 							"includeCustomer": null,
// 							"includeProvider": true,
// 							"categories_options": [
// 								{
// 									"idOption": 6,
// 									"description": "Ajedrez",
// 									"people_options": [
// 										{
// 											"idOption": "d2a14cac-18d1-4347-a046-1aceda2376f7",
// 											"description": "nivel avanzado",
// 											"price": "0.00",
// 											"date": null,
// 											"year": null,
// 											"institution": null,
// 											"comment": null
// 										}
// 									]
// 								}
// 							]
// 						}
// 					]
// 				}
// 			},
// 			{
// 				"people": {
// 					"idPeople": "21fc0762-0b2b-41f1-9085-838bfe192600",
// 					"fullName": "nacho",
// 					"address": "domicilio",
// 					"idLocation": null,
// 					"geoposition": null,
// 					"birthDate": "1999-10-05",
// 					"age": 24,
// 					"idGenre": null,
// 					"state": "Active",
// 					"noShow": null,
// 					"aboutMe": null,
// 					"dateOfAdmission": "2024-01-24",
// 					"typeOfPerson": "customer",
// 					"email": "nacho@",
// 					"externalLogin": null,
// 					"weekCalendar": null,
// 					"categories": []
// 				}
// 			},
// 			{
// 				"people": {
// 					"idPeople": "52ec2134-b310-43c0-ba11-372266858bfb",
// 					"fullName": "diego",
// 					"address": "domicilio",
// 					"idLocation": null,
// 					"geoposition": null,
// 					"birthDate": "1999-10-05",
// 					"age": 24,
// 					"idGenre": null,
// 					"state": "Active",
// 					"noShow": null,
// 					"aboutMe": null,
// 					"dateOfAdmission": "2024-01-24",
// 					"typeOfPerson": "customer",
// 					"email": "diego@",
// 					"externalLogin": null,
// 					"weekCalendar": null,
// 					"categories": []
// 				}
// 			},
// 			{
// 				"people": {
// 					"idPeople": "a2b2e85f-ee7b-47b4-9fbd-7d94612b5f33",
// 					"fullName": "daniela",
// 					"address": "domicilio",
// 					"idLocation": null,
// 					"geoposition": null,
// 					"birthDate": "1999-10-05",
// 					"age": 24,
// 					"idGenre": null,
// 					"state": "Active",
// 					"noShow": null,
// 					"aboutMe": null,
// 					"dateOfAdmission": "2024-01-24",
// 					"typeOfPerson": "provider",
// 					"email": "daniela@",
// 					"externalLogin": null,
// 					"weekCalendar": null,
// 					"categories": []
// 				}
// 			}
// 		]
// 	}
// }


const rootReducer = (state = initialState, { type, payload }) => {
  switch (
    type 
  ) {

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

    case ACCESS_BACK_SAVE_DATA:
      return {
        ...state,
        infoUserLog: payload
      }

    case LOG_OUT_DELETE_DATA:
      return {
        ...state, infoUserLog : {}
      }

    default:
      return state;
  }
};

export default rootReducer;
