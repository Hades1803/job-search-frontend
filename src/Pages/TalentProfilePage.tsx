import { Button, Divider } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import Profile from '../TalentProfile/Profile'
import { profile } from '../Data/TalentsData'
import RecommendTalent from '../TalentProfile/RecommendTalent'

const TalentProfilePage = () => {
    return (
        <div className='min-h-[100vh] bg-mine-shaft-950 font-["poppins"] p-4'>
            <Link to='/find-talents' className='my-4 inline-block'>
                <Button color='brightSun.4' variant='outline' leftSection={<IconArrowLeft size={20}/>}>Back</Button>
            </Link>
            <Divider size="xs"/>
            <div className='flex gap-5'>
                <Profile {...profile}/>
                <RecommendTalent/>
            </div>
        </div>
        
    )
}

export default TalentProfilePage