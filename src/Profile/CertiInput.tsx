import { Button, TextInput } from "@mantine/core"
import SelectInput from "./SelectInput"
import fields from "../Data/Profile"
import { MonthPickerInput } from "@mantine/dates";
import { useState } from "react";


const CertiInput = (props: any) => {
    const select = fields;
    const [issueDate,setIssueDate] = useState<Date | null>(new Date());
    return (
        <div className='flex flex-col gap-2'>
            <div className="text-lg font-semibold">Add Certificate</div>
            <div className='flex gap-10 [&>*]:w-1/2'>
                <TextInput
                    label="Tile"
                    withAsterisk
                    placeholder="Enter title"
                />
                <SelectInput {...select[1]} />
            </div>
            <div className='flex gap-10 [&>*]:w-1/2'>
                <MonthPickerInput
                    maxDate={new Date()}
                    label="Issue date"
                    placeholder="Pick date"
                    value={issueDate}
                    onChange={setIssueDate}
                    withAsterisk
                />
                <TextInput
                    label="Cetification ID"
                    withAsterisk
                    placeholder="Enter ID"
                />
            </div>
            <div className="flex gap-5">
                <Button onClick={() => props.setEdit(false)} color="brightSun.4" variant="outline">Save</Button>
                <Button onClick={() => props.setEdit(false)} color="red.8" variant="outline">Cancel</Button>
            </div>
        </div>
    )
}

export default CertiInput