import React, { useState } from 'react'
import SelectInput from './SelectInput'
import fields from '../Data/Profile'
import { Button, Checkbox, Textarea } from '@mantine/core';
import { MonthPickerInput } from '@mantine/dates';

const ExpInput = (props: any) => {
    const select = fields;
    const [checked, setChecked] = useState(false);
    const [startDate, setStartDate] = useState<Date | null>(new Date())
    const [endDate, setEndDate] = useState<Date | null>(new Date())
    const [desc, setDesc] = useState('- Phát triển và duy trì hệ thống quản lý khách hàng (CRM) cho đối tác đến từ Nhật Bản sử dụng React, Redux Toolkit và Tailwind CSS. - Tham gia thiết kế và tối ưu UI/UX cho hơn 10 màn hình chính, đảm bảo performance và accessibility. - Tích hợp hệ thống CI/CD với GitLab và thực hiện test tự động bằng Jest và Testing Library. - Dẫn dắt nhóm 4 thành viên frontend và phối hợp chặt chẽ với backend team để triển khai API hiệu quả.')
    return (
        <div className='flex flex-col gap-2'>
            <div className='text-lg font-semibold'>{props.add ? "Add" :"Edit"} experience</div>
            <div className='flex gap-10 [&>*]:w-1/2'>
                <SelectInput {...select[0]} />
                <SelectInput {...select[1]} />
            </div>
            <SelectInput {...select[2]} />
            <Textarea withAsterisk
                label='Summary'
                value={desc}
                autosize minRows={3} placeholder='Enter summary'
                onChange={(event) => setDesc(event.currentTarget.value)}
            />
            <div className='flex gap-10 [&>*]:w-1/2'>
                <MonthPickerInput
                    maxDate={endDate || undefined}
                    label="Start date"
                    placeholder="Pick date"
                    value={startDate}
                    onChange={setStartDate}
                    withAsterisk
                />
                <MonthPickerInput
                    minDate={startDate || undefined}
                    maxDate={new Date()}
                    label="End date"
                    placeholder="Pick date"
                    value={endDate}
                    onChange={setEndDate}
                    withAsterisk
                    disabled={checked}
                />
            </div>
            <Checkbox checked={checked}
                onChange={(event) => setChecked(event.currentTarget.checked)} autoContrast label="Currently working here" />

            <div className="flex gap-5">
                <Button onClick={() => props.setEdit(false)} color="brightSun.4" variant="outline">Save</Button>
                <Button onClick={() => props.setEdit(false)} color="red.8" variant="outline">Cancel</Button>
            </div>
            
        </div>
    )
}

export default ExpInput