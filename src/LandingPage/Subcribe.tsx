import { Button, TextInput } from '@mantine/core'
import React from 'react'

const Subcribe = () => {
    return (
        <div className='mt-20 flex items-center bg-mine-shaft-900 mx-20 py-3 rounded-xl justify-evenly'>
            <div className='text-4xl text-center font-semibold text-mine-shaft-100'>
                Never Wants To Miss Any<span className='text-bright-sun-400'> Job News ?</span>
            </div>
            <div className='flex rounded-xl gap-4 bg-mine-shaft-800 px-3 py-2 items-center'>
                <TextInput
                    className='[&_input]:text-mine-shaft-100 font-semibold'
                    variant="unstyled"
                    placeholder="Your Email.com" 
                    size='xl'
                />
                <Button size='lg' className='!rounded-lg' variant='filled' color='brightSun.4'>Subcribe</Button>
            </div>
        </div>
    )
}

export default Subcribe