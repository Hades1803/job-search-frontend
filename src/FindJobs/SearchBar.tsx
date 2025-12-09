import React, { useState } from 'react'
import { MultiInput } from './MultiInput'
import { dropdownData } from '../Data/JobsData'
import { Divider, RangeSlider } from '@mantine/core'

const SearchBar = () => {
    const [value, setValue] = useState<[number, number]>([1, 1000]);
    return (
        <div className='flex px-10 py-8'>
            {
                dropdownData.map((item, index) => <>
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