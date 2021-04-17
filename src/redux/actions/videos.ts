import { PayloadAction } from '@reduxjs/toolkit';
import { apiUrl } from '../../config';
import { AppThunk } from '../store';
import {
  ADD_VIDEO,
  ADD_VIDEO_FAIL,
  ADD_VIDEO_SUCCESS,
  DELETE_VIDEO,
  DELETE_VIDEO_FAIL,
  DELETE_VIDEO_SUCCESS,
  EDIT_VIDEO,
  EDIT_VIDEO_FAIL,
  EDIT_VIDEO_SUCCESS,
  FETCH_VIDEOS,
  FETCH_VIDEOS_FAIL,
  FETCH_VIDEOS_SUCCESS,
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

const editVideo = () => ({
  type: EDIT_VIDEO,
});

const editVideoSuccess = (payload: Video) => ({
  type: EDIT_VIDEO_SUCCESS,
  payload,
});

const editVideoFail = (payload: string) => ({
  type: EDIT_VIDEO_FAIL,
  payload,
});

const deleteVideo = () => ({
  type: DELETE_VIDEO,
});

const deleteVideoSuccess = (payload: Video) => ({
  type: DELETE_VIDEO_SUCCESS,
  payload,
});

const deleteVideoFail = (payload: string) => ({
  type: DELETE_VIDEO_FAIL,
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
};

export const thunkEditVideo = (
  id: string,
  body: IFormInputs
): AppThunk => async (dispatch) => {
  dispatch(editVideo());

  try {
    const {
      data: { data },
    } = await axios.put(`${apiUrl}/apm/${id}`, body);
    dispatch(editVideoSuccess(data));
  } catch (err) {
    dispatch(editVideoFail(err?.response?.data?.error || err.message));
  }
};

export const thunkDeleteVideo = (id: string): AppThunk => async (dispatch) => {
  dispatch(deleteVideo());

  try {
    const {
      data: { data },
    } = await axios.delete(`${apiUrl}/apm/${id}`);
    dispatch(deleteVideoSuccess(data));
  } catch (err) {
    dispatch(deleteVideoFail(err?.response?.data?.error || err.message));
  }
};
