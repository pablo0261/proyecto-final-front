import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import TableUser from '../TableUser/TableUser'
import styles from "./FindUserAdmin.module.scss";


function FindUserAdmin({people}) {
  return (
    <div >

      <div className={styles.container}>
        <h2>Buscar Usuario</h2>
      <SearchBar/>
      </div>
      <TableUser/>

    </div>
  )
}

export default FindUserAdmin