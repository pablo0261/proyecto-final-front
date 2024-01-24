import {
    GET_ALL,
} from "../actions/index";

let initialState = {
    infoDetailProveedor: {},
};

const rootReducer = (state = initialState, { type, payload }) => {
    switch (
      type 
    ) {
  
      //*---GET GENERALES---//
      case GET_ALL:
        return {
          ...state,
          infoDetailProveedor: payload,
        };

        default:
      return state;
  }
};

export default rootReducer;