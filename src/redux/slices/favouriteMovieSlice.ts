// src/store/slices/favouritesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  popularity: number;
  overview: string;
};

interface FavouritesState {
  items: Movie[];
}

const initialState: FavouritesState = {
  items: [],
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addToFavourites: (state, action: PayloadAction<Movie>) => {
      const exists = state.items.find(movie => movie.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFromFavourites: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(movie => movie.id !== action.payload);
    },
  },
});

export const { addToFavourites, removeFromFavourites, } = favouritesSlice.actions;

export default favouritesSlice.reducer;
