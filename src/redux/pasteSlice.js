import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  pastes: JSON.parse(localStorage.getItem('pastes')) || []  // ✅ fixed: was just `localStorage`
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      state.pastes.push(action.payload)
      localStorage.setItem('pastes', JSON.stringify(state.pastes))
    },
    updateToPastes: (state, action) => {
      const { id, content } = action.payload
      const pasteIndex = state.pastes.findIndex(paste => paste.id === id)
      if (pasteIndex !== -1) {
        state.pastes[pasteIndex].content = content
        localStorage.setItem('pastes', JSON.stringify(state.pastes))
      }
    },
    resetAllPastes: (state, action) => {
      state.pastes = []
      localStorage.removeItem('pastes')
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
    removeFromPastes: (state, action) => {
      const id = action.payload
      state.pastes = state.pastes.filter(paste => paste.id !== id)
      localStorage.setItem('pastes', JSON.stringify(state.pastes))
    },
  },
})

// ✅ fixed: exporting only actions that are actually defined above
export const { addToPastes, updateToPastes, resetAllPastes, decrement, incrementByAmount, removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer