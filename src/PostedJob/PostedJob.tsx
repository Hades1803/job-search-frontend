import { Tabs } from '@mantine/core'
import jobData from '../Data/PostedJob'
import PostedJobCard from './PostedJobCard'
const PostedJob = () => {
  return (
    <div className='m-1/6 mt-5'>
      <div className='text-2xl font-semibold mb-5'>Job Posted</div>
      <div>
        <Tabs variant='pills' defaultValue='active'>
          <Tabs.List className="[&_button[aria-selected='false']]:bg-mine-shaft-900 font-medium">
            <Tabs.Tab value="actice">Active [4]</Tabs.Tab>
            <Tabs.Tab value="draft">Dtafts [1]</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="actice">
            <div className='flex flex-col gap-5 mt-5'>
            {
              jobData.activeJobs.map((job,index)=>
                <PostedJobCard key={index} {...job}/>
              )
            }
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="draft">
          <div className='flex flex-col gap-5 mt-5'>
            {
              jobData.draftJobs.map((job,index)=>
                <PostedJobCard key={index} {...job}/>
              )
            }
            </div>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  )
}

export default PostedJob