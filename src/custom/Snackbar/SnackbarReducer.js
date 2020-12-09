const snackbarReducer = (state = {}, action) => {
  switch (action.type) {
    case "SNACKBAR_CREATE":
      return {
        ...state,
        open: true,
        message: action.message,
        variant: action.variant
      };
    case "SNACKBAR_DESTROY":
      return {
        ...state,
        open: false
      };
    default:
      return state;
  }
};

export default snackbarReducer;
