import { AnyAction } from '@reduxjs/toolkit';
import {
  FETCH_VIDEOS,
  FETCH_VIDEOS_FAIL,
  FETCH_VIDEOS_SUCCESS,
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
    default:
      return {
        ...state,
      };
  }
}
