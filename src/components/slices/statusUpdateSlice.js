import { createSlice } from "@reduxjs/toolkit";
import * as Constants from "../common/utils/Constants";

export const statusUpdateSlice = createSlice({
    name: 'statusUpdate',
    initialState: {
        eaStatusUpdate: 1,
        pfStatusUpdate: 1,
        isJobComplete: '',
    },
    reducers: {
        // increment state as new status arrives
        increment: (state, action) => {
            if (action.payload === Constants.type_earthaccess)
                state.eaStatusUpdate += 1
            else
                state.pfStatusUpdate += 1
        },
        downloadCompleted: (state, action) => {
            state.isJobComplete = action.payload
        },
    },
})

export const { increment, downloadCompleted } = statusUpdateSlice.actions
export default statusUpdateSlice.reducer