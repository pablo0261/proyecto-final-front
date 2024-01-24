
import ProfileProveedor from '../../../components/ProfileComponents/ProfileProveedor/ProfileProveedor';
import ServicesProveedorCard from '../components/ProfileComponents/ServiceProveedorCard/SeviceproveedorCard';
import EducationExperienciaProveedorCard from '../components/ProfileComponents/EducationExperienciaProveedorCard/EducationExperienciaProveedorCard';
import SkilsInteresesProveedorCard from '../components/ProfileComponents/SkilsInteresesProveedorCard/SkilsInteresesProveedorCard';
import ExtraInfoDisponibilidadProveedorCard from '../components/ProfileComponents/ExtraInfoDisponibilidadProveedorCard/ExtraInfoDisponibilidadProveedorCard';
import MapProveedorCard from '../components/ProfileComponents/MapProveedorCard/MapProveedorCard';
import ReviewProveedorCard from '../components/ProfileComponents/ReviewProveedorCard/ReviewProveedorCard';
import ConectionProveedorCard from '../components/ProfileComponents/ConectionProveedorCard/ConectionProveedorCard';



function profile() {

 

  return (
    <div>
      <div><ProfileProveedor/></div>
      <div><ServicesProveedorCard/></div>
      <div><EducationExperienciaProveedorCard/></div>
      <div><SkilsInteresesProveedorCard/></div>
      <div><ExtraInfoDisponibilidadProveedorCard/></div>
      <div><MapProveedorCard/></div>
      <div><ReviewProveedorCard/></div>
      <div><ConectionProveedorCard/></div>
    </div>
  );
}

export default profile;
