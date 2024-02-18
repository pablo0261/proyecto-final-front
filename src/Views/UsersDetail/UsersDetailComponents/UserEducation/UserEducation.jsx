import React, { useEffect, useState } from 'react'
import style from './UserEducation.module.sass'

function UserEducation(props) {

  const { infoUser } = props
  console.log(infoUser)
  const [education, setEducation] = useState([]);

  useEffect(() => {
    if (infoUser.categories.length != 0) {
      const education = infoUser.categories[1]
      if (education.categories_options.length != 0) {
        const educationOption = education.categories_options.map(
          (option) => {
            const newEducation = {
              idOption: option.idOption,
              description: option.description
            }

            return newEducation
          }
        )
        setEducation(educationOption)
      }
    }
  }, []);

  return (
    <div className={style.background}>
      <div className={style.wrapper}>
        <p className={style.title}>Educación</p>
        <div className={style.infoWrapper}>
          {education.length > 0 ? (
            education.map((option, index) => (
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
                {index !== education.length - 1 && (
                  <div>
                    <p className={style.line}></p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className={style.noInfo}>No hay información de educación disponible.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserEducation