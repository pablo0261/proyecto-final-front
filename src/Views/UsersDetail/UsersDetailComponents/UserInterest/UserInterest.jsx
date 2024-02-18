import React, { useEffect, useState } from 'react'
import style from './UserInterest.module.sass'

function UserInterest(props) {

  const { infoUser } = props
  const [intereses, setIntereses] = useState([])

  useEffect(() => {
    if (infoUser && infoUser.categories && infoUser.categories.length > 0) {
      const interesCategory = infoUser.categories.find(category => category.idCategorie === 6);

      if (interesCategory && interesCategory.categories_options && interesCategory.categories_options.length > 0) {
        const interesOptions = interesCategory.categories_options;

        const interesData = interesOptions.map((option) => ({
          idOption: option.idOption,
          interes: option.description,
        }));
        setIntereses(interesData);
      }
    }
  }, [infoUser]);

  return (
    <div className={style.container}>
      <div className={style.titleContainer}>
        <p className={style.title}>Intereses</p>
          </div>

        <div className={style.containerCard}>
          {intereses.length > 0 ? (
            intereses.map((option) => (
              <div className={style.interesDetailContainer} key={option.idOption}>
                <div className={style.interesFalseButton}>{option.interes}</div>
              </div>
            ))
          ) : (
            <p className={style.noInfo}>No hay información de intereses disponible.</p>
          )}
        </div>
    </div>
  );
}

export default UserInterest