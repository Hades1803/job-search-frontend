import { ActionIcon, Divider, TagsInput, Textarea } from '@mantine/core'
import { IconBriefcase, IconDeviceFloppy, IconMapPin, IconPencil, IconPlus } from '@tabler/icons-react'
import ExpCard from './ExpCard'
import CertificationCard from './CertificationCard'
import { useState } from 'react'
import SelectInput from './SelectInput'
import fields from '../Data/Profile'
import ExpInput from './ExpInput'
import CertiInput from './CertiInput'


const Profile = (props: any) => {
    const select = fields;
    const [skills, setSkills] = useState(props.skills || []);
    const [edit, setEdit] = useState([false, false, false, false, false]);
    const [addExp, setAddExp] = useState(false);
    const [addCerti, setAddCerti] = useState(false);
    const handleEdit = (index: any) => {
        const newEdit = [...edit];
        newEdit[index] = !newEdit[index];
        setEdit(newEdit);
    }
    const [about, setAbout] = useState('Tôi là một lập trình viên frontend với hơn 4 năm kinh nghiệm trong việc xây dựng các ứng dụng web hiện đại. Tôi đam mê tạo ra các trải nghiệm người dùng trực quan, hiệu năng cao, và dễ sử dụng. Kỹ năng chính của tôi là làm việc với React, TypeScript và hệ thống thiết kế UI linh hoạt với Tailwind CSS.');
    return (
        <div className='w-4/5 mt-14 mx-auto'>
            <div className='relative'>
                <img src="/Profile/banner.jpg" alt="" className='rounded-t-2xl w-full h-64' />
                <img src="/avatar.png" alt="" className='rounded-full w-48 h-48 -bottom-1/3 absolute left-3 border-mine-shaft-950 border-8' />
            </div>
            <div className="px-3 mt-24">
                <div className='text-3xl font-semibold flex justify-between'>{props.name}
                    <ActionIcon onClick={() => handleEdit(0)} variant="subtle" color='brightSun.4' size="lg">
                        {edit[0] ? <IconDeviceFloppy className='h-4/5 w-4/5' /> : <IconPencil className='h-4/5 w-4/5' />}

                    </ActionIcon>
                </div>
                {
                    edit[0] ? <>
                        <div className='flex gap-10 [&>*]:w-1/2'>
                            <SelectInput {...select[0]} />
                            <SelectInput {...select[1]} />
                        </div>
                        <SelectInput {...select[2]} />

                    </> : <>
                        <div className='text-xl flex gap-1 items-center'><IconBriefcase className='h-5 w-5' /> {props.role} &bull; {props.company} </div>
                        <div className='text-lg flex gap-1 items-center text-mine-shaft-400'>
                            <IconMapPin className='h-5 w-5' stroke={1.5} />{props.location}
                        </div>
                    </>
                }
            </div>

            <Divider mx='xs' my='xl' />
            <div className='px-3'>
                <div className='text-2xl font-semibold mb-3 flex justify-between'>About
                    <ActionIcon onClick={() => handleEdit(1)} variant="subtle" color='brightSun.4' size="lg">
                        {edit[1] ? <IconDeviceFloppy className='h-4/5 w-4/5' /> : <IconPencil className='h-4/5 w-4/5' />}

                    </ActionIcon>
                </div>
                {
                    edit[1] ? <Textarea
                        value={about}
                        autosize minRows={3} placeholder='Enter about yourself'
                        onChange={(event) => setAbout(event.currentTarget.value)}
                    /> : <div className='text-sm text-mine-shaft-300 text-justify'>{about}</div>
                }

            </div>
            <Divider mx='xs' my='xl' />
            <div className='px-3'>
                <div className='text-2xl font-semibold mb-3 flex justify-between'>Skills
                    <ActionIcon onClick={() => handleEdit(2)} variant="subtle" color='brightSun.4' size="lg">
                        {edit[2] ? <IconDeviceFloppy className='h-4/5 w-4/5' /> : <IconPencil className='h-4/5 w-4/5' />}

                    </ActionIcon>
                </div>
                {
                    edit[2] ? <TagsInput
                        value={skills}
                        onChange={setSkills}
                        placeholder="Add skill"
                        splitChars={[',', ' ', '|']}
                    /> : <div className='flex flex-wrap gap-2'>
                        {
                            props.skills.map((skill: any, index: any) =>
                                <div key={index} className='bg-bright-sun-300 bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1 text-sm font-medium'>{skill}</div>
                            )
                        }
                    </div>
                }


            </div>
            <Divider mx='xs' my='xl' />
            <div className='px-3'>
                <div className='text-2xl font-semibold mb-3 flex justify-between'>Experience
                    <div className='flex gap-2'>
                        <ActionIcon onClick={() => setAddExp(true)} variant="subtle" color='brightSun.4' size="lg">
                            <IconPlus className='h-4/5 w-4/5' />
                        </ActionIcon>
                        <ActionIcon onClick={() => handleEdit(3)} variant="subtle" color='brightSun.4' size="lg">
                            {edit[3] ? <IconDeviceFloppy className='h-4/5 w-4/5' /> : <IconPencil className='h-4/5 w-4/5' />}
                        </ActionIcon>
                    </div>
                </div>
                <div className="flex flex-col gap-8">
                    {
                        props.experience.map((item: any, index: any) =>
                            <ExpCard key={index} {...item} edit={edit[3]} />
                        )
                    }
                    {
                        addExp && <ExpInput add setEdit={setAddExp} />
                    }
                </div>
            </div>
            <Divider mx='xs' my='xl' />
            <div className='px-3'>
                <div className='text-2xl font-semibold mb-3 flex justify-between'>Certifications
                    <div className='flex gap-2'>
                        <ActionIcon onClick={() => setAddCerti(true)} variant="subtle" color='brightSun.4' size="lg">
                            <IconPlus className='h-4/5 w-4/5' />
                        </ActionIcon>
                        <ActionIcon onClick={() => handleEdit(4)} variant="subtle" color='brightSun.4' size="lg">
                            {edit[4] ? <IconDeviceFloppy className='h-4/5 w-4/5' /> : <IconPencil className='h-4/5 w-4/5' />}
                        </ActionIcon>
                    </div>
                </div>
                <div className="flex flex-col gap-8">
                    {
                        props.certifications.map((item: any, index: any) =>
                            <CertificationCard key={index} {...item} edit={edit[4]} />
                        )
                    }

                    {
                        addCerti && <CertiInput setEdit={setAddCerti}/>
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile