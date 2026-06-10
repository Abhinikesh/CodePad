import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Paste = () => {

    const pastes = useSelector((state) => state.paste.pastes);
    const [searchTerm, setSearchTerm] = useState('');
    const [starredPastes, setStarredPastes] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const filteredData = pastes.filter((paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase()));

    function handleDelete(pasteId) {
        dispatch(removeFromPastes(pasteId))
        toast.success('Paste deleted successfully!')
    }

    function handleEdit(pasteId) {
        navigate(`/?pasteID=${pasteId}`)
    }

    function handleView(pasteId) {
        navigate(`/paste/${pasteId}`)
    }

    function handleDownload(paste) {
        const element = document.createElement('a');
        const file = new Blob([paste.content], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `${paste.title}.txt`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        toast.success('Paste downloaded!')
    }

    function handleShare(paste) {
        const shareText = `Check out this paste: ${paste.title}\n\n${paste.content}`;
        navigator.clipboard.writeText(shareText)
        toast.success('Paste shared to clipboard!')
    }

    function handleStar(pasteId) {
        setStarredPastes([...starredPastes, pasteId])
        toast.success('Paste starred!')
    }

    function handleUnstar(pasteId) {
        setStarredPastes(starredPastes.filter(id => id !== pasteId))
        toast.success('Paste unstarred!')
    }

    return (
        <div>
            <input
                className="border-2 border-gray-300 rounded-md p-2 w-full"
                type='search'
                placeholder='Search here'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex flex-col gap-4 mt-4">
                {
                    filteredData.length === 0 ? (
                        <p>No pastes found</p>
                    ) : (
                        filteredData.map((paste) => (
                            <div key={paste._id}>
                                <div className="border-2 border-gray-300 rounded-md p-4">
                                    <h3>{paste.title}</h3>
                                    <p>{paste.content}</p>
                                </div>
                                <div>
                                    <div className='flex row gap-4 place-content-evenly'>
                                        <span>{paste.author}</span>
                                        <button onClick={() => handleEdit(paste._id)}>
                                            Edit
                                        </button>
                                        <button onClick={() => handleView(paste._id)}>
                                            View
                                        </button>
                                        <button onClick={() => handleDelete(paste._id)}>
                                            Delete
                                        </button>
                                        <button onClick={() => {
                                            navigator.clipboard.writeText(paste.content)
                                            toast.success('Paste content copied to clipboard!')
                                        }}>
                                            Copy
                                        </button>
                                        <button onClick={() => handleShare(paste)}>
                                            Share
                                        </button>
                                        <button onClick={() => handleDownload(paste)}>
                                            Download
                                        </button>
                                        {starredPastes.includes(paste._id) ? (
                                            <button onClick={() => handleUnstar(paste._id)}>
                                                Unstar
                                            </button>
                                        ) : (
                                            <button onClick={() => handleStar(paste._id)}>
                                                Star
                                            </button>
                                        )}
                                    </div>
                                    <div>
                                        {paste.createdAt}
                                    </div>
                                </div>
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    )
}

export default Paste