
import ProfileProvider from "../../components/ProfileComponents/ProfileProvider/ProfileProvider";
import ServicesProviderCard from '../../components/ProfileComponents/ServiceProviderCard/SeviceProviderCard';
import InteresProviderCard from '../../components/ProfileComponents/InteresProvidercard/InteresProviderCard';
import SkillsProviderCard from '../../components/ProfileComponents/SkillsProviderCard/SkillsProviderCard';
import ScheduleProviderCard from '../../components/ProfileComponents/ScheduleProviderCard/ScheduleProviderCard';
import EducationExperienciaProvider from '../../components/ProfileComponents/EducationExperienciaProvider/EducationExperienciaProvider';
import MapProviderCard from '../../components/ProfileComponents/MapProviderCard/MapProviderCard';
import ReviewProviderCard from '../../components/ProfileComponents/ReviewProviderCard/ReviewProviderCard';
import ConectionProviderCard from '../../components/ProfileComponents/ConectionProviderCard/ConectionProviderCard';



function profile() {

 

  return (
    <div>
      <ProfileProvider/>
      <ServicesProviderCard/>
      <EducationExperienciaProvider/>
      <InteresProviderCard/>
      <SkillsProviderCard/>
      <ScheduleProviderCard/>
      <MapProviderCard/>
      <ReviewProviderCard/>
      <ConectionProviderCard/>
    </div>
  );
}

export default profile;
