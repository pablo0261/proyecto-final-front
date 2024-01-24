import { useSelector} from "react-redux";

function ProfileProveedor() {
  
  const infoDetailProveedor = useSelector((state) => state.infoDetailProveedor);
  
  const {
    Verification,
    imageId,
    valoracion,
    edad,
    calle,
    localidad,
    provincia,
    pais,
    profesion,
    descripcion,
    telefono,
    sobre,
  } = infoDetailProveedor;
  
  const accountVerificationMessage = Verification
  ? "Cuenta Verificada"
  : "Cuenta no Verificada";
  
 
  
  return (
    <div>
      <div>{accountVerificationMessage}</div>
      <div>
        <div>
          <img src={imageId} alt="Imagen" />
          <img src="Estrella" alt="Estrella" />
          <p>{valoracion}</p>
        </div>
        <div>
          <div>
            <h2>Claudia</h2>
            <img src="ImagenVerificado" alt="Imagen Verificado" />
            <p>{accountVerificationMessage}</p>
          </div>
          <p>
            {edad}
            {calle}
            {localidad}
            {provincia}
            {pais}
          </p>
        </div>
        <div>
          <h3>{profesion}</h3>
          <p>{descripcion}</p>
          <div>
            <p>Contactos :</p>
            <img src={telefono} alt="Teléfono" />
            <img src={sobre} alt="Sobre" />
          </div>
        </div>
      </div>
      <img  src="editImage" alt="edit" />
    </div>
  );
  }
  export default ProfileProveedor;