import { Fragment } from 'react'
import { Link } from 'react-router'

import * as styles from './DashboardLinks.css'

function DashboardLinks() {
  return (
    <Fragment>
      <Link className={styles.dashboardLink} to='users'>User List</Link>
      <Link className={styles.dashboardLink} to='users-add'>Add a new user</Link>
      <Link className={styles.dashboardLink} to='users-edit/:id'>Add a new user</Link>
      <Link className={styles.dashboardLink} to='images-new'>Upload new image</Link>
      <Link className={styles.dashboardLink} to='images-change'>Change image</Link>
    </Fragment>
  )
}

export default DashboardLinks
