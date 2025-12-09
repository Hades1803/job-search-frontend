import { Badge, Tabs } from '@mantine/core'
import React from 'react'
import JobDesc from '../JobDesc/JobDesc'
import { talents } from '../Data/TalentsData'
import TalentCard from '../FindTalent/TalentCard'

const PostedJobDesc = () => {
    return (
        <div className='mt-5 w-3/4 px-5'>
            <div className='text-2xl font-semibold items-center'>Software Engineer <Badge variant='light' ml='sm' color='brightSun.4' size='sm'>Badge</Badge></div>
            <div className='font-medium text-mine-shaft-300 mb-5'>New York, United States</div>
            <div>
                <Tabs variant='outline' radius="lg" defaultValue="overview">
                    <Tabs.List className="[&_button]:!text-lg mb-5 font-semibold [&_button[data-active='true']]:text-bright-sun-400">
                        <Tabs.Tab value="overview">Overview </Tabs.Tab>
                        <Tabs.Tab value="applicants">Applicants</Tabs.Tab>
                        <Tabs.Tab value="invited">Invited</Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel value="overview" className='[&>div]:w-full'>
                        <JobDesc edit />
                    </Tabs.Panel>
                    <Tabs.Panel value="applicants">
                        <div className='mt-10 flex flex-wrap gap-5 '>
                            {
                                talents.map((talent, index) =>
                                    index < 6 && <TalentCard {...talent} posted/>
                                )
                            }
                        </div>
                    </Tabs.Panel>
                    <Tabs.Panel value="invited">
                    <div className='mt-10 flex flex-wrap gap-5 '>
                            {
                                talents.map((talent, index) =>
                                    index < 6 && <TalentCard {...talent} invited/>
                                )
                            }
                        </div>
                    </Tabs.Panel>
                </Tabs>
            </div>
        </div>
    )
}

export default PostedJobDesc