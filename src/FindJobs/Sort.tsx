import { useState } from 'react';
import { ActionIcon, Combobox, useCombobox } from '@mantine/core';
import { IconAdjustments } from '@tabler/icons-react';

const option = ['Relevance', 'Most Recent', 'Salary (Low to High)', 'Salary (High to Low)'];

function Sort() {
    const [selectedItem, setSelectedItem] = useState<string | null>("Relevance");
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const options = option.map((item) => (
        <Combobox.Option className='!text-xs' value={item} key={item}>
            {item}
        </Combobox.Option>
    ));

    return (
        <>
            <Combobox
                store={combobox}
                width={250}
                position="bottom-start"
                onOptionSubmit={(val) => {
                    setSelectedItem(val);
                    combobox.closeDropdown();
                }}
            >
                <Combobox.Target>
                    <div onClick={()=>combobox.toggleDropdown()} className='border border-bright-sun-400 flex items-center p-2 rounded-xl cursor-pointer gap-2 text-sm'>
                        {selectedItem}<ActionIcon color='brightSun.4' variant='transparent' aria-label='Settings'> <IconAdjustments className='text-bright-sun-400 h-7 w-7'/></ActionIcon>
                    </div>
                </Combobox.Target>

                <Combobox.Dropdown>
                    <Combobox.Options>{options}</Combobox.Options>
                </Combobox.Dropdown>
            </Combobox>
        </>
    );
}

export { Sort }