export const showSnackbar = (message, variant) => {
  return dispatch => {
    dispatch({ type: "SNACKBAR_CREATE", message: message, variant: variant });
  };
};

export const destroySnackbar = () => {
  return dispatch => {
    dispatch({ type: "SNACKBAR_DESTROY" });
  };
};
