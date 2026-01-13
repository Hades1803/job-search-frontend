  import { Menu, Avatar, Switch } from '@mantine/core'
  import {
    IconMessageCircle,
    IconUserCircle,
    IconFileText,
    IconMoon,
    IconSun,
    IconMoonStars,
    IconLogout2,
  } from '@tabler/icons-react'
  import { useState } from 'react'
  import { Link } from 'react-router-dom'
  import { useAuth } from '../Context/AuthContext'

  const ProfileMenu: React.FC = () => {
    const { isAuthenticated, logout } = useAuth()
    const [checked, setChecked] = useState(false)
    const [opened, setOpened] = useState(false)

    
    if (!isAuthenticated) return null

    return (
      <Menu shadow="md" width={200} opened={opened} onChange={setOpened}>
        <Menu.Target>
          <div className="flex items-center gap-2 cursor-pointer">
            <div>Tobias</div>
            <Avatar src="avatar.png" alt="avatar" />
          </div>
        </Menu.Target>

        <Menu.Dropdown>
          <Link to="/profile">
            <Menu.Item leftSection={<IconUserCircle size={14} />}>
              Profile
            </Menu.Item>
          </Link>

          <Link to="/messages">
            <Menu.Item leftSection={<IconMessageCircle size={14} />}>
              Messages
            </Menu.Item>
          </Link>

          <Link to="/resume">
            <Menu.Item leftSection={<IconFileText size={14} />}>
              Resume
            </Menu.Item>
          </Link>
          <Link to="/job-history">
                <Menu.Item leftSection={<IconFileText size={14} />}>
                  Job History
                </Menu.Item>
              </Link>
          <Menu.Item
            leftSection={<IconMoon size={14} />}
            rightSection={
              <Switch
                checked={checked}
                onChange={(event) =>
                  setChecked(event.currentTarget.checked)
                }
                size="md"
                color="dark.4"
                onLabel={
                  <IconSun
                    size={16}
                    stroke={2.5}
                    color="var(--mantine-color-yellow-4)"
                  />
                }
                offLabel={
                  <IconMoonStars
                    size={16}
                    stroke={2.5}
                    color="var(--mantine-color-blue-6)"
                  />
                }
              />
            }
          >
            Dark Mode
          </Menu.Item>

          <Menu.Divider />

          <Menu.Item
            color="red"
            leftSection={<IconLogout2 size={14} />}
            onClick={logout}
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    )
  }

  export default ProfileMenu
