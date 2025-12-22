import { ActionIcon, Button, Divider } from '@mantine/core'
import { IconBookmark } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import { card, desc, skills } from '../Data/JobDescData'
import DOMPurify from 'dompurify';

const JobDesc = (props:any) => {
    const data = DOMPurify.sanitize(desc);

    return (


        <div className='w-2/3 mt-5'>
            <div className='flex justify-between'>
                <div className='flex gap-2 items-center'>
                    <div className='p-3 bg-mine-shaft-800 rounded-xl'><img src={`${process.env.PUBLIC_URL}/Companies/Amazon.png"`} alt="" className='h-14 w-14' /></div>
                    <div>
                        <div className='font-semibold text-2xl'>Devops Engineer</div>
                        <div className='text-lg text-mine-shaft-300'> Google &#x2022; 3 days ago &#x2022; 100 applicant</div>
                    </div>
                </div>
                <div className='flex flex-col gap-2 items-center'>
                    <Link to='/apply-job'>
                        <Button color='brightSun.4' size='sm' variant='light'>{props.edit? "Edit" :"Apply"}</Button>
                    </Link>
                    {props.edit ? <Button color='red.5' size='sm' variant='outline'>Delete</Button>:<IconBookmark className='text-bright-sun-400 cursor-pointer' />}
                </div>
            </div>
            <Divider my="xl" />
            <div className='flex justify-between'>
                {card.map((item: any, index: number) => (
                    <div key={index} className='flex flex-col items-center gap-1'>
                        <ActionIcon className='!h-12 !w-12' color='brightSun.4' variant="light" radius="xl" aria-label={item.name}>
                            <item.icon className='h-4/5 w-4/5' stroke={1.5} />
                        </ActionIcon>
                        <div className='text-sm text-mine-shaft-300'>{item.name}</div>
                        <div className='font-semibold'>{item.value}</div>
                    </div>
                ))}
            </div>
            <Divider my="xl" />
            <div>
                <div className='text-xl font-semibold mb-5'>Required Skills</div>
                <div className='flex flex-wrap gap-2'>
                    {
                        skills.map((skill, index) =>
                            <ActionIcon key={index} className='!h-fit !w-fit font-medium text-sm' color='brightSun.4' p='xs' variant="light" radius="xl">
                                {skill}
                            </ActionIcon>
                        )
                    }
                </div>
            </div>
            <Divider my="xl" />
            <div className='[&_h4]:text-xl [&_h4]:my-5 [&_h4]:font-semibold [&_h4]:text-mine-shaft-200 [&_p]:text-justify [&_*]:text-mine-shaft-300 [&_li]:marker:text-bright-sun-400 [&_li]:mb-1' dangerouslySetInnerHTML={{ __html: data }}>

            </div>
            <Divider my="xl" />
            <div>
                <div className='text-xl font-semibold mb-5'>About Company</div>
                <div>
                    <div className='flex justify-between mb-3'>
                        <div className='flex gap-2 items-center'>
                            <div className='p-3 bg-mine-shaft-800 rounded-xl'><img src={`${process.env.PUBLIC_URL}/Companies/Amazon.png"`} alt="" className='h-8 w-8' /></div>
                            <div className='flex flex-col'>
                                <div className='font-medium text-lg'>Google</div>
                                <div className='text-lg text-mine-shaft-300'>10k+ Employees</div>
                            </div>
                        </div>
                            <Link to='/company'>
                                <Button color='brightSun.4' variant='light'>Comoany Page</Button>
                            </Link>
                    </div>
                    <div className='text-mine-shaft-300 text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus aut sint nisi ipsa temporibus. Fugit debitis possimus provident nobis ipsa? Voluptatibus perferendis temporibus earum possimus voluptas quia cupiditate eum impedit doloribus at laudantium, nisi officiis, quo quas tempore incidunt maxime, expedita tempora iusto sapiente? Quam eius amet, esse, ducimus nostrum quasi iste voluptas sint beatae minus fugiat, saepe cum corrupti.</div>
                </div>
            </div>
        </div>
    )
}

export default JobDesc