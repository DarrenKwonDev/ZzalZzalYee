export const initialState = {
  openLoginModal: false,
  loading: false,
};

// action type 정의
export const OPEN_LOGIN_MODAL = "openLoginModal";
export const CLOSE_LOGIN_MODAL = "closeLoginModal";
export const LOADING = "loading";
export const LOADING_DONE = "loadingDone";

export const openLoginModalScreen = {
  type: OPEN_LOGIN_MODAL,
  data: {
    openLoginModal: true,
  },
};

export const closeLoginModalScreen = {
  type: CLOSE_LOGIN_MODAL,
  data: {
    openLoginModal: false,
  },
};

export const loadingScreen = {
  type: LOADING,
  data: {
    loading: true,
  },
};

export const loadingScreenOff = {
  type: LOADING_DONE,
  data: {
    loading: false,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_LOGIN_MODAL: {
      return {
        ...state,
        openLoginModal: action.data.openLoginModal,
      };
    }
    case CLOSE_LOGIN_MODAL: {
      return {
        ...state,
        openLoginModal: action.data.openLoginModal,
      };
    }
    case LOADING: {
      return {
        ...state,
        loading: action.data.loading,
      };
    }
    case LOADING_DONE: {
      return {
        ...state,
        loading: action.data.loading,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default reducer;
