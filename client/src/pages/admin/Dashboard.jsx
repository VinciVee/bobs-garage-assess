//
import { Navigate, Outlet } from "react-router"
import { useSelector } from 'react-redux'

import { getIsAdmin, getIsAuth } from '../../slices/authSlice'

import DashboardLinks from './DashboardLinks.jsx'

function Dashboard() {
  // Set up the selectors
  const isAuth = useSelector(getIsAuth)
  const isAdmin = useSelector(getIsAdmin)

  // Redirect the use if they are not authenticated / not admins
  if (!isAdmin && !isAuth ) {
    return <Navigate to='/login' />
  }

  // Set up the dashboard
  // left side - navigation links / actions
  // right side will render the child components

  return (
    <main className='row'>
      <aside className='col-2 bg-info-subtle'>
        <DashboardLinks />
        <section className="col-10 bg-warning-subtle">
          <h2>Admin Dashboard</h2>
            <Outlet />
        </section>
      </aside>
    </main>
  )
}

export default Dashboard
