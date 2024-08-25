import React from 'react'
import { Appbar } from '../components/Appbar'
import { Balance } from '../components/Balance'
import { Users } from '../components/Users'

const Dashboard = () => {
  return (<div>
  <Appbar />
  <div className="m-8">
      <Balance  />
      <Users />
  </div>
</div>)

}

export default Dashboard