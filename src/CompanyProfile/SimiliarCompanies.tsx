import React from 'react'
import data from '../Data/Company'
import CompanyCard from './CompanyCard'

const SimiliarCompanies = () => {
  return (
    <div className='w-1/4'>
     <div className='text-xl font-semibold mb-5 mt-2'>Similiar Companies</div>
     <div className='flex flex-col gap-5 flex-wrap'>
        {
            data.similar.map((company,index)=>
                <CompanyCard key={index} {...company}/>
            )
        }
     </div>
   </div>
  )
}

export default SimiliarCompanies