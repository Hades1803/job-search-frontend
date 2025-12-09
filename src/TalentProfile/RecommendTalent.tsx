import React from 'react'
import { talents } from '../Data/TalentsData'
import TalentCard from '../FindTalent/TalentCard'

const RecommendTalent = () => {
  return (
   <div className='ml-20'>
     <div className='text-xl font-semibold mb-5 mt-2'>Recommend Talent</div>
     <div className='flex flex-col gap-5 flex-wrap'>
        {
            talents.map((talent,index)=>index < 4 &&
                <TalentCard key={index} {...talent}/>
            )
        }
     </div>
   </div>
  )
}

export default RecommendTalent