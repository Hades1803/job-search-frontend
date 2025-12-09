import React from 'react'
import Profile from '../Profile/Profile'
import { profile } from '../Data/TalentsData'

const ProfilePage = () => {
  return (
    <div className="min-h-[90vh] bg-mine-shaft-900 font-['poppins'] overflow-hidden">
        <Profile {...profile}/>
    </div>
  )
}

export default ProfilePage