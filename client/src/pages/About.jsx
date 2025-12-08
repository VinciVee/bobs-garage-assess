/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector, useDispatch } from "react-redux"
import { getUserStatus, selectAllUsers } from '../slices/users/userSlice'
import { fetchUserList } from "../slices/users/userThunks"
import { useEffect } from "react"

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
    <>
      <h1>About Us</h1>
      <section className={styles.aboutRow}>
        <h2>About Bob&apos;s Garage</h2>
        <p>We&apos;re a small, family-owned garage with a simple goal: keep our neighbours on the road with honest, dependable mechanical work. </p>
        <p>At Bob&apos;s Garage, you&apos;re more than just a job number — we know our customers by name, and we take the time to explain what your car needs and why.</p>
      </section>
      <section className={styles.aboutRow}>
        <h2>Our Staff</h2>
        <CardGroup>
          {
            userList.map((user) => (
              <UserCard
                key={user.id}
                name={`${user.firstName} ${user.lastName}`}
                image={user.image}
                bio={user.bio}
                role={user.role}
              />
            ))
          }
        </CardGroup>

      </section>
    </>
  )
}

export default About
