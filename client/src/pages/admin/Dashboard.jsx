// Redux modules
import { useSelector } from 'react-redux'
import { getIsAdmin, getIsAuth } from '../../slices/auth/authSlice.js'
// React* modules
import { Navigate, Outlet } from "react-router"
import { Tab, Tabs } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
// Local modules
import Users from './Users'
import AddUser from './AddUser'
import ChangeImage from './ChangeImage'

function Dashboard() {
  // Set up the selectors
  const isAuth = useSelector(getIsAuth)
  const isAdmin = useSelector(getIsAdmin)

  // Redirect the use if they are not authenticated / not admins
  if (!isAdmin && !isAuth) {
    toast('User already logged-in. Redirecting...', {
      position: "",
      autoClose: 5000,
      theme: "light",
    })
    setTimeout(() => {
      return <Navigate to='/' />, 1000
    })
  }

  return (
    <>
      <ToastContainer />
      <Tabs
        defaultActiveKey="users"
        id="dashboard-tabs"
        className="mb-3">
        <Tab eventKey="users" title="User List">
          <Users />
        </Tab>
        <Tab eventKey="add-user" title="Add User">
          <AddUser />
          <Outlet />
        </Tab>
        <Tab eventKey="change-image" title="Change Banner">
          <ChangeImage />
        </Tab>
      </Tabs>
    </>
  )
}

export default Dashboard
