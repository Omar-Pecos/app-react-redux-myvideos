import { AnyAction } from '@reduxjs/toolkit';
import { Video } from '../../interfaces';
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
} from '../actions/actionTypes';

interface VideosState {
  status: string;
  error: boolean;
  message: string;
  list: Video[];
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
    case EDIT_VIDEO:
      return {
        ...state,
        status: 'loading',
      };
    case EDIT_VIDEO_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: 'Edited video successfully!',
        list: state.list.map((video) => {
          if (video.id === action.payload.id) {
            video = action.payload;
          }
          return video;
        }),
      };
    case EDIT_VIDEO_FAIL:
      return {
        ...state,
        status: 'error',
        error: true,
        message: action.payload,
      };
    case DELETE_VIDEO:
      return {
        ...state,
        status: 'loading',
      };
    case DELETE_VIDEO_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: 'Deleted video succesfully!',
        list: state.list.filter(
          (video: Video) => video.id !== action.payload.id
        ),
      };
    case DELETE_VIDEO_FAIL:
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
