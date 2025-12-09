/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector, useDispatch } from "react-redux"
import { getUserStatus, selectAllUsers } from '../slices/users/userSlice'
import { fetchUserList } from "../slices/users/userThunks"
import { useEffect } from "react"
import { Row, Col } from "react-bootstrap"

import * as styles from './About.css'
import UserCard from '../components/features/users/UserCard'

const About = () => {
  // Redux hooks
  const userList = useSelector(selectAllUsers)
  const status = useSelector(getUserStatus)
  const dispatch = useDispatch()

  useEffect(() => {
    fetchUsers()
  }, [])

  function fetchUsers() {
    try {
      if (userList[0] != null && status === 'idle') {
        dispatch(fetchUserList())
      }
    } catch (error) {
      console.log('Error while fetching all users: ', error.message)
    }
  }

  return (
    <div className={styles.aboutPageStyle}>
      <h1>About Us</h1>
      <section className={styles.aboutRow}>
        <h2>About Bob&apos;s Garage</h2>
        <p className={styles.aboutText}>We&apos;re a small, family-owned garage with a simple goal: keep our neighbours on the road with honest, dependable mechanical work. </p>
        <p className={styles.aboutText}>At Bob&apos;s Garage, you&apos;re more than just a job number — we know our customers by name, and we take the time to explain what your car needs and why.</p>
      </section>
      <section className={styles.aboutRow}>
        <h2>Our Staff</h2>
        <Row xs={1} md={2} lg={4} className="g-4">
          <Col key={1}>
            <UserCard
              name='Bob Matherson'
              image='http://localhost:3001/uploads/kenny-eliason-2K_-unsplash_desat.webp'
              bio='Bob founded the shop after two decades in automotive repair. He oversees operations, manages customer relationships, and handles complex diagnostics.'
              role='Owner / Master Technician'
            />
          </Col>
          <Col key={2}>
            <UserCard
              name='Kristie Watson'
              image='http://localhost:3001/uploads/darren-richardson-unsplash_desat.webp'
              bio='A certified senior technician with extensive experience in engine, brake, and electrical systems.'
              role='Senior Technician'
            />
          </Col>
          <Col key={3}>
            <UserCard
              name='Ben Oldland'
              image='http://localhost:3001/uploads/kato-blackmore-unsplash_desat.webp'
              bio='A skilled all-round mechanic specialising in routine servicing, troubleshooting, and component replacement.'
              role='Automotive Technician'
            />
          </Col>
          <Col key={4}>
            <UserCard
              name='Elle Auld'
              image='http://localhost:3001/uploads/thisisengineering-unsplash_desat.webp'
              bio='Elle manages reception, scheduling, invoicing, and customer enquiries.'
              role='Office Administrator'
            />
          </Col>
          {/* {
            userList.map((user) => (
              <UserCard
                key={user.id}
                name={`${user.firstName} ${user.lastName}`}
                image={user.image}
                bio={user.Profile?.bio || ''}
                role={user.Profile?.role || ''}
              />
            ))
          } */}
        </Row>

      </section>
    </div>
  )
}

export default About
