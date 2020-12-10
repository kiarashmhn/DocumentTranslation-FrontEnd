import React, { Component, Fragment } from "react";
import { Grid } from "@material-ui/core";
import MediaCard from "../../../custom/MediaCard";
import IdentityCertificate from "./IdentityCertificate";
import PropTypes from "prop-types";
import image from "../../../images/identityCard.jpg";
import FullScreenDialog from "../../../custom/FullScreenDialog";

class CreateOrder extends Component {
  constructor(props) {
    super(props);
    this.identityCertificateRef = React.createRef();
    this.state = {
      openIdentityDialog: false,
      isLoading: false
    };
  }

  componentDidMount() {
    this.props.selectCreateOrder();
  }

  handleOpenDialog = () => {
    this.setState({
      openIdentityDialog: true
    });
  };

  handleCloseDialog = () => {
    this.setState({
      openIdentityDialog: false
    });
  };

  handleSubmit = () => {
    console.log(this.identityCertificateRef.current.getState());
    this.setState({
      openIdentityDialog: false
    });
  };

  render() {
    return (
      <Fragment>
        <Grid container spacing={1} dir={"rtl"}>
          <Grid item xs={12} sm={12} md={4} key={"identityCard"}>
            <MediaCard
              image={image}
              title={"شناسنامه"}
              onClick={this.handleOpenDialog}
              secondaryTitle={"درخواست ترجمه شناسنامه"}
            />
            <FullScreenDialog
              title="test"
              component={
                <IdentityCertificate
                  ref={this.identityCertificateRef}
                  onSubmit={this.handleSubmit}
                  isLoading={this.state.isLoading}
                />
              }
              handleClose={this.handleCloseDialog}
              open={this.state.openIdentityDialog}
            />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default CreateOrder;

CreateOrder.propTypes = {
  selectCreateOrder: PropTypes.func.isRequired
};
