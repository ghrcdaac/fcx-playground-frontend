import { configureStore } from "@reduxjs/toolkit";
import statusUpdateSlice from "../slices/statusUpdateSlice";

export default configureStore({
    reducer: {
        statusUpdate: statusUpdateSlice,
    },
})