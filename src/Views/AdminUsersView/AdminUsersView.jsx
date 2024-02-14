import FindUserAdmin from '../../components/FindUserAdmin/FindUserAdmin'
import TableUserDue from '../../components/TableUserDue/TableUserDue'
import styles from "../AdminUsersView/AdminUsersView.module.sass"

function AdminUsersView() {
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