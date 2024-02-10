import React, { useEffect } from 'react'
import FindUserAdmin from '../../components/FindUserAdmin/FindUserAdmin'
import TableUserDue from '../../components/TableUserDue/TableUserDue'
import { useSelector, useDispatch } from "react-redux";
import { allPeople } from "../../redux/actions";
import AdminStatistics from '../../components/AdminStatistics/AdminStatistics';
import AdminServices from '../../components/AdminServices/AdminServices';
import styles from "../AdminUsersView/AdminUsersView.module.sass"

function AdminUsersView() {
  // const people = useSelector((state) => state.peopleForAdmin.data);
  // const dispatch = useDispatch();

  // //*Traen todos los datos para las tablas
  // useEffect(() => {
  //     dispatch(allPeople());
  // }, []);

 

  return (
    <div className={styles.ff}>

  
    <div className={styles.containerServices}>
          {/* {Array.isArray(people) && people.map((user) => <FindUserAdmin key={user.people.idPeople} fullname={user.people}/>)} */}
        <FindUserAdmin/>
        {/* <AdminStatistics/> */}
        <div >
          <div className={styles.f}>
            <h2>Generos</h2>
            <AdminServices/> 
          </div>
          <h2>Ocupacion</h2>
          <AdminServices/>
          <h2>Servicios</h2>
          <AdminServices/>
          <h2>Intereses</h2>
          <AdminServices/>
        </div>
        <TableUserDue/>
    </div>
      </div>
  )
}

export default AdminUsersView