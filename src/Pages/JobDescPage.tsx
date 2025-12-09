import { Button, } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import JobDesc from '../JobDesc/JobDesc'
import RecommendJob from '../JobDesc/RecommendJob'

const JobDescPage = () => {
  return (
    <div className='min-h-[100vh] bg-mine-shaft-950 font-["poppins"] p-4'>
            <Link to='/find-jobs' className='my-4 inline-block'>
                <Button color='brightSun.4' variant='outline' leftSection={<IconArrowLeft size={20}/>}>Back</Button>
            </Link>

            <div className='flex gap-5 justify-around'>
                <JobDesc/>
                <RecommendJob/>
            </div>
        </div>
  )
}

export default JobDescPage