import { useSelector } from "react-redux";
import { useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import style from './ProfileProvider.module.sass';
import Form from "../../Form/FormProfileProvider/Form"
import defaultImage from '../../../assets/Icons/PerfilImage.png';
import CloudinaryUploadWidget from "../../CloudinaryWidget/CloudinaryWidget";


function ProfileProvider() {
  const infoUserLog = useSelector((state) => state.infoUserLog);
  const formData = {
    fullName: infoUserLog.fullName || "Diego Lepore",
    age: infoUserLog.age || "43",
    address: infoUserLog.address || "Emilio Rosas 3057",
    location: infoUserLog.locationName || "Bahia Blanca",
    province: infoUserLog.provinceName || "Buenos Aires",
    state: infoUserLog.state || "Activo",
    country: infoUserLog.country || "Argentina",
    profesion: infoUserLog.profession || "Enfermero",
    aboutMe: infoUserLog.aboutMe || "Predispuesto y Dedicado",
    phone: infoUserLog.phone || "02918145869",
    email: infoUserLog.email || "diegolepore@gmail.com",
    averageRating: infoUserLog.averageRating || "4.9",
    countRating: infoUserLog.countRating.toString() || "127",
  };

  const isAllInfoFilled = Object.values(formData).every(
    (value) => value.length > 0
  );

  const Verification = isAllInfoFilled

  const [showForm, setShowForm] = useState(false)


  const handleShowForm = () => {
    setShowForm(!showForm)
  }

//? DESDE AQUI ESTOY USANDO CLOUDINARY CON WIDGETS
  const [publicId, setPublicId] = useState("");
  const [cloudName] = useState("dn3kedyer");  // es el del user de cloudinary
  const [uploadPreset] = useState("p7bxy5ug");  // aqui va en el segundo atributo el nombre del preset de las imagenes
  //   https://cloudinary.com/documentation/upload_widget_reference

  const [uwConfig] = useState({ // revisar https://demo.cloudinary.com/uw/#/ para cambiar las paletas de colores o otras cosas
    cloudName,
    uploadPreset,
    // cropping: true, //add a cropping step
    // showAdvancedOptions: true,  //add advanced options (public_id and tag)
    sources: [ "local", "url"], // restrict the upload sources to URL and local files
    // multiple: false,  //restrict upload to a single file
    // folder: "user_images", //upload files to the specified folder
    // tags: ["users", "profile"], //add the given tags to the uploaded files
    // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
    // clientAllowedFormats: ["images"], //restrict uploading to image files only
    // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
    // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
    // theme: "purple", //change to a purple theme
    styles: { 
      palette: {
          window: "#464040",
          sourceBg: "#292222",
          windowBorder: "#c7a49f",
          tabIcon: "#2500EA",
          inactiveTabIcon: "#E8D5BB",
          menuIcons: "#ebe5db",
          link: "#54492F",
          action: "#ffcc00",
          inProgress: "#99cccc",
          complete: "#78b3b4",
          error: "#ff6666",
          textDark: "#4C2F1A",
          textLight: "#D8CFCF"
      }}
  });

  // Create a Cloudinary instance and set your cloud name.
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  const myImage = cld.image(publicId);

  return (

    <div className={style.background}>
      <div className={style.wrapper}>
        <div className={style.alertWrapper}>
          {
            !Verification /* && isProvider */ &&
            <div className={style.verificationAlert}>
              <p className={style.textAlert}>Completa tu perfil para poder verificar tu cuenta. Ten en cuenta que los perfiles no verificados no son mostrados a los clientes.</p>
            </div>
          }
        </div>
        <div className={style.perfilWrapper}>
          <div className={style.imageWrapper}>
            <div className={formData.state === 'Active' ? style.stateActive : style.stateInactive}>{formData.state}</div>
                <AdvancedImage
                  className={style.image}
                  cldImg={myImage}
                  plugins={[responsive(), placeholder()]}
                />
            {/* <img className={style.image}  src={defaultImage} alt="Imagen" /> */}
              <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} />
            {/* //? ESTO ES UNA SEPARACION DE CODIGO  */}
            {/* <div className="CLOUDINARY">
              <div style={{ width: "800px" }}>
                <AdvancedImage
                  style={{ maxWidth: "100%" }}
                  cldImg={myImage}
                  plugins={[responsive(), placeholder()]}
                />
              </div>
            </div> */}
            {/* //?  Aqui termina la separacion  */}
            <div className={style.valoration}>
              <div className={style.starIcon}></div>
              <p className={style.textStar}>{formData.averageRating} ({formData.countRating})</p>
            </div>
          </div>
          <div className={style.infoWrapper}>
            <div className={style.nameWrapper}>
              <p className={style.textName}>{formData.fullName}</p>
              <div className={Verification ? style.iconVerified : style.iconNotVerified}></div>
              {
                Verification ? <p className={style.textVerified}>Cuenta Verificada</p> : <p className={style.textNotVerified}>Cuenta No Verificada</p>
              }
              <button onClick={() => handleShowForm()} className={style.editButton}></button>
            </div>
            <p className={style.textData}>{formData.age} años | {formData.address}, {formData.location}, {formData.province}, {formData.country}</p>
            <p className={style.textOcupation}>{formData.profesion}</p>
            <p className={style.textDetail}>{formData.aboutMe}</p>
            <div className={style.contacts}>
              <p className={style.textContact}>Contactos: </p>
              <div className={style.iconEmail}></div>
              { /* isProvider && */ <p className={style.textEmail}>{formData.email}</p>}
              <div className={style.iconPhone}></div>
              { /* isProvider && */ <p className={style.textPhone}>{formData.phone}</p>}
            </div>
          </div>
        </div>
      </div>
      {showForm && <Form handleShowForm={handleShowForm} />}
    </div>

  );
}
export default ProfileProvider;
