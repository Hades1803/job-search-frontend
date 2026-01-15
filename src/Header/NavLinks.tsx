import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'

const NavLinks: React.FC = () => {
  const { isAuthenticated, user } = useAuth()
  const location = useLocation()

  const links = [
    { name: 'Tìm Việc Làm', url: 'find-jobs', roles: ['CANDIDATE', 'EMPLOYER', 'GUEST'] },
    { name: 'Tìm Ứng Viên', url: 'find-talents', roles: ['EMPLOYER'] },
    { name: 'Đăng Tin Tuyển Dụng', url: 'post-job', roles: ['EMPLOYER'] },
    { name: 'Posted Job', url: 'posted-job', roles: ['EMPLOYER'] },
  ]

  
  const currentRole = !isAuthenticated
    ? 'GUEST'
    : user?.role ?? 'GUEST'

  return (
    <div className="flex gap-5 text-mine-shaft-300 h-full items-center">
      {links.map((link, index) => {
        const canView = link.roles.includes(currentRole)

        return (
          <div
            key={index}
            className={`border-t-[3px] h-full flex items-center transition-all duration-200
              ${
                location.pathname === '/' + link.url
                  ? 'border-bright-sun-400 text-bright-sun-400'
                  : 'border-transparent'
              }
              ${
                canView
                  ? 'opacity-100'
                  : 'opacity-0 pointer-events-none'
              }
            `}
          >
            <Link to={`/${link.url}`}>{link.name}</Link>
          </div>
        )
      })}

      {/* LOGIN – LUÔN CÓ VỊ TRÍ */}
      <div
        className={`border-t-[3px] h-full flex items-center transition-all duration-200
          ${
            location.pathname === '/login'
              ? 'border-bright-sun-400 text-bright-sun-400'
              : 'border-transparent'
          }
          ${
            isAuthenticated
              ? 'opacity-0 pointer-events-none'
              : 'opacity-100'
          }
        `}
      >
        <Link to="/login">Login</Link>
      </div>
    </div>
  )
}

export default NavLinks
