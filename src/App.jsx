import { Routes, Route } from 'react-router-dom';
import Landing from './views/landing/Landing';
import Home from './views/home/Home';
import NotFound from './utils/notFound/NotFound';
import Helpers from './Helpers/RoutesFront';
import AccessAccount from './Views/AccessAccount/AccessAccount';
import ProfileProveedorView from './views/ProfileProveedorView/ProfileProveedorView';
import NavBar from './components/NavBar/NavBar';
import ReportsCustomerView from './Views/CustomerViews/ReportsCustomerView';
import ConnectionsCustomerView from './Views/CustomerViews/ConnectionsCustomerView';
import StatsProviderView from './Views/ProviderViews/StatsProviderView';
import ReportsProviderView from './Views/ProviderViews/ReportsProviderView';
import ConnectionsProviderView from './Views/ProviderViews/ConnectionsProviderView';

function App() {
  

  return (
    <div>
      <NavBar></NavBar>
      <Routes>
        <Route exact path={Helpers.Landing} element={<Landing/>}/>
        <Route path={Helpers.AccessAccount} element={<AccessAccount/>} />

        {/* Cliente */}
        <Route path={Helpers.HomeCustomerView} element={<Home/>}/>
        <Route path={Helpers.ConnectionsCustomerView} element={<ConnectionsCustomerView/>}/>
        <Route path={Helpers.ReportsCustomerView} element={<ReportsCustomerView/>}/>
        <Route path={Helpers.ProfileCustomerView} element={<Home/>}/>

        {/* Proveedor */}
        <Route path={Helpers.StatsProviderView} element={<StatsProviderView/>}/>
        <Route path={Helpers.ConnectionsProviderView} element={<ConnectionsProviderView/>}/>
        <Route path={Helpers.ReportsProviderView} element={<ReportsProviderView/>}/>
        <Route path={Helpers.ProfileProviderView} element={<ProfileProveedorView/>}/>


        {/* Administrador */}

        {/* Rutas No Especificada */}
        <Route path='*' element={<NotFound></NotFound>}/>
      </Routes>
    </div>
  )
}

export default App
