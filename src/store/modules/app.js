import Cookies from 'js-cookie';
import { SET_LOADING_STATUS, SET_COLLAPSE_STATUS, SET_CURRENT_DATE } from '../actionTypes';
// state
const storeState = {
  loading: false,
  collapse: +Cookies.get('collapse') === 1,
  currentDate: new Date().getTime(),
  projectInfo: {
    projectId: "",
    projectName: ""
  },
  versionId: '',
  sheetCode: ''

};

// mutations
const mutations = {
  [SET_LOADING_STATUS] (state, param) {
    state.loading = param;
  },
  [SET_COLLAPSE_STATUS] (state, param) {
    state.collapse = param;
    Cookies.set('collapse', param ? 1 : 0);
  },
  [SET_CURRENT_DATE] (state, param) {
    state.currentDate = param;
  },
  updateZtProjectData (state, param) {
    state.projectInfo = param;
  },
  updateVersionData (state, param) {
    state.versionId = param.versionId;
  },
  updateSheetCode (state, param) {
    state.sheetCode = param.sheetCode;
  },
};

export default {
  namespaced: true,
  state: storeState,
  mutations,
};
