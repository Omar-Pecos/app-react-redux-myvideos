import { AnyAction } from 'redux';
import { RootState } from '../store';
import { ThunkAction } from 'redux-thunk';
import {
  FETCH_VIDEOS,
  FETCH_VIDEOS_FAIL,
  FETCH_VIDEOS_SUCCESS,
} from './actionTypes';

const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const fetchVideos = (): AnyAction => ({
  type: FETCH_VIDEOS,
});

const fetchVideosSuccess = (videos: number[]): AnyAction => ({
  type: FETCH_VIDEOS_SUCCESS,
  videos,
});

const fetchVideosFail = (error: string): AnyAction => ({
  type: FETCH_VIDEOS_FAIL,
  error: error || 'some error m8!',
});

export const thunkFetchVideos = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => async (dispatch) => {
  dispatch(fetchVideos());

  try {
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
