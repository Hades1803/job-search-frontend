import { Avatar,  Divider, Tabs } from '@mantine/core'
import { IconMapPin } from '@tabler/icons-react'
import AboutComp from './AboutComp'
import CompanyJobs from './CompanyJobs'
import CompanyEmployee from './CompanyEmployee'

const Company = () => {
    return (
        <div className='w-3/4'>
            <div className='relative'>
                <img src={`${process.env.PUBLIC_URL}/Profile/banner.jpg`} alt="" className='rounded-t-2xl h-64 w-full' />
                <img src={`${process.env.PUBLIC_URL}/Companies/Amazon.png`} alt="" className='rounded-3xl w-48 h-48 -bottom-1/4 absolute left-5 border-mine-shaft-950 border-8 bg-mine-shaft-950' />
            </div>
            <div className="px-3 mt-20">
                <div className='text-3xl font-semibold flex justify-between'>
                    Amazon
                    <Avatar.Group>
                        <Avatar src="avatar.png" />
                        <Avatar src="avatar.png" />
                        <Avatar src="avatar.png" />
                        <Avatar>+10K</Avatar>
                    </Avatar.Group>
                </div>
                <div className='text-lg flex gap-1 items-center text-mine-shaft-400'>
                    <IconMapPin className='h-5 w-5' stroke={1.5} />New York, United States
                </div>
            </div>
            <Divider mx='xs' my='xl' />
            <div>
                <Tabs variant='outline' radius="lg" defaultValue="about">
                    <Tabs.List className="[&_button]:!text-lg mb-5 font-semibold [&_button[data-active='true']]:text-bright-sun-400">
                        <Tabs.Tab value="about">About </Tabs.Tab>
                        <Tabs.Tab value="jobs">Jobs</Tabs.Tab>
                        <Tabs.Tab value="employees">Employees</Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel value="about"><AboutComp/> </Tabs.Panel>
                    <Tabs.Panel value="jobs"><CompanyJobs/> </Tabs.Panel>
                    <Tabs.Panel value="employees"><CompanyEmployee/> </Tabs.Panel>
                </Tabs>
            </div>
        </div>
    )
}

export default Company