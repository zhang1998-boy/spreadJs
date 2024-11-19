import store from '@/store';
import { SET_LOADING_STATUS } from '@/store/actionTypes';

export function showLoading() {
  store.commit(`app/${SET_LOADING_STATUS}`, true);
}

export function hideLoading() {
  store.commit(`app/${SET_LOADING_STATUS}`, false);
}
