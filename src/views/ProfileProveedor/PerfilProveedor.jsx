import React from "react";
import { useParams } from "react-router-dom";
import "./profile.style.css";

function profile() {
  const { id } = useParams();

  return (
    <div>
      <div>ProfileProveedorCard</div>
      <div>ServicesProveedorCard</div>
      <div>Education-ExperienciaProveedorCard</div>
      <div>Skils-InteresesProveedorCard</div>
      <div>ExtraInfo-DisponibilidadProveedorCard</div>
      <div>MapProveedorCard</div>
      <div>ReviewProveedorCard</div>
      <div>ConectionProveedorCard</div>
    </div>
  );
}

export default profile;
