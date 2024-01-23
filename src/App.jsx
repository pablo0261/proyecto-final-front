import { Routes, Route } from 'react-router-dom';
import Landing from './views/landing/Landing';
import Home from './views/home/Home';
import NotFound from './utils/notFound/NotFound';
import './App.css'
import Helpers from './Helpers/RoutesFront';
import AccessAccount from './Views/AccessAccount/AccessAccount';

function App() {
  

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Landing/>}/>
        <Route path="/home" element={<Home/>}/>

        {/* Ruta para manejar rutas no definidas */}
        <Route path={Helpers.AccessAccount} element={<AccessAccount/>} />
      </Routes>
    </>
  )
}

export default App
