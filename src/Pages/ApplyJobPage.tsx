
import { Link } from 'react-router-dom'
import { Button } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'
import ApplyJobComp from '../ApplyJob/ApplyJobComp'

const ApplyJobPage = () => {
    return (
        <div className='min-h-[100vh] bg-mine-shaft-950 font-["poppins"] p-4'>
            <Link to='/jobs' className='my-4 inline-block'>
                <Button color='brightSun.4' variant='outline' leftSection={<IconArrowLeft size={20} />}>Back</Button>
            </Link>
            <ApplyJobComp/>
        </div>
    )
}

export default ApplyJobPage