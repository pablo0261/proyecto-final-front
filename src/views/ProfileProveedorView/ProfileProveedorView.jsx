
import ProfileProveedor from "../../components/ProfileComponents/ProfileProveedor/ProfileProveedor";
import ServicesProveedorCard from '../../components/ProfileComponents/ServiceProveedorCard/SeviceProveedorCard';
import InteresProveedorCard from '../../components/ProfileComponents/InteresProveedorcard/InteresProveedorCard';
import EducationExperienciaProveedor from '../../components/ProfileComponents/EducationExperienciaProveedor/EducationExperienciaProveedor';
import MapProveedorCard from '../../components/ProfileComponents/MapProveedorCard/MapProveedorCard';
import ReviewProveedorCard from '../../components/ProfileComponents/ReviewProveedorCard/ReviewProveedorCard';
import ConectionProveedorCard from '../../components/ProfileComponents/ConectionProveedorCard/ConectionProveedorCard';



function profile() {

 

  return (
    <div>
      <ProfileProveedor/>
      <ServicesProveedorCard/>
      <EducationExperienciaProveedor/>
      <InteresProveedorCard/>
      <MapProveedorCard/>
      <ReviewProveedorCard/>
      <ConectionProveedorCard/>
    </div>
  );
}

export default profile;
