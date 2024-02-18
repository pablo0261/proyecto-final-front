import React, { useEffect, useState } from "react";
import style from "./UserEducation.module.sass";

function UserEducation(props) {
  const { infoUser } = props;
  const [education, setEducation] = useState([]);

  useEffect(() => {
    if (infoUser.categories.length !== 0) {
      const educationCategory = infoUser.categories.find(
        (category) => category.idCategorie === 2
      );
      if (educationCategory && educationCategory.categories_options.length !== 0) {
        const educationOptions = educationCategory.categories_options.map((option) => {
          const newEducation = {
            idOption: option.idOption,
            description: option.description,
            institution: option.institution,
            year: option.year,
            comment: option.comment,
          };

          return newEducation;
        });
        setEducation(educationOptions);
      }
    }
  }, [infoUser]);

  return (
    <div className={style.container}>
      <div className={style.titleContainer}>
        <p className={style.title}>Educación</p>
      </div>

      <div className={style.educationdetailContainer}>
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
                {/* <button
                    onClick={(event) =>
                      handleDeleteService(option.idOption, event)
                    }
                    className={style.crossButton}
                  ></button> */}
              </div>
              {index !== education.length - 1 && (
                <div>
                  <p className={style.line}></p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className={style.noInfo}>
            No hay información de educación disponible.
          </p>
        )}
      </div>
    </div>
  );
}

export default UserEducation;
