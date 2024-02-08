import React from 'react'
import FindUserAdmin from '../../components/FindUserAdmin/FindUserAdmin'
import TableUserDue from '../../components/TableUserDue/TableUserDue'
import { useSelector, useDispatch } from "react-redux";
import { allPeople } from "../../redux/actions";


function AdminUsersView() {
  const providers = useSelector((state) => state.getAllPeople.data);
  const dispatch = useDispatch();

  return (
    <div>
        <FindUserAdmin/>
        <TableUserDue/>
    </div>
  )
}

export default AdminUsersView