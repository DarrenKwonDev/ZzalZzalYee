export const initialState = {
  login: false,
  userId: "",
  token: "",
  email: "",
  nickname: "",
};

// action type 정의
export const LOGIN_SUCCESS = "loginSuccess";
export const LOGOUT = "logout";

export const userLogin = (thunk) => {
  return {
    type: LOGIN_SUCCESS,
    data: {
      ...thunk,
    },
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
    data: {
      ...initialState,
    },
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return {
        ...state,
        ...action.data,
      };
    }
    case LOGOUT: {
      return {
        ...initialState,
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
