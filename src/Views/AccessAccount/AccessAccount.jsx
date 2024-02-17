import React, { useEffect, useState } from "react";
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
import StatsAccessAccountClient from "../../components/AccessAccount/StatsAccessAccount/StatsClient/StatsAccessAccountClient"
import StatsAccessAccountProvider from "../../components/AccessAccount/StatsAccessAccount/StatsProvider/StatsAccessAccountProvider"
import MessageToShow from "../../components/AccessAccount/MessageToShow/MessageClient"

const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
const socket = io(REACT_APP_API_URL);

function AccessAccount() {
  const [showUserExistsMessage, setShowUserExistsMessage] = useState(false);//!Armar aqui el cartel que se renderizara ante usuario ya existente

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

        if (user.typeOfPerson === "administrator") {
          navigate(Helpers.AdminStatistics); //* <== Esta ruta hay que cambiarla cuando este lista la view del Admin !!
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

  const signInProcess = async (signInData) => {//!Verificar cuando el back modifique el error de 400 a 409 para renderizar un cartel que indique que el 
    try {
      if (isProvider) {
        const response = await axios.post(`${REACT_APP_API_URL}/payment`, signInData);
        if (response.status === 200) {
          const paymentLink = response.data.urlPayment;
          window.location.href = paymentLink;
        } else if (response.status === 409 ) {//* Adicionado para que funcione cuando el proveedor ya se encuentra registrado
          setShowUserExistsMessage(true);
          handleFormsVisibility()
        } else {
          window.alert(`Error: ${response.status} - ${response.statusText}`);
        }
      
      } else {
        const response = await axios.post(`${REACT_APP_API_URL}/people`, signInData);
        console.llog("response", response.data);
        if (response.status === 200) {
          navigate(Helpers.ProfileCustomerView);
        } else if (response.status === 409 ) {//* Adicionado para que funcione cuando el cliente ya se encuentra registrado
          setShowUserExistsMessage(true);
          handleFormsVisibility()
        }
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
                {isProvider ? (
                  <div className={style.components}><StatsAccessAccountProvider/></div>
                ) : (
                  <div className={style.components}><StatsAccessAccountClient/></div>
                )}
                <div className={style.components}><MessageToShow/></div>
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
                {isProvider ? (
                  <div className={style.components}><StatsAccessAccountProvider/></div>
                ) : (
                  <div className={style.components}><StatsAccessAccountClient/></div>
                )}
                <div className={style.components}><MessageToShow/></div>
              </div>
            </div>
          )}
          <div id="buttonDiv" /* className={style.btnCustom} */></div>
          {showUserExistsMessage && (
            <div className="alert alert-danger" role="alert">
              El usuario ya existe. Por favor, inicia sesión con otro usuario o regístrate con un correo electrónico diferente.
            </div>
          )}
        </div>
      ) : (
        <Link to={Helpers.Landing}>Volver a Landing</Link>
      )}
    </div>
  );
}

export default AccessAccount;
