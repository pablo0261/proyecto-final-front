import { Routes, Route } from 'react-router-dom';
import Landing from './views/landing/Landing';
import Home from './views/home/Home';
// import NotFound from './utils/notFound/NotFound';

import Helpers from './Helpers/RoutesFront';
import AccessAccount from './Views/AccessAccount/AccessAccount';
import ProfileProveedorView from './views/ProfileProveedorView/PerfilProveedorView';
import NavBar from './components/NavBar/NavBar';

function App() {
  

  return (
    <div>
      <NavBar></NavBar>
      <Routes>
        <Route exact path={Helpers.Landing} element={<Landing/>}/>
        <Route exact path="/" element={<Landing/>}/>
        <Route path="/home" element={<Home/>}/>

        {/* Ruta para manejar rutas no definidas */}
        <Route path={Helpers.AccessAccount} element={<AccessAccount/>} />

        {/* Cliente */}
        <Route path={Helpers.HomeCustomer} element={<Home/>}/>

        {/* Proveedor */}
        <Route path={Helpers.ProfileProveedorView} element={<ProfileProveedorView/>}/>

        {/* Administrador */}
      </Routes>
    </div>
  )
}

export default App
