import { Routes, Route } from 'react-router-dom';
import Landing from './views/landing/Landing';
import Home from './views/home/Home';
// import NotFound from './utils/notFound/NotFound';
import './App.css'
import Helpers from './Helpers/RoutesFront';
import AccessAccount from './Views/AccessAccount/AccessAccount';
import ProfileProveedor from './components/ProfileComponents/ProfileProveedor/profileproveedor';
import ServicesProveedorCard from './components/ProfileComponents/ServiceProveedorCard/SeviceproveedorCard';

function App() {
  

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Landing/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/profileProveedor" element={<ProfileProveedor/>}/>
        <Route path="/ServicesProveedorCard" element={<ServicesProveedorCard/>}/>

        {/* Ruta para manejar rutas no definidas */}
        <Route path={Helpers.AccessAccount} element={<AccessAccount/>} />
      </Routes>
    </>
  )
}

export default App
