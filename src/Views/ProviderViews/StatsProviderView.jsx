import Dashboard from "../../components/DashboardProvider/DashboardProvider"
import style from './StatsProviderView.module.sass'

function StatsProviderView() {
  return (
    <div className={style.wrapper}>
      <Dashboard />
    </div>
  )
}

export default StatsProviderView