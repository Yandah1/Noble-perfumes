import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  search: string;
  category: string;
}

const initialState: SearchState = {
  search: '',
  category: 'all',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
  },
});

export const { setSearch, setCategory } = searchSlice.actions;
export default searchSlice.reducer;
