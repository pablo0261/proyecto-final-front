import React, { useEffect } from 'react'
import FindUserAdmin from '../../components/FindUserAdmin/FindUserAdmin'
import TableUserDue from '../../components/TableUserDue/TableUserDue'
import { useSelector, useDispatch } from "react-redux";
import { allPeople, getFiltersOrdersDB } from "../../redux/actions";
import AdminStatistics from '../../components/AdminStatistics/AdminStatistics';
import AdminServices from '../../components/AdminServices/AdminServices';
import styles from "../AdminUsersView/AdminUsersView.module.sass"
import AdminTablas from '../AdminTablas/AdminTablas';

function AdminUsersView() {
const people = useSelector((state) => state.peopleForAdmin.data);
const servicios = useSelector((state) => state.allServices);
const dispatch = useDispatch();

useEffect(() => {
      dispatch(allPeople());
}, []);
console.log(people)

return (
  <div className={styles.ff}>
    <div className={styles.containerServices}>
      <FindUserAdmin />
      <TableUserDue />
    </div>
  </div>
)

}

export default AdminUsersView