import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom'; 

function SubscriptionFailureBanner() {
  const history = useHistory(); 

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      history.push('/accessAccount');
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