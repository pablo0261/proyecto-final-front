import { Routes, Route, useNavigate } from 'react-router-dom';
import Landing from './Views/Landing/Landing';
import Home from './Views/Home/Home';
import NotFound from './utils/notFound/NotFound';
import Helpers from './Helpers/RoutesFront';
import AccessAccount from './Views/AccessAccount/AccessAccount';
import NavBar from './components/NavBar/NavBar';
import ProfileProviderView from './Views/ProfileProviderView/ProfileProviderView';
import ReportsCustomerView from './Views/CustomerViews/ReportsCustomerView';
import ConnectionsCustomerView from './Views/CustomerViews/ConnectionsCustomerView';
import StatsProviderView from './Views/ProviderViews/StatsProviderView';
import ReportsProviderView from './Views/ProviderViews/ReportsProviderView';
import ConnectionsProviderView from './Views/ProviderViews/ConnectionsProviderView';
import Success from './Views/Success/Success';
import Failure from './Views/Failure/Failure';
import Assistance from './Views/Assistance/Assistance';
import AdminUsersView from './Views/AdminUsersView/AdminUsersView';
import FAQs from './Views/FAQs/FAQs';
import ConsultReport from './Views/ConsultReport/ConsultReport'
import { useDispatch, useSelector } from 'react-redux';
import Footer from './components/Footer/Footer';
import { useEffect } from 'react';
import StoreItem from './Helpers/LocalStorage';
import { addInfoUserLog, getFiltersOrdersDB, recoverUserLoggedData } from './redux/actions';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import ProviderDetail from './Views/CustomerViews/ProviderDetail';


function App() {

  const dispatch = useDispatch()
  const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate()
  const userLoggedInfo = useSelector(state => state.infoUserLog)

  useEffect(() => {
    dispatch(getFiltersOrdersDB());

    if (localStorage.getItem(StoreItem.emailUserLogged)) {
      dispatch(recoverUserLoggedData(localStorage.getItem(StoreItem.emailUserLogged)))
    }
  }, [])

  // GOOGLE AUTH
  const handleCallbackResponse = async (response) => {
    const userObject = jwtDecode(response.credential)
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/people?email=${userObject.email}`
      );
      if (response.data.people.count > 0) {
        const user = response.data.people.data[0].people
        localStorage.setItem(StoreItem.emailUserLogged, userObject.email);

        dispatch(addInfoUserLog(user))

        if (user.typeOfPerson === 'admin') {
          navigate(Helpers.StatsProviderView)
        } else if (user.typeOfPerson === 'provider') {
          navigate(Helpers.StatsProviderView)
        } else {
          navigate(Helpers.HomeCustomerView)
        }
      }
      if (response.data.people.count === 0) {
        window.alert("Usuario no existe.")
      }
    } catch (error) {
      window.alert(error);
    }
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: "554332329432-0b6a0dh2ihgrkj5obs34lmnngpfvrq4j.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })

    if (!localStorage.getItem(StoreItem.emailUserLogged)) {
      google.accounts.id.prompt();
    }
  }, [])

  return (
    <div>
      {
        userLoggedInfo.idPeople != null ?
          <div>
            <NavBar></NavBar>
            {
              userLoggedInfo.typeOfPerson === 'customer' &&
              <Routes>
                {/* Cliente */}
                <Route path={Helpers.HomeCustomerView} element={<Home />} />
                <Route path={Helpers.ConnectionsCustomerView} element={<ConnectionsCustomerView />} />
                <Route path={Helpers.ReportsCustomerView} element={<ReportsCustomerView />} />
                <Route path={Helpers.ProfileCustomerView} element={<ProfileProviderView />} />
                <Route path={Helpers.ProviderDetail} element={<ProviderDetail/>}></Route>
                <Route path={Helpers.AdminUsersView} element={<AdminUsersView />} />

                <Route path='*' element={<NotFound />}></Route>
              </Routes>
            }
            {
              userLoggedInfo.typeOfPerson === 'provider' &&
              <Routes>
                {/* Enrutador de MercadoPago */}
                <Route path={Helpers.Success} element={<Success />} />
                <Route path={Helpers.Failure} element={<Failure />} />
                {/* Proveedor */}
                <Route path={Helpers.ProfileProviderView} element={<ProfileProviderView />} />
                <Route path={Helpers.StatsProviderView} element={<StatsProviderView />} />
                <Route path={Helpers.ConnectionsProviderView} element={<ConnectionsProviderView />} />
                <Route path={Helpers.ReportsProviderView} element={<ReportsProviderView />} />

                <Route path={Helpers.FAQs} element={<FAQs />} />
                <Route path={Helpers.ConsultReport} element={<ConsultReport />} />

                <Route path='*' element={<NotFound />}></Route>
              </Routes>
            }
            {
              userLoggedInfo.typeOfPerson === 'administrator' &&
              <Routes>
                <Route path={Helpers.FAQs} element={<FAQs />} />
                <Route path={Helpers.ConsultReport} element={<ConsultReport />} />
              </Routes>
            }
            <Footer />
          </div>
          :
          <div>
            <NavBar></NavBar>
            <Routes>
              <Route exact path={Helpers.Landing} element={<Landing />} />
              <Route path={Helpers.AccessAccount} element={<AccessAccount />} />
              <Route path={Helpers.FAQs} element={<FAQs />} />
              <Route path={Helpers.ConsultReport} element={<ConsultReport />} />

              <Route path='*' element={<NotFound />} />

            </Routes>
            <Footer />
          </div>
      }

    </div>
  )
}

export default App
