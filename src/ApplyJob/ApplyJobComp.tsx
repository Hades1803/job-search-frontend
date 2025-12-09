import { Button, Divider, FileInput, LoadingOverlay, Notification, NumberInput, Textarea, TextInput } from '@mantine/core'
import { IconCheck, IconPaperclip } from '@tabler/icons-react'
import  {  useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ApplyJobComp = () => {
    const [preview, setPreview] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [sec, setSec] = useState(5);
    const navigate = useNavigate();
    const handlePreview = () => {
        setPreview(!preview);
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    const handleSubmit = () => {
        setSubmit(true);
        let x = 5;
        setInterval(() => {
            x--;
            setSec(x);
            if (x === 0)
                navigate("/find-jobs")
        }, 1000)
    }
    return (
        <>
            <div className='w-2/3 mx-auto'>
                <LoadingOverlay className='!fixed'
                    visible={submit}
                    zIndex={1000}
                    overlayProps={{ radius: 'sm', blur: 2 }}
                    loaderProps={{ color: 'brightSun.4', type: 'bars' }}
                />
                <div className='flex justify-between'>
                    <div className='flex gap-2 items-center'>
                        <div className='p-3 bg-mine-shaft-800 rounded-xl'><img src="/Companies/Amazon.png" alt="" className='h-14 w-14' /></div>
                        <div>
                            <div className='font-semibold text-2xl'>Devops Engineer</div>
                            <div className='text-lg text-mine-shaft-300'> Google &#x2022; 3 days ago &#x2022; 100 applicant</div>
                        </div>
                    </div>
                </div>
                <Divider my='xl' />
                <div className='text-xl font-semibold mb-5 '>Submit Your Appliocation</div>
                <div className='flex flex-col gap-5'>
                    <div className='flex gap-10 [&>*]:w-1/2'>
                        <TextInput
                            readOnly={preview}
                            variant={preview ? 'unstyled' : 'default'}
                            className={preview ? 'text-mine-shaft-300 font-semibold' : ''}
                            label="Full Name"
                            placeholder="Enter your full name"
                            withAsterisk
                        />
                        <TextInput
                            readOnly={preview}
                            variant={preview ? 'unstyled' : 'default'}
                            className={preview ? 'text-mine-shaft-300 font-semibold' : ''}
                            label="Email"
                            placeholder="Enter your email"
                            withAsterisk
                        />
                    </div>

                    <div className='flex gap-10 [&>*]:w-1/2'>
                        <NumberInput
                            readOnly={preview}
                            variant={preview ? 'unstyled' : 'default'}
                            className={preview ? 'text-mine-shaft-300 font-semibold' : ''}
                            label="Phone Number"
                            placeholder="Enter your phone number"
                            withAsterisk
                            hideControls
                            min={0}
                            max={9999999999}
                            clampBehavior='strict'
                        />
                        <TextInput
                            readOnly={preview}
                            variant={preview ? 'unstyled' : 'default'}
                            className={preview ? 'text-mine-shaft-300 font-semibold' : ''}
                            label="Personal Website"
                            placeholder="Enter url"
                            withAsterisk
                        />
                    </div>

                    <FileInput
                        readOnly={preview}
                        variant={preview ? 'unstyled' : 'default'}
                        className={preview ? 'text-mine-shaft-300 font-semibold' : ''}
                        leftSection={<IconPaperclip stroke={1.5} />}
                        label="Attach your CV"
                        placeholder="Your CV"
                        leftSectionPointerEvents="none"
                        withAsterisk
                    />

                    <Textarea
                        readOnly={preview}
                        variant={preview ? 'unstyled' : 'default'}
                        className={preview ? 'text-mine-shaft-300 font-semibold' : ''}
                        withAsterisk
                        placeholder="Type something about yourself..."
                        label="Cover Letter"
                        autosize
                        minRows={4}
                    />
                    {
                        !preview && <Button color='brightSun.4' variant='outline' onClick={handlePreview}>Preview</Button>

                    }
                    {
                        preview && <div className='flex gap-10 [&>*]:w-1/2'>
                            <Button fullWidth color='brightSun.4' variant='outline' onClick={handlePreview}>Edit</Button>
                            <Button fullWidth color='brightSun.4' variant='light' onClick={handleSubmit}>Submit</Button>
                        </div>
                    }
                </div>
            </div>
            <Notification
                className={`!border-bright-sun-400 z-[1001] !fixed top-0 left-[40%] transition-all duration-500 ${submit ? "translate-y-0" : "-translate-y-24"
                    }`}
                icon={<IconCheck />}
                color="teal"
                title="Application Submitted!"
                withBorder
                mt="md"
                withCloseButton={false}
            >
                Redirecting to Find Jobs in {sec} seconds...
            </Notification>


        </>
    )
}

export default ApplyJobComp