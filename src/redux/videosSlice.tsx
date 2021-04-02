import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from './store';

const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

interface VideosState {
  status: string;
  error: string;
  list: number[];
}

const initialState: VideosState = {
  status: 'init',
  error: '',
  list: [],
};

// A function that accepts an initial state, an object full of reducer functions, and a "slice name",
// and automatically generates action creators and action types that correspond to the reducers and state.
export const videosSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    fetchVideos: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based on those changes
      state.status = 'loading';
    },
    fetchVideosSuccess: (state, action: PayloadAction<number[]>) => {
      state.status = 'success';
      state.list = action.payload;
    },
    fetchVideosFail: (state, action: PayloadAction<string>) => {
      state.status = 'error';
      state.error = action.payload;
    },
  },
});

export const {
  fetchVideos,
  fetchVideosSuccess,
  fetchVideosFail,
} = videosSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(thunkFetchVideos()))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const thunkFetchVideos = (): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchVideos());
    console.time('asyncFake');
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log('done async fake');
        console.timeEnd('asyncFake');
        resolve(true);
      }, 5000);
    });
    dispatch(fetchVideosSuccess(list));
  } catch (error) {
    dispatch(fetchVideosFail(error.message));
  }
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useAppSelector(state => state.counter.value)`
export const selectVideosList = (state: RootState) => state.videos.list;

export default videosSlice.reducer;
