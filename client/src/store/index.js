import { configureStore, createSlice } from "@reduxjs/toolkit";

// Tạo slice
const selectSlice = createSlice({
    name: "select",
    initialState: {
        selectValueUnit: "",
        selectValueField: "",
        isAdmin: false // Biến này để xác đ��nh người dùng đang đăng nhập có phải là admin hay không.
    },
    reducers: {
        setSelectValueUnit: (state, action) => {
            state.selectValueUnit = action.payload;
        },
        setSelectValueField: (state, action) => { 
            state.selectValueField = action.payload;
        },
        setIsAdmin: (state, action) => { 
            state.isAdmin = action.payload;
        }
    }
})

// Xuất các actions
export const { setSelectValueUnit, setSelectValueField, setIsAdmin } = selectSlice.actions;

// cấu hình stored
export const store = configureStore({
    reducer: {
        select: selectSlice.reducer,
        // Tùy chỉnh các reducer khác ở đây...
    }
});