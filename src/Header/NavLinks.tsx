import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'

const NavLinks: React.FC = () => {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  const links = [
    { name: 'Find Jobs', url: 'find-jobs' },
    { name: 'Find Talent', url: 'find-talents' },
    { name: 'Post Job', url: 'post-job' },
    { name: 'Posted Job', url: 'posted-job' },
    { name: 'Job History', url: 'job-history' },
    // ❗ Login xử lý riêng
  ]

  return (
    <div className="flex gap-5 text-mine-shaft-300 h-full items-center">
      {links.map((link, index) => (
        <div
          key={index}
          className={`${
            location.pathname === '/' + link.url
              ? 'border-bright-sun-400 text-bright-sun-400'
              : 'border-transparent'
          } border-t-[3px] h-full flex items-center`}
        >
          <Link to={`/${link.url}`}>{link.name}</Link>
        </div>
      ))}

      {/* 👇 CHỈ HIỂN THỊ KHI CHƯA LOGIN */}
      {!isAuthenticated && (
        <div
          className={`${
            location.pathname === '/login'
              ? 'border-bright-sun-400 text-bright-sun-400'
              : 'border-transparent'
          } border-t-[3px] h-full flex items-center`}
        >
          <Link to="/login">Login</Link>
        </div>
      )}
    </div>
  )
}

export default NavLinks
