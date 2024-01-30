import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./EducationExperienciaProvider.module.sass";

function EducationExperienciaProvider() {
  const infoUserLog = useSelector((state) => state.infoUserLog);

  const skills = infoUserLog.skills || [];

  // const handleDeleteClick  = () => {
  //   //  dispatch(handleDeleteService(item)); //* enviará un put para actualizar el estado global infoDetailProveedor
  // };
  const handleEditClick = () => {
    //  dispatch(handleDeleteService(item)); //* enviará un put para actualizar el estado global infoDetailProveedor
  };

  return (
    <div className="container">
      <Link to={{ pathname: `/form/${3}` }}>
        <button src="editImage" alt="edit" className="edit-button">
          {" "}
          Edit
        </button>
      </Link>
      {skills.map((skill, index) => (
        <div key={index} className="skillsContainer">
          {Object.entries(skill).map(([category, titles], categoryIndex) => (
            <div key={categoryIndex}>
              <h2>{category}</h2>
              <button
                onClick={() => handleEditClick(skill)}
                src="editImage"
                alt="edit"
                className="edit"
              />
              {titles.map((title, titleIndex) => (
                <div key={titleIndex} className="userDetails">
                  <div className="user-header">
                    <h2 className="name">{`${title.title}`}</h2>
                    <p>{`${title.institution}`} </p>
                    <p>{`${title.startDate} - ${title.endDate}`} </p>
                  </div>
                  <div>
                    <p className="user-info">{`${title.description}`}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default EducationExperienciaProvider;
