import FindUserAdmin from '../../components/FindUserAdmin/FindUserAdmin'
import TableUserDue from '../../components/TableUserDue/TableUserDue'
import styles from "../AdminUsersView/AdminUsersView.module.scss"

function AdminUsersView() {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <TableUserDue />
        <FindUserAdmin />
      </div>
    </div>
  )

}

export default AdminUsersView