import React, { useState } from 'react'
import { Divider, Input, RangeSlider } from '@mantine/core'
import { MultiInput } from '../FindJobs/MultiInput';
import { searchFields } from '../Data/TalentsData';
import { IconUserCircle } from '@tabler/icons-react';

const SearchBar = () => {
    const [value, setValue] = useState<[number, number]>([1, 1000]);
    return (
        <div className='flex px-10 py-8 text-mine-shaft-100'>
            <div className=' flex items-center'>
                <div className='text-bright-sun-400 bg-mine-shaft-900 rounded-full p-1 mr-2'><IconUserCircle size={20}/></div>
                <Input variant='unstyled' placeholder='Talent Name' className='[&_input]:!placeholder-mine-shaft-300'/>
            </div>
            <Divider size="xs" mr="xs" orientation='vertical' />
            {
                searchFields.map((item, index) => <>
                    <div className='w-1/5' key={index}>
                        <MultiInput {...item} />
                    </div>
                    <Divider size="xs" mr="xs" orientation='vertical' />
                </>)
            }
            <div className='w-1/5'>
                <div className='flex justify-between'>
                    <div className=''>Salary :</div>
                    <div> &#36;{value[0]} - &#36;{value[1]}</div>
                </div>
                <RangeSlider color='brightSun.4' value={value} labelTransitionProps={{
                    transition: 'skew-down',
                    duration: 150,
                    timingFunction: 'linear',
                }} onChange={setValue} />
            </div>
        </div>
    )
}

export default SearchBar