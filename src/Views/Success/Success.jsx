import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

function SubscriptionSuccessBanner() {
  const navigate = useNavigate(); 

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate('/profileProviderView');
    }, 3000); 

    return () => clearTimeout(redirectTimer);
  }, []); 

  return (
    <div>
      <h2>¡Se realizó su suscripción exitosamente!</h2>

      <link href="https://www.facebook.com" > Enviame</link>
    </div>
  );
}

export default SubscriptionSuccessBanner;