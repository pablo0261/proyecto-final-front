import React, { useEffect, useState } from 'react'
import style from './ProviderDetail.module.sass'
import ProviderPersonal from './ProviderDetailComponents/ProviderPersonal/ProviderPersonal'
import ProviderServices from './ProviderDetailComponents/ProviderServices/ProviderServices'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'

function ProviderDetail() {

  const { id } = useParams()
  const { idOpportunitie } = useSelector(state => state.selected_opportunitie)
  const infoUserLog = useSelector(state => state.infoUserLog)
  const [ infoProvider, setInfoProvider] = useState()
  const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const getInfoProvider = async () => {
      try {
        const response = await axios.get(`${REACT_APP_API_URL}/people?idPeople=${id}`)
        if (response.status === 200) {
          setInfoProvider(response.data.people.data[0].people)
        }
      } catch (error) {
        window.alert(error)
      }
    }

    getInfoProvider()
  }, [])

  if (infoProvider) {
    return (
      <div className={style.wrapper}>
        <ProviderPersonal infoProvider={infoProvider}/>
        { infoUserLog.typeOfPerson === 'customer' && <ProviderServices infoProvider={infoProvider} infoUserLog={infoUserLog} idOpportunitie={idOpportunitie}/> }
        {/* <EducationProvider />
          <InteresProviderCard />
          <SkillsProviderCard />
          <ScheduleProviderCard />
          <MapProviderCard />
          <ReviewProviderCard />
          <ConectionProviderCard /> */}
      </div>
    )
  }
}

export default ProviderDetail