
import ProfileProvider from "../../components/ProfileComponents/ProfileProvider/ProfileProvider";
import ServicesProviderCard from '../../components/ProfileComponents/ServiceProviderCard/SeviceProviderCard';
import InteresProviderCard from '../../components/ProfileComponents/InteresProviderCard/InteresProviderCard';
import SkillsProviderCard from '../../components/ProfileComponents/SkillsProviderCard/SkillsProviderCard';
import ScheduleProviderCard from '../../components/ProfileComponents/ScheduleProviderCard/ScheduleProviderCard';
import EducationProvider from '../../components/ProfileComponents/EducationProvider/EducationProvider';
import ExperienciaProvider from '../../components/ProfileComponents/ExperienciaProvider/ExperienciaProvider';
import MapProviderCard from '../../components/ProfileComponents/MapProviderCard/MapProviderCard';
// import ReviewProviderCard from '../../components/ProfileComponents/ReviewProviderCard/ReviewProviderCard';
import ConectionProviderCard from '../../components/ProfileComponents/ConectionProviderCard/ConectionProviderCard';
import style from './ProfileProviderView.module.sass'

function ProfileProviderView() {

  return (
    <div className={style.wrapper}>
        <ProfileProvider />
        <ServicesProviderCard />
        <EducationProvider />
        <ExperienciaProvider />
        <SkillsProviderCard />
        <InteresProviderCard />
        <ScheduleProviderCard />
        <MapProviderCard />
        {/* <ReviewProviderCard /> */}
        <ConectionProviderCard />
    </div>
  );
}

export default ProfileProviderView;
