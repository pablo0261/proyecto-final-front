import { useEffect, useState } from "react";
import LogIn from "../../components/AccessAccount/LogIn/LogIn";
import SignIn from "../../components/AccessAccount/SignIn/SignIn";
import { Link, useNavigate } from "react-router-dom";
import Helpers from "../../Helpers/RoutesFront";
import StoreItem from "../../Helpers/LocalStorage";
import { useDispatch } from "react-redux";
import style from "./AccessAccount.module.sass";
import axios from "axios";
import { addInfoUserLog } from "../../redux/actions";
import { io } from 'socket.io-client';
const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
const socket = io(REACT_APP_API_URL);

function AccessAccount() {

  useEffect(() => {
    // Carga la biblioteca de Google Sign-In
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/platform.js";
    script.async = true;
    document.body.appendChild(script);

    // Llama a la función de renderizado de Google Sign-In después de que se haya cargado la biblioteca
    script.onload = () => {
      google.accounts.id.renderButton(document.getElementById("buttonDiv"), {
        theme: "outline",
        size: "medium",
      });
    };
  }, []);

  const isProvider = JSON.parse(localStorage.getItem(StoreItem.isProvider));
  const [signInView, setSignInView] = useState(false);
  const handleFormsVisibility = () => {
    setSignInView(!signInView);
  };

  const dispatch = useDispatch();
  const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  const logInProcess = async (logInData) => {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/people?email=${logInData.email}`
      );
      if (response.status === 200) {
        const user = response.data.people.data[0].people;
        localStorage.setItem(StoreItem.emailUserLogged, logInData.email);

        dispatch(addInfoUserLog(user));
        socket.emit('join-request', user.idPeople);

        if (user.typeOfPerson === "admin") {
          navigate(Helpers.HomeCustomerView); //* <== Esta ruta hay que cambiarla cuando este lista la view del Admin !!
        } else if (user.typeOfPerson === "provider") {
          navigate(Helpers.StatsProviderView);
        } else {
          navigate(Helpers.HomeCustomerView);
        }
      }
    } catch (error) {
      window.alert(error);
    }
  };


  const signInProcess = async (signInData) => {//*componente para manejar el post de MP y recibir el link a MP
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/payment`,
        signInData
      );

      console.log("signInData", signInData);
      if (response.status === 200) {
        const paymentLink = response.data.urlPayment;
        window.location.href = paymentLink;
      } else {
        window.alert(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      window.alert(error);
    }
  };


  return (
    <div className={style.wrapper}>
      {isProvider != null ? (
        <div className={style.wrapperChild}>
          {signInView ? (
            <div className={style.wrapperForms}>
              <SignIn
                isProvider={isProvider}
                handleFormsVisibility={handleFormsVisibility}
                signInProcess={signInProcess}
              ></SignIn>
              <div className={style.wrapperStats}>
                <div className={style.components}>Componente de Stats</div>
                <div className={style.components}>Componente de Comentario</div>
              </div>
            </div>
          ) : (
            <div className={style.wrapperForms}>
              <LogIn
                isProvider={isProvider}
                handleFormsVisibility={handleFormsVisibility}
                logInProcess={logInProcess}
              ></LogIn>
              <div className={style.wrapperStats}>
                <div className={style.components}>Componente de Stats</div>
                <div className={style.components}>Componente de Comentario</div>
              </div>
            </div>
          )}
          <div id="buttonDiv" /* className={style.btnCustom} */></div>
        </div>
      ) : (
        <Link to={Helpers.Landing}>Volver a Landing</Link>
      )}
    </div>
  );
}

export default AccessAccount;
