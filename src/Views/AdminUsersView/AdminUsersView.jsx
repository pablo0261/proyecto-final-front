import React, { useEffect } from 'react'
import FindUserAdmin from '../../components/FindUserAdmin/FindUserAdmin'
import TableUserDue from '../../components/TableUserDue/TableUserDue'
import { useSelector, useDispatch } from "react-redux";
import { allPeople } from "../../redux/actions";
import AdminStatistics from '../../components/AdminStatistics/AdminStatistics';


function AdminUsersView() {
  // const people = useSelector((state) => state.peopleForAdmin.data);
  // const dispatch = useDispatch();

  // //*Traen todos los datos para las tablas
  // useEffect(() => {
  //     dispatch(allPeople());
  // }, []);

 

  return (
    <div>
          {/* {Array.isArray(people) && people.map((user) => <FindUserAdmin key={user.people.idPeople} fullname={user.people}/>)} */}
        <FindUserAdmin/>
        {/* <AdminStatistics/> */}
        <TableUserDue/>
    </div>
  )
}

export default AdminUsersView