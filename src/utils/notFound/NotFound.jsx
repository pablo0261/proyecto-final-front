import React from 'react';
import { useNavigate } from 'react-router';
import Helpers from '../../Helpers/RoutesFront';
import { useSelector } from 'react-redux';

function NotFound() {

  const userLoggedInfo = useSelector(state => state.infoUserLog)
  const navigate = useNavigate()
  
  const handleReset = () => {
      if (userLoggedInfo && userLoggedInfo.typeOfPerson === 'provider') {
        navigate(Helpers.StatsProviderView)
      } else if (userLoggedInfo && userLoggedInfo.typeOfPerson === 'customer') {
        navigate(Helpers.HomeCustomerView)
      } else {
        navigate(Helpers.Landing)
      }
  }

  return (
    <div>
      <h1>Page Not Found - Error 404</h1>
      <button onClick={()=>handleReset()}>Ir a Inicio</button>
    </div>

  )
}

export default NotFound;
