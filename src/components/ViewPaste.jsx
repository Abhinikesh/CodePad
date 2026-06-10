import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { FiCopy, FiCheck, FiArrowLeft, FiEdit2 } from 'react-icons/fi'

const ViewPaste = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const allPastes = useSelector((state) => state.paste.pastes)
  const paste = allPastes.find((p) => p._id === id)
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    if (!paste) return
    navigator.clipboard.writeText(paste.content)
    setCopied(true)
    toast.success('Copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  if (!paste) {
    return (
      <div className="min-h-screen bg-[#0f0f11] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-xl mb-4">Paste not found</p>
          <button
            onClick={() => navigate('/pastes')}
            className="text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
          >
            ← Back to Pastes
          </button>
        </div>
      </div>
    )
  }

  const lines = paste.content.split('\n')

  return (
    <div className="min-h-screen bg-[#0f0f11] p-6">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate('/pastes')}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-300 transition-colors mb-6 text-sm cursor-pointer"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to Pastes
        </button>

        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center mb-6">
          <input
            readOnly
            value={paste.title}
            className="flex-1 bg-[#1a1a2e] border border-[#2a2a40] rounded-xl px-4 py-3 text-white text-lg font-bold focus:outline-none cursor-default"
          />
          <button
            onClick={() => navigate(`/?pasteID=${paste._id}`)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-sky-500 hover:from-sky-400 hover:to-sky-400 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/25 whitespace-nowrap cursor-pointer"
          >
            <FiEdit2 className="w-4 h-4" />
            Edit This Paste
          </button>
        </div>

        <div className="rounded-xl overflow-hidden border border-[#2a2a40] shadow-2xl">
          <div className="flex items-center justify-between px-4 py-3 bg-[#1a1a2e] border-b border-[#2a2a40]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 text-gray-500 text-sm font-mono">
                {paste.title}.txt
              </span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#2a2a40] hover:bg-[#3a3a55] text-gray-400 hover:text-white rounded-lg transition-all text-sm font-mono cursor-pointer"
            >
              {copied ? (
                <FiCheck className="w-4 h-4 text-green-400" />
              ) : (
                <FiCopy className="w-4 h-4" />
              )}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          <div className="flex bg-[#0d1117] overflow-auto" style={{ maxHeight: '70vh' }}>
            <div
              className="flex flex-col items-end px-3 pt-4 pb-4 text-gray-600 text-sm font-mono select-none border-r border-[#2a2a40] bg-[#0d1117] sticky left-0"
              style={{ minWidth: '48px' }}
            >
              {lines.map((_, i) => (
                <span key={i} className="leading-6">
                  {i + 1}
                </span>
              ))}
            </div>
            <pre className="flex-1 text-gray-300 font-mono text-sm leading-6 px-4 pt-4 pb-4 overflow-x-auto whitespace-pre">
              {paste.content}
            </pre>
          </div>

          <div className="px-4 py-2 bg-[#1a1a2e] border-t border-[#2a2a40] flex items-center justify-between text-xs text-gray-600 font-mono">
            <span>{lines.length} line{lines.length !== 1 ? 's' : ''}</span>
            <span>
              {new Date(paste.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewPaste
