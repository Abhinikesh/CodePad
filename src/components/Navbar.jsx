import { NavLink } from 'react-router-dom'
import { FiFileText } from 'react-icons/fi'


const Navbar = () => {
  return (
    <nav className="bg-[#0f0f11] border-b border-[#2a2a40] sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-gradient-to-br from-sky-400 to-sky-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-shadow">
            <FiFileText className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">CodePad</span>
        </NavLink>

        <div className="flex items-center gap-1">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive
                ? 'bg-indigo-500/20 text-indigo-400'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/pastes"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive
                ? 'bg-indigo-500/20 text-indigo-400'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            Pastes
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
