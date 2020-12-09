import { connect } from "react-redux";

export default function SnackbarWrapper(WrappedComponent) {
  function mapStateToProps(state) {
    return {
      state: state
    };
  }

  function mapDispatchToProps(dispatch) {
    return {
      showSnackbar: (message, variant) =>
        dispatch({
          type: "SNACKBAR_CREATE",
          message: message,
          variant: variant
        }),
      destroySnackbar: () => dispatch({ type: "SNACKBAR_DESTROY" })
    };
  }

  return connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true
  })(WrappedComponent);
}
