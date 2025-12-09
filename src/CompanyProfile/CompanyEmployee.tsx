import React from 'react'
import { talents } from '../Data/TalentsData'
import TalentCard from '../FindTalent/TalentCard'

const CompanyEmployee = () => {
  return (
    <div className='mt-10 flex flex-wrap gap-5'>
            {
                talents.map((talent,index)=>
                 index< 6 &&   <TalentCard {...talent}/>
                )
            }
        </div>
  )
}

export default CompanyEmployee