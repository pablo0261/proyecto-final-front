import { Routes, Route, useLocation } from 'react-router-dom';
import Landing from './Views/Landing/Landing';
import Home from './views/home/Home';
import NotFound from './utils/notFound/NotFound';
import Helpers from './Helpers/RoutesFront';
import AccessAccount from './Views/AccessAccount/AccessAccount';
import ProfileProviderView from './views/ProfileProviderView/ProfileProviderView';
import NavBar from './components/NavBar/NavBar';
import ReportsCustomerView from './Views/CustomerViews/ReportsCustomerView';
import ConnectionsCustomerView from './Views/CustomerViews/ConnectionsCustomerView';
import StatsProviderView from './Views/ProviderViews/StatsProviderView';
import ReportsProviderView from './Views/ProviderViews/ReportsProviderView';
import ConnectionsProviderView from './Views/ProviderViews/ConnectionsProviderView';
import { useDispatch, useSelector } from 'react-redux';
import Form from './components/Form/Form';
import Footer from './components/Footer/Footer';
import { useEffect } from 'react';
import StoreItem from './Helpers/LocalStorage';
import { recoverUserLoggedData } from './redux/actions';

function App() {

  const dispatch = useDispatch()

  useEffect(()=>{
    
    if (localStorage.getItem(StoreItem.emailUserLogged)) {
      dispatch(recoverUserLoggedData(localStorage.getItem(StoreItem.emailUserLogged)) )
    }
  },[])

  const userLoggedInfo = useSelector(state => state.infoUserLog)

  return (
    <div>
      {
        userLoggedInfo.idPeople != null ?
          <div>
            <NavBar></NavBar>
            <Routes>
              {/* Cliente */}
              <Route path={Helpers.HomeCustomerView} element={<Home />} />
              <Route path={Helpers.ConnectionsCustomerView} element={<ConnectionsCustomerView />} />
              <Route path={Helpers.ReportsCustomerView} element={<ReportsCustomerView />} />
              <Route path={Helpers.ProfileCustomerView} element={<Home />} />

              {/* Proveedor */}
              <Route path={Helpers.StatsProviderView} element={<StatsProviderView />} />
              <Route path={Helpers.ConnectionsProviderView} element={<ConnectionsProviderView />} />
              <Route path={Helpers.ReportsProviderView} element={<ReportsProviderView />} />
              <Route path={Helpers.ProfileProviderView} element={<ProfileProviderView />} />
              <Route path={Helpers.Form} element={<Form />} />

              {/* Administrador */}

              {/* Rutas No Especificada */}
              <Route path='*' element={<NotFound />}></Route>
            </Routes>
            <Footer/>
          </div>
          :
          <div>
            <NavBar></NavBar>
            <Routes>
              <Route exact path={Helpers.Landing} element={<Landing />} />
              <Route path={Helpers.AccessAccount} element={<AccessAccount />} />

              <Route path='*' element={<NotFound />}></Route>
            </Routes>
            <Footer/>
          </div>
      }

    </div>
  )
}

export default App
