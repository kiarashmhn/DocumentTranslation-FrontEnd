import React, { Component, Fragment } from "react";
import { Grid, Typography } from "@material-ui/core";
import MediaCard from "../MediaCard";
import IdentityCertificate from "./IdentityCertificate";
import PropTypes from "prop-types";
import image from "../../images/identityCard.jpg";
import FullScreenDialog from "../FullScreenDialog";
import Api from "../Api/Api";
import * as URLConstant from "../../URLConstant";
import SnackbarWrapper from "../Snackbar/SnackbarWrapper";
import { OrderTypes } from "./OrderTypes";

class CreateOrder extends Component {
  constructor(props) {
    super(props);
    this.identityCertificateRef = React.createRef();
    this.api = new Api();
    this.state = {
      openIdentityDialog: false,
      isLoading: false
    };
  }

  componentDidMount() {
    console.log("in order");
    //this.props.selectCreateOrder();
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

  createOrder = close => {
    let self = this;
    let postData = {
      type: OrderTypes.ID_CERTIFICATE.name,
      details: this.identityCertificateRef.current.getState()
    };
    this.api
      .doPost(
        process.env.REACT_APP_HOST_URL +
          process.env.REACT_APP_MAIN_PATH +
          URLConstant.CREATE_ORDER,
        postData
      )
      .then(function(res) {
        self.props.showSnackbar(res.message, res.success ? "success" : "error");
        self.setState({
          isLoading: false
        });
        if (close && res.success)
          self.setState({
            openIdentityDialog: false
          });
      });
  };

  handleSubmit = () => {
    this.setState(
      {
        isLoading: true
      },
      () => {
        this.createOrder(true);
      }
    );
  };

  handleSave = e => {
    e.preventDefault();
    this.setState(
      {
        isLoading: true
      },
      () => {
        this.createOrder(false);
      }
    );
  };

  render() {
    return (
      <Fragment>
        <Typography variant="body1" color="textSecondary" dir={"rtl"}>
          - نوشتار لاتین نام، نام خانوادگی، تاریخ تولد و دیگر مشخصات خود را با
          پاسپورت یا مدارک دیگر مثل کارت اقامت خود حتما مطابقت دهید.
        </Typography>
        <br />
        <Typography variant="body1" color="textSecondary">
          - On rencontre souvent des difficultés à déterminer la translitération
          exacte des noms et prénoms afghans, les déclarants ne pouvant souvent
          la préciser. Pour réduire les risques d`&apos;erreur, il est fortement
          recommandé de vérifier ses déclarations antérieures auprès des
          administrations (préfecture, OFPRA,…), ses documents officiels déjà
          délivrés par les autorités (récépissé, titre de séjour, passeport…)
          permettant ainsi de concorder l`&apos;orthographe des noms ou prénoms
          à ceux qui ont été déjà enregistrés.
        </Typography>
        <br />
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
                  onSave={this.handleSave}
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

export default SnackbarWrapper(CreateOrder);

CreateOrder.propTypes = {
  selectCreateOrder: PropTypes.func,
  showSnackbar: PropTypes.func.isRequired
};
