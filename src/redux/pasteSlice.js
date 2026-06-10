import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

const API = '/api/pastes'

export const fetchPastes = createAsyncThunk('paste/fetch', async () => {
  try {
    const res = await fetch(API)
    if (!res.ok) throw new Error()
    return await res.json()
  } catch {
    return JSON.parse(localStorage.getItem('pastes')) || []
  }
})

export const addToPastes = createAsyncThunk('paste/add', async (paste) => {
  try {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paste)
    })
    if (!res.ok) throw new Error()
    return await res.json()
  } catch {
    return paste
  }
})

export const updateToPastes = createAsyncThunk('paste/update', async (paste) => {
  try {
    const res = await fetch(`${API}/${paste._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paste)
    })
    if (!res.ok) throw new Error()
    return await res.json()
  } catch {
    return paste
  }
})

export const removeFromPastes = createAsyncThunk('paste/remove', async (id) => {
  try {
    await fetch(`${API}/${id}`, { method: 'DELETE' })
  } catch {}
  return id
})

const initialState = {
  pastes: JSON.parse(localStorage.getItem('pastes')) || [],
  loading: false
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    resetAllPastes: (state) => {
      state.pastes = []
      localStorage.removeItem('pastes')
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPastes.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchPastes.fulfilled, (state, action) => {
        state.loading = false
        state.pastes = action.payload
        localStorage.setItem('pastes', JSON.stringify(action.payload))
      })
      .addCase(addToPastes.fulfilled, (state, action) => {
        state.pastes.push(action.payload)
        localStorage.setItem('pastes', JSON.stringify(state.pastes))
        toast.success('Paste created!')
      })
      .addCase(updateToPastes.fulfilled, (state, action) => {
        const idx = state.pastes.findIndex((p) => p._id === action.payload._id)
        if (idx !== -1) state.pastes[idx] = action.payload
        localStorage.setItem('pastes', JSON.stringify(state.pastes))
        toast.success('Paste updated!')
      })
      .addCase(removeFromPastes.fulfilled, (state, action) => {
        state.pastes = state.pastes.filter((p) => p._id !== action.payload)
        localStorage.setItem('pastes', JSON.stringify(state.pastes))
        toast.success('Paste deleted!')
      })
  }
})

export const { resetAllPastes } = pasteSlice.actions

export default pasteSlice.reducer