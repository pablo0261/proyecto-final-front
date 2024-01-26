import { Routes, Route } from 'react-router-dom';
import Landing from './views/landing/Landing';
import Home from './views/home/Home';
import NotFound from './utils/notFound/NotFound';

import Helpers from './Helpers/RoutesFront';
import AccessAccount from './Views/AccessAccount/AccessAccount';
import ProfileProviderView from './views/ProfileProviderView/ProfileProviderView';
import NavBar from './components/NavBar/NavBar';
import Form from './components/Form/Form';

function App() {
  

  return (
    <div>
      <NavBar></NavBar>
      <Routes>
        <Route exact path={Helpers.Landing} element={<Landing/>}/>
        <Route path={Helpers.AccessAccount} element={<AccessAccount/>} />

        {/* Cliente */}
        <Route path={Helpers.HomeCustomer} element={<Home/>}/>

        {/* Provider */}
        <Route path={Helpers.ProfileProviderView} element={<ProfileProviderView/>}/>
       
        {/* Form */}
        <Route path={Helpers.Form} element={<Form/>}/>

        {/* Administrador */}

        {/* Rutas No Especificada */}
        <Route path='*' element={<NotFound></NotFound>}/>
      </Routes>
    </div>
  )
}

export default App
