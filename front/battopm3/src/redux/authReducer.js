const initialState = {
  userId: null,
  isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        userId: action.payload.userId,
        isAuthenticated: true,
      };
    default:
      return state;
  }
};

export default authReducer;
