  import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
  import { useState } from "react";
  import axios from "axios";
  import abuela from "../../assets/abuela.jpg";

  //! OJO SE DEBE INSTALAR ESTA VERSION ==> npm i mercadopago@1.5.16  ("Si no NO funcionará")

  import "./Product.css";

  const Product = () => {
    const [preferenceId, setpreferenceId] = useState(null)
    initMercadoPago('TEST-24adbea8-7bf2-4c06-876b-12ead2c82fb2');

  const createPreference = async () => {
    try {
      const response = await axios.post("http://localhost:8080/create_preference", {
        description: "abuela",
        price: 100,
        quantity: 1,
        currency_id: "$ARG",
      })

      const {id} = response.data;
      return id;
    } catch (error) {
      console.log("error createPreference:", error)
    }
  }

  const handleBuy = async () => {
    const id = await createPreference();
    if(id){
      setpreferenceId(id)
    }
  }



    return (
      <div className="card-product-container">
        <div className="card-product">
          <div className="card">
            <img src={abuela} alt="Imagen abuela" />
            <h2>Servicio de asistencia de abuelos</h2>
            <p className="price">R$ 100</p>
            <button onClick={handleBuy} className="button">Pay</button>
            {preferenceId && <Wallet initialization={{ preferenceId}} customization={{ texts:{ valueProp: 'smart_option'}}} />}
          </div>
        </div>
      </div>
    );
  };

  export default Product;
