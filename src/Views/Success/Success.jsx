import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function SubscriptionSuccessBanner() {
  const history = useHistory(); 

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      history.push('/profileProviderView');
    }, 3000); 

    return () => clearTimeout(redirectTimer);
  }, []); 

  return (
    <div>
      <h2>¡Se realizó su suscripción exitosamente!</h2>
      <p>Bienvenido a la comunidad CareWithLove.</p>
    </div>
  );
}

export default SubscriptionSuccessBanner;