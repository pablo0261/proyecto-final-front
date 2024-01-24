import axios from "axios";


export const GET_ALL = "GET_ALL";


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

  export {
    infoDetailProveedor,
  }