import style from "./Message.module.sass";

function MessageToShowProvider() {
  return (
    <div className={style.introQuote}>
      <div className={style.quoteIcon}></div>
      <div className={style.quoteBox}>
        <p className={style.quote}>
          {" "}
          "Desde que me uní a la plataforma, he experimentado un aumento notable en la demanda de mis servicios. Su enfoque centrado en el usuario y su apoyo continuo han contribuido significativamente a mi desarrollo profesional."
        </p>
        <div className={style.profileBox}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqwmMLrbd94gDp84-OiQNwmbBon7ZnSazr9ZfTKcWMN_KYNMwY_ptQqJ_6zaunkubQqR8&usqp=CAU"
            alt=""
            className={style.profileImg}
          />
          <p className={style.profileName}>
            Claudia Beatriz Gonzales <span>(Cliente)</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default MessageToShowProvider;
