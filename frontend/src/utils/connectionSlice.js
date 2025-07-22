import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: 'connection',
    initialState:[],
    reducers:{
        addConnections : (state, action) =>{
            return action.payload;
        },
        removeConnections: (state, action) => {
  return state.filter(user => user._id !== action.payload);
}
    }
});

export const {addConnections, removeConnections} = connectionSlice.actions;
export default connectionSlice.reducer;