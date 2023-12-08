import React from 'react'
import BookingList from '@components/BookingList'
import UserInfo from '@/components/UserInfo'

const Dashboard = () => {
  return (
    <>
      <UserInfo />
      <BookingList />
    </>
  )
}

export default Dashboard