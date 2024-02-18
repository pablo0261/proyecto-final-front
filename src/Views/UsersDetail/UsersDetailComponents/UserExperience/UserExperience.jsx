import React, { useEffect, useState } from 'react'
import style from './UserExperience.module.sass'

function UserExperience(props) {

  const { infoUser } = props
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    if (infoUser.categories.length != 0) {
      const experiencesCategory = infoUser.categories.find((category) => category.idCategorie === 7)

      if (experiencesCategory.categories_options.length != 0) {
        const educationOptions = experiencesCategory.categories_options.map(
          (option) => {
            const newExperience = {
              idPeople: infoUserLog.idPeople,
              idOption: option.idOption,
              education: option.description || "No informado",
              institution: option.people_options[0].institution || "No informado",
              year: option.people_options[0]?.year || "No informado",
              comment: option.people_options[0]?.comment || "No informado"
            }
            return newExperience
          })
        setExperiences(educationOptions);
      }
    }
  }, []);

  return (
    <div className={style.background}>
      <div className={style.wrapper}>
        <p className={style.title}>Experiencias</p>
        <div className={style.infoWrapper}>
          {experiences.length > 0 ? (
            experiences.map((option, index) => (
              <div key={option.idOption}>
                <div className={style.educationdetailbox}>
                  <div className={style.infoContainerLeft}>
                    <h2 className={style.education}>{option.education}</h2>
                    <p className={style.detailInfo}>
                      {option.institution}
                      <br />
                      {option.year}
                    </p>
                  </div>
                  <div className={style.infoContainerRight}>
                    <p className={style.observationInfo}>{option.comment}</p>
                  </div>
                  <button
                    onClick={(event) =>
                      handleDeleteService(option.idOption, event)
                    }
                    className={style.crossButton}
                  ></button>
                </div>
                {index !== experiences.length - 1 && (
                  <div>
                    <p className={style.line}></p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className={style.noInfo}>
              No hay información de experiencia disponible.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserExperience