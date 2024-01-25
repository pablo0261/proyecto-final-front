import { useSelector } from "react-redux";
import "./SkillsProveedorCard.style.css";

function SkillsProveedorCard() {
  const infoUserLog = useSelector((state) => state.infoUserLog);

  const extras = infoUserLog.extras || [];

 
  const handleEditClick = () => {
    // dispatch(handleDeleteService(selectedInterest));
    // Este código está comentado ya que handleEditClick no está definido en el código proporcionado.
  };

  return (
    <div className="container">
      {extras.map((interest, index) => (
        <div key={index} className="skillsCont">
          <h2 className="skillname">{interest}</h2>
          <button
            onClick={() => handleEditClick(interest)}
            src="editImage"
            alt="edit"
            className="edit"
          >
            ✓
          </button>
        </div>
      ))}
    </div>
  );
}

export default SkillsProveedorCard;
