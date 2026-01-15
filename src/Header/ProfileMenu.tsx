import { Menu, Avatar, Switch } from '@mantine/core'
import {
  IconMessageCircle,
  IconUserCircle,
  IconFileText,
  IconMoon,
  IconLogout2,
} from '@tabler/icons-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'

const ProfileMenu: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth()
  const [checked, setChecked] = useState(false)
  const [opened, setOpened] = useState(false)

  if (!isAuthenticated || !user) return null

  const profileLink =
    user.role === 'CANDIDATE'
      ? '/candidate/profile'
      : user.role === 'EMPLOYER'
      ? '/employer/profile'
      : '/'

  return (
    <Menu shadow="md" width={220} opened={opened} onChange={setOpened}>
      <Menu.Target>
        <div className="flex items-center gap-2 cursor-pointer">
          <div>{user.email}</div>
          <Avatar alt="avatar" />
        </div>
      </Menu.Target>

      <Menu.Dropdown>
        <Link to={profileLink}>
          <Menu.Item leftSection={<IconUserCircle size={14} />}>
            Profile
          </Menu.Item>
        </Link>

        {/* Menu riêng cho CANDIDATE */}
        {user.role === 'CANDIDATE' && (
          <>
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
          </>
        )}

        {/* Menu riêng cho EMPLOYER */}
        {user.role === 'EMPLOYER' && (
          <>
            <Link to="/employer/jobs">
              <Menu.Item leftSection={<IconFileText size={14} />}>
                My Jobs
              </Menu.Item>
            </Link>

            <Link to="/employer/applications">
              <Menu.Item leftSection={<IconMessageCircle size={14} />}>
                Applications
              </Menu.Item>
            </Link>
          </>
        )}

        <Menu.Item
          leftSection={<IconMoon size={14} />}
          rightSection={
            <Switch
              checked={checked}
              onChange={(e) => setChecked(e.currentTarget.checked)}
              size="md"
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
