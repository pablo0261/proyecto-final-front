import React, { useEffect } from 'react';
<<<<<<< HEAD
import { useHistory } from 'react-router-dom'; 

function SubscriptionFailureBanner() {
  const history = useHistory(); 

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      history.push('/accessAccount');
=======
import { useNavigate } from 'react-router-dom'; 

function SubscriptionFailureBanner() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate.push('/accessAccount');
>>>>>>> pabloMercadoPago
    }, 3000); 

    return () => clearTimeout(redirectTimer);
  }, []); 

  return (
    <div>
      <h2>¡Su pago no pudo ser procesado!</h2>
      <p>Intentelo nuevamente</p>
    </div>
  );
}

export default SubscriptionFailureBanner;