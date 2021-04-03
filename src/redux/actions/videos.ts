import { PayloadAction } from '@reduxjs/toolkit';
import { apiUrl } from '../../config';
import { AppThunk } from '../store';
import {
  ADD_VIDEO,
  ADD_VIDEO_FAIL,
  ADD_VIDEO_SUCCESS,
  FETCH_VIDEOS,
  FETCH_VIDEOS_FAIL,
  FETCH_VIDEOS_SUCCESS,
  RESET_MESSAGE_AND_ERROR,
} from './actionTypes';
import axios from 'axios';
import { IFormInputs, Video } from '../../interfaces';

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

const addVideo = () => ({
  type: ADD_VIDEO,
});

const addVideoSuccess = (payload: Video) => ({
  type: ADD_VIDEO_SUCCESS,
  payload,
});

const addVideoFail = (payload: string) => ({
  type: ADD_VIDEO_FAIL,
  payload,
});

export const thunkFetchVideos = (): AppThunk => async (dispatch) => {
  dispatch(fetchVideos());
  try {
    const {
      data: { data },
    } = await axios.get(`${apiUrl}/apm`);
    dispatch(fetchVideosSuccess(data));
  } catch (err) {
    dispatch(fetchVideosFail(err?.response?.data?.error || err.message));
  }

  dispatch(thunkResetMessageAndError());
};

const thunkResetMessageAndError = (): AppThunk => (dispatch) => {
  setTimeout(() => {
    dispatch(resetMessageAndError());
  }, 3000);
};

export const thunkAddVideo = (body: IFormInputs): AppThunk => async (
  dispatch
) => {
  dispatch(addVideo());

  try {
    const {
      data: { data },
    } = await axios.post(`${apiUrl}/apm`, body);
    dispatch(addVideoSuccess(data));
  } catch (err) {
    dispatch(addVideoFail(err?.response?.data?.error || err.message));
  }

  dispatch(thunkResetMessageAndError());
};
