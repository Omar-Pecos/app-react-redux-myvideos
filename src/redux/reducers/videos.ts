import { AnyAction } from '@reduxjs/toolkit';
import {
  ADD_VIDEO,
  ADD_VIDEO_FAIL,
  ADD_VIDEO_SUCCESS,
  FETCH_VIDEOS,
  FETCH_VIDEOS_FAIL,
  FETCH_VIDEOS_SUCCESS,
  RESET_MESSAGE_AND_ERROR,
} from '../actions/actionTypes';

interface VideosState {
  status: string;
  error: boolean;
  message: string;
  list: number[];
}

const initialState: VideosState = {
  status: 'init',
  error: false,
  message: '',
  list: [],
};

export default function videosReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case FETCH_VIDEOS:
      return {
        ...state,
        status: 'loading',
      };
    case FETCH_VIDEOS_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: 'Videos loaded succesfully!',
        list: action.payload,
      };
    case FETCH_VIDEOS_FAIL:
      return {
        ...state,
        status: 'error',
        error: true,
        message: action.payload,
      };
    case RESET_MESSAGE_AND_ERROR:
      return {
        ...state,
        error: false,
        message: '',
      };
    case ADD_VIDEO:
      return {
        ...state,
        status: 'loading',
      };
    case ADD_VIDEO_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: 'Added new video successfully!',
        list: [...state.list, action.payload],
      };
    case ADD_VIDEO_FAIL:
      return {
        ...state,
        status: 'error',
        error: true,
        message: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}
