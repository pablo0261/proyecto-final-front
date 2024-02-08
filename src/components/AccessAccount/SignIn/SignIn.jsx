import { useEffect, useState } from "react";
import { ValidateFormSignIn } from "./ValidateFormSignIn";
import style from "./SignIn.module.sass";
import StoreItem from "../../../Helpers/LocalStorage";
// import MercadoPago from "../MercadoPago/MercadoPago";

function SignIn(props) {
  const { isProvider, handleFormsVisibility, signInProcess } = props;

  const [signInData, setSignInData] = useState({
    fullName: "",
    birthDate: "",
    email: "",
    password: "",
    typeOfPerson: isProvider ? "provider" : "customer",
  });

  const [subscription, setSubscription] = useState({
    items: 
      {
        description: "Subscripción",
        price: Number(1200),
        quantity: Number(1),
        currency_id: "ARG",
      },
    payer: {
        name: signInData.fullName,
        email: signInData.email,
        password: signInData.password,
        birthDate: signInData.birthDate,
        typeOfPerson: signInData.typeOfPerson,
      },
  });

  useEffect(() => {
    localStorage.setItem(StoreItem.dataUserSignIn, JSON.stringify(signInData));
  }, []);

  const [errors, setErrors] = useState({
    fullName: "*Campo Obligatorio",
    birthDate: "*Ingresa tu fecha de nacimiento",
    email: "*Campo Obligatorio",
    password: "*Campo Obligatorio",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChangeLogIn = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    ValidateFormSignIn(property, errors, setErrors, {
      ...signInData,
      [property]: value,
    });
    setSignInData({ ...signInData, [property]: value });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSumbitLogIn = (event) => {
    event.preventDefault();

    if (Object.values(errors).every((error) => error === "")) {
      signInProcess(signInData);
    } else {
      window.alert("Por favor completa el formulario sin errores");
    }
  };

  return (
    <div className={style.wrapper}>
      <p className={style.title}>
        Crear mi cuenta{" "}
        {isProvider ? (
          <span className={style.text}>(Proveedor)</span>
        ) : (
          <span className={style.text}>(Cliente)</span>
        )}
      </p>
      {isProvider ? (
        <p className={style.text}>
          Para crear tu cuenta en nuestra plataforma deberás realizar el pago de
          una suscripción mensual.
        </p>
      ) : (
        <p className={style.text}>
          Únete a Care with Love para encontrar el cuidador perfecto. Tu familia
          merece lo mejor.
        </p>
      )}
      <form onSubmit={handleSumbitLogIn}>
        <div className={style.inputWrapper}>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={signInData.fullName}
            onChange={handleChangeLogIn}
            placeholder="Nombre y Apellido"
          />
          <p className={errors.fullName ? style.errorForm : style.nonError}>
            {errors.fullName ? errors.fullName : "Datos Validos"}
          </p>
        </div>
        <div className={style.inputWrapper}>
          <input
            id="birthDate"
            name="birthDate"
            type="date"
            value={signInData.birthDate}
            onChange={handleChangeLogIn}
            max={new Date().toISOString().split("T")[0]}
          />
          <p className={errors.birthDate ? style.errorForm : style.nonError}>
            {errors.birthDate ? errors.birthDate : "Datos Validos"}
          </p>
        </div>
        <div className={style.inputWrapper}>
          <input
            id="email"
            name="email"
            type="email"
            value={signInData.email}
            onChange={handleChangeLogIn}
            placeholder="example@email.com"
          />
          <p className={errors.email ? style.errorForm : style.nonError}>
            {errors.email ? errors.email : "Datos Validos"}
          </p>
        </div>
        <div className={style.inputPassword}>
          <div className={style.password}>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={signInData.password}
              onChange={handleChangeLogIn}
              placeholder="Constraseña"
            />
            <div
              onClick={handleTogglePassword}
              className={showPassword ? style.hidePassword : style.showPassword}
            ></div>
          </div>
          <p className={errors.password ? style.errorForm : style.nonError}>
            {errors.password ? errors.password : "Datos Validos"}
          </p>
        </div>
        {/* {isProvider ? (
          <div>
            <div className={style.subcription}>
              <p>{subscription.items.description}</p>
              <p>ARS ${subscription.items.price}</p>
            </div>
            {/* <MercadoPago
              userData={signInData}
              errors={errors}
              subscription={subscription}
            ></MercadoPago> */}
          </div>
        ) : ( */}
          <div>
            <button type="submit" className={style.buttonSubmit}>
              Registrarse
            </button>
          </div>
        {/* )} */}
      </form>
      <div className={style.Questions}>
        <p className={style.text}>¿Ya tienes una cuenta?</p>
        <button
          onClick={() => {
            handleFormsVisibility();
          }}
          className={style.buttonHandle}
        >
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
}

export default SignIn;
