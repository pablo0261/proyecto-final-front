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
import { io } from "socket.io-client";
import Swal from "sweetalert2";
import StatsAccessAccountClient from "../../components/AccessAccount/StatsAccessAccount/StatsClient/StatsAccessAccountClient";
import StatsAccessAccountProvider from "../../components/AccessAccount/StatsAccessAccount/StatsProvider/StatsAccessAccountProvider";
import MessageToShowClient from "../../components/AccessAccount/MessageToShow/MessageClient";
import MessageToShowProvider from "../../components/AccessAccount/MessageToShow/MessageProvider";

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
  const navigate = useNavigate();

  const logInProcess = async (logInData) => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/people/login`, logInData
        );
      if (response.status === 200) {
        const user = response.data.people.data[0].people;
        localStorage.setItem(StoreItem.emailUserLogged, logInData.email);

        dispatch(addInfoUserLog(user));
        socket.emit("join-request", user.idPeople);

        if (user.typeOfPerson === "administrator") {
          navigate(Helpers.AdminStatistics); 
        } else if (user.typeOfPerson === "provider") {
          navigate(Helpers.StatsProviderView);
        } else {
          navigate(Helpers.HomeCustomerView);
        }
      }
    } catch (error) {
      Swal.fire({
        title: `${error.response.data.error}!`,
        text: `Por favor, verifique los datos e intente nuevamente`,
        icon: 'warning',
      })
    }
  };

  const signInProcess = async (signInData) => {
    try {
      if (isProvider) {
        const response = await axios.post(
          `${REACT_APP_API_URL}/payment`,
          signInData
        );
        if (response.status === 200) {
          const paymentLink = response.data.urlPayment;
          window.location.href = paymentLink;
        } 
      } else {
        const response = await axios.post(
          `${REACT_APP_API_URL}/people`,
          signInData
        );
        if (response.status === 201) {
          const user = response.data.people.data[0].people;
          localStorage.setItem(StoreItem.emailUserLogged, signInData.email);
          dispatch(addInfoUserLog(user));
          socket.emit("join-request", user.idPeople);
          navigate(Helpers.ProfileCustomerView);
        }
      }
    } catch (error) {
      Swal.fire({
        title: 'Usuario ya Registrado!',
        text: `Para acceder al sistema realice el login`,
        icon: 'warning',
      })
      .then(response => {
        if(response.isConfirmed){
          handleFormsVisibility()
        }
        })
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
                  <div className={style.components}>
                    <StatsAccessAccountProvider />
                  </div>
                ) : (
                  <div className={style.components}>
                    <StatsAccessAccountClient />
                  </div>
                )}
                <div className={style.components}>
                {isProvider ? (
                  <div className={style.components}>
                    <MessageToShowProvider />
                  </div>
                ) : (
                  <div className={style.components}>
                    <MessageToShowClient />
                  </div>
                )}
                  
                </div>
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
                  <div className={style.components}>
                    <StatsAccessAccountProvider />
                  </div>
                ) : (
                  <div className={style.components}>
                    <StatsAccessAccountClient />
                  </div>
                )}
               {isProvider ? (
                  <div className={style.components}>
                    <MessageToShowProvider />
                  </div>
                ) : (
                  <div className={style.components}>
                    <MessageToShowClient />
                  </div>
                )}
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