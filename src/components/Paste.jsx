import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import {
  FiEdit2,
  FiTrash2,
  FiEye,
  FiCopy,
  FiShare2,
  FiDownload,
  FiStar,
  FiSearch,
  FiCalendar,
  FiCode
} from 'react-icons/fi'

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes)
  const [searchTerm, setSearchTerm] = useState('')
  const [starredPastes, setStarredPastes] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId))
  }

  function handleEdit(pasteId) {
    navigate(`/?pasteID=${pasteId}`)
  }

  function handleView(pasteId) {
    navigate(`/pastes/${pasteId}`)
  }

  function handleDownload(paste) {
    const element = document.createElement('a')
    const file = new Blob([paste.content], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `${paste.title}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    toast.success('Downloaded!')
  }

  function handleShare(paste) {
    const shareText = `Check out this paste: ${paste.title}\n\n${paste.content}`
    navigator.clipboard.writeText(shareText)
    toast.success('Share text copied!')
  }

  function handleStar(pasteId) {
    setStarredPastes([...starredPastes, pasteId])
    toast.success('Starred!')
  }

  function handleUnstar(pasteId) {
    setStarredPastes(starredPastes.filter((id) => id !== pasteId))
    toast.success('Unstarred!')
  }

  return (
    <div className="min-h-screen bg-[#0f0f11] p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-1">My Pastes</h1>
          <p className="text-gray-500 text-sm">
            {pastes.length} paste{pastes.length !== 1 ? 's' : ''} saved
          </p>
        </div>

        <div className="relative mb-6">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
          <input
            className="w-full bg-[#1a1a2e] border border-[#2a2a40] rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
            type="search"
            placeholder="Search pastes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-4">
          {filteredData.length === 0 ? (
            <div className="text-center py-24">
              <FiCode className="mx-auto w-12 h-12 text-gray-700 mb-4" />
              <p className="text-gray-500 text-lg">No pastes found</p>
              <p className="text-gray-600 text-sm mt-1">
                Create your first paste to get started
              </p>
            </div>
          ) : (
            filteredData.map((paste) => (
              <div
                key={paste._id}
                className="bg-[#1a1a2e] border border-[#2a2a40] rounded-xl p-5 hover:border-indigo-500/40 transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="text-xs font-bold bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/30 font-mono shrink-0">
                      CODE
                    </span>
                    <h3 className="text-white font-bold text-lg truncate">{paste.title}</h3>
                  </div>
                  <div className="flex items-center gap-0.5 shrink-0">
                    <button
                      onClick={() => handleEdit(paste._id)}
                      className="p-2 text-gray-500 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <FiEdit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleView(paste._id)}
                      className="p-2 text-gray-500 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors cursor-pointer"
                      title="View"
                    >
                      <FiEye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(paste.content)
                        toast.success('Copied to clipboard!')
                      }}
                      className="p-2 text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors cursor-pointer"
                      title="Copy"
                    >
                      <FiCopy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleShare(paste)}
                      className="p-2 text-gray-500 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-colors cursor-pointer"
                      title="Share"
                    >
                      <FiShare2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDownload(paste)}
                      className="p-2 text-gray-500 hover:text-yellow-400 hover:bg-yellow-500/10 rounded-lg transition-colors cursor-pointer"
                      title="Download"
                    >
                      <FiDownload className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        starredPastes.includes(paste._id)
                          ? handleUnstar(paste._id)
                          : handleStar(paste._id)
                      }
                      className={`p-2 rounded-lg transition-colors cursor-pointer ${
                        starredPastes.includes(paste._id)
                          ? 'text-yellow-400 hover:bg-yellow-500/10'
                          : 'text-gray-500 hover:text-yellow-400 hover:bg-yellow-500/10'
                      }`}
                      title={starredPastes.includes(paste._id) ? 'Unstar' : 'Star'}
                    >
                      <FiStar
                        className={`w-4 h-4 ${starredPastes.includes(paste._id) ? 'fill-yellow-400' : ''}`}
                      />
                    </button>
                    <button
                      onClick={() => handleDelete(paste._id)}
                      className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-gray-500 text-sm font-mono bg-[#0d1117] rounded-lg px-4 py-3 line-clamp-3 border border-[#2a2a35] whitespace-pre-wrap">
                  {paste.content}
                </p>

                <div className="flex items-center gap-2 mt-3 text-gray-600 text-xs">
                  <FiCalendar className="w-3 h-3" />
                  <span>
                    {new Date(paste.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Paste