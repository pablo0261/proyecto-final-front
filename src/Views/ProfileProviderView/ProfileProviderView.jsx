
import { useSelector } from "react-redux";
import ProfileProvider from "../../components/ProfileComponents/ProfileProvider/ProfileProvider";
import ServicesProviderCard from '../../components/ProfileComponents/ServiceProviderCard/SeviceProviderCard';
import InteresProviderCard from '../../components/ProfileComponents/InteresProviderCard/InteresProviderCard';
import SkillsProviderCard from '../../components/ProfileComponents/SkillsProviderCard/SkillsProviderCard';
import ScheduleProviderCard from '../../components/ProfileComponents/ScheduleProviderCard/ScheduleProviderCard';
import EducationProvider from '../../components/ProfileComponents/EducationProvider/EducationProvider';
import ExperienciaProvider from '../../components/ProfileComponents/ExperienciaProvider/ExperienciaProvider';
import MapProviderCard from '../../components/ProfileComponents/MapProviderCard/MapProviderCard';
import ReviewProviderCard from "../../components/ProfileComponents/ReviewProviderCard/ReviewProviderCard";
import style from './ProfileProviderView.module.sass'


function ProfileProviderView() {
  const infoUserLog = useSelector((state) => state.infoUserLog);


  return (
    <div className={style.wrapper}>
        <ProfileProvider />
        {infoUserLog.typeOfPerson === "provider" && <ServicesProviderCard />}
        <EducationProvider />
        {infoUserLog.typeOfPerson === "provider" && <ExperienciaProvider />}
        <SkillsProviderCard />
        <InteresProviderCard />
        {infoUserLog.typeOfPerson === "provider" && <ScheduleProviderCard />}
        <MapProviderCard />
        <ReviewProviderCard />
    </div>
  );
}

export default ProfileProviderView;
