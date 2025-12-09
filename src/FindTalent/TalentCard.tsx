import { Avatar, Button, Divider, Modal, Text } from '@mantine/core'
import { DateInput, TimeInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { IconCalendarMonth, IconHeart, IconMapPin } from '@tabler/icons-react'
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom'

const TalentCard = (props: any) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [value, setValue] = useState<Date | null>(null);
    const ref = useRef<HTMLInputElement>(null);
    return (
        <div className='bg-mine-shaft-900 p-4 w-96 flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-400'>
            <div className='flex justify-between'>
                <div className='flex gap-2 items-center'>
                    <div className='p-2 bg-mine-shaft-800 rounded-full'><Avatar src={`/${props.image}.png`} alt="" size='lg' /></div>
                    <div>
                        <div className='font-semibold text-lg'>{props.name}</div>
                        <div className='text-sm text-mine-shaft-50'>{props.role.position} at <span className='text-bright-sun-400'>{props.role.company}</span></div>
                    </div>
                </div>
                <IconHeart className='cursor-pointer text-mine-shaft-300' stroke={1.5} />
            </div>
            <div className='flex gap-2 text-xs [&>div]:py-2 [&>div]:px-2 [&>div]:bg-mine-shaft-800 [&>div]:text-bright-sun-400 [&>div]:rounded-lg [&>div]:overflow-hidden [&>div]:text-ellipsis [&>div]:whitespace-nowrap'>
                {
                    props.topSkills.map((skill: any, index: any) =>
                        <div key={index} className=''>{skill}</div>
                    )
                }
            </div>

            <Text className='!text-xs text-justify !text-mine-shaft-300' lineClamp={2}>{props.about}</Text>
            <Divider size="xs" color='mineShaft.7' />
            {
                props.invited ? <div className='flex gap-1 text-mine-shaft-200 text-sm items-center'>
                    <IconCalendarMonth stroke={1.5} /> Interview: August 27, 2024 10:00 AM
                </div> : <div className='flex justify-between'>
                    <div className='font-semibold text-mine-shaft-200'>&#36;{props.expectedCtc}</div>
                    <div className='text-xs flex gap-1 items-center text-mine-shaft-400'>
                        <IconMapPin className='h-5 w-5' stroke={1.5} />{props.location}
                    </div>
                </div>
            }

            <Divider size="xs" color='mineShaft.7' />
            <div className='flex [&>*]:w-1/2 [&>*]:p-1 justify-between'>
            {
                !props.invited && <>
                <Link to='/talent-profile'>
                    <Button color='brightSun.4' variant='outline' fullWidth>Profile</Button>
                </Link>
                <div>
                    {props.posted ? <Button onClick={open} color='brightSun.4' rightSection={<IconCalendarMonth className='w-5 h-5' />} variant='light' fullWidth>Schedule</Button> : <Button color='brightSun.4' variant='light' fullWidth>Message</Button>}
                </div>
                </>
            }
            {
                props.invited && <>
                    <div><Button color='brightSun.4' variant='outline' fullWidth>Accept</Button></div>
                    <div><Button color='brightSun.4' variant='light' fullWidth>Reject</Button></div>

                </>
            }
                
            </div>
            <Modal opened={opened} onClose={close} title="Schedule Interview" centered>
                <div className='flex flex-col gap-4'>
                    <DateInput
                        value={value}
                        onChange={setValue}
                        label="Date input"
                        placeholder="Enter Date"
                    />
                    <TimeInput label="Time" ref={ref} onClick={() => ref.current?.showPicker()} />
                    <Button color='brightSun.4' variant='light' fullWidth>Schedule</Button>
                </div>
            </Modal>
        </div>
    )
}

export default TalentCard