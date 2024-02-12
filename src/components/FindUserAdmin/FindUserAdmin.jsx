import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import TableUser from '../TableUser/TableUser'

function FindUserAdmin(props) {
  // console.log(props.user.fullName)
  return (
    <div>
      <h2>Buscar Usuario</h2>
      <SearchBar/>
      <TableUser/>
    </div>
  )
}

export default FindUserAdmin