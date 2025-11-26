import { Link } from 'react-router-dom'
import { Tab, Tabs } from 'react-bootstrap'
// Local modules
import AddUser from '../../../pages/admin/AddUser'
import Users from '../../../pages/admin/Users'
import ChangeImage from '../../../pages/admin/ChangeImage'

import * as styles from './DashboardLinks.css'

function DashboardLinks() {
  return (
    <Tabs
      defaultActiveKey="users"
      id="dashboard-tabs"
      className="mb-3">
      <Tab eventKey="users" title="User List">
        <Users />
      </Tab>
      <Tab eventKey="add-user" title="Add User">
        <AddUser />
      </Tab>
      <Tab eventKey="change-image" title="Change Banner">
        <ChangeImage />
      </Tab>
    </Tabs>
  )
}

export default DashboardLinks
