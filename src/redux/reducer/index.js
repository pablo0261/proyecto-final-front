import { GET_ALL } from "../actions/index";

let initialState = {  //!Contiene un obj de una persona fake
  infoUserLog: {
    idPeople: "00000001-e89b-12d3-a456-426614444001",
    name: "Terry Bogard",
    address: "123 Main Street",
    idLocation: 1,
    geoposition: "40.7128,-74.0060",
    dateOfBirth: "1990-01-01T02:00:00.000Z",
    idGenre: 1,
    state: "Active",
    area: "Rio de Janeiro",
    noShow: false,
    aboutMe: "Passionate about crafting innovative solutions, my approach as a software engineer is to turn ideas into functional code. A challenge enthusiast, I constantly seek to learn and enhance my skills to drive projects to success.",
    dateOfAdmission: "2022-01-01",
    typeOfPerson: "administrator",
    email: "terrybogard.doe@email.com",
    password: "haaashed_password",
    externalLogin: null,
    weekCalendar: [false, true, false, true, true, false, true],
    imageId: "utils/Imagenpersona.jpeg",
    valoracion: "4,5",
    age: "28",
    country: "Brasil",
    profesion: "software engineer",
    phone: "219998655541",
    service: [
      {name:"care", value: 30},
      {name:"cleaning", value: 20},
      {name: "cooking", value: 30},
      {name: "walking", value: 10},
    ]
  },
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    //*---GET GENERALES---//
    case GET_ALL:
      return {
        ...state,
        infoUserLog: payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
