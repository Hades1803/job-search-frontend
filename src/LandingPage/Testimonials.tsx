import { Avatar, Rating } from '@mantine/core'
import React from 'react'
import { testimonials } from '../Data/Data'

const Testimonials = () => {
    return (
        <div className='mt-20 pb-5'>
            <div className='text-4xl text-center font-semibold text-mine-shaft-100 mb-10'>
                What <span className='text-bright-sun-400'> User</span> say about us ?
            </div>
            <div className='flex items-center justify-evenly'>
            {
                testimonials.map((item, index) =>
                    <div key={index} className='flex flex-col gap-3 w-[23%] border border-bright-sun-400 p-3 rounded-xl'>
                        <div className='flex gap-2 items-center'>
                            <Avatar className='!h-14 !w-14' src="avatar.png" alt='avatar' />
                            <div className=''>
                                <div className='text-lg text-mine-shaft-100 font-semibold'>{item.name}</div>
                                <Rating value={item.rate} fractions={2} readOnly />
                            </div>
                        </div>
                        <div className='text-xs text-mine-shaft-300'>{item.testimonial}</div>
                    </div>
                )
            }
            </div>

        </div>
    )
}

export default Testimonials