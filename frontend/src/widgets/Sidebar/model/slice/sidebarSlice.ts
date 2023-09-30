import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SidebarSchema } from '../types/sidebar';

const initialState: SidebarSchema = {
    sidebarShow: true,
    sidebarUnfoldable: false,
};

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        setShow: (state, action: PayloadAction<boolean>) => {
            state.sidebarShow = action.payload;
        },
        toggleShow: (state) => {
            state.sidebarShow = !state.sidebarShow;
        },
        toggleUnfoldable: (state) => {
            state.sidebarUnfoldable = !state.sidebarUnfoldable;
        },
    },
});

export const { actions: sidebarActions } = sidebarSlice;
export const { reducer: sidebarReducer } = sidebarSlice;
