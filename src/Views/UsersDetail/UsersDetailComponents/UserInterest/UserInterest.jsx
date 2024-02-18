import React, { useEffect, useState } from 'react'
import style from './UserInterest.module.sass'

function UserInterest(props) {

  const { infoUser } = props
  const [intereses, setIntereses] = useState([])

  useEffect(() => {
    if (infoUser.categories.length != 0) {
      const interests = infoUser.categories.find(category => category.idCategorie === 6);

      if (interests.categories_options.length != 0) {
        const interestOptions = interests.categories_options.interesOptions.map(
          (option) => {
            const newInterest = {
              idOption: option.idOption,
              interes: option.description
            }

            return newInterest
          })
        setIntereses(interestOptions)
      }
    }
  }, []);

  return (
    <div className={style.background}>
      <div className={style.wrapper}>
        <p className={style.title}>Intereses</p>
        <div className={style.infoWrapper}>
          {intereses.length > 0 ? (
            intereses.map((option) => (
              <div className={style.interesDetailContainer} key={option.idOption}>
                <div className={style.interes}>{option.interes}</div>
              </div>
            ))
          ) : (
            <p className={style.noInfo}>No hay información de intereses disponible.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserInterest