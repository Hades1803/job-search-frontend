import React from 'react'
import JobCard from '../FindJobs/JobCard'
import { jobList } from '../Data/JobsData'

const RecommendJob = () => {
  return (
    <div className='ml-20'>
     <div className='text-xl font-semibold mb-5 mt-2'>Recommend Talent</div>
     <div className='flex flex-col gap-5 flex-wrap justify-around'>
        {
            jobList.map((talent,index)=>index < 6 &&
                <JobCard key={index} {...talent}/>
            )
        }
     </div>
   </div>
  )
}

export default RecommendJob