import { Button, Divider } from '@mantine/core'
import { IconBriefcase, IconMapPin } from '@tabler/icons-react'
import ExpCard from './ExpCard'
import CertificationCard from './CertificationCard'

const Profile = (props:any) => {
    return (
        <div className='w-2/3 mt-14'>
            <div className='relative'>
                <img src="/Profile/banner.jpg" alt="" className='rounded-t-2xl w-full h-64' />
                <img src="/avatar.png" alt="" className='rounded-full w-48 h-48 -bottom-1/3 absolute left-3 border-mine-shaft-950 border-8' />
            </div>
            <div className="px-3 mt-24">
                <div className='text-3xl font-semibold flex justify-between'>{props.name}
                    <Button color='brightSun.4' variant='light'>Message</Button>
                </div>
                <div className='text-xl flex gap-1 items-center'><IconBriefcase className='h-5 w-5' stroke={1.5}/> {props.role} &bull; {props.company} </div>
                <div className='text-lg flex gap-1 items-center text-mine-shaft-400'>
                    <IconMapPin className='h-5 w-5' stroke={1.5} />{props.location}
                </div>
            </div>
            <Divider  mx='xs' my='xl'/>
            <div className='px-3'>
                <div className='text-2xl font-semibold mb-3'>About</div>
                <div className='text-sm text-mine-shaft-300 text-justify'>{props.about}</div>
            </div>
            <Divider mx='xs'  my='xl'/>
            <div className='px-3'>
                <div className='text-2xl font-semibold mb-3'>Skills</div>
                <div className='flex flex-wrap gap-2'>
                    {
                        props.skills.map((skill:any,index:any)=>
                            <div key={index} className='bg-bright-sun-300 bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1 text-sm font-medium'>{skill}</div>
                        )
                    }
                </div>
            </div>
            <Divider mx='xs'  my='xl'/>
            <div className='px-3'>
                <div className='text-2xl font-semibold mb-3'>Experience</div>
                <div className="flex flex-col gap-8">
                {
                    props.experience.map((item:any,index:any)=>
                    <ExpCard key={index} {...item}/>
                    )
                }
                </div>
                
            </div>
            <Divider mx='xs'  my='xl'/>
            <div className='px-3'>
                <div className='text-2xl font-semibold mb-3'>Certifications</div>
                <div className="flex flex-col gap-8">
                {
                    props.certifications.map((item:any,index:any)=>
                    <CertificationCard key={index} {...item}/>
                    )
                }
                </div>
            </div>
        </div>
    )
}

export default Profile