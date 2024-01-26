import { useSelector } from "react-redux";
import "./InteresProviderCard.style.css";
import { Link } from "react-router-dom";

function InteresProviderCard() {
  const infoUserLog = useSelector((state) => state.infoUserLog);

  const interests = infoUserLog.interests || [];

  // const handleDeleteClick = () => {
  //   // dispatch(handleDeleteService(item)); //* enviará un put para actualizar el estado global infoDetailProveedor
  // };
  const handleEditClick = () => {
    // dispatch(handleDeleteService(item)); //* enviará un put para actualizar el estado global infoDetailProveedor
  };

  return (
    <div className="container">
      <Link to={{ pathname: `/form/${4}` }}>
        <button src="editImage" alt="edit" className="edit-button">
          {" "}
          Edit
        </button>
      </Link>
      {interests.map((interest, index) => (
        <div key={index} className="skillsCont">
          {Object.entries(interest).map(([category, titles], categoryIndex) => (
            <div key={categoryIndex}>
              <h2 className="skillname">{category}</h2>
              <button
                onClick={() => handleEditClick(interest)}
                src="editImage"
                alt="edit"
                className="edit"
              />
              {titles.map((title, titleIndex) => (
                <div key={titleIndex}>
                  <div className="header">
                    <p>{`${title}`} </p>
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

export default InteresProviderCard;
