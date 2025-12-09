import { ActionIcon } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'


const CertificationCard = (props: any) => {
    return (
        <div className='flex justify-between'>
            <div className='flex gap-2 items-center'>
                <div className='p-2 bg-mine-shaft-800 rounded-md'><img src="/Companies/Google.png" alt="" className='h-7 w-7' /></div>
                <div className='flex flex-col'>
                    <div className='font-semibold text-bright-sun-400'>{props.title}</div>
                    <div className='text-sm text-mine-shaft-300'>{props.issuer}</div>
                </div>
            </div>
            <div className='flex items-center gap-2'>
                <div className='flex flex-col items-end'>
                    <div className='text-sm text-mine-shaft-300'>{props.issueDate}</div>
                    <div className='text-sm text-mine-shaft-300'>ID : {props.certificateId}</div>
                </div>
                {
                    props.edit && <ActionIcon variant="subtle" color='red.8' size='lg'>
                        <IconTrash className='h-4/5 w-4/5' stroke={1.5} />
                    </ActionIcon>
                }
            </div>
        </div>
    )
}

export default CertificationCard