import { AnyAction } from 'redux';
import {
  FETCH_VIDEOS,
  FETCH_VIDEOS_FAIL,
  FETCH_VIDEOS_SUCCESS,
} from '../actions/actionTypes';

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
        status: 'loaded',
        list: action.videos,
      };
    case FETCH_VIDEOS_FAIL:
      return {
        ...state,
        status: 'error',
        error: action.error,
      };
    default:
      console.log(state);
      return {
        ...state,
      };
  }
}
