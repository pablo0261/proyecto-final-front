import axios from "axios";
import { useEffect, useRef } from "react";
import style from "./UploadWidget.module.sass";
import { useDispatch } from "react-redux";
import { putUserData } from "../../redux/actions";
const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
import Swal from "sweetalert2";



const UploadWidget = ({ setPublicId, user }) => {

  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const imageUrlRef = useRef(null);
  const dispatch = useDispatch()

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {// revisar https://demo.cloudinary.com/uw/#/ para cambiar las paletas de colores o otras cosas
        cloudName: 'dn3kedyer',
        uploadPreset: 'p7bxy5ug',
        // cropping: true, //add a cropping step
        // showAdvancedOptions: true,  //add advanced options (public_id and tag)
        sources: ["local", "url"], // restrict the upload sources to URL and local files
        styles: {
          palette: {
            window: "#FFFFFF",
            windowBorder: "#A64208",
            tabIcon: "#730707",
            menuIcons: "#730707",
            textDark: "#260303",
            textLight: "#FFFFFF",
            link: "#730707",
            action: "#A64208",
            inactiveTabIcon: "#808080",
            error: "#D95555",
            inProgress: "#A64208",
            complete: "#22B573",
            sourceBg: "#FFFFFF"
          },
          fonts: {
            default: null,
            "sans-serif": {
              url: null,
              active: true
            }
          }
        }
      },
      async function (error, result) {
        if (!error && result && result.event === "success") {
          const imageUrl = result.info.url;
          const newImage =  {
            idPeople: user,
            image: imageUrl
          }
          try {
            await dispatch(putUserData(newImage))
            setPublicId(imageUrl);
          } catch (error) {
            Swal.fire({
              title: `${error}`,
              icon: 'error',
              // showDenyButton: true,
              // denyButtonText: 'Cancelar',
              // confirmButtonText: 'Aceptar',
              // ConfirmButtonColor: "green",
            })
          } 
        }
      }
    );
  }, []);
  return (
    <div >
      <button className={style.editButton} onClick={() => widgetRef.current.open()}></button>
    </div>
  );
};

export default UploadWidget;
