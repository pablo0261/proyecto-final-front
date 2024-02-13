import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import TableUser from '../TableUser/TableUser'

function FindUserAdmin({people}) {
  return (
    <div>
      <h2>Buscar Usuario</h2>
      <SearchBar/>
      <TableUser people={people}/>
      {/* {Array.isArray(people) && people.length > 0 && (
        people.map((user) => (
          <TableUser key={user.people.idPeople} people={user.people} />
        ))
      )} */}
    </div>
  )
}

export default FindUserAdmin