import style from "./Message.module.sass"

function MessageToShow() {
  
  return (
    <div className={style.introQuote}>
    <div className={style.quoteIcon}></div>
    <div className={style.quoteBox}>
        <p className={style.quote}> "El servicio del proveedor fue excelente, especialmente porque personalizan la atención para satisfacer las necesidades individuales de cada cliente. Recomiendo mucho la página."</p>
        <div className={style.profileBox}>
            <img src="https://res.cloudinary.com/dn3kedyer/image/upload/v1707141615/image/g08drlndxzjhmpbtxbdw.png" alt="" className={style.profileImg} />
            <p className={style.profileName}>Claudia Beatriz Gonzales <span>(Cliente)</span></p>
        </div>
    </div>
</div>
  );
}

export default MessageToShow;
