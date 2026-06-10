import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { addToPastes, updateToPastes } from '../redux/pasteSlice'
import toast from 'react-hot-toast'

const Home = () => {
  const [title, setTitle] = useState('')
  const [value, setValue] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const pasteID = searchParams.get('pasteID')
  const dispatch = useDispatch()
  const allPastes = useSelector((state) => state.paste.pastes)

  useEffect(() => {
    if (pasteID) {
      const existingPaste = allPastes.find((p) => p._id === pasteID)
      if (existingPaste) {
        setTitle(existingPaste.title)
        setValue(existingPaste.content)
      }
    } else {
      setTitle('')
      setValue('')
    }
  }, [pasteID])

  function createPaste() {
    if (!title.trim()) {
      toast.error('Please enter a title!')
      return
    }
    if (!value.trim()) {
      toast.error('Please enter some content!')
      return
    }
    const duplicateTitle = allPastes.find((p) => p.title === title && p._id !== pasteID)
    if (duplicateTitle) {
      toast.error('Paste with this title already exists!')
      return
    }

    const paste = {
      title,
      content: value,
      _id: pasteID || Date.now().toString(36),
    }

    if (pasteID) {
      dispatch(updateToPastes(paste))
    } else {
      dispatch(addToPastes(paste))
    }

    setTitle('')
    setValue('')
    setSearchParams('')
  }

  const lineCount = value.split('\n').length

  return (
    <div className="min-h-screen bg-[#0f0f11] p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-1">
            {pasteID ? 'Edit Paste' : 'Create New Paste'}
          </h1>
          <p className="text-gray-500 text-sm">Save your code snippets and notes securely</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            className="flex-1 bg-[#1a1a2e] border border-[#2a2a40] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors text-lg"
            type="text"
            placeholder="Enter title here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            onClick={createPaste}
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-sky-500 hover:from-sky-400 hover:to-sky-400 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/25 whitespace-nowrap cursor-pointer"
          >
            {pasteID ? 'Update My Paste' : 'Create My Paste'}
          </button>
        </div>

        <div className="rounded-xl overflow-hidden border border-[#2a2a40] shadow-2xl">
          <div className="flex items-center gap-2 px-4 py-3 bg-[#1a1a2e] border-b border-[#2a2a40]">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-gray-500 text-sm font-mono">
              {title ? `${title}.txt` : 'untitled.txt'}
            </span>
          </div>
          <div className="flex bg-[#0d1117]" style={{ minHeight: '420px' }}>
            <div
              className="flex flex-col items-end px-3 pt-3 pb-3 bg-[#0d1117] text-gray-600 text-sm font-mono select-none border-r border-[#2a2a40]"
              style={{ minWidth: '48px' }}
            >
              {Array.from({ length: Math.max(lineCount, 1) }, (_, i) => (
                <span key={i} className="leading-6">{i + 1}</span>
              ))}
            </div>
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="flex-1 bg-[#0d1117] text-gray-300 font-mono text-sm leading-6 px-4 pt-3 pb-3 resize-none focus:outline-none w-full"
              placeholder="// Enter your code or notes here..."
              style={{ minHeight: '420px' }}
              spellCheck={false}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home