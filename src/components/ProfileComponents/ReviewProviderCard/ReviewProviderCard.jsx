import { useSelector } from "react-redux";
import "./ReviewProviderCard.style.css";

function ReviewProviderCard() {
  const infoUserLog = useSelector((state) => state.infoUserLog);

  const promedioPuntuacion = infoUserLog.promedioPuntuacion || 0;
  const avaliation = infoUserLog.avaliation || [];

  return (
    <div className="containerValoration">
      <div className="averageRating">
        <img src="estrella" alt="Estrella" className="star" />
        <h2>{promedioPuntuacion}</h2>
        <p>Promedio Puntuación</p>
      </div>
      <div className="clientCardsValoration">
        {avaliation.map((avaliation, index) => (
          <div key={index} className="clientCardValoration">
            <img className="clientImageValoration" src={avaliation.imageId} alt="Imagen" />
            <div className="clientInfoValoration">
              <div className="clientNameValoration">
                <h2>{avaliation.name}</h2>
                <p>{`${avaliation.state} - ${avaliation.country}`}</p>
              </div>
              <div className="clientServicesValoration">
                <p>{avaliation.service.name}</p>
              </div>
              <div className="clientRatingValoration">
                <img src="Estrella" alt="Estrella" className="star" />
                <p>{avaliation.valoration}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewProviderCard;
