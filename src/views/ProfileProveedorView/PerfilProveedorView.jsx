
import ProfileProveedor from "../../components/ProfileComponents/ProfileProveedor/ProfileProveedor";
import ServicesProveedorCard from '../../components/ProfileComponents/ServiceProveedorCard/SeviceProveedorCard';
import EducationExperienciaProveedorCard from '../../components/ProfileComponents/EducationExperienciaProveedorCard/EducationExperienciaProveedorCard';
import InteresProveedorCard from '../../components/ProfileComponents/InteresProveedorcard/InteresProveedorCard';
import SkilsInteresesProveedorCard from '../../components/ProfileComponents/SkilsInteresesProveedorCard/SkilsInteresesProveedorCard';
import ExtraInfoDisponibilidadProveedorCard from '../../components/ProfileComponents/ExtraInfoDisponibilidadProveedorCard/ExtraInfoDisponibilidadProveedorCard';
import MapProveedorCard from '../../components/ProfileComponents/MapProveedorCard/MapProveedorCard';
import ReviewProveedorCard from '../../components/ProfileComponents/ReviewProveedorCard/ReviewProveedorCard';
import ConectionProveedorCard from '../../components/ProfileComponents/ConectionProveedorCard/ConectionProveedorCard';



function profile() {

 

  return (
    <div>
      <ProfileProveedor/>
      <ServicesProveedorCard/>
      <EducationExperienciaProveedorCard/>
      <SkilsInteresesProveedorCard/>
      <InteresProveedorCard/>
      <ExtraInfoDisponibilidadProveedorCard/>
      <MapProveedorCard/>
      <ReviewProveedorCard/>
      <ConectionProveedorCard/>
    </div>
  );
}

export default profile;
