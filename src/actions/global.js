export const ACTION_LOADING_SHOW = 'LOADINF_SHOW'
export const ACTION_LOADING_HIDE = 'LOADING_HIDE'

export const actions = {
  showLoading: () => ({
    type: ACTION_LOADING_SHOW,
    payload: {
      loadingText: text || 'Loading...',
    },
  }),
  hideLoading: () => ({
    type: ACTION_LOADING_HIDE,
  }),
};