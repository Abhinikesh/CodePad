import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import { createClient } from '@supabase/supabase-js'
import { getDeviceId } from '../deviceId'

const supabase = createClient(
  'https://chioyuyxbsmayejpwmwc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNoaW95dXl4YnNtYXllanB3bXdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwOTAwNjcsImV4cCI6MjA5NjY2NjA2N30.HSnT6uOFLPFVQQlpZn1zUu9bezvlrggplfyjB4GGcrM'
)

export const fetchPastes = createAsyncThunk('paste/fetch', async () => {
  const device_id = getDeviceId()
  const { data, error } = await supabase
    .from('Codepad')
    .select('*')
    .eq('device_id', device_id)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
})

export const addToPastes = createAsyncThunk('paste/add', async (paste) => {
  const device_id = getDeviceId()
  const { data, error } = await supabase
    .from('Codepad')
    .insert([{ id: paste._id, title: paste.title, content: paste.content, device_id }])
    .select()
    .single()
  if (error) throw error
  return { ...data, _id: data.id }
})

export const updateToPastes = createAsyncThunk('paste/update', async (paste) => {
  const device_id = getDeviceId()
  const { data, error } = await supabase
    .from('Codepad')
    .update({ title: paste.title, content: paste.content })
    .eq('id', paste._id)
    .eq('device_id', device_id)
    .select()
    .single()
  if (error) throw error
  return { ...data, _id: data.id }
})

export const removeFromPastes = createAsyncThunk('paste/remove', async (id) => {
  const device_id = getDeviceId()
  const { error } = await supabase
    .from('Codepad')
    .delete()
    .eq('id', id)
    .eq('device_id', device_id)
  if (error) throw error
  return id
})

const initialState = {
  pastes: [],
  loading: false
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    resetAllPastes: (state) => {
      state.pastes = []
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPastes.pending, (state) => { state.loading = true })
      .addCase(fetchPastes.fulfilled, (state, action) => {
        state.loading = false
        state.pastes = action.payload
      })
      .addCase(fetchPastes.rejected, (state) => { state.loading = false })
      .addCase(addToPastes.fulfilled, (state, action) => {
        state.pastes.unshift(action.payload)
        toast.success('Paste created!')
      })
      .addCase(updateToPastes.fulfilled, (state, action) => {
        const idx = state.pastes.findIndex((p) => p._id === action.payload._id)
        if (idx !== -1) state.pastes[idx] = action.payload
        toast.success('Paste updated!')
      })
      .addCase(removeFromPastes.fulfilled, (state, action) => {
        state.pastes = state.pastes.filter((p) => p._id !== action.payload)
        toast.success('Paste deleted!')
      })
  }
})

export const { resetAllPastes } = pasteSlice.actions
export default pasteSlice.reducer
