import React, { useEffect, useState } from "react";
import style from "./UserEducation.module.sass";

function UserEducation(props) {
  const { infoUser } = props;
  const [education, setEducation] = useState([]);

  useEffect(() => {
    if (infoUser.categories && infoUser.categories.length > 0) {
      const educationCategory = infoUser.categories.find(
        (category) => category.idCategorie === 2
      );
      if (
        educationCategory &&
        educationCategory.categories_options &&
        educationCategory.categories_options.length > 0
      ) {
        const educationOptions = educationCategory.categories_options;

        if (educationOptions) {
          const educationData = educationOptions.map((option) => ({
            idPeople: infoUser.idPeople,
            idOption: option.idOption,
            education: option.description,
            institution: option.people_options[0].institution,
            year: option.people_options[0]?.year,
            comment: option.people_options[0]?.comment,
          }));

          setEducation(educationData);
        }
      }
    }
  }, [infoUser]);
  return (
    <div className={style.background}>
      <div className={style.wrapper}>
        <p className={style.title}>Educación</p>
        <div className={style.infoWrapper}>
          {education.length != 0
            ? education.map((option, index) => (
              <div key={option.idOption} className={style.educationWrapper}>
                <div className={style.educationBox}>
                  <div className={style.infoContainerLeft}>
                    <p className={style.description}>{option.education}</p>
                    <p className={style.detailInfo}>
                      {option.institution}
                      <br />
                      {option.year}
                    </p>
                  </div>
                  <div className={style.infoContainerRight}>
                    <p className={style.comment}>{option.comment}</p>
                  </div>
                </div>
                {index !== education.length - 1 && (
                  <div className={style.line}></div>
                )}
              </div>
            ))
            :
            <p className={style.noInfo}>
              No hay información de educación disponible.
            </p>
          }
        </div>
      </div>
    </div>
  );
}

export default UserEducation;
