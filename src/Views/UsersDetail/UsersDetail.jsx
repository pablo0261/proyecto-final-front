import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import style from './UsersDetail.module.sass'
import UserServices from './UsersDetailComponents/UserServices/UserServices';
import UserPersonal from './UsersDetailComponents/UserPersonal/UserPersonal';
import ConectionProviderCard from '../../components/ProfileComponents/ConectionProviderCard/ConectionProviderCard';
import UserEducation from './UsersDetailComponents/UserEducation/UserEducation';
import UserExperience from './UsersDetailComponents/UserExperience/UserExperience';
import UserSkills from './UsersDetailComponents/UserSkills/UserSkills';
import UserSchedule from './UsersDetailComponents/UserSchedule/UserSchedule';
import UserMap from './UsersDetailComponents/UserMap/UserMap';
import UserInterest from './UsersDetailComponents/UserInterest/UserInterest';
import UserComments from './UsersDetailComponents/UserComments/UserComments'
import Swal from 'sweetalert2';

function UsersDetail() {

  const { id } = useParams()
  const { idOpportunitie } = useSelector(state => state.selected_opportunitie)
  const infoUserLog = useSelector(state => state.infoUserLog)
  const [infoUser, setInfoUser] = useState()
  const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const getInfoProvider = async () => {
      try {
        const response = await axios.get(`${REACT_APP_API_URL}/people?idPeople=${id}`)
        if (response.status === 200) {
          setInfoUser(response.data.people.data[0].people)
        }
      } catch (error) {
        Swal.fire({
          title: `${error}`,
          text: "Error getInfoProvider",
          icon: 'warning',
          confirmButtonText: 'Aceptar'
        });
      }
    }

    getInfoProvider()
  }, [])
  
  if (infoUser) {
    return (
      <div className={style.wrapper}>
        <UserPersonal infoUser={infoUser} />
        {infoUserLog.typeOfPerson === 'customer' && <UserServices infoUser={infoUser} infoUserLog={infoUserLog} idOpportunitie={idOpportunitie} />}
        <UserEducation infoUser={infoUser} />
        <UserExperience infoUser={infoUser} />
        <UserSkills infoUser={infoUser} />
        <UserInterest infoUser={infoUser}/>
        <UserSchedule infoUser={infoUser} />
        <UserMap infoUser={infoUser} />
        <UserComments infoUser={infoUser}/>
        {infoUserLog.typeOfPerson === 'customer' && <ConectionProviderCard infoUser={infoUser}/>}
      </div>
    )
  }
}

export default UsersDetail