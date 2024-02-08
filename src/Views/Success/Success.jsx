import React, { useEffect } from 'react';
<<<<<<< HEAD
import { useHistory } from 'react-router-dom';

function SubscriptionSuccessBanner() {
  const history = useHistory(); 

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      history.push('/profileProviderView');
=======
import { useNavigate } from 'react-router-dom';

function SubscriptionSuccessBanner() {
  const navigate = useNavigate(); 

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate('/profileProviderView');
>>>>>>> pabloMercadoPago
    }, 3000); 

    return () => clearTimeout(redirectTimer);
  }, []); 

  return (
    <div>
      <h2>¡Se realizó su suscripción exitosamente!</h2>
<<<<<<< HEAD
      <p>Bienvenido a la comunidad CareWithLove.</p>
=======
      <link href="https://www.facebook.com" > Enviame</link>
>>>>>>> pabloMercadoPago
    </div>
  );
}

export default SubscriptionSuccessBanner;