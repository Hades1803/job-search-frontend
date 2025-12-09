import {  Indicator } from "@mantine/core"
import { IconAnchor, IconBell, IconSettings } from "@tabler/icons-react"
import NavLinks from "./NavLinks"
import { useLocation } from "react-router-dom"
import ProfileMenu from "./ProfileMenu"


const Header = () => {
    const location = useLocation();

    return ( location.pathname !=="/signup" &&  location.pathname !== "/login" ?
        <div className="w-full bg-mine-shaft-950 text-white h-28 flex justify-between px-6 items-center font-['poppins']">
            <div className="flex gap-1 items-center text-bright-sun-400">
                <IconAnchor className="w-10 h-10" stroke={2.5} />
                <div className="text-3xl font-semibold">
                    Job Finder
                </div>
            </div>
            {NavLinks()}
            <div className="flex gap-5 items-center">
                <ProfileMenu/>
                <div className="bg-mine-shaft-900 p-1 rounded-full">
                    <IconSettings stroke={1.5} />
                </div>

                <div className="bg-mine-shaft-900 p-1 rounded-full">
                    <Indicator color="brightSun.4" size={8} offset={6} processing>
                        <IconBell stroke={1.5} />
                    </Indicator>
                </div>
            </div>
        </div>:<></>
    )
}

export default Header