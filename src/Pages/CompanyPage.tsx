import { Button } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'
import {  useNavigate } from 'react-router-dom'
import Company from '../CompanyProfile/Company'
import SimiliarCompanies from '../CompanyProfile/SimiliarCompanies'

const CompanyPage = () => {
    const navigate = useNavigate();
    return (
        <div className='min-h-[100vh] bg-mine-shaft-950 font-["poppins"] p-4'>
            <Button color='brightSun.4' onClick={()=>navigate(-1)} my="md" variant='outline' leftSection={<IconArrowLeft size={20} />}>Back</Button>
            <div className='flex gap-5'>
                <Company/>
                <SimiliarCompanies/>
            </div>
        </div>
    )
}

export default CompanyPage