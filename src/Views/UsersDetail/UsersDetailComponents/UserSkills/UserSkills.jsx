import React, { useEffect, useState } from 'react'
import style from './UserSkills.module.sass'

function UserSkills(props) {

  const { infoUser } = props
  const [skills, setSkills] = useState([])

  useEffect(() => {
    if (infoUser.categories && infoUser.categories.length != 0) {
      const skillsCategory = infoUser.categories.find(category => category.idCategorie === 3);

      if (skillsCategory && skillsCategory.categories_options.length != 0) {
        const skillsOptions = skillsCategory.categories_options.map(option => ({
          idOption: option.idOption,
          Skill: option.description
        }));
        setSkills(skillsOptions);
      }
    }
  }, [infoUser]);
  
  return (
    <div className={style.background}>
      <div className={style.wrapper}>
        <p className={style.title}>Habilidades</p>
        <div className={style.infoWrapper}>
          {skills.length != 0 ? (
            skills.map((option) => (
              <div key={option.idOption} className={style.skills}>{option.Skill}</div>
            ))
          ) : (
            <p className={style.noInfo}>No hay información de habilidades disponible.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserSkills