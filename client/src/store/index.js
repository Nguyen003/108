import { configureStore, createSlice } from "@reduxjs/toolkit";

// Tạo slice
const selectSlice = createSlice({
    name: "select",
    initialState: {
        selectValueUnit: "",
        selectValueField: ""
    },
    reducers: {
        setSelectValueUnit: (state, action) => {
            state.selectValueUnit = action.payload;
        },
        setSelectValueField: (state, action) => { 
            state.selectValueField = action.payload;
        }
    }
})

// Xuất các actions
export const { setSelectValueUnit, setSelectValueField } = selectSlice.actions;

// cấu hình stored
export const store = configureStore({
    reducer: {
        select: selectSlice.reducer,
        // Tùy chỉnh các reducer khác ở đây...
    }
});