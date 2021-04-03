import { PayloadAction } from '@reduxjs/toolkit';
import { apiUrl } from '../../config';
import { AppThunk } from '../store';
import {
  FETCH_VIDEOS,
  FETCH_VIDEOS_FAIL,
  FETCH_VIDEOS_SUCCESS,
  RESET_MESSAGE_AND_ERROR,
} from './actionTypes';
import axios from 'axios';
import { Video } from '../../interfaces';

const fetchVideos = () => ({
  type: FETCH_VIDEOS,
});

const fetchVideosSuccess = (payload: Video[]): PayloadAction<Video[]> => ({
  type: FETCH_VIDEOS_SUCCESS,
  payload,
});

const fetchVideosFail = (payload: string): PayloadAction<string> => ({
  type: FETCH_VIDEOS_FAIL,
  payload,
});

const resetMessageAndError = () => ({
  type: RESET_MESSAGE_AND_ERROR,
});

export const thunkFetchVideos = (): AppThunk => async (dispatch) => {
  dispatch(fetchVideos());
  try {
    const {
      data: { data },
    } = await axios.get(`${apiUrl}/apm`);
    dispatch(fetchVideosSuccess(data));

    dispatch(thunkResetMessageAndError());
  } catch (err) {
    dispatch(fetchVideosFail(err?.response?.data?.error || err.message));
  }
};

const thunkResetMessageAndError = (): AppThunk => (dispatch) => {
  setTimeout(() => {
    dispatch(resetMessageAndError());
  }, 3000);
};
