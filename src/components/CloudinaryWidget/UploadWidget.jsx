import axios from "axios";
import { useEffect, useRef } from "react";
const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;



const UploadWidget = ({setPublicId, user}) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const imageUrlRef = useRef(null);

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {// revisar https://demo.cloudinary.com/uw/#/ para cambiar las paletas de colores o otras cosas
        cloudName: 'dn3kedyer',
        uploadPreset: 'p7bxy5ug',
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
            }},
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          // console.log("Imagen subida a Cloudinary:", result.info.url);
          const imageUrl = result.info.url;
          setPublicId(imageUrl);
          axios.put(`${REACT_APP_API_URL}/people`, {
            "idPeople": user,
            "image" : imageUrl
            })
        }
      }
    );
  }, []);
  return (
    <div>
        <button onClick={() => widgetRef.current.open()}>Subir imagen</button>
    </div>
  );
};

export default UploadWidget;
