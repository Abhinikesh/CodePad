import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { addToPastes, updateToPastes } from '../redux/pasteSlice'

const Home = () => {
    const [title, setTitle] = useState("");
    const [value, setValue] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteID = searchParams.get("pasteID");
    const dispatch = useDispatch();
    const allPastes = useSelector((state) => state.paste.pastes);

    function createPaste() {
        const paste = { 
            title: title,
            content: value,
            _id: pasteID || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        }

        useEffect(() => {
            if(pasteID) {
                const existingPaste = allPastes.find(p => p._id === pasteID);
                if(existingPaste) {
                    setTitle(existingPaste.title);
                    setValue(existingPaste.content);
                }
            }
        }, [pasteID])

        if(pasteID) {
            dispatch(updateToPastes(paste))
        } else {
            dispatch(addToPastes(paste))
        }

        setTitle("");
        setValue("");
        setSearchParams("");
    }

    return (
        <>
        <div className="flex flex-row gap-7">
          <input 
          className="border-2 border-gray-300 rounded-md p-2"
          type="text" 
          placeholder="Enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)} />

          <button 
          onClick={createPaste}
          className="border-2 border-gray-300 rounded-md p-2">
            {pasteID ? "Update My Paste" : "Create My Paste"}
          </button>
        </div>
        <div>
            <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="border-2 border-gray-300 rounded-md p-2 w-full h-[400px] mt-4"
            placeholder="Enter your code here"
            />
        </div>
        </>
    );
};

export default Home