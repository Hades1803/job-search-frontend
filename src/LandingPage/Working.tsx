import React from 'react'
import { jobSteps } from '../Data/Data'
import { Avatar } from '@mantine/core'

const Working = () => {
    return (
        <div className='mt-20 pb-5'>
            <div className='text-4xl text-center font-semibold text-mine-shaft-100 mb-10'>
                How It<span className='text-bright-sun-400'> Works</span>
            </div>
            <div className="text-lg mx-auto text-mine-shaft-300 text-center w-1/2">Effortlessly navigate through the process and land your dream job.</div>
            <div className='flex gap-5 px-16 justify-around items-center mt-8'>
                <div className='relative'>
                    <img className='w-[30rem]' src="/Working/Girl.png" alt="" />
                    <div className='w-36 top-[15%] right-0 absolute flex flex-col items-center gap-1 border border-bright-sun-400 rounded-xl py-3 px-1 backdrop-blur-md'>
                        <Avatar src="avatar1.png" alt='avatar' className='!h-16 !w-16'/>
                        <div className='text-sm font-semibold text-mine-shaft-200 text-center'>Complete your profile</div>
                        <div className='text-xs text-mine-shaft-300'> 99% Completed</div>
                    </div>
                </div>
                <div className='flex flex-col gap-10'>
                    {
                        jobSteps.map((item,index)=>
                        
                            <div className='flex items-center gap-4'>
                            <div className='p-3 bg-bright-sun-300 rounded-full'>
                                <img src="/Category/Web Developer.png" className='h-12 w-12' alt="" />
                            </div>
                            <div className=''>
                                <div className='text-mine-shaft-200 text-xl font-semibold'>{item.title}</div>
                                <div className='text-mine-shaft-300'>{item.description}</div>
                            </div>
                        </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Working