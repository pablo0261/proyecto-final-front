import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { useState } from "react";
import axios from "axios";
import style from "./MercadoPago.module.sass";
import StoreItem from '../../../Helpers/LocalStorage';

const MercadoPago = (props) => {

  const { userData, errors, subscription } = props
  const [preferenceId, setpreferenceId] = useState(null)
  initMercadoPago('TEST-24adbea8-7bf2-4c06-876b-12ead2c82fb2');

  const createPreference = async () => {
    try {
      const response = await axios.post("https://carewithlove.onrender.com/payments", subscription)
      const { id } = response.data;
      return id;
    } catch (error) {
      window.alert("Error createPreference:", error)
    }
  }

  const handleBuy = async () => {
    if (Object.values(errors).every(error => error === '')) {
      const id = await createPreference();
      if (id) {
        setpreferenceId(id)
        localStorage.setItem(StoreItem.dataUserSignIn, JSON.stringify(userData))
      }
    } else {
      window.alert("Debes completar los campos sin errores")
    }
  }

  return (
    <div>
      <button type="button" onClick={handleBuy} className={style.buttonPay}>Registrarse</button>
      {preferenceId && <Wallet initialization={{ preferenceId }} customization={{ texts: { valueProp: 'smart_option' } }} />}
    </div>
  );
};

export default MercadoPago;
